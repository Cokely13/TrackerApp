import Axios from "axios";

const SET_CHALLENGES ="SET_CHALLENGES"
const CREATE_CHALLENGE = "CREATE_CHALLENGE"
const DELETE_CHALLENGE = "DELETE_CHALLENGE"


export const setChallenges = (events) =>{
  return{
    type: SET_CHALLENGES,
    events
  }
};

const _createChallenge = (event) => {
  return {
    type: CREATE_CHALLENGE,
    event,
  };
};

const _deleteChallenge = (event) => {
  return {
    type: DELETE_CHALLENGE,
    event
  };
};

export const fetchChallenges = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/challenges");
        dispatch(setChallenges(data));
  };
};

export const createChallenge = (event, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/challenges", event);
    dispatch(_createChallenge(created));
    history.push("/challenges");
  };
};

export const deleteChallenge= (id, history) => {
  return async (dispatch) => {
    const { data: event } = await Axios.delete(`/api/challenges/${id}`);
    dispatch(_deleteChallenge(event));
    history.push("/challenges");
  };
};


const initialState = [];
export default function challengesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHALLENGES:
      return action.events;
      case CREATE_CHALLENGE:
        return [...state, action.event];
        case DELETE_CHALLENGE:
      return state.filter((event) => event.id !== action.event.id)
      ;
      default:
        return state;
    }
  }
