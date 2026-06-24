import {
	Center,
	Divider,
	Flex,
	Group,
	Pagination,
	Select,
	Text,
	Tooltip,
} from '@mantine/core';
import { useEffect, useState } from 'react';

// Project components / helpers
import { type EventDocuments, type EventSearchResult, gqlQueries, performGQLQuery, type Predicate } from '#/api';
import { Downloads, Filters } from '#/components';
import { useMounted } from '#/helpers';
import { formatNumber } from '#/helpers/stats';

// Accession components
import AccessionTable from '#/views/Accessions/components/AccessionTable';
import downloadFields from '#/views/Accessions/downloadFields';

// Config
import filters from '#/views/Accessions/filters';
import { useParams, useRouteLoaderData } from 'react-router';


export function SeedbankRecords() {
	const { gql, collectory } = useRouteLoaderData('seedbank');

	// State hooks
	const [filterPredicates, setFilterPredicates] = useState<Predicate[]>([]);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [query, setQuery] = useState<EventDocuments | null>(gql?.accessions?.documents || null);
	const { resource } = useParams();

	const mounted = useMounted();
	const events = query?.results;

	// Construct the base predicates array
	const predicates: Predicate[] = [
		...filterPredicates,
		{
			type: 'equals',
			key: 'eventType',
			value: 'Accession',
		},
		{
			type: 'equals',
			key: 'datasetKey',
			value: resource
		},
	];

	useEffect(() => {
		async function runQuery() {
			const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
				gqlQueries.QUERY_EVENT_ACCESSIONS,
				{
					predicate: {
						type: 'and',
						predicates,
					},
					size: pageSize,
					from: (page - 1) * pageSize,
				},
			);
			setQuery(data.eventSearch?.documents as EventDocuments);
		}

		if (mounted) {
			try {
				runQuery();
			} catch (error) {
				console.log(error);
			}
		}
	}, [page, pageSize, filterPredicates]);

	const downloadFetcher = (data: { eventSearch: EventSearchResult }) =>
		data?.eventSearch?.documents?.results || [];

	return (
		<Flex direction='column' pt='md' justify='space-between'>
			<Group justify='space-between' mb='lg'>
				<Group>
					<Tooltip
						transitionProps={{ transition: 'pop' }}
						offset={10}
						withArrow
						label='Change number results per page'
						position='right'
					>
						<Select
							value={pageSize.toString()}
							onChange={(value) => {
								setPage(1);
								setPageSize(parseInt(value || '10', 10));
							}}
							w={120}
							data={['10', '20', '40'].map((size) => ({
								label: `${size} results`,
								value: size.toString(),
							}))}
							aria-label='Results per page'
						/>
					</Tooltip>
					<Filters
						predicates={filterPredicates}
						filters={filters}
						onPredicates={(preds) => {
							setPage(1);
							setFilterPredicates(preds);
						}}
					/>
				</Group>
				<Group>
					<Text c='dimmed' ta='center' size='sm'>
						{(page - 1) * pageSize + 1}-
						{Math.min((page - 1) * pageSize + pageSize, query?.total || 0)} of{' '}
						{formatNumber(query?.total || 0)} total records
					</Text>
					<Divider orientation='vertical' />
					<Downloads
						query={gqlQueries.DOWNLOAD_EVENT_ACCESSIONS}
						predicates={predicates}
						fields={downloadFields}
						fetcher={downloadFetcher}
						total={query?.total || 0 as number}
						fileName={`AVSB ${collectory?.acronym || 'Seedbank'} Accessions`}
					/>
				</Group>
			</Group>
			<AccessionTable scrollOffset={320} events={events || []} />
			<Center mb='sm' mt='lg'>
				<Pagination
					value={page}
					total={query ? Math.ceil((query.total as number) / pageSize) : 1}
					onChange={(newPage) => setPage(newPage)}
					getControlProps={(control) => ({
						'aria-label': `${control} pagination button`,
					})}
				/>
			</Center>
		</Flex>)
}
