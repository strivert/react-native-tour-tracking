import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  personalInfo: {}
};

/*
{ personalInfo:
  { 
    iResidence: 'postal123',
    sGender: 'Male',
    iAge: '33',
    sEducation: 'Secondary school',
    sTax: '200 000 - 300 000',
    iHowMany: '3' 
  }
}
*/

/**
 * Define reducer for Demographics
 * @param {state} state The state of redux store
 * @param {action} action The action value from dispatch
 * @return {object} updated state
 */
export default function demographics(state, action) {
  if(typeof state === 'undefined') {
    state = initialState;
  }

  switch(action.type) {
  case types.SET_DEMOGRAPHICS:
    return update(state, {
      personalInfo: {$set: action.personalInfo}
    });
  default:
    return state;
  }
}
