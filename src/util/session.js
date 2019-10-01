import {
  ESTIMATE_NOT_GIVEN,
  ESTIMATE_IS_UNDOABLE,
  ESTIMATE_NEEDS_MORE_INFO,
  SESSION_COMPLETED_WITH_MISSING_ESTIMATES,
  SESSION_COMPLETED_WITH_UNDOABLE,
  SESSION_COMPLETED_NEED_MORE_INFO,
  SESSION_INITIALIZING,
  SESSION_WAITING_FOR_PARTICIPANTS,
  SESSION_PENDING_LAUNCH,
  SESSION_IN_PROGRESS,
  SESSION_FORCE_FINISHED,
  SESSION_ABORTED,
  SESSION_COMPLETED,
  SESSION_RUN_AGAIN,
  SESSION_RUN_AGAIN_FRESH
} from "../constants";

export const evaluateEstimates = (estimates, returnEstimateValue = false) => {
  if (estimates.includes(ESTIMATE_NOT_GIVEN)) {
    return returnEstimateValue ? ESTIMATE_NOT_GIVEN : SESSION_COMPLETED_WITH_MISSING_ESTIMATES;
  }

  if (estimates.includes(ESTIMATE_IS_UNDOABLE)) {
    return returnEstimateValue ? ESTIMATE_IS_UNDOABLE : SESSION_COMPLETED_WITH_UNDOABLE;
  }

  if (estimates.includes(ESTIMATE_NEEDS_MORE_INFO)) {
    return returnEstimateValue ? ESTIMATE_NEEDS_MORE_INFO : SESSION_COMPLETED_NEED_MORE_INFO;
  }

  return false;
};

export const getStatusLabel = status => {
  switch (status) {
    case SESSION_INITIALIZING:
      return "Initializing";
    case SESSION_WAITING_FOR_PARTICIPANTS:
    case SESSION_FORCE_FINISHED:
    case SESSION_ABORTED:
    case SESSION_RUN_AGAIN:
    case SESSION_RUN_AGAIN_FRESH:
      return "Waiting for participants";
    case SESSION_PENDING_LAUNCH:
      return "Draft";
    case SESSION_IN_PROGRESS:
      return "In progress";
    case SESSION_COMPLETED:
    case SESSION_COMPLETED_WITH_UNDOABLE:
    case SESSION_COMPLETED_NEED_MORE_INFO:
    case SESSION_COMPLETED_WITH_MISSING_ESTIMATES:
      return "Finished";
    default:
      return "<Could not retrieve status>";
  }
};
