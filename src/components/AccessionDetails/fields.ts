import {
  IconBox,
  // IconBox,
  IconBrandAsana,
  IconBuildingWarehouse,
  IconChartPie,
  IconCopy,
  IconDropletFilled,
  // IconLeaf,
  // IconLicense,
  // IconNotes,
  IconPercentage,
  // IconPlant2,
  IconScale,
  // IconScan,
  // IconSchool,
  IconSeeding,
  // IconSquareDot,
  IconTemperature,
  IconUser,
  TablerIcon,
} from '@tabler/icons';
import { SeedBankAccession } from '#/api/graphql/types';

interface AccessionDetail {
  key: keyof SeedBankAccession;
  name: string;
  unit?: string;
  icon: TablerIcon;
}

const fields: AccessionDetail[] = [
  {
    key: 'seedPerGram',
    name: 'Seed/gm',
    icon: IconSeeding,
  },
  // {
  //   key: 'sampleSize',
  //   name: 'Collection Size',
  //   icon: IconBrandAsana,
  // },
  {
    key: 'sampleWeightInGrams',
    name: 'Sample Weight',
    unit: 'g',
    icon: IconScale,
  },
  {
    key: 'thousandSeedWeight',
    name: 'Thousand Seed Weight',
    icon: IconBox,
    unit: 'g',
  },
  {
    key: 'relativeHumidityPercentage',
    name: 'Relative Humidity',
    icon: IconDropletFilled,
    unit: '%',
  },
  {
    key: 'purityPercentage',
    name: 'Purity',
    icon: IconPercentage,
    unit: '%',
  },
  {
    key: 'purityDebrisPercentage',
    name: 'Purity / Debris',
    icon: IconChartPie,
    unit: '%',
  },
  {
    key: 'storageTemperatureInCelsius',
    name: 'Storage Temperature',
    icon: IconTemperature,
    unit: '°C',
  },
  {
    key: 'primaryStorageSeedBank',
    name: 'Storage Seed Bank',
    icon: IconBuildingWarehouse,
  },
  {
    key: 'primaryCollector',
    name: 'Collector',
    icon: IconUser,
  },
  // {
  //   key: 'preStorageTreatmentNotesHistory',
  //   name: 'Pre-Storage Treatment/History',
  //   icon: IconNotes,
  // },
  // {
  //   key: 'plantForm',
  //   name: 'Plant Form',
  //   icon: IconLeaf,
  // },
  // {
  //   key: 'formInStorage',
  //   name: 'Form in Storage',
  //   icon: IconSquareDot,
  // },
  // {
  //   key: 'degreeOfEstablishment',
  //   name: 'Cultivated',
  //   icon: IconPlant2,
  // },
  {
    key: 'duplicatesReplicates',
    name: 'Duplicates / Replicates',
    icon: IconCopy,
  },
  // {
  //   key: 'collectionPermitNumber',
  //   name: 'Permit Number',
  //   icon: IconLicense,
  // },
  // {
  //   key: 'collectionFillRate',
  //   name: 'Collection Fill Rate / X-Ray',
  //   icon: IconScan,
  // },
  // {
  //   key: 'publicationDOI',
  //   name: 'Publication DOI',
  //   icon: IconSchool,
  // },
];

export default fields;
