import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    users: [],
    loading: false,
    error: null,
}

export const fetchGithubUsers = createAsyncThunk('users/fetchUsers', async (username, { rejectWithValue }) => {
    try {
        const  token = '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';
        const url = username ? `https://api.github.com/users/${username}` : 'https://api.github.com/users'
        const response = await axios.get(url, {
            headers: {
                Authorization: `token ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const githubUserSlice = createSlice({
    name: 'user',
    initialState,
    // reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchGithubUsers.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchGithubUsers.fulfilled, (state, action) => {
            console.log(action, "action")
            state.loading = false
            state.users = action.payload
        })
        .addCase(fetchGithubUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const userActions = githubUserSlice.actions
export default githubUserSlice.reducer