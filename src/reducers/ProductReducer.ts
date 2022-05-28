import { addProductRequest, addProductSuccess, updateProductRequest, updateProductSuccess, removeProductRequest, removeProductSuccess, fetchProductRequest, fetchProductSuccess } from '../actions/ProductAction';
import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import Helpers from '../commons/utils/Helpers';

const initialState = {
    data: Array(),
    loading: false
}

export const ProductReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        sortProduct: (state, action) => {
            const { name, sort } = action.payload;

            if (name) {
                state.data = state.data.filter(item => {
                    return item?.name.indexOf(name) > -1;
                })
            }
            if (sort) {
                switch (sort) {
                    case 1: state.data = Helpers.sortAsc(state.data, 'name'); break;
                    case 2: state.data = Helpers.sortDesc(state.data, 'name'); break;
                    case 3: state.data = Helpers.sortAsc(state.data, 'id'); break;
                    case 4: state.data = Helpers.sortDesc(state.data, 'id'); break;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductSuccess, (state, action: any) => {
                state.loading = false;
                state.data = action?.payload;
            })
            .addCase(addProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(addProductSuccess, (state, action: any) => {
                state.loading = false;
                state.data.push(action?.payload);
            })
            .addCase(updateProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(updateProductSuccess, (state, action: any) => {
                state.loading = false;
                const index = state.data.findIndex(element => element?.id === action?.payload?.id);
                state.data[index] = action.payload;
            })
            .addCase(removeProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(removeProductSuccess, (state, action: any) => {
                state.loading = false;
                state.data = state.data.filter(value => {
                    if (action?.payload?.id !== value?.id) return value;
                })
            });
    }
});

export const { sortProduct } = ProductReducer.actions;

export const selectProduct = (state: any) => state.product;//reducer name