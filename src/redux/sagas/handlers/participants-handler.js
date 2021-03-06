import {call, put} from 'redux-saga/effects';
import {
  getParticipantsInClassRequest,
  addParticipantsInClassRequest,
  removeParticipantsInClassRequest
} from '../requests/participants-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleGetParticipants(action) {
  try {
    const response = yield call(getParticipantsInClassRequest, action.id);
    const { data } = response;
    yield put({ type: ActionTypes.GET_PARTICIPANTS_CLASS_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_PARTICIPANTS_CLASS_FAIL});
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch participants", danger: true}})
    console.log(err);
  }
}

export function* handleAddParticipants(action) {
  try {
    const response = yield call(addParticipantsInClassRequest, action.class_id, action.users);
    const { data } = response;
    yield put({ type: ActionTypes.ADD_PARTICIPANTS_IN_CLASS_SUCCESS, data: data });
    try {
      const response = yield call(getParticipantsInClassRequest, action.class_id);
      const { data } = response;
      yield put({ type: ActionTypes.GET_PARTICIPANTS_CLASS_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_PARTICIPANTS_CLASS_FAIL});
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Existing Participants Added", danger: false}})
  } catch (err) {
    yield put({type: ActionTypes.ADD_PARTICIPANTS_IN_CLASS_FAIL});
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch participants", danger: true}})
    console.log(err);
  }
}

export function* handleRemoveParticipantsRequest(action) {
  try {
    const response = yield call(removeParticipantsInClassRequest, action.class_id, action.users);
    const { data } = response;
    yield put({ type: ActionTypes.REMOVE_PARTICIPANT_SUCCESS});
    try {
      const response = yield call(getParticipantsInClassRequest, action.class_id);
      const { data } = response;
      yield put({ type: ActionTypes.GET_PARTICIPANTS_CLASS_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_PARTICIPANTS_CLASS_FAIL});
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Participant Removed!", danger: false}})
  } catch (err) {
    yield put({type: ActionTypes.REMOVE_PARTICIPANT_FAIL});
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to remove participant", danger: true}})
    console.log(err);
  }
}
