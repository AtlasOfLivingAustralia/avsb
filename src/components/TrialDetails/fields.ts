import {
  IconCircle,
  IconCircleDashed,
  IconCircleDotted,
  IconPercentage,
  TablerIcon,
} from '@tabler/icons';
import { SeedBankTrial } from '#/api/graphql/types';

interface TrialDetail {
  key: keyof SeedBankTrial;
  name: string;
  unit?: string;
  icon: TablerIcon;
}

const fields: TrialDetail[] = [
  {
    key: 'viabilityPercentage',
    name: 'Viability',
    icon: IconPercentage,
    unit: '%',
  },
  {
    key: 'numberFull',
    name: 'Number Full',
    icon: IconCircle,
  },
  {
    key: 'numberEmpty',
    name: 'Number Empty',
    icon: IconCircleDashed,
  },
  {
    key: 'numberTested',
    name: 'Number Tested',
    icon: IconCircleDotted,
  },
];

export default fields;
