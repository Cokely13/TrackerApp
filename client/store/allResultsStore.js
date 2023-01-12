import Axios from "axios";

const SET_RESULTS ="SET_RESULTS"
const CREATE_RESULT = "CREATE_RESULT"
const DELETE_RESULT = "DELETE_RESULT"


export const setResults = (results) =>{
  return{
    type: SET_RESULTS,
    results
  }
};

const _createResult = (result) => {
  return {
    type: CREATE_RESULT,
    result,
  };
};

const _deleteResult = (result) => {
  return {
    type: DELETE_RESULT,
    result,
  };
};

export const fetchResults = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/results");
        dispatch(setResults(data));
  };
};

export const createResult = (result, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/results", result);
    dispatch(_createResult(created));
    history.push("/results");
  };
};

export const deleteResult = (id, history) => {
  return async (dispatch) => {
    const { data: result } = await Axios.delete(`/api/results/${id}`);
    dispatch(_deleteResult(result));
    history.push("/profile");
  };
};


const initialState = [];
export default function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESULTS:
      return action.results;
      case CREATE_RESULT:
        return [...state, action.result];
        case DELETE_RESULT:
      return state.filter((result) => result.id !== action.result.id)
      ;
      default:
        return state;
    }
  }
