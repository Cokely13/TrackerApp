import Axios from "axios";

const SET_REGISTEREDEVENTS ="SET_REGISTEREDEVENTS"
const CREATE_REGISTEREDEVENT = "CREATE_REGISTEREDEVENT"
const DELETE_REGISTEREDEVENT = "DELETE_REGISTEREDEVENT"


export const setRegisteredEvents = (registeredevents) =>{
  return{
    type: SET_REGISTEREDEVENTS,
    registeredevents
  }
};

const _createRegisteredEvent = (registeredevent) => {
  return {
    type: CREATE_REGISTEREDEVENT,
    registeredevent,
  };
};

const _deleteRegisteredEvent = (registeredevent) => {
  return {
    type: DELETE_REGISTEREDEVENT,
    registeredevent
  };
};

export const fetchRegisteredEvents = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/registered");
        dispatch(setRegisteredEvents(data));
  };
};

export const createRegisteredEvent = (registeredevent, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/registered", registeredevent);
    dispatch(_createRegisteredEvent(created));
    history.push("/profile");
  };
};

export const deleteRegisterEvent = (id, history) => {
  return async (dispatch) => {
    const { data: registeredevent } = await Axios.delete(`/api/registered/${id}`);
    dispatch(_deleteRegisteredEvent(registeredevent));
    history.push("/registered");
  };
};


const initialState = [];
export default function registeredEventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTEREDEVENTS:
      return action.registeredevents;
      case CREATE_REGISTEREDEVENT:
        return [...state, action.registeredevent];
        case DELETE_REGISTEREDEVENT:
      return state.filter((registeredevent) => registeredevent.id !== action.eregisteredvent.id)
      ;
      default:
        return state;
    }
  }
