import type { Event, Maybe } from '#/api/graphql/types';
import getIsDefined from './getIsDefined';

function mapTrialTreatments(trials: Maybe<Event>[], treatments: Maybe<Event>[]): Event[] {
  const treatmentEvents = treatments.filter(getIsDefined);

  return trials.filter(getIsDefined).map((trial) => ({
    ...trial,
    treatments: treatmentEvents.filter(({ parentEventID }) => parentEventID === trial.eventID),
  }));
}

export default mapTrialTreatments;
