import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerOpen: false,
    dataProductModal: null,
    dataCategoryModal: null,
    productModalOpen: false,
    categoryModalOpen: false,
    deleteModalOpen: false,
    deleteProductModalOpen: false,
    deleteCategoryModalOpen: false,
    openModalTo: null,
    navigating: false,
    confirmModalOpen: false,
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
            state.deleteModalOpen = true;
        },
        openDeleteCategoryModal: (state, action) => {
            state.dataCategoryModal = action.payload.data;
            state.deleteModalOpen = true;
        },
        closeDeleteProductModal: (state, action) => {
            state.deleteModalOpen = false;
            state.dataProductModal = null;
            state.dataCategoryModal = null;
        },
        closeDeleteCategoryModal: (state, action) => {
            state.deleteModalOpen = false;
            state.dataProductModal = null;
            state.dataCategoryModal = null;
        },
        isNavigating: (state, action) => {
            state.navigating = !state.navigating;
        },
        openConfirmModal: (state, action) => {
            state.confirmModalOpen = !state.confirmModalOpen;
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
    openConfirmModal
} = LayoutReducer.actions;

export const selectLayout = (state: any) => state.layout;//reducer name