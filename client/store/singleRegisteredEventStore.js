import axios from "axios";

// Action Types
const SET_SINGLE_REGISTEREDEVENT = "SET_SINGLE_REGISTEREDEVENT";
const UPDATE_SINGLE_REGISTEREDEVENT = "UPDATE_SINGLE_REGISTEREDEVENT";
const TOKEN = "token";

// Action creators
export const _setSingleRegisteredEvent= (eventdata) => {
  return {
    type: SET_SINGLE_REGISTEREDEVENT,
    eventdata,
  };
};

const _updateSingleRegisteredEvent = (eventdata) => {
  return {
    type: UPDATE_SINGLE_REGISTEREDEVENT,
    eventdata,
  };
};

//Thunks
export const fetchSingleRegisteredEvent = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/registered/${id}`);
    dispatch(_setSingleRegisteredEvent(data));
  };
};

export const updateSingleRegisteredEvent = (event) => {
  return async (dispatch) => {
    try {
      console.log("IDDTEST", event)
        // await axios.put(`/api/registered/${event.id}`, event);
        await axios.put(`/api/registered/${event.id}`, event
        );
        const { data: eventData } = await axios.get(`/api/registered/${event.id}`);
        dispatch(_updateSingleRegisteredEvent(eventData));
        // history.push(`/profile`)
      }
     catch (error) {
      next(error)
    }
  };
};

// reducer
const initialState = [];
const singleRegisteredEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_REGISTEREDEVENT:
      return action.eventdata;
    case UPDATE_SINGLE_REGISTEREDEVENT:
      return  action.eventdata;
    default:
      return state;
  }
};

export default singleRegisteredEventReducer;
