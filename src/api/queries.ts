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

const QUERY_DATASET = `
query dataset($key: JSON!){
  eventSearch: eventSearch(predicate: {type: equals, key: "datasetKey", value: $key}) {
    documents(size: 1) {
      total
      results {
        dataset
      }
    }
  }
}
`;

const PRED_DATA_RESOURCE = {
  type: 'in',
  key: 'datasetKey',
  values: import.meta.env.VITE_APP_DATA_RESOURCES
    ? import.meta.env.VITE_APP_DATA_RESOURCES.split(',')
    : [],
};

export default { QUERY_EVENT, QUERY_EVENT_TRIALS, QUERY_DATASET, PRED_DATA_RESOURCE };
