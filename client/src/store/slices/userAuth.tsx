import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';



export const userAuthSlice = createSlice({

    name: 'userAuth',
    initialState: {
        isUserLogin :  Boolean(window.localStorage.getItem('userInfo')),
        userStatus: ''
    },
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.isUserLogin = true,
            state.userStatus = action.payload
        },

        logoutUser: (state) => {
            localStorage.clear()
            state.isUserLogin = false
            state.userStatus = ''
        }
    }
})


export const { loginUser, logoutUser} = userAuthSlice.actions;

export default userAuthSlice.reducer;