import { takeLatest, all } from "redux-saga/effects";
import { genericFunction, handleError } from "./core";
import { ActionTypes } from "../constants";


export default function* root() {
  var APIs = [takeLatest(ActionTypes.HANDLE_ERRORS_REQUEST, handleError)];
  var actionsTypes = ActionTypes;
  console.debug(actionsTypes);
  for (var key in actionsTypes.requestActions) {
    APIs.push(takeLatest(key, genericFunction));
  }
  yield all([...APIs]);
}