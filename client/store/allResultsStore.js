import Axios from "axios";

const SET_RESULTS ="SET_RESULTS"


export const setResults = (results) =>{
  return{
    type: SET_RESULTS,
    results
  }
};

export const fetchResults = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/results");
        dispatch(setResults(data));
  };
};


const initialState = [];
export default function resultsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESULTS:
      return action.results;
      default:
        return state;
    }
  }
