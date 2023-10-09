import { DownloadField } from '#/components/Downloads';

const downloadFields: DownloadField[] = [
  { label: 'Event ID', key: 'eventID' },
  { label: 'Accession Number', key: 'extensions.seedbank.accessionNumber' },
  { label: 'Scientific Name', key: 'distinctTaxa[0].scientificName' },
  { label: 'Dataset Title', key: 'datasetTitle' },
  { label: 'Locality', key: 'locality' },
  { label: 'Decimal Latitude', key: 'decimalLatitude' },
  { label: 'Decimal Longitude', key: 'decimalLongitude' },
  { label: 'Seed/gm', key: 'extensions.seedbank.seedPerGram' },
  { label: 'Quantity (count)', key: 'extensions.seedbank.quantityCount' },
  { label: 'Quantity (g)', key: 'extensions.seedbank.quantityInGrams' },
  { label: 'Thousand Seed Weight', key: 'extensions.seedbank.thousandSeedWeight' },
  {
    label: 'Storage Relative Humidity',
    key: 'extensions.seedbank.storageRelativeHumidityPercentage',
  },
  { label: 'Purity', key: 'extensions.seedbank.purityPercentage' },
  {
    label: 'Storage Temperature',
    key: 'extensions.seedbank.storageTemperatureInCelsius',
  },
  {
    label: 'Collection Date',
    key: 'extensions.seedbank.dateCollected',
    formatter: (field: number) => (field ? new Date(field).toLocaleDateString() : ''),
  },
  {
    label: 'Storage Date',
    key: 'extensions.seedbank.dateInStorage',
    formatter: (field: number) => (field ? new Date(field).toLocaleDateString() : ''),
  },
  { label: 'Storage Seed Bank', key: 'extensions.seedbank.primaryStorageSeedBank' },
  { label: 'Collector', key: 'extensions.seedbank.primaryCollector' },
  {
    label: 'Pre-Storage Treatment/History',
    key: 'extensions.seedbank.preStorageTreatment',
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
    key: 'extensions.seedbank.collectionFill',
  },
  { label: 'Publication DOI', key: 'extensions.seedbank.publicationDOI' },
];
export default downloadFields;
