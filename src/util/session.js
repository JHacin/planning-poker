import {
  ESTIMATE_NOT_GIVEN,
  ESTIMATE_IS_UNDOABLE,
  ESTIMATE_NEEDS_MORE_INFO,
  SESSION_COMPLETED_WITH_MISSING_ESTIMATES,
  SESSION_COMPLETED_WITH_UNDOABLE,
  SESSION_COMPLETED_NEED_MORE_INFO
} from "../constants";

const evaluateEstimates = (estimates, returnEstimateValue = false) => {
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

export default evaluateEstimates;
