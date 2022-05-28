import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerOpen: false,
    dataProductModal: null,
    dataCategoryModal: null,
    productModalOpen: false,
    categoryModalOpen: false,
    confirmModalOpen: false,
    deleteProductModalOpen: false,
    deleteCategoryModalOpen: false,
    openModalTo: null,
    navigating: false,
}

export const LayoutReducer = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.drawerOpen = true;
        },
        closeDrawer: (state, action) => {
            state.drawerOpen = false;
        },
        openProductModal: (state, action) => {
            state.dataProductModal = action.payload.data;
            state.openModalTo = action.payload.openModalTo;
            state.productModalOpen = true;
        },
        openCategoryModal: (state, action) => {
            state.dataCategoryModal = action.payload.data;
            state.openModalTo = action.payload.openModalTo;
            state.categoryModalOpen = true;
        },
        closeInputModal: (state, action) => {
            state.productModalOpen = false;
            state.categoryModalOpen = false;
            state.dataProductModal = null;
            state.dataCategoryModal = null;
        },
        openDeleteProductModal: (state, action) => {
            state.dataProductModal = action.payload.data;
            state.confirmModalOpen = true;
        },
        openDeleteCategoryModal: (state, action) => {
            state.dataCategoryModal = action.payload.data;
            state.confirmModalOpen = true;
        },
        closeDeleteProductModal: (state, action) => {
            state.confirmModalOpen = false;
            state.dataProductModal = null;
            state.dataCategoryModal = null;
        },
        closeDeleteCategoryModal: (state, action) => {
            state.confirmModalOpen = false;
            state.dataProductModal = null;
            state.dataCategoryModal = null;
        },
        isNavigating: (state, action) => {
            state.navigating = !state.navigating;
        }
    },
    extraReducers: (builder) => {

    }
});

export const {
    openDrawer,
    closeDrawer,
    openCategoryModal,
    openDeleteProductModal,
    openDeleteCategoryModal,
    openProductModal,
    closeDeleteProductModal,
    closeDeleteCategoryModal,
    closeInputModal,
    isNavigating,
} = LayoutReducer.actions;

export const selectLayout = (state: any) => state.layout;//reducer name