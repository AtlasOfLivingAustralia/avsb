// Helper function to get the initials of an organisation string
function getOrgInitials(org: string, cap?: number) {
  return org
    .split(' ')
    .map((part) => part.charAt(0))
    .filter((part) => part === part.toUpperCase())
    .slice(0, cap)
    .join('');
}

export default getOrgInitials;
