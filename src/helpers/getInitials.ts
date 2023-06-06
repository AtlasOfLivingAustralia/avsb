// Helper function to get the initials of an organisation string
function getInitials(org: string, maxInitials?: number) {
  return org
    .split(' ')
    .map((part) => part.charAt(0))
    .filter((part) => part === part.toUpperCase())
    .slice(0, maxInitials)
    .join('');
}

export default getInitials;
