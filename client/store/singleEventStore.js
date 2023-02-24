import axios from "axios";

// Action Types
const SET_SINGLE_EVENT = "SET_SINGLE_EVENT";
const UPDATE_SINGLE_EVENT = "UPDATE_SINGLE_EVENT";
const TOKEN = "token";

// Action creators
export const _setSingleEvent= (eventdata) => {
  return {
    type: SET_SINGLE_EVENT,
    eventdata,
  };
};

const _updateSingleEvent = (eventdata) => {
  return {
    type: UPDATE_SINGLE_EVENT,
    eventdata,
  };
};

//Thunks
export const fetchEvent = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/events/${id}`);
    dispatch(_setSingleEvent(data));
  };
};

export const updateSingleEvent = (event, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/events/${event.id}`, event);
        const { data: eventData } = await axios.get(`/api/events/${event.id}`);
        dispatch(_updateSingleEvent(eventData));
        history.push(`/events/${event.id}`)
      }
     catch (error) {
      console.log("EVENT", event)
    }
  };
};

// reducer
const initialState = [];
const singleEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_EVENT:
      return action.eventdata;
    case UPDATE_SINGLE_EVENT:
      return action.eventdata;
    default:
      return state;
  }
};

export default singleEventReducer;
