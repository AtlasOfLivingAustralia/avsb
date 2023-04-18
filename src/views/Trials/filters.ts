import {
  IconCalendar,
  IconCircle,
  IconCircleDashed,
  IconCircleDotted,
  IconClock,
  IconId,
  IconPercentage,
  IconReceiptTax,
  IconRotateClockwise2,
  IconSeeding,
} from '@tabler/icons';

import { Filter } from '#/components';

const filters: Filter[] = [
  {
    key: 'seedbank_accessionNumber',
    label: 'Accession Number',
    type: 'text',
    placeholder: 'ABC 123456.78',
    icon: IconId,
    group: 'Test',
  },
  {
    key: 'seedbank_testDateStarted',
    label: 'Test Date Started',
    type: 'date',
    placeholder: '5 Apr 2001',
    icon: IconCalendar,
    group: 'Test',
  },
  {
    key: 'seedbank_testLengthInDays',
    label: 'Test Length (days)',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconClock,
    group: 'Test',
  },
  {
    key: 'seedbank_germinationRateInDays',
    label: 'Germination Rate (days)',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconRotateClockwise2,
    group: 'Germination',
  },
  {
    key: 'seedbank_adjustedGerminationPercentage',
    label: 'Adjusted Germination %',
    type: 'percent',
    placeholder: '10',
    icon: IconReceiptTax,
    group: 'Germination',
  },
  {
    key: 'seedbank_viabilityPercentage',
    label: 'Viability %',
    type: 'percent',
    placeholder: '10',
    icon: IconPercentage,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberGerminated',
    label: 'Number Germinated',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconSeeding,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberFull',
    label: 'Number Full',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconCircle,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberEmpty',
    label: 'Number Empty',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconCircleDashed,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberTested',
    label: 'Number Tested',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconCircleDotted,
    group: 'Germination',
  },
];

export default filters;
