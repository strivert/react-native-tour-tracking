import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  surveyInfo: [],
  stage: 0
};

/**
 * Define reducer for Demographics
 * @param {state} state The state of redux store
 * @param {action} action The action value from dispatch
 * @return {object} updated state
 */
export default function survey(state, action) {
  if(typeof state === 'undefined') {
    state = initialState;
  }

  switch(action.type) {
  case types.ADD_SURVEY:
    return update(state, {
      surveyInfo: {
        [state.surveyInfo.length]: {$set: action.surveyInfo}
      },
      stage: {$set: (state.stage+1)}
    });
  default:
    return state;
  }
}
