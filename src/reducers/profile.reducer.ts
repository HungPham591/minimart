import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        name: "Hung Pham",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyYPpSOn_kpXBtE4wJ50MCIJ9J7bBAq8_swh03mb1kml7lGqF"
    },
    loading: false
}

export const ProfileReducer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile: (state, action) => {

        }
    },
    extraReducers: (builder) => {

    }
});

export const { updateProfile } = ProfileReducer.actions;

export const selectProfile = (state: any) => state.profile;//reducer name