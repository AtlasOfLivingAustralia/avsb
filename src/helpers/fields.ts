import {
  IconCircle,
  IconCircleDashed,
  IconCircleDotted,
  IconSeeding,
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
  IconSquareDot,
  IconTemperature,
  IconUser,
  IconBrightness,
  IconBrightness2,
  IconFlask,
  IconMoon,
  IconSun,
  TablerIcon,
} from '@tabler/icons';

interface SeedbankField {
  label: string;
  unit?: string;
  definition?: string;
  icon: TablerIcon;
}

type SeedbankFieldMap = { [key: string]: SeedbankField };

const accessionFields: SeedbankFieldMap = {
  seedPerGram: {
    label: 'Seed/gm',
    icon: IconSeeding,
  },
  sampleSize: {
    label: 'Collection Size',
    icon: IconBrandAsana,
  },
  sampleWeightInGrams: {
    label: 'Sample Weight',
    unit: 'g',
    icon: IconScale,
  },
  thousandSeedWeight: {
    label: 'Thousand Seed Weight',
    icon: IconBox,
    unit: 'g',
  },
  relativeHumidityPercentage: {
    label: 'Relative Humidity',
    icon: IconDropletFilled,
    unit: '%',
  },
  purityPercentage: {
    label: 'Purity',
    icon: IconPercentage,
    unit: '%',
  },
  purityDebrisPercentage: {
    label: 'Purity / Debris',
    icon: IconChartPie,
    unit: '%',
  },
  storageTemperatureInCelsius: {
    label: 'Storage Temperature',
    icon: IconTemperature,
    unit: '°C',
  },
  primaryStorageSeedBank: {
    label: 'Storage Seed Bank',
    icon: IconBuildingWarehouse,
  },
  primaryCollector: {
    label: 'Collector',
    icon: IconUser,
  },
  preStorageTreatmentNotesHistory: {
    label: 'Pre-Storage Treatment/History',
    icon: IconNotes,
  },
  plantForm: {
    label: 'Plant Form',
    icon: IconLeaf,
  },
  formInStorage: {
    label: 'Form in Storage',
    icon: IconSquareDot,
  },
  degreeOfEstablishment: {
    label: 'Cultivated',
    icon: IconPlant2,
  },
  duplicatesReplicates: {
    label: 'Duplicates / Replicates',
    icon: IconCopy,
  },
  collectionPermitNumber: {
    label: 'Permit Number',
    icon: IconLicense,
  },
  collectionFillRate: {
    label: 'Collection Fill Rate / X-Ray',
    icon: IconScan,
  },
  publicationDOI: {
    label: 'Publication DOI',
    icon: IconSchool,
  },
};

const trialFields: SeedbankFieldMap = {
  numberGerminated: {
    label: 'Number Germinated',
    icon: IconSeeding,
  },
  numberTested: {
    label: 'Number Tested',
    icon: IconCircleDotted,
  },
  numberFull: {
    label: 'Number Full',
    icon: IconCircle,
  },
  numberEmpty: {
    label: 'Number Empty',
    icon: IconCircleDashed,
  },
};

const treatmentFields: SeedbankFieldMap = {
  mediaSubstrate: {
    label: 'Media / Substrate',
    icon: IconFlask,
  },
  lightHours: {
    label: 'Light Hours',
    icon: IconBrightness2,
    unit: ' hours',
  },
  darkHours: {
    label: 'Dark Hours',
    icon: IconBrightness,
    unit: ' hours',
  },
  dayTemperatureInCelsius: {
    label: 'Day Temp',
    icon: IconSun,
    unit: '°C',
  },
  nightTemperatureInCelsius: {
    label: 'Night Temp',
    icon: IconMoon,
    unit: '°C',
  },
};

export { accessionFields, trialFields, treatmentFields };
