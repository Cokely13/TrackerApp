import Axios from "axios";

const SET_RECORDS ="SET_RECORDS"
const CREATE_RECORD = "CREATE_RECORD"
const DELETE_RECORD = "DELETE_RECORD"


export const setRecords = (records) =>{
  return{
    type: SET_RECORDS,
    records
  }
};

const _createRecord = (record) => {
  return {
    type: CREATE_RECORD,
    record,
  };
};

const _deleteRecord = (record) => {
  return {
    type: DELETE_RECORD,
    result,
  };
};

export const fetchRecords = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/records");
        dispatch(setRecords(data));
  };
};

export const createRecord = (record, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/records", record);
    dispatch(_createRecord(created));
    history.push("/records");
  };
};

export const deleteRecord = (id, history) => {
  return async (dispatch) => {
    const { data: record } = await Axios.delete(`/api/records/${id}`);
    dispatch(_deleteRecord(record));
    history.push("/records");
  };
};


const initialState = [];
export default function recordsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECORDS:
      return action.records;
      case CREATE_RECORD:
        return [...state, action.record];
        case DELETE_RECORD:
      return state.filter((record) => record.id !== action.record.id)
      ;
      default:
        return state;
    }
  }
