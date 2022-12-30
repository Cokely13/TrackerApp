import Axios from "axios";

const SET_EVENTS ="SET_EVENTS"


export const setEvents = (events) =>{
  return{
    type: SET_EVENTS,
    events
  }
};

export const fetchEvents = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/events");
        dispatch(setEvents(data));
  };
};


const initialState = [];
export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
      default:
        return state;
    }
  }
