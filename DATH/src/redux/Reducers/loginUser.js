import { createSlice } from '@reduxjs/toolkit';

if (localStorage.getItem('user'))
{
    var checkLogin = true;
    var userInfo = JSON.parse(localStorage.getItem('user')).result;
}

export const loginUserSlice = createSlice ({
    name: 'login',
    initialState: {
        isLogin: checkLogin,
        userInfo: userInfo,
    },
    reducers: {
        setLoginAction: (state, action) => {
            const { isLogin, userInfo} = action.payload;
            state.isLogin = isLogin;
            state.userInfo = userInfo;
        },
        delLoginAction: (state) => {
            state.isLogin = false;
            state.userInfo = {};
        },
    }
})

export const { setLoginAction, delLoginAction } = loginUserSlice.actions;
export default loginUserSlice.reducer;