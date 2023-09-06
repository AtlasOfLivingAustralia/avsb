interface NumericTrait {
  title: string;
  description: string;
  furtherDescription: string;
  link: string;
}

interface CategoricalTrait {
  title: string;
  description: string;
  furtherDescription: string;
  link: string;
}

interface AusTraitsSummary {
  numeric_traits: NumericTrait[];
  categorical_traits: CategoricalTrait[];
}

interface AusTraitsCount {
  summary: number;
  AusTraits: number;
  taxon: string;
  explanation: string;
}

async function summary(search: string, guid: string): Promise<AusTraitsSummary> {
  return (
    await fetch(
      `${import.meta.env.VITE_API_BIE}/externalSite/ausTraitsSummary?s=${search}&guid=${guid}`,
    )
  ).json();
}

async function count(search: string, guid: string): Promise<AusTraitsCount[]> {
  return (
    await fetch(
      `${import.meta.env.VITE_API_BIE}/externalSite/ausTraitsCount?s=${search}&guid=${guid}`,
    )
  ).json();
}

export default {
  summary,
  count,
};

export type { NumericTrait, CategoricalTrait, AusTraitsSummary, AusTraitsCount };
