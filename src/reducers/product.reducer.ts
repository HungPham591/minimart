import { addProductRequest, addProductSuccess, updateProductRequest, updateProductSuccess, removeProductRequest, removeProductSuccess, fetchProductRequest, fetchProductSuccess } from './../actions/product.action';
import { createSlice } from '@reduxjs/toolkit';
import * as _ from 'lodash';

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
                state.data = _.filter(state.data, item => {
                    return item?.name.indexOf(name) > -1;
                })
            }
            if (sort) {
                switch (sort) {
                    case 1: state.data = _.orderBy(state.data, ['name'], ['asc']); break;
                    case 2: state.data = _.orderBy(state.data, ['name'], ['desc']); break;
                    case 3: state.data = _.orderBy(state.data, ['id'], ['asc']); break;
                    case 4: state.data = _.orderBy(state.data, ['id'], ['desc']); break;
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
                state.data = action?.payload;
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