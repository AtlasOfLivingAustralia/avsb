import { DownloadField } from '#/components/Downloads';

const downloadFields: DownloadField[] = [
  { label: 'Event ID', key: 'eventID' },
  { label: 'Accession Number', key: 'extensions.seedbank.accessionNumber' },
  { label: 'Institution', key: 'datasetTitle' },
  { label: 'Collect Locality', key: 'locality' },
  { label: 'Collect Lat', key: 'decimalLatitude' },
  { label: 'Collect Lng', key: 'decimalLongitude' },
  { label: 'Seed/gm', key: 'extensions.seedbank.seedPerGram' },
  { label: 'Collection Size', key: 'extensions.seedbank.sampleSize' },
  { label: 'Sample Weight', key: 'extensions.seedbank.sampleWeightInGrams' },
  { label: 'Thousand Seed Weight', key: 'extensions.seedbank.thousandSeedWeight' },
  {
    label: 'Relative Humidity',
    key: 'extensions.seedbank.relativeHumidityPercentage',
  },
  { label: 'Purity', key: 'extensions.seedbank.purityPercentage' },
  { label: 'Purity / Debris', key: 'extensions.seedbank.purityDebrisPercentage' },
  {
    label: 'Storage Temperature',
    key: 'extensions.seedbank.storageTemperatureInCelsius',
  },
  {
    label: 'Collection Date',
    key: 'extensions.seedbank.dateCollected',
    formatter: (field: number) => new Date(field).toLocaleDateString(),
  },
  {
    label: 'Storage Date',
    key: 'extensions.seedbank.dateInStorage',
    formatter: (field: number) => new Date(field).toLocaleDateString(),
  },
  { label: 'Storage Seed Bank', key: 'extensions.seedbank.primaryStorageSeedBank' },
  { label: 'Collector', key: 'extensions.seedbank.primaryCollector' },
  {
    label: 'Pre-Storage Treatment/History',
    key: 'extensions.seedbank.preStorageTreatmentNotesHistory',
  },
  { label: 'Plant Form', key: 'extensions.seedbank.plantForm' },
  { label: 'Form in Storage', key: 'extensions.seedbank.formInStorage' },
  { label: 'Cultivated', key: 'extensions.seedbank.degreeOfEstablishment' },
  {
    label: 'Duplicates / Replicates',
    key: 'extensions.seedbank.duplicatesReplicates',
  },
  { label: 'Permit Number', key: 'extensions.seedbank.collectionPermitNumber' },
  {
    label: 'Collection Fill Rate / X-Ray',
    key: 'extensions.seedbank.collectionFillRate',
  },
  { label: 'Publication DOI', key: 'extensions.seedbank.publicationDOI' },
];
export default downloadFields;
