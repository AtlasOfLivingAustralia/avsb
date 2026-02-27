import type { Event } from '#/api';

export const mapEventTaxon = (event: Event) => {
  if ((event.measurementOrFacts || []).length > 0) {
    // Get the matched taxon name & ID from event emofs
    const taxonName = (event.measurementOrFacts || []).find(
      ({ measurementType }) => measurementType === 'Taxon Matched Name',
    )?.measurementValue;

    const suppliedName = (event.measurementOrFacts || []).find(
      ({ measurementType }) => measurementType === 'Taxon Supplied Name',
    )?.measurementValue;

    const taxonID = (event.measurementOrFacts || []).find(
      ({ measurementType }) => measurementType === 'Taxon Matched ID',
    )?.measurementValue;

    return {
      ...event,
      _taxon: { taxonID, taxonName, suppliedName },
    };
  } else {
    return event;
  }
};

export const mapEventTaxa = (events: Event[]) => events.map((event) => mapEventTaxon(event));
