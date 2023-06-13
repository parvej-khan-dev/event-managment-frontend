import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {API} from "../../backend"

axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`}

export const loginUser = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response  = await axios.post(`${API}/user/login`, data)
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

export const logout = createAsyncThunk('user/logout', async (data, { rejectWithValue }) => {
    try {
      const { response } = await axios.post(`${API}/user/login`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  })

const initialState = {
  token: '',
  isLogin: false,
  userData: {},
  isLoading: false,
  role: ''
}

export const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state) => {
      state.isLogin = true
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    startLoading: (state) => {
        state.isLoading = true
    },
    stopLoading: (state) => {
        state.isLoading = false
    },
    setRole: (state, action) => {
      state.role = action.payload
    }
  },
  extraReducers: (builder) => { 
    builder 
    .addCase(loginUser.pending, (state) => { 
        state.isLoading = true;
        state.isLogin = false;
        state.userData = {};
    }) 
    .addCase(loginUser.fulfilled, (state, action) => { 
        state.isLoading = false;
        state.isLogin = true;
        state.userData = action.payload; 
    })
    .addCase(loginUser.rejected, (state, action) => { 
        state.isLoading = false;
        state.isLogin = false;
        state.userData = {}
    })
  }, 

})

// Action creators are generated for each case reducer function
export const { authenticate, setUserData, startLoading, stopLoading, setRole} = authenticationSlice.actions

export default authenticationSlice.reducer;