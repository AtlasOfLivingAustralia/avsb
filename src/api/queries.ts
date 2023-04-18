const QUERY_EVENT = '';

const QUERY_EVENT_ACCESSIONS = `
query list($predicate: Predicate, $size: Int, $from: Int){
  eventSearch(
    size: $size
    from: $from
    predicate: $predicate
    ) {
    documents {
      size
      from
      total
      results {
        eventID
        parentEventID
        locality
        year
        month
        day
        datasetTitle
        datasetKey
        country
        decimalLatitude
        decimalLongitude
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
            seedPerGram
            formInStorage
            sampleWeightInGrams
            sampleSize
            collectionFillRate
            purityDebrisPercentage
            purityPercentage
            dateCollected
            dateInStorage
            storageTemperatureInCelsius
            relativeHumidityPercentage
            publicationDOI
            preStorageTreatmentNotesHistory
            primaryStorageSeedBank
            degreeOfEstablishment
            primaryCollector
            plantForm
            duplicatesReplicates
            collectionPermitNumber
            thousandSeedWeight
            numberPlantsSampled
            storageBehaviour
            embryoType
            dormancyClass
          }
        }
      }
    }
  }
}
`;

const QUERY_EVENT_TRIALS = `
query list($predicate: Predicate, $size: Int, $from: Int){
  eventSearch(
    size: $size
    from: $from
    predicate: $predicate
    ) {
    documents {
      size
      from
      total
      results {
        eventID
        parentEventID
        locality
        year
        month
        day
        datasetTitle
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
            adjustedGerminationPercentage
            viabilityPercentage
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
        year
        month
        day
        datasetTitle
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
            id
            pretreatment
            mediaSubstrate
            nightTemperatureInCelsius
            dayTemperatureInCelsius
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
        extensions {
          seedbank {
            accessionNumber
            seedPerGram
            formInStorage
            sampleWeightInGrams
            sampleSize
            collectionFillRate
            purityDebrisPercentage
            purityPercentage
            dateCollected
            dateInStorage
            storageTemperatureInCelsius
            relativeHumidityPercentage
            publicationDOI
            preStorageTreatmentNotesHistory
            primaryStorageSeedBank
            degreeOfEstablishment
            primaryCollector
            plantForm
            duplicatesReplicates
            collectionPermitNumber
            thousandSeedWeight
            numberPlantsSampled
            storageBehaviour
            embryoType
            dormancyClass
          }
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
  QUERY_EVENT_ACCESSIONS,
  QUERY_EVENT_TRIALS,
  QUERY_EVENT_TREATMENTS,
  QUERY_EVENT_MAP,
  QUERY_EVENT_MAP_WITH_DATA,
  QUERY_EVENT_MAP_POINT,
  QUERY_TAXON_MEDIA,
  QUERY_DATASET,
  PRED_DATA_RESOURCE,
};
