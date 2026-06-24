import type { Event } from "#/api";
import { AreaChart } from "@mantine/charts";
import { Paper } from "@mantine/core";
import { useMemo } from "react";

interface TrailGraphProps {
	events: Event[];
}

export default function TrialGraph({ events }: TrailGraphProps) {
	const data = useMemo(() => {
		return events.sort((a, b) => (a.extensions?.seedbank?.testDateStarted || 0) - (b.extensions?.seedbank?.testDateStarted || 0)).map((event) => {
			const sbe = event.extensions?.seedbank;
			return {
				'Adjusted Germination %': sbe?.adjustedGerminationPercentage,
				Date: new Date(sbe?.testDateStarted || 0).toLocaleDateString()
			}
		});
	}, [events]);

	const yScale = useMemo(() => {
		const adjGerm = events.map((event) => event.extensions?.seedbank?.adjustedGerminationPercentage || 0);
		return [Math.min(...adjGerm), Math.max(...adjGerm)]
	}, [events]);

	return (
		<Paper pl='xs' pr='xl' py='xl' bg='paper' withBorder>
			<AreaChart
				h={300}
				data={data}
				dataKey="Date"
				series={[
					{ name: 'Adjusted Germination %', color: 'blue' },
					// { name: 'Oranges', color: 'blue.6' },
					// { name: 'Tomatoes', color: 'teal.6' },
				]}
				yAxisProps={{ domain: yScale }}
				withLegend
				tooltipAnimationDuration={200}
			/>
		</Paper>
	)
}