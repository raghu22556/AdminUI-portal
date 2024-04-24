import { ActionTypes } from '../constants';

var staticCombos = {};

export default function(state = {}, action) {
  const actionTypes = ActionTypes;
  switch (action.type) {
    case actionTypes.successActions.LIST_COMBOS_REQUEST:
      return { ...state };
    case actionTypes.successActions.LIST_COMBOS_SUCCESS:
      var result = { ...state, ...action.payload, ...staticCombos };
      return result;
    default:
      return state;
  }
}
