import {call, put} from 'redux-saga/effects';
import {
  addQuestionInAssessmentRequest,
  createAssessmentRequest,
  getAssessmentsRequest,
  getPublicAssessmentsRequest
} from '../requests/assessments-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleGetAssessmentsRequest(action) {
  try {
    const response = yield call(getAssessmentsRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_ASSESSMENTS_SUCCESS, data: data.reverse() });
  } catch (err) {
    yield put({type: ActionTypes.GET_ASSESSMENTS_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch Assessments", danger: true}})
    console.log(err);
  }
}

export function* handleGetPublicAssessmentsRequest(action) {
  try {
    const response = yield call(getPublicAssessmentsRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_PUBLIC_ASSESSMENTS_SUCCESS, data: data.reverse() });
  } catch (err) {
    yield put({type: ActionTypes.GET_PUBLIC_ASSESSMENTS_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch Assessments", danger: true}})
    console.log(err);
  }
}

export function* handleCreateAssessmentRequest(action) {
  let a;
  try {
    const response = yield call(createAssessmentRequest, action.name, action.body, action.isPublic, action.questions);
    const { data } = response;
    a = data;
    yield put({ type: ActionTypes.CREATE_ASSESSMENT_SUCCESS});
    try {
      const response = yield call(addQuestionInAssessmentRequest, a.assessment.id, action.questions);
      const { data2 } = response;
      yield put({ type: ActionTypes.ADD_QUESTIONS_IN_ASSESSMENT_SUCCESS });
    } catch (err) {
      yield put({type: ActionTypes.ADD_QUESTIONS_IN_ASSESSMENT_FAIL})
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Assessment Created", message: "You can now add or remove question"}})
    action.navigate('/assessment/' + a.assessment.id)
  } catch (err) {
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to create Assessment", danger: true}})
    yield put({type: ActionTypes.CREATE_ASSESSMENT_FAIL})
    console.log(err);
  }
}
