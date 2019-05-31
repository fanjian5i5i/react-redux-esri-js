import * as ActionTypes from './actionTypes';

export function updateView(view) {
  return {
    type: ActionTypes.UPDATE_VIEW,
    view:view
  };
}
export function updateMap(map) {
  return {
    type: ActionTypes.UPDATE_MAP,
    map:map
  };
}
