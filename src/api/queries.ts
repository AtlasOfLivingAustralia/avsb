export const QUERY_EVENT_TRIALS = `
query list($predicate: Predicate, $limit: Int){
  eventSearch(
    size: $limit
    predicate: $predicate
    ) {
    documents {
      results {
        eventID
        parentEventID
        locality
        year
        month
        day
        datasetTitle
        country
        stateProvince
        measurementOrFacts {
          measurementID
          measurementType
          measurementUnit
          measurementValue
          measurementMethod
          measurementRemarks
          measurementAccuracy
        }
      }
    }
  }
}
`;

export const QUERY_EVENT = '';
