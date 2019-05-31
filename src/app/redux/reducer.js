import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

const initMapState = {
  map:null,
  view:null
};

const initGeneralState = {
  placeholder:"placeholder"

};

function general(state = initGeneralState, action) {
  if (typeof state === 'undefined') {
    return initGeneralState;
  }
  return state
}

function map(state = initMapState, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  console.log(action.type)
  switch (action.type) {
    case ActionTypes.UPDATE_VIEW:
      return {
        ...state,
        view: action.view,
      };
    case ActionTypes.UPDATE_MAP:
      return {
        ...state,
        map: action.map,
      };
    default:
      return state;
    }

}

const reducer = combineReducers({
  map,general
});

export default reducer;
