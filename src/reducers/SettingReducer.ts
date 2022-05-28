import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: false
}

export const SettingReducer = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.mode = !state.mode;
        }
    },
    extraReducers: (builder) => {

    }
});

export const { changeTheme } = SettingReducer.actions;

export const selectSetting = (state: any) => state.setting;//reducer name