import {
  IconCircle,
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
  IconTestPipe,
  IconId,
  IconChartPie,
  IconFlower,
  IconCalendar,
  IconCalendarTime,
  IconPackage,
  IconAbc,
  IconBuildingBank,
  IconCircleOff,
  IconCircleDot,
  IconHandGrab,
} from '@tabler/icons';

export interface SeedbankFieldTrait {
  type: 'numeric' | 'categorical';
  name: string;
}

export interface SeedbankField {
  label: string;
  description: string;
  examples: string;
  icon: TablerIcon;
  unit?: string;
  trait?: SeedbankFieldTrait;
}

type SeedbankFieldMap = { [key: string]: SeedbankField };

const accessionFields: SeedbankFieldMap = {
  accessionNumber: {
    label: 'Accession',
    icon: IconId,
    examples: '"CANB 770480", "20061691"',
    description: 'The unique identification number given to a accession of seed. ',
  },
  seedPerGram: {
    label: 'Seed/gm',
    icon: IconSeeding,
    examples: '1000/g',
    description:
      'The average number of seeds or fruits per gram of the accession. This may be an estimate.',
  },
  quantityInGrams: {
    label: 'Quantity (g)',
    unit: 'g',
    icon: IconScale,
    examples: '1.23g',
    description:
      'The total weight of the currently available accession in grams. Stock or quantity.',
  },
  quantityCount: {
    label: 'Collection Size',
    unit: ' seeds',
    icon: IconBrandAsana,
    examples: '3000',
    description: 'The total number of seeds currently available in the accession.',
  },
  thousandSeedWeight: {
    label: 'Thousand Seed Weight',
    icon: IconBox,
    unit: 'g',
    examples: '30g',
    description: 'The mass of 1000 pure seeds or fruits.',
  },
  numberPlantsSampled: {
    label: 'Plants Sampled',
    icon: IconHandGrab,
    examples: '"27", ">50", "70-90"',
    description: 'Number of plants that seed was harvested from.',
  },
  storageRelativeHumidityPercentage: {
    label: 'Relative Humidity',
    icon: IconDropletFilled,
    unit: '%',
    examples: '15%',
    description:
      'The relative humidity at which the accession was stored on the "Seed in Storage" date',
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
    description: 'The temperature at which the accession is stored on the "Seed in Storage" date',
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
  preStorageTreatment: {
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
    description: 'Description of the form of a plant.',
    trait: {
      name: 'Life form',
      type: 'categorical',
    },
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
  collectionFill: {
    label: 'Collection Fill / X-Ray',
    icon: IconScan,
    examples: '"xray - 10 filled", "46% determined via x-ray"',
    description:
      'Seeds or fruits that are filled, as determined by cut-test, x-ray or other assessments of seed fill or viability such as tetrazolium test.',
  },
  publicationDOI: {
    label: 'Publication DOI',
    icon: IconSchool,
    examples: 'https://doi.org/10.1071/BT22076',
    description:
      'The digital object identifier (DOI) of any published work related to the accession.',
  },
  dateInStorage: {
    label: 'Storage Date',
    icon: IconPackage,
    examples: '17/04/2022',
    description: 'The date the accession was placed in current or long term storage (DD/MM/YYYY)',
  },
  dateCollected: {
    label: 'Collection Date',
    icon: IconPackage,
    examples: '17/04/2022',
    description: 'Date the accession was harvested (DD/MM/YYYY)',
  },
};

const trialFields: SeedbankFieldMap = {
  accessionNumber: {
    label: 'Accession',
    icon: IconId,
    examples: '"CANB 770480", "20061691"',
    description: 'The unique identification number given to a accession of seed.',
  },
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
    icon: IconCircleDot,
    examples: '8',
    description:
      'The number of seeds that were full and appeared healthy during the post-germination cut test.',
  },
  numberEmpty: {
    label: 'Number Empty',
    icon: IconCircle,
    examples: '2',
    description: 'The number of seeds that were empty during the post-germination cut test.',
  },
  numberNotViable: {
    label: 'Number Not Viable',
    icon: IconCircleOff,
    examples: '10',
    description:
      'The number of seeds not viable (i.e. moudly, infested, etc) in a germination test.',
  },
  viabilityPercentage: {
    label: 'Viability',
    icon: IconChartPie,
    unit: '%',
    examples: '80%',
    description:
      'The proportion of viable seeds in a germination test, determined by the number of germinated seeds and those that appear viable from a post-germination cut test.',
  },
  adjustedGerminationPercentage: {
    label: 'Adj Germ',
    icon: IconFlower,
    unit: '%',
    examples: '100%',
    description:
      'The proportion of seeds germinated, expressed as a percentage of the total viable seeds tested.',
  },
  testDateStarted: {
    label: 'Date Tested',
    icon: IconCalendar,
    examples: '12/04/2023',
    description: 'The date that the germination test began (DD/MM/YYYY).',
  },
  testLengthInDays: {
    label: 'Test Length',
    icon: IconCalendarTime,
    examples: '42 days',
    description: 'The length of the germination test from start to final scoring date.',
  },
};

const treatmentFields: SeedbankFieldMap = {
  pretreatment: {
    label: 'Pre-Treatment',
    icon: IconTestPipe,
    examples: '"scarification", "stratification",  "Gibberellic Acid", "smoke water"',
    description:
      'Summary of any physical or chemical treatment(s) applied to a seed before it is tested. For more details about the treatment contact the responsible seedbank.',
  },
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

const customFields: SeedbankFieldMap = {
  taxon: {
    label: 'Taxon',
    icon: IconAbc,
    examples: '"Acacia dealbata"',
    description: 'The scientific name of the taxon associated with the record.',
  },
  datasetTitle: {
    label: 'Institution',
    icon: IconBuildingBank,
    examples: '"Greening Australia"',
    description: 'Name of the institution or seed bank where the record has been supplied from.',
  },
};

const allFields = {
  ...accessionFields,
  ...trialFields,
  ...treatmentFields,
  ...customFields,
};

export { accessionFields, trialFields, treatmentFields, allFields };
