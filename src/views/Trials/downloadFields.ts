import { DownloadField } from '#/components/Downloads';

const downloadFields: DownloadField[] = [
  { label: 'Event ID', key: 'eventID' },
  { label: 'Accession Number', key: 'extensions.seedbank.accessionNumber' },
  { label: 'Institution', key: 'datasetTitle' },
  {
    label: 'Date Tested',
    key: 'extensions.seedbank.testDateStarted',
    formatter: (field: number) => new Date(field).toLocaleDateString(),
  },
  {
    label: 'Test Length',
    key: 'extensions.seedbank.testLengthInDays',
    formatter: (field) => (field ? `${field} days` : ''),
  },
  { label: 'Number Germinated', key: 'extensions.seedbank.numberGerminated' },
  { label: 'Number Full', key: 'extensions.seedbank.numberFull' },
  { label: 'Number Empty', key: 'extensions.seedbank.numberEmpty' },
  { label: 'Number Not Viable', key: 'extensions.seedbank.numberNotViable' },
  { label: 'Number Tested', key: 'extensions.seedbank.numberTested' },
  { label: 'Germination Rate', key: 'extensions.seedbank.germinationRateInDays' },
  { label: 'Adjusted Germination', key: 'extensions.seedbank.adjustedGerminationPercentage' },
  { label: 'Viability', key: 'extensions.seedbank.viabilityPercentage' },
  { label: 'Pre-test Processing Notes', key: 'extensions.seedbank.preTestProcessingNotes' },
  { label: 'Treatment Media/Substrate', key: 'treatments[0].extensions.seedbank.mediaSubstrate' },
  { label: 'Treatment Day Temp', key: 'treatments[0].extensions.seedbank.dayTemperatureInCelsius' },
  {
    label: 'Treatment Night Temp',
    key: 'treatments[0].extensions.seedbank.nightTemperatureInCelsius',
  },
  { label: 'Treatment Light Hours', key: 'treatments[0].extensions.seedbank.lightHours' },
  { label: 'Treatment Dark Hours', key: 'treatments[0].extensions.seedbank.darkHours' },
  { label: 'Treatment Pretreatment', key: 'treatments[0].extensions.seedbank.pretreatment' },
];
export default downloadFields;
