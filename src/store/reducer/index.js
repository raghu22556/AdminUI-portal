import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Reducers } from '../../core/redux-helper';
import Combo from './combo';

const rootReducer = asyncReducers => {
  return combineReducers({
    form: formReducer,
    combos: Combo,
    ...Reducers,
    ...asyncReducers,
  });
};

export default rootReducer;
