import {
  IconBrightness,
  IconBrightness2,
  IconFlask,
  IconMoon,
  IconSun,
  TablerIcon,
} from '@tabler/icons';
import { SeedBankTreatment } from '#/api/graphql/types';

interface TreatmentDetail {
  key: keyof SeedBankTreatment;
  name: string;
  unit?: string;
  icon: TablerIcon;
}

const fields: TreatmentDetail[] = [
  {
    key: 'mediaSubstrate',
    name: 'Media / Substrate',
    icon: IconFlask,
  },
  {
    key: 'lightHours',
    name: 'Light Hours',
    icon: IconBrightness2,
    unit: ' hours',
  },
  {
    key: 'darkHours',
    name: 'Dark Hours',
    icon: IconBrightness,
    unit: ' hours',
  },
  {
    key: 'dayTemp',
    name: 'Day Temp',
    icon: IconSun,
    unit: '° C',
  },
  {
    key: 'nightTemp',
    name: 'Night Temp',
    icon: IconMoon,
    unit: '° C',
  },
];

export default fields;
