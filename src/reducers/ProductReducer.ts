import { createSlice } from '@reduxjs/toolkit';
import { addProductRequest, addProductSuccess, fetchProductRequest, fetchProductSuccess, removeProductRequest, removeProductSuccess, updateProductRequest, updateProductSuccess } from '../actions/ProductAction';
import Helpers from '../commons/utils/Helpers';

const initialState = {
    data: Array(),
    loading: false,
    defaultData: Array(),
    filter: null,
}

const sort = (condition: any, data: any): any[] => {
    const { search, filter, typeOfSearch, category } = condition;
    let rs = [...data];
    if (!rs || rs.length === 0) return [];
    if (search) {
        if (typeOfSearch === 1) {
            rs = rs.filter(item => {
                return item?.name.indexOf(search) > -1;
            })
        } else {
            rs = rs.filter(item => {
                return item?.id.indexOf(search) > -1;
            })
        }
    }

    if (filter) {
        switch (filter) {
            case 1: rs = Helpers.sortAsc(rs, 'name'); break;
            case 2: rs = Helpers.sortDesc(rs, 'name'); break;
            case 3: rs = Helpers.sortAsc(rs, 'id'); break;
            case 4: rs = Helpers.sortDesc(rs, 'id'); break;
            case 5: rs = Helpers.sortAsc(rs, 'number'); break;
            case 6: rs = Helpers.sortDesc(rs, 'number'); break;
        }
    }
    if (category && category !== -1) {
        rs = rs.filter(item => {
            return item?.category === category;
        })
    }
    return rs;
}

export const ProductReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        sortProduct: (state, action) => {
            state.filter = action.payload;
            state.data = sort(state.filter, state.defaultData);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductSuccess, (state, action: any) => {
                state.loading = false;
                state.defaultData = action?.payload;
                state.data = action?.payload;
            })
            .addCase(addProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(addProductSuccess, (state, action: any) => {
                state.loading = false;
                state.defaultData.push(action?.payload);
                state.data = sort(state.filter, state.defaultData);
            })
            .addCase(updateProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(updateProductSuccess, (state, action: any) => {
                state.loading = false;
                const index = state.defaultData.findIndex(element => element?.id === action?.payload?.id);
                state.defaultData[index] = action.payload;
                state.data = sort(state.filter, state.defaultData);
            })
            .addCase(removeProductRequest, (state) => {
                state.loading = true;
            })
            .addCase(removeProductSuccess, (state, action: any) => {
                state.loading = false;
                state.defaultData = state.defaultData.filter(value => {
                    if (action?.payload?.id !== value?.id) return value;
                });
                state.data = sort(state.filter, state.defaultData);
            });
    }
});

export const { sortProduct } = ProductReducer.actions;

export const selectProduct = (state: any) => state.product;//reducer name