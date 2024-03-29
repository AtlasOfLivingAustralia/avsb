function getErrorMessage(error: Error): string {
  if (error.message === 'Failed to fetch')
    return `We can't access the AVSB servers right now, please try again later.`;

  return 'An unknown error has occurred.';
}

export default getErrorMessage;
