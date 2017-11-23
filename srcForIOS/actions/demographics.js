import {
  SET_DEMOGRAPHICS
} from './ActionTypes';

/**
 * Set Demographics
 * @return {json}
 */
export function setDemographics(personalInfo) {
  return {
    type: SET_DEMOGRAPHICS,
    personalInfo
  };
}
