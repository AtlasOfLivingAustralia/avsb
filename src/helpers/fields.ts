import {
  IconCircle,
  IconCircleDashed,
  IconCircleDotted,
  IconSeeding,
  IconBox,
  IconBrandAsana,
  IconBuildingWarehouse,
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
  description: string;
  examples: string;
  unit?: string;
  icon: TablerIcon;
}

type SeedbankFieldMap = { [key: string]: SeedbankField };

const accessionFields: SeedbankFieldMap = {
  seedPerGram: {
    label: 'Seed/gm',
    icon: IconSeeding,
    examples: '1000/g',
    description:
      'The average number of seeds or fruits per gram of the accession. This may be an estimate.',
  },
  sampleSize: {
    label: 'Collection Size',
    icon: IconBrandAsana,
    examples: '',
    description: 'The total number of seeds currently available in the accession.',
  },
  sampleWeightInGrams: {
    label: 'Sample Weight',
    unit: 'g',
    icon: IconScale,
    examples: '',
    description:
      'The total weight of the currently available accession in grams. Stock or quantity.',
  },
  thousandSeedWeight: {
    label: 'Thousand Seed Weight',
    icon: IconBox,
    unit: 'g',
    examples: '30g',
    description: 'The mass of 1000 pure seeds or fruits.',
  },
  relativeHumidityPercentage: {
    label: 'Relative Humidity',
    icon: IconDropletFilled,
    unit: '%',
    examples: '15%',
    description: 'The relative humidity at which the accession was stored on the "dateInStorage"',
  },
  purityPercentage: {
    label: 'Purity',
    icon: IconPercentage,
    unit: '%',
    examples: '84%',
    description: 'The proportion of the accession, by weight, that is pure seed or fruit.',
  },
  storageTemperatureInCelsius: {
    label: 'Storage Temperature',
    icon: IconTemperature,
    unit: '°C',
    examples: '"15C" "-20C" "-196C"',
    description: 'The temperature at which the accession is stored on the "dateInStorage"',
  },
  primaryStorageSeedBank: {
    label: 'Storage Seed Bank',
    icon: IconBuildingWarehouse,
    examples:
      '"Royal Tasmanian Botanic Gardens, TSSC", "Australian National Botanic Gardens, National Seed Bank"',
    description: 'Name of the institution or seed bank where the primary accession is stored.',
  },
  primaryCollector: {
    label: 'Collector',
    icon: IconUser,
    examples: 'L. Guja',
    description: 'Name (last name at minimum) of the collector.',
  },
  preStorageTreatmentNotesHistory: {
    label: 'Pre-Storage Treatment/History',
    icon: IconNotes,
    examples:
      'Stored at 5C for 10 years. Dried at 15C and 15% RH prior to current freezer storage. Removed from freezer for 3 months for research.',
    description:
      'The conditions (e.g. temperature and humidity) the accession was stored in prior to its current storage.',
  },
  plantForm: {
    label: 'Plant Form',
    icon: IconLeaf,
    examples:
      '"herb", "subshrub", "shrub", "mallee", "tree", "graminoid", "tussock", "hummock", "basal large", "geophyte", "palmoid", "climber", "climber herbaceous", "climber woody", "fern", "lycophyte"',
    description: 'Description of the form of a plant. Source: Austraits',
  },
  formInStorage: {
    label: 'Form in Storage',
    icon: IconSquareDot,
    examples: '"seed", "fruit", "tissue culture", "excised embryo"',
    description: 'The form of the germplasm in storage.',
  },
  degreeOfEstablishment: {
    label: 'Cultivated',
    icon: IconPlant2,
    examples:
      '"extinct", "extinct in the wild", "critically endangered", "Endangered", "vulnerable", "conservation dependent", "not listed"',
    description:
      'Origin of the seed and whether it was sourced from wild plants, cultivated plants of wild origin (for example in seed production or a botanic garden), or cultivated plants of unknown origin). ',
  },
  duplicatesReplicates: {
    label: 'Duplicates / Replicates',
    icon: IconCopy,
    examples: '"1 at PlantBank", "3 at MSB"',
    description: 'Number of duplicate or replicate accessions stored at other seed banks.',
  },
  collectionPermitNumber: {
    label: 'Permit Number',
    icon: IconLicense,
    examples: 'NSW SL100750',
    description: 'Agency and permit number for the permit the collection was made under.',
  },
  collectionFillRate: {
    label: 'Collection Fill Rate / X-Ray',
    icon: IconScan,
    examples: '46% determined via x-ray',
    description:
      'The proportion of seeds or fruits that are filled, as determined by cut-test, x-ray or other assessments of seed fill or viability such as tetrazolium test.',
  },
  publicationDOI: {
    label: 'Publication DOI',
    icon: IconSchool,
    examples: 'https://doi.org/10.1071/BT22076',
    description:
      'The digital object identifier (DOI) of any published work related to the accession.',
  },
};

const trialFields: SeedbankFieldMap = {
  numberGerminated: {
    label: 'Number Germinated',
    icon: IconSeeding,
    examples: '10',
    description: 'The number of germinants in a germination test.',
  },
  numberTested: {
    label: 'Number Tested',
    icon: IconCircleDotted,
    examples: '10',
    description: 'The number of seeds tested in a germination test.',
  },
  numberFull: {
    label: 'Number Full',
    icon: IconCircle,
    examples: '8',
    description:
      'The number of seeds that were full and appeared healthy during the post-germination cut test.',
  },
  numberEmpty: {
    label: 'Number Empty',
    icon: IconCircleDashed,
    examples: '2',
    description: 'The number of seeds that were empty during the post-germination cut test.',
  },
};

const treatmentFields: SeedbankFieldMap = {
  mediaSubstrate: {
    label: 'Media / Substrate',
    icon: IconFlask,
    examples: '"water agar 1%", "filter paper", "sand"',
    description: 'The type of media or substrate used in the germination test.',
  },
  lightHours: {
    label: 'Light Hours',
    icon: IconBrightness2,
    unit: ' hours',
    examples: '16 hours light',
    description: 'The number of hours the germination test was illuminated to mimic day.',
  },
  darkHours: {
    label: 'Dark Hours',
    icon: IconBrightness,
    unit: ' hours',
    examples: '8 hours dark',
    description: 'The number of hours the germination test was in darkness to mimic night.',
  },
  dayTemperatureInCelsius: {
    label: 'Day Temp',
    icon: IconSun,
    unit: '°C',
    examples: '20C',
    description:
      'Temperature during the day/light photoperiod. If a ramp was used report a weighted mean.',
  },
  nightTemperatureInCelsius: {
    label: 'Night Temp',
    icon: IconMoon,
    unit: '°C',
    examples: '10C',
    description:
      'Temperature during the night/dark photoperiod. If a ramp was used report a weighted mean.',
  },
};

export { accessionFields, trialFields, treatmentFields };
