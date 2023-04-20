import {
  IconCircle,
  IconCircleDashed,
  IconCircleDotted,
  IconSeeding,
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
    key: 'numberGerminated',
    name: 'Number Germinated',
    icon: IconSeeding,
  },
  {
    key: 'numberTested',
    name: 'Number Tested',
    icon: IconCircleDotted,
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
];

export default fields;
