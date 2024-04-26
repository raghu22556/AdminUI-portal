import ReduxHandler from '../../core/handler';
import { CONFIG } from '../../store/config';
import store from '../../store';
import { sagaGenerator } from '../../store/sagas/core';

var handler = new ReduxHandler(CONFIG);

var Actions = handler.getActions();

var ActionTypes = handler.getActionTypes();

var Reducers = handler.getReducers();

console.debug(Actions);
console.debug(ActionTypes);
console.debug(Reducers);

const injectTOStore = newConfig => {
  let newHandler = new ReduxHandler(newConfig);

  let newActions = newHandler.getActions();
  Actions = { ...Actions, ...newActions };

  let newActionTypes = newHandler.getActionTypes();
  ActionTypes = {
    ...ActionTypes,
    ...newActionTypes,
    failureActions: { ...ActionTypes.failureActions, ...newActionTypes.failureActions },
    requestActions: { ...ActionTypes.requestActions, ...newActionTypes.requestActions },
    resetActions: { ...ActionTypes.resetActions, ...newActionTypes.resetActions },
    setActions: { ...ActionTypes.setActions, ...newActionTypes.setActions },
    successActions: { ...ActionTypes.successActions, ...newActionTypes.successActions },
  };

  let newReducers = newHandler.getReducers();
  Reducers = { ...Reducers, ...newReducers };

  Object.keys(newReducers).map(key => {
    store.injectReducer(key, newReducers[key]);
  });

  Object.values(newActionTypes.requestActions).map(key => {
    store.injectSaga(key, sagaGenerator(key));
  });

  console.debug(Actions);
  console.debug(ActionTypes);
  console.debug(Reducers);
};

export { Actions, ActionTypes, Reducers, injectTOStore };
