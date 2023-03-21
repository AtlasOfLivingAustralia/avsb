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
        extensions {
          seedbank {
            accessionNumber
            testDateStarted
            testLengthInDays
            numberGerminated
            adjustedGerminationPercent
            viabilityPercent
            numberFull
            numberEmpty
            numberTested
            preTestProcessingNotes
          }
        }
      }
    }
  }
}
`;

const QUERY_EVENT_TREATMENTS = `
query list($predicate: Predicate){
  eventSearch(
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
        extensions {
          seedbank {
            pretreatment
            mediaSubstrate
            nightTempInCelcius
            dayTempInCelcius
            darkHours
            lightHours
          }
        }
      }
    }
  }
}
`;

const QUERY_EVENT_MAP_WITH_DATA = `
query map($predicate: Predicate, $size: Int){
  eventSearch(predicate: $predicate, size: $size) {
    _meta
    documents {
      total
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
      }
    }
    _tileServerToken    
  }
}
`;

const QUERY_EVENT_MAP = `
query map($predicate: Predicate){
  eventSearch(predicate: $predicate) {
    _meta
    documents {
      total
    }
    _tileServerToken    
  }
}
`;

const QUERY_EVENT_MAP_POINT = `
query point($predicate: Predicate){
  eventSearch(predicate: $predicate) {
    documents {
      total
      results {
        datasetTitle
        datasetKey
        eventID
        eventType {
          concept
        }
        measurementOrFactTypes
        year
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

const QUERY_TAXON_MEDIA = `
query image($key: String, $size: Int, $from: Int) {
  taxonMedia(key: $key, size: $size, from: $from) {
    identifier
    type
    subtypeLiteral
    title
    rights
    owner
    webStatement
    credit
    creator
    providerLiteral
    description
    tag
    createDate
    accessURI
    accessOriginalURI
    format
    pixelXDimension
    pixelYDimension
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

export default {
  QUERY_EVENT,
  QUERY_EVENT_TRIALS,
  QUERY_EVENT_TREATMENTS,
  QUERY_EVENT_MAP,
  QUERY_EVENT_MAP_WITH_DATA,
  QUERY_EVENT_MAP_POINT,
  QUERY_TAXON_MEDIA,
  QUERY_DATASET,
  PRED_DATA_RESOURCE,
};
