import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  pointInfo: []
};

/*
{
  pointInfo:
  [ 
    { item_0: 'Undisturbed nature',
      item_1: 'Aesthetic/scenic',
      item_2: 'Recreation activities',
      dateTime: 1497418859,
      mode: 'like'
    },
    { item_0: 'Undisturbed nature',
      item_1: 'Aesthetic/scenic',
      item_2: 'Recreation activities',
      dateTime: 1497418866,
       mode: 'dislike'
    }
  ] 
}
*/

/**
 * Define reducer for Demographics
 * @param {state} state The state of redux store
 * @param {action} action The action value from dispatch
 * @return {object} updated state
 */
export default function point(state, action) {
  if(typeof state === 'undefined') {
    state = initialState;
  }

  switch(action.type) {
  case types.SET_POINT:
    return update(state, {
      pointInfo: {
        [state.pointInfo.length]: {$set: action.pointItem}
      }
    });
  
  case types.DEL_POINT:
    return update(state, {
      pointInfo: {
        $splice: [[action.index, 1]]
      }
    });

  case types.EDIT_POINT:
    return update(state, {
      pointInfo: {
        [action.pointIndex]: {$set: action.pointItem}
      }
    });
  default:
    return state;
  }
}
