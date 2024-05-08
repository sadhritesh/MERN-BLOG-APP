import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
    success : null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        signInStart : (state) => {
            state.error = null
            state.loading = true
        },
        signInSuccess : (state, action) => {
            state.error = null 
            state.loading = false
            state.currentUser = action.payload
        },
        signInFailure : (state, action) => {
            state.error = action.payload 
            state.loading = false
        },
        setError : (state, action) => {
            if (action.payload) {
                state.error = action.payload
            } else {
                state.error = null
            }
        },
        setSuccess : (state, action) => {
            if (action.payload) {
                state.success = action.payload
            } else {
                state.success = null
            }
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, setError, setSuccess } = userSlice.actions;

export default userSlice.reducer;