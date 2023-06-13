import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../backend";

const createEvents = createAsyncThunk("event/create", async (data) => {
  try {
    const response = await axios.post(`${API}/new/event`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const getEventByID = createAsyncThunk("events/findOne", async (EventId) => {
  try {
    const response = await axios.get(`${API}/event/${EventId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
const getEvents = createAsyncThunk("/events", async ({ page, limit }) => {
  try {
    const response = await axios.get(
      `${API}/filter/events?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const updateEvents = createAsyncThunk(
  "/update/event",
  async (eventId, data) => {
    try {
      const res = await axios.put(`${API}/update/event/${eventId}`, data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const deleteEvent = createAsyncThunk("delete/event", async (id) => {
  try {
    const res = await axios.delete(`${API}/delete/event/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
});
const initialState = {
  post: null,
  events: [],
  updateEvent: null,
  deletedEvent: null,
  searchQuery: null,
  loading: false,
  error: null,
  updateModelOpen: false,
  currentPage: 1,
  totalPages: 1,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    openModal: (state) => {
      state.updateModelOpen = !state.updateModelOpen;
    },
    closeModal: (state) => {
      state.updateModelOpen = !state.updateModelOpen;
    },
    setEvents: (state, action) => {
      const categories = action.payload;
      state.events = state.events.filter((event) =>
        categories.includes(event.category.name)
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //update model
      .addCase(postActions.openModal, (state) => {
        state.updateModelOpen = !state.updateModelOpen;
      })
      .addCase(postActions.closeModal, (state) => {
        state.updateModelOpen = !state.updateModelOpen;
      })
      // * Get All Events
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // *  get event by ID
      .addCase(getEventByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventByID.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getEventByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //* Create Events
      .addCase(createEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Update Events
      .addCase(updateEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.updateEvent = action.payload;
      })
      .addCase(updateEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // delete Events
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedEvent = action.payload;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { actions: postActions } = eventSlice;
export const eventReducer = eventSlice.reducer;
export { createEvents, getEventByID, getEvents, updateEvents, deleteEvent };
