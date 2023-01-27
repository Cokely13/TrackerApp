import axios from "axios";



// Action Types
const SET_SINGLE_CHALLENGE = "SET_SINGLE_CHALLENGE";
const UPDATE_SINGLE_CHALLENGE = "UPDATE_SINGLE_CHALLENGE";
const TOKEN = "token";

// Action creators
export const _setSingleChallenge= (resultdata) => {
  return {
    type: SET_SINGLE_CHALLENGE,
    resultdata,
  };
};

const _updateSingleChallenge = (resultdata) => {
  return {
    type: UPDATE_SINGLE_CHALLENGE,
    resultdata,
  };
};

//Thunks
export const fetchSingleChallenge = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/challenges/${id}`);
    dispatch(_setSingleChallenge(data));
  };
};

export const updateSingleChallenge= (result, history) => {

  return async (dispatch) => {
    try {
        await axios.put(`/api/challenges/${result.id}`, result);
        const { data: resultData } = await axios.get(`/api/challenges/${result.id}`);
        dispatch(_updateSingleChallenge(resultData));
        history.push("/profile");
      }
     catch (error) {
      console.log("ERROR!!!", error)
    }
  };
};

// reducer
const initialState = [];
const singleChallengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CHALLENGE:
      return action.resultdata;
    case UPDATE_SINGLE_CHALLENGE:
      return action.resultdata;
    default:
      return state;
  }
};

export default singleChallengeReducer;
