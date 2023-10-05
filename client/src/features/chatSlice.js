import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const CONVERSATION_URL = `http://localhost:8080/api/conversation`
const MESSAGES_URL = `http://localhost:8080/api/messages`

const initialState = {
    status: "",
    error: "",
    conversation: [],
    activeConversation: {},
    messages: [],
    notifications: [],
    files: []
}
// reduce functions
export const getConversation = createAsyncThunk("conversation/all", async (token, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(CONVERSATION_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})
export const openOrCreateAConversation = createAsyncThunk("conversation/create", async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values
    try {
        const { data } = await axios.post(CONVERSATION_URL, { receiver_id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})
export const getConversationMessages = createAsyncThunk("conversation/messages", async (values, { rejectWithValue }) => {
    const { token, convo_id } = values
    try {
        const { data } = await axios.get(`${MESSAGES_URL}/${convo_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})
export const sendMessages = createAsyncThunk("messages/send", async (values, { rejectWithValue }) => {
    const { token, message, convo_id, files } = values
    try {
        const { data } = await axios.post(MESSAGES_URL, { message, convo_id, files }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error.message)
    }
})
export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload
        },
        updateMessagesNconversation: (state, action) => {
            // update messages
            let msg = state.activeConversation
            if (msg._id === action.payload.conversation._id) {
                state.messages = [...state.messages, action.payload]
            }
            // update conversation
            let conversation = { ...action.payload.conversation, recentMessage: action.payload }
            let newConversation = [...state.conversation].filter((con) => con._id !== conversation._id)
            newConversation.unshift(conversation)
            state.conversation = newConversation
        },
        addfiles: (state, action) => {
            state.files = [...state.files, action.payload]
        },
        clearfiles: (state, action) => {
            state.files = []
        },
        removeFileThumb: (state, action) => {
            let index = action.payload
            let files = [...state.files]
            let filesToRemove = [files[index]]
            state.files = files.filter((file) => !filesToRemove.includes(file))
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getConversation.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getConversation.fulfilled, (state, action) => {
                state.status = "success"
                state.conversation = action.payload
            })
            .addCase(getConversation.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(openOrCreateAConversation.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(openOrCreateAConversation.fulfilled, (state, action) => {
                state.status = "success"
                state.activeConversation = action.payload
                state.files = []
            })
            .addCase(openOrCreateAConversation.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(getConversationMessages.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getConversationMessages.fulfilled, (state, action) => {
                state.status = "success"
                state.messages = action.payload
            })
            .addCase(getConversationMessages.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(sendMessages.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(sendMessages.fulfilled, (state, action) => {
                state.status = "success"
                state.messages = [...state.messages, action.payload]
                let conversation = { ...action.payload.conversation, recentMessage: action.payload }
                let newConversation = [...state.conversation].filter((con) => con._id !== conversation._id)
                newConversation.unshift(conversation)
                state.conversation = newConversation
            })
            .addCase(sendMessages.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export const { setActiveConversation, updateMessagesNconversation, addfiles, clearfiles, removeFileThumb } = chatSlice.actions

export default chatSlice.reducer;