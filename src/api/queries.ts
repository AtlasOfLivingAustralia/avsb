const QUERY_EVENT = '';
const QUERY_EVENT_TRIALS = `
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
          measurementDeterminedDate
        }
      }
    }
  }
}
`;

const DATA_RESOURCES = import.meta.env.VITE_APP_DATA_RESOURCES;
const PRED_DATA_RESOURCE = {
  type: 'in',
  key: 'datasetKey',
  values: DATA_RESOURCES ? DATA_RESOURCES.split(',') : [],
};

export default { QUERY_EVENT, QUERY_EVENT_TRIALS, PRED_DATA_RESOURCE };
