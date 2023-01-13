import { IdTokenClaims } from 'oidc-client-ts';

function getNameInitials(profile?: IdTokenClaims): string | undefined {
  // If a first & last name are provided
  if (profile?.given_name && profile?.family_name) {
    return profile.given_name.charAt(0).toUpperCase() + profile.family_name.charAt(0).toUpperCase();
  }

  return undefined;
}

export default getNameInitials;
