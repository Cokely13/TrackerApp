import axios from "axios";

// Action Types
const SET_SINGLE_RECORD = "SET_SINGLE_RECORD";
const UPDATE_SINGLE_RECORD = "UPDATE_SINGLE_RECORD";
const TOKEN = "token";

// Action creators
export const _setSingleRecord= (recorddata) => {
  return {
    type: SET_SINGLE_RECORD,
    recorddata,
  };
};

const _updateSingleRecord = (recorddata) => {
  return {
    type: UPDATE_SINGLE_RECORD,
    recorddata,
  };
};

//Thunks
export const fetchRecord = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/records/${id}`);
    dispatch(_setSingleRecord(data));
  };
};

export const updateSingleRecord = (record, id, history) => {
  return async (dispatch) => {
    try {
      console.log("CHECK", id)
        await axios.put(`/api/records/${id}`, record);
        const { data: recordData } = await axios.get(`/api/records/${id}`);
        dispatch(_updateSingleRecord(recordData));
        history.push(`/records`)
      }
     catch (error) {
      console.log("ERROR!!!", error)
    }
  };
};

// reducer
const initialState = [];
const singleRecordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RECORD:
      return action.recorddata;
    case UPDATE_SINGLE_RECORD:
      return action.recorddata;
    default:
      return state;
  }
};

export default singleRecordReducer;
