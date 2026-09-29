import type { Image, SeedBankExtension } from './__generated__/types';

// Schema types are generated into ./__generated__ via `pnpm codegen`. Only add types here that
// aren't part of the GraphQL schema.
export type * from './__generated__/types';

type SeedBankAccession = Pick<
  SeedBankExtension,
  | 'id'
  | 'accessionNumber'
  | 'herbariumVoucher'
  | 'seedPerGram'
  | 'formInStorage'
  | 'quantityInGrams'
  | 'quantityCount'
  | 'collectionFill'
  | 'purityPercentage'
  | 'dateCollected'
  | 'dateInStorage'
  | 'storageTemperatureInCelsius'
  | 'storageRelativeHumidityPercentage'
  | 'publicationDOI'
  | 'preStorageTreatment'
  | 'primaryStorageSeedBank'
  | 'degreeOfEstablishment'
  | 'primaryCollector'
  | 'plantForm'
  | 'duplicatesReplicates'
  | 'collectionPermitNumber'
  | 'thousandSeedWeight'
  | 'numberPlantsSampled'
  | 'storageBehaviour'
  | 'esRatio'
  | 'dormancyClass'
>;

type SeedBankTrial = Pick<
  SeedBankExtension,
  | 'id'
  | 'accessionNumber'
  | 'herbariumVoucher'
  | 'testDateStarted'
  | 'testLengthInDays'
  | 'numberGerminated'
  | 'germinationRateInDays'
  | 'adjustedGerminationPercentage'
  | 'viabilityPercentage'
  | 'numberFull'
  | 'numberEmpty'
  | 'numberTested'
  | 'numberNotViable'
  | 'preTestProcessingNotes'
>;

type SeedBankTreatment = Pick<
  SeedBankExtension,
  | 'id'
  | 'pretreatment'
  | 'mediaSubstrate'
  | 'nightTemperatureInCelsius'
  | 'dayTemperatureInCelsius'
  | 'darkHours'
  | 'lightHours'
>;

// The values we put into the (untyped JSON) Predicate.value field
type PredicateValue = string | number | null | { gte?: number | ''; lte?: number | '' };

// An EML contact, from the (untyped JSON) Event.dataset field
interface Contact {
  individualName?: [
    {
      givenName?: [string];
      surName?: [string];
    },
  ];
  positionName?: [string];
  electronicMailAddress?: [string];
  organizationName?: [string];
  phone?: [string];
  address?: [
    {
      administrativeArea?: [string];
      city?: [string];
      country?: [string];
      deliveryPoint?: [string];
      postalCode?: [string];
    },
  ];
}

type MediaItem = Image;

type Variables = { [key: string]: unknown };

export type {
  Contact,
  MediaItem,
  PredicateValue,
  SeedBankAccession,
  SeedBankTreatment,
  SeedBankTrial,
  Variables,
};
