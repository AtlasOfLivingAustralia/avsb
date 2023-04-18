import {
  IconBox,
  IconChartPie,
  IconDropletFilled,
  IconHandStop,
  IconId,
  IconPackage,
  IconPercentage,
  IconScale,
  IconSeeding,
  IconTemperature,
} from '@tabler/icons';
import { Filter } from '#/components/FilterPanel';

const filters: Filter[] = [
  {
    key: 'seedbank_accessionNumber',
    label: 'Accession Number',
    type: 'text',
    placeholder: 'ABC 123456.78',
    icon: IconId,
  },
  {
    key: 'seedbank_seedPerGram',
    label: 'Seed/GM',
    type: 'numericGreaterLess',
    placeholder: '1.23',
    icon: IconSeeding,
  },
  // {
  //   key: 'seedbank_formInStorage',
  //   label: 'Form in Storage',
  //   type: 'select',
  //   placeholder: 'Select one',
  //   items: [{ label: 'Thing', value: 'testing' }],
  // },
  {
    key: 'seedbank_thousandSeedWeight',
    label: 'Thousand Seed Weight',
    type: 'numericGreaterLess',
    placeholder: '10.1',
    icon: IconBox,
  },
  {
    key: 'seedbank_sampleWeightInGrams',
    label: 'Sample Weight',
    type: 'numericGreaterLess',
    placeholder: '1.23',
    icon: IconScale,
  },
  {
    key: 'seedbank_purityPercentage',
    label: 'Purity %',
    type: 'percent',
    icon: IconPercentage,
  },
  {
    key: 'seedbank_purityDebrisPercentage',
    label: 'Purity / Debris %',
    type: 'percent',
    icon: IconChartPie,
  },
  {
    key: 'seedbank_dateCollected',
    label: 'Date Collected',
    type: 'date',
    placeholder: '5 Apr 2001',
    icon: IconHandStop,
  },
  {
    key: 'seedbank_dateInStorage',
    label: 'Date In Storage',
    type: 'date',
    placeholder: '5 Apr 2001',
    icon: IconPackage,
  },
  {
    key: 'seedbank_storageTemperatureInCelsius',
    label: 'Storage Temperature',
    type: 'numericGreaterLess',
    placeholder: '-20',
    icon: IconTemperature,
  },
  {
    key: 'seedbank_relativeHumidityPercentage',
    label: 'Relative Humidity %',
    type: 'percent',
    placeholder: '15.5',
    icon: IconDropletFilled,
  },
  // {
  //   key: 'seedbank_plantForm',
  //   label: 'Plant form',
  //   type: 'select',
  //   placeholder: 'Select plant form',
  //   items: [{ label: 'Thing', value: 'testing' }],
  // },
];

export default filters;
