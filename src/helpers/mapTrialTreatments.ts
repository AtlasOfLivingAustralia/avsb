import { Event } from '#/api/graphql/types';

function mapTrialTreatments(trials: Event[], treatments: Event[]): Event[] {
  return trials.map((trial: Event) => ({
    ...trial,
    treatments: treatments.filter(({ parentEventID }) => parentEventID === trial.eventID),
  }));
}

export default mapTrialTreatments;
