const STATES: { [key: string]: string } = {
  'Australian Capital Territory': 'ACT',
  'South Australia': 'SA',
  Queensland: 'QLD',
  Victoria: 'VIC',
  'Western Australia': 'WA',
  'Northern Territory': 'NT',
  'New South Wales': 'NSW',
  'New Zealand': 'NZ',
  Tasmania: 'TAS',
};

export const getStateInitials = (state: string): string => {
  return STATES[state] || STATES[state.split(':').map((part) => part.trim())[0]] || state;
};
