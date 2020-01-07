import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

const initMapState = {
  map:null,
  view:null,
  selected:null,
  
};

const initGeneralState = {
  drawerOpen:false,
  category:"population"
};

function general(state = initGeneralState, action) {
  if (typeof state === 'undefined') {
    return initGeneralState;
  }
  switch (action.type) {
    case ActionTypes.UPDATE_DRAWER:
      return {
        ...state,
        drawerOpen: action.open,
      };
      case ActionTypes.CHANGE_CATEGORY:
        return {
          ...state,
          category: action.category,
        };
    }
    


  return state
}

function map(state = initMapState, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

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
    case ActionTypes.UPDATE_SELECTED:
      return {
        ...state,
        selected: action.selected,
      };

      
      
    default:
      return state;
    }

}

const reducer = combineReducers({
  map,general
});

export default reducer;
