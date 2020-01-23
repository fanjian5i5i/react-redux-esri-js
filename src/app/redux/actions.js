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

export function updateSelected(selected) {

  return {
    type: ActionTypes.UPDATE_SELECTED,
    selected:selected
  };
}

export function updateNeighborhood(neighborhood) {

  return {
    type: ActionTypes.UPDATE_NEIGHBORHOOD,
    neighborhood:neighborhood
  };
}


export function updateDrawer(open) {
  return {
    type: ActionTypes.UPDATE_DRAWER,
    open:open
  };
}

export function changeCategory(category) {

  return {
    type: ActionTypes.CHANGE_CATEGORY,
    category:category
  };
}

export function updateLayer(layer) {

  return {
    type: ActionTypes.UPDATE_LAYER,
    layer:layer
  };
}


