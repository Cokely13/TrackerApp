import axios from "axios";



// Action Types
const SET_SINGLE_RESULT = "SET_SINGLE_RESULT";
const UPDATE_SINGLE_RESULT = "UPDATE_SINGLE_RESULT";
const TOKEN = "token";

// Action creators
export const _setSingleResult= (resultdata) => {
  return {
    type: SET_SINGLE_RESULT,
    resultdata,
  };
};

const _updateSingleResult = (resultdata) => {
  return {
    type: UPDATE_SINGLE_RESULT,
    resultdata,
  };
};

//Thunks
export const fetchResult = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/results/${id}`);
    dispatch(_setSingleResult(data));
  };
};

export const updateSingleResult = (result, history) => {
  // console.log("IT MADE IT!")
  return async (dispatch) => {
    try {
        await axios.put(`/api/results/${result.id}`, result);
        const { data: resultData } = await axios.get(`/api/results/${result.id}`);
        dispatch(_updateSingleResult(resultData));
        // history.push("/results");
      }
     catch (error) {
      console.log("ERROR!!!", error)
    }
  };
};

// reducer
const initialState = [];
const singleResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RESULT:
      return action.resultdata;
    case UPDATE_SINGLE_RESULT:
      return action.resultdata;
    default:
      return state;
  }
};

export default singleResultReducer;
