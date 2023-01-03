import Axios from "axios";

const SET_REGISTEREDEVENTS ="SET_REGISTEREDEVENTS"
const CREATE_REGISTEREDEVENT = "CREATE_REGISTEREDEVENT"
const DELETE_REGISTEREDEVENT = "DELETE_REGISTEREDEVENT"


export const setRegisteredEvents = (events) =>{
  return{
    type: SET_REGISTEREDEVENTS,
    events
  }
};

const _createRegisteredEvent = (event) => {
  return {
    type: CREATE_REGISTEREDEVENT,
    event,
  };
};

const _deleteRegisteredEvent = (event) => {
  return {
    type: DELETE_REGISTEREDEVENT,
    event
  };
};

export const fetchRegisteredEvents = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/registeredevents");
        dispatch(setRegisteredEvents(data));
  };
};

export const createRegisteredEvent = (event, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/registeredevents", event);
    dispatch(_createRegisteredEvent(created));
    history.push("/profile");
  };
};

export const deleteRegisterEvent = (id, history) => {
  return async (dispatch) => {
    const { data: event } = await Axios.delete(`/api/registeredevents/${id}`);
    dispatch(_deleteRegisteredEvent(event));
    history.push("/registeredevents");
  };
};


const initialState = [];
export default function registeredEventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTEREDEVENTS:
      return action.events;
      case CREATE_REGISTEREDEVENT:
        return [...state, action.event];
        case DELETE_REGISTEREDEVENT:
      return state.filter((event) => event.id !== action.event.id)
      ;
      default:
        return state;
    }
  }
