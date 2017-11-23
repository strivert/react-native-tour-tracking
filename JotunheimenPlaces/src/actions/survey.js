import {
  ADD_SURVEY
} from './ActionTypes';

/**
 * Set Survey
 * @return {json}
 */
export function addSurvey(surveyInfo) {
  return {
    type: ADD_SURVEY,
    surveyInfo
  };
}
