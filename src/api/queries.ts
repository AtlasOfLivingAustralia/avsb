import { Predicate } from './graphql/types';

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
        year
        month
        day
        datasetTitle
        datasetKey
        locality
        distinctTaxa {
          scientificName
        }
        extensions {
          seedbank {
            accessionNumber
            seedPerGram
            formInStorage
            quantityInGrams
            quantityCount
            collectionFill
            purityPercentage
            dateCollected
            storageTemperatureInCelsius
            storageRelativeHumidityPercentage
            primaryStorageSeedBank
            primaryCollector
            duplicatesReplicates
            thousandSeedWeight
          }
        }
      }
    }
  }
}
`;

const QUERY_EVENT_ACCESSION_FULL = `
query list($predicate: Predicate, $trialPredicate: Predicate){
  accession: eventSearch(
    size: 1
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
            quantityInGrams
            quantityCount
            collectionFill
            purityPercentage
            dateCollected
            dateInStorage
            storageTemperatureInCelsius
            storageRelativeHumidityPercentage
            publicationDOI
            preStorageTreatment
            primaryStorageSeedBank
            degreeOfEstablishment
            primaryCollector
            plantForm
            duplicatesReplicates
            collectionPermitNumber
            thousandSeedWeight
            numberPlantsSampled
            storageBehaviour
            esRatio
            dormancyClass
          }
        }
      }
    }
  }
  trials: eventSearch(
    predicate: $trialPredicate
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
        distinctTaxa {
          scientificName
        }
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
        eventRemarks
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

const QUERY_EVENT_MAP = `
query map($predicate: Predicate){
  eventSearch(predicate: $predicate) {
    _meta
    _tileServerToken
    documents {
      total
    }
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
            quantityInGrams
            quantityCount
            collectionFill
            purityPercentage
            dateCollected
            dateInStorage
            storageTemperatureInCelsius
            storageRelativeHumidityPercentage
            publicationDOI
            preStorageTreatment
            primaryStorageSeedBank
            degreeOfEstablishment
            primaryCollector
            plantForm
            duplicatesReplicates
            collectionPermitNumber
            thousandSeedWeight
            numberPlantsSampled
            storageBehaviour
            esRatio
            dormancyClass
          }
        }
      }
    }
  }
}
`;

const QUERY_EVENT_MAP_POINT_KEY = `
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
        distinctTaxa {
          key
          scientificName
        }
        extensions {
          seedbank {
            accessionNumber
            seedPerGram
            formInStorage
            quantityInGrams
            quantityCount
            collectionFill
            purityPercentage
            dateCollected
            dateInStorage
            storageTemperatureInCelsius
            storageRelativeHumidityPercentage
            publicationDOI
            preStorageTreatment
            primaryStorageSeedBank
            degreeOfEstablishment
            primaryCollector
            plantForm
            duplicatesReplicates
            collectionPermitNumber
            thousandSeedWeight
            numberPlantsSampled
            storageBehaviour
            esRatio
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
      results {
        dataset
      }
    }
  }
}
`;

const QUERY_DATASET_SUGGEST = `
query keywordSearch($predicate: Predicate, $size: Int){
  eventSearch(predicate: $predicate) {
    facet {
      datasetKey(size: $size) {
        key
        count
        datasetTitle
      }
    }
  }
}
`;

const QUERY_SEEDBANK_SUMMARY = `
query list($datasetKey: JSON){
  accessions: eventSearch(predicate: {type: and, predicates: [{type: equals, key: "datasetKey", value: $datasetKey}, {type: equals, key: "eventType", value: "Accession"}]}) {
    documents(size: 1) {
      total
      results {
        datasetTitle
        datasetKey
        occurrenceCount
      }
    }
    cardinality {
      locationID
    }
    facet {
      measurementOrFactTypes {
        key
      }
    }
    occurrenceCount
  }
  trials: eventSearch(predicate: {type: and, predicates: [{type: equals, key: "datasetKey", value: $datasetKey}, {type: equals, key: "eventType", value: "Trial"}]}) {
    documents(size: 0) {
      total
    }
  }
}
`;

const QUERY_SEEDBANK_SUMMARY_TEMPLATE = `
{{datasetKey}}Accessions: eventSearch(predicate: {type: and, predicates: [{type: equals, key: "datasetKey", value: "{{datasetKey}}"}, {type: equals, key: "eventType", value: "Accession"}]}) {
  documents(size: 1) {
    total
    results {
      datasetTitle
      datasetKey
      occurrenceCount
    }
  }
}
{{datasetKey}}Trials: eventSearch(predicate: {type: and, predicates: [{type: equals, key: "datasetKey", value: "{{datasetKey}}"}, {type: equals, key: "eventType", value: "Trial"}]}) {
  documents(size: 0) {
    total
  }
}
`;

const QUERY_SEEDBANK_SUMMARY_FULL = `
query list($datasetKey: JSON){
  eventSearch(predicate: {type: equals, key: "datasetKey", value: $datasetKey}) {
    _tileServerToken
    documents(size: 1) {
      total
      results {
        datasetTitle
        datasetKey
        occurrenceCount
      }
    }
    stats {
      year {
        min
        max
      }
    }
    cardinality {
      locationID
    }
    facet {
      measurementOrFactTypes {
        key
      }
      samplingProtocol {
        key
      }    
      eventTypeHierarchy {
        key
      }
    }   
    occurrenceFacet {
      species(size: 10000) {
        key
        count
      }
      samplingProtocol {
        key
      }
    }
  }
  accessions: eventSearch(predicate: {type: and, predicates: [{type: equals, key: "datasetKey", value: $datasetKey}, {type: equals, key: "eventType", value: "Accession"}]}) {
    documents(size: 0) {
      total
    }
  }
  trials: eventSearch(predicate: {type: and, predicates: [{type: equals, key: "datasetKey", value: $datasetKey}, {type: equals, key: "eventType", value: "Trial"}]}) {
    documents(size: 0) {
      total
    }
  }
}
`;

const QUERY_TAXON_MEDIA = `
query image($key: String, $size: Int, $from: Int, $params: JSON) {
  taxonMedia(key: $key, size: $size, from: $from, params: $params) {
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

const DOWNLOAD_EVENT_ACCESSIONS = `
query list($predicate: Predicate){
  eventSearch(
    size: 10000
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
            quantityInGrams
            quantityCount
            collectionFill
            purityPercentage
            dateCollected
            dateInStorage
            storageTemperatureInCelsius
            storageRelativeHumidityPercentage
            publicationDOI
            preStorageTreatment
            primaryStorageSeedBank
            degreeOfEstablishment
            primaryCollector
            plantForm
            duplicatesReplicates
            collectionPermitNumber
            thousandSeedWeight
            numberPlantsSampled
            storageBehaviour
            esRatio
            dormancyClass
          }
        }
      }
    }
  }
}
`;

const DOWNLOAD_EVENT_TRIALS = `
query list($predicate: Predicate){
  eventSearch(
    size: 10000
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

const DATA_RESOURCES = import.meta.env.VITE_APP_DATA_RESOURCES
  ? import.meta.env.VITE_APP_DATA_RESOURCES.split(',')
  : [];

const PRED_DATA_RESOURCE: Predicate = {
  type: 'in',
  key: 'datasetKey',
  values: DATA_RESOURCES,
};

export default {
  QUERY_EVENT_ACCESSIONS,
  QUERY_EVENT_ACCESSION_FULL,
  QUERY_EVENT_TRIALS,
  QUERY_EVENT_TREATMENTS,
  QUERY_EVENT_MAP,
  QUERY_EVENT_MAP_POINT,
  QUERY_EVENT_MAP_POINT_KEY,
  QUERY_TAXON_MEDIA,
  QUERY_DATASET,
  QUERY_DATASET_SUGGEST,
  DOWNLOAD_EVENT_ACCESSIONS,
  DOWNLOAD_EVENT_TRIALS,
  QUERY_SEEDBANK_SUMMARY,
  QUERY_SEEDBANK_SUMMARY_FULL,
  QUERY_SEEDBANK_SUMMARY_TEMPLATE,
  PRED_DATA_RESOURCE,
  DATA_RESOURCES,
};
