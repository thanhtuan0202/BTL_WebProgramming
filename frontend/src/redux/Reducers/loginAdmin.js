import { createSlice } from '@reduxjs/toolkit';

export const loginAdminSlice = createSlice ({
    name: 'login',
    initialState: {
        isLogin: false,
        adminInfo: {},
    },
    reducers: {
        setLoginAction: (state, action) => {
            const { isLogin, adminInfo} = action.payload;
            state.isLogin = isLogin;
            state.adminInfo = adminInfo;
        },
        delLoginAction: (state) => {
            state.isLogin = false;
            state.adminInfo = {};
        },
    }
})

export const { setLoginAction, delLoginAction } = loginAdminSlice.actions;
export default loginAdminSlice.reducer;