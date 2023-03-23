import {
  IconBox,
  IconBrandAsana,
  IconBuildingWarehouse,
  IconChartPie,
  IconCopy,
  IconDropletFilled,
  IconLeaf,
  IconLicense,
  IconNotes,
  IconPercentage,
  IconPlant2,
  IconScale,
  IconScan,
  IconSchool,
  IconSeeding,
  IconSquareDot,
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
  {
    key: 'sampleSize',
    name: 'Sample Size',
    icon: IconBrandAsana,
  },
  {
    key: 'sampleWeightInGrams',
    name: 'Sample Weight',
    unit: ' gms',
    icon: IconScale,
  },
  {
    key: 'thousandSeedWeightInGrams',
    name: 'Thousand Seed Weight',
    icon: IconBox,
    unit: ' gms',
  },
  {
    key: 'relativeHumidityPercent',
    name: 'Relative Humidity',
    icon: IconDropletFilled,
    unit: '%',
  },
  {
    key: 'purityPercent',
    name: 'Purity',
    icon: IconPercentage,
    unit: '%',
  },
  {
    key: 'purityDebrisPercent',
    name: 'Purity / Debris',
    icon: IconChartPie,
    unit: '%',
  },
  {
    key: 'storageTempInCelsius',
    name: 'Storage Temperature',
    icon: IconTemperature,
    unit: '° C',
  },
];

const longFields: AccessionDetail[] = [
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
  {
    key: 'preStorageTreatmentNotesHistory',
    name: 'Pre-Storage Treatment/History',
    icon: IconNotes,
  },
  {
    key: 'plantForm',
    name: 'Plant Form',
    icon: IconLeaf,
  },
  {
    key: 'formInStorage',
    name: 'Form in Storage',
    icon: IconSquareDot,
  },
  {
    key: 'degreeOfEstablishment',
    name: 'Cultivated',
    icon: IconPlant2,
  },
  {
    key: 'duplicatesReplicates',
    name: 'Duplicates / Replicates',
    icon: IconCopy,
  },
  {
    key: 'collectionPermitNumber',
    name: 'Permit Number',
    icon: IconLicense,
  },
  {
    key: 'collectionFillRate',
    name: 'Collection Fill Rate / X-Ray',
    icon: IconScan,
  },
  {
    key: 'publicationDOI',
    name: 'Publication DOI',
    icon: IconSchool,
  },
];

export { fields, longFields };
