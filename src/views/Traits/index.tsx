import { Suspense } from 'react';
import { Center, Grid, Stack, Text } from '@mantine/core';
import { IconSeedingOff } from '@tabler/icons';
import range from 'lodash/range';

// Project components / helpers
import { Await, useRouteLoaderData } from 'react-router-dom';
import { AusTraitsSummary } from '#/api';

import CategoricalTraitCard from './components/CategoricalTraitCard';
import NumericTraitCard from './components/NumericalTraitCard';

interface RouteLoaderProps {
  traits: Promise<AusTraitsSummary>;
}

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const { traits } = useRouteLoaderData('taxon') as RouteLoaderProps;

  return (
    <Suspense
      fallback={
        <Grid>
          {range(0, 20).map((num) => (
            <Grid.Col key={num} xs={12} sm={12} md={6} lg={4}>
              <CategoricalTraitCard trait={null} />
            </Grid.Col>
          ))}
        </Grid>
      }
    >
      <Await resolve={traits}>
        {({
          categorical_traits: categoricalTraits,
          numeric_traits: numericTraits,
        }: AusTraitsSummary) =>
          categoricalTraits.length > 0 || numericTraits.length > 0 ? (
            <Grid>
              {categoricalTraits.map((trait) => (
                <Grid.Col key={trait.trait_name} xs={12} sm={12} md={6} lg={4}>
                  <CategoricalTraitCard trait={trait} />
                </Grid.Col>
              ))}
              {numericTraits.map((trait) => (
                <Grid.Col key={trait.trait_name} xs={12} sm={12} md={6} lg={4}>
                  <NumericTraitCard trait={trait} />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Center h='calc(100vh - 350px)'>
              <Stack align='center'>
                <IconSeedingOff size='3rem' />
                <Text color='dimmed'>No matching traits found</Text>
              </Stack>
            </Center>
          )
        }
      </Await>
    </Suspense>
  );
}

Object.assign(Component, { displayName: 'Traits' });
