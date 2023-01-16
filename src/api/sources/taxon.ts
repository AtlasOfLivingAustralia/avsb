interface SuggestedTaxon {
  scientificName: string;
  key: string;
}

async function suggest(query: string): Promise<SuggestedTaxon[]> {
  return (await fetch(`${import.meta.env.VITE_API_ES}/event/suggest/taxonKey?q=${query}`)).json();
}

export default () => ({
  suggest,
});
