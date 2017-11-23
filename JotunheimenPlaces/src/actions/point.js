import {
  SET_POINT,
  DEL_POINT,
  EDIT_POINT
} from './ActionTypes';

/**
 * Add Point
 * @return {json}
 */
export function setPoint(pointItem) {
  return {
    type: SET_POINT,
    pointItem
  };
}

/**
 * Del Point
 * @return {json}
 */
export function delPoint(index) {
  return {
    type: DEL_POINT,
    index
  };
}

/**
 * Edit Point
 * @return {json}
 */
export function editPoint(pointItem, pointIndex) {
  return {
    type: EDIT_POINT,
    pointItem,
    pointIndex
  };
}
