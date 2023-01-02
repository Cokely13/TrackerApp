import Axios from "axios";

const SET_EVENTS ="SET_EVENTS"
const CREATE_EVENT = "CREATE_EVENT"
const DELETE_EVENT = "DELETE_EVENT"


export const setEvents = (events) =>{
  return{
    type: SET_EVENTS,
    events
  }
};

const _createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event,
  };
};

const _deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    event
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/events");
        dispatch(setEvents(data));
  };
};

export const createEvent = (event, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/events", event);
    dispatch(_createEvent(created));
    history.push("/events");
  };
};

export const deleteEvent = (id, history) => {
  return async (dispatch) => {
    const { data: event } = await Axios.delete(`/api/events/${id}`);
    dispatch(_deleteEvent(event));
    history.push("/events");
  };
};


const initialState = [];
export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
      case CREATE_EVENT:
        return [...state, action.event];
        case DELETE_EVENT:
      return state.filter((event) => event.id !== action.event.id)
      ;
      default:
        return state;
    }
  }
