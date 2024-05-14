import keyMirror from 'fbjs/lib/keyMirror';
import { toVariableCase } from '../utils';

const INITIAL_STATE = { isFetching: false, error: null, data: null };

export default class ReduxHandler {
  constructor(config) {
    var keys = [];
    var urls = {};
    var apis = {};
    var controllers = {};
    var actions = {};
    for (var item of config) {
      keys.push(item.key);
      urls[item.key] = item.url;
      apis[item.key] = item.api;
      actions[item.key] = item.actions;
      controllers[item.key] = item.controller || item.key;
    }
    this.urls = urls;
    this.apis = apis;
    this.keys = keys;
    this.actions = actions;
    this.controllers = controllers;
    this.keyMapper = ['RESET', 'REQUEST', 'SUCCESS', 'FAILURE', 'SET'];
  }

  getActionTypes() {
    var genericActions = {
      HANDLE_ERRORS_REQUEST: 'HANDLE_ERRORS_REQUEST',
    };
    var requestActions = {};
    var resetActions = {};
    var successActions = {};
    var failureActions = {};
    var setActions = {};

    for (var key in this.apis) {
      if (this.apis[key]) {
        requestActions[key.toUpperCase() + '_' + 'REQUEST'] = undefined;
        resetActions[key.toUpperCase() + '_' + 'RESET'] = undefined;
        successActions[key.toUpperCase() + '_' + 'SUCCESS'] = undefined;
        failureActions[key.toUpperCase() + '_' + 'FAILURE'] = undefined;
        setActions[key.toUpperCase() + '_' + 'SET'] = undefined;
      }
    }
    for (var key in this.actions) {
      var actions = this.actions[key];
      if (actions) {
        for (var action of actions) {
          var actionName = action.toUpperCase() + '_' + key.toUpperCase();
          requestActions[actionName + '_' + 'REQUEST'] = undefined;
          resetActions[actionName + '_' + 'RESET'] = undefined;
          successActions[actionName + '_' + 'SUCCESS'] = undefined;
          failureActions[actionName + '_' + 'FAILURE'] = undefined;
          setActions[actionName + '_' + 'SET'] = undefined;
        }
      }
    }
    return {
      requestActions: keyMirror(requestActions),
      resetActions: keyMirror(resetActions),
      successActions: keyMirror(successActions),
      failureActions: keyMirror(failureActions),
      setActions: keyMirror(setActions),
      ...genericActions,
    };
  }

  constructReducer(actionName) {
    const resetType = `${actionName.toUpperCase()}_RESET`;
    const requestType = `${actionName.toUpperCase()}_REQUEST`;
    const successType = `${actionName.toUpperCase()}_SUCCESS`;
    const failedType = `${actionName.toUpperCase()}_FAILURE`;
    const setType = `${actionName.toUpperCase()}_SET`;
    return function(state = { ...INITIAL_STATE }, action) {
      switch (action.type) {
        case resetType:
          return { ...state, ...INITIAL_STATE };
        case requestType:
          return { ...state, ...INITIAL_STATE, isFetching: true };
        case successType:
          return { ...state, ...INITIAL_STATE, data: { ...action.payload } };
        case failedType:
          return { ...state, ...INITIAL_STATE, error: action.error.response.data.Message };
        case setType:
          return { ...state, ...INITIAL_STATE, data: { ...(state.data || {}), ...action.payload } };
        default:
          return state;
      }
    };
  }

  getReducers() {
    var reducers = {};
    for (var key in this.apis) {
      var api = this.apis[key];
      if (api) {
        var reducerKey = toVariableCase(key);
        reducers[reducerKey] = this.constructReducer(reducerKey);
      }
    }

    for (var key in this.actions) {
      var actionsList = this.actions[key];
      if (actionsList) {
        for (var action of actionsList) {
          var reducerKey = toVariableCase(action) + '_' + key;
          reducers[reducerKey] = this.constructReducer(reducerKey);
        }
      }
    }
    return reducers;
  }

  getActions() {
    var ActionTypes = this.getActionTypes();

    var actions = {};

    for (let key in this.apis) {
      var api = this.apis[key];
      if (api) {
        let requestKey = key.charAt(0).toLowerCase() + key.slice(1);
        let resetKey = 'reset' + key.charAt(0).toUpperCase() + key.slice(1);
        let setKey = 'set' + key.charAt(0).toUpperCase() + key.slice(1);

        let keyUpper = key.toUpperCase();
        
        actions[requestKey] = payload => {
          return {
            type: ActionTypes.requestActions[keyUpper + '_REQUEST'],
            payload: payload,
            api: this.apis[key],
            successType: ActionTypes.successActions[keyUpper + '_SUCCESS'],
            failureType: ActionTypes.failureActions[keyUpper + '_FAILURE'],
            setType: ActionTypes.setActions[keyUpper + '_SET'],
          };
        };

        actions[resetKey] = payload => {
          return {
            type: ActionTypes.resetActions[keyUpper + '_RESET'],
            payload: payload,
          };
        };

        actions[setKey] = payload => {
          return {
            type: ActionTypes.setActions[keyUpper + '_SET'],
            payload: payload,
          };
        };
      }
    }
    for (let key in this.actions) {
      var actionsList = this.actions[key];
      if (actionsList) {
        for (let action of actionsList) {
          let requestKey = action.charAt(0).toLowerCase() + action.slice(1) + key;
          let resetKey = 'reset' + action.charAt(0).toUpperCase() + action.slice(1) + key;
          let setKey = 'set' + action.charAt(0).toUpperCase() + action.slice(1) + key;

          let keyUpper = key.toUpperCase();
          let actionUpper = action.toUpperCase();
          let actionKeyMapper = actionUpper + '_' + keyUpper;
          let url = this.urls[key];
          let controller = this.controllers[key];

          actions[requestKey] = payload => {
            payload = payload || {
              action: action,
            };
            var returnObject = {
              type: ActionTypes.requestActions[actionKeyMapper + '_REQUEST'],
              payload: payload,
              url: url,
              controller: controller,
              successType: ActionTypes.successActions[actionKeyMapper + '_SUCCESS'],
              failureType: ActionTypes.failureActions[actionKeyMapper + '_FAILURE'],
              setType: ActionTypes.setActions[actionKeyMapper + '_SET'],
            };
            return returnObject;
          };

          actions[resetKey] = payload => {
            return {
              type: ActionTypes.resetActions[actionKeyMapper + '_RESET'],
              payload: payload,
            };
          };

          actions[setKey] = payload => {
            return {
              type: ActionTypes.setActions[actionKeyMapper + '_SET'],
              payload: payload,
            };
          };
        }
      }
    }
    return actions;
  }
}
