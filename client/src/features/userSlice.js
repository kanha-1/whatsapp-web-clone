import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
// const AUTH_URL = `${process.env.BASE_URL}`
const AUTH_URL = `http://localhost:8080/api`

const initialState = {
    status: "",
    error: "",
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        token: "",
        status: ""
    },
}
export const registerUser = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_URL}/auth/register`, { ...values })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})
export const loginUser = createAsyncThunk('auth/login', async (values, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${AUTH_URL}/auth/login`, { ...values })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                token: "",
                status: ""
            }
        },
        changeStatus: (state, action) => {
            state.status = action.payload
        },
        logout: (state, action) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                token: "",
                status: ""
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "success"
                state.user = action.payload?.user
                state.error = ""
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "success"
                state.user = action.payload?.user
                state.error = ""
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export const { logout, changeStatus } = userSlice.actions

export default userSlice.reducer