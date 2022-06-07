import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerOpen: false,
    dataConfirm: null,
    dataModal: null,
    modalOpen: null,
    openModalTo: null,
    navigating: false,
    confirmModalOpen: null,
}

export const LayoutReducer = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.drawerOpen = action.payload;
        },
        setDataModal: (state, action) => {
            state.dataModal = action.payload?.data;
        },
        openModal: (state, action) => {
            state.modalOpen = action.payload?.modalOpen;
            state.openModalTo = action.payload?.openModalTo;
        },
        isNavigating: (state, action) => {
            state.navigating = !state.navigating;
        },
        openConfirmModal: (state, action) => {
            state.confirmModalOpen = action.payload;
        },
        setDataConfirm: (state, action) => {
            state.dataConfirm = action.payload;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    openDrawer,
    setDataModal,
    openModal,
    isNavigating,
    openConfirmModal,
    setDataConfirm
} = LayoutReducer.actions;

export const selectLayout = (state: any) => state.layout;//reducer name