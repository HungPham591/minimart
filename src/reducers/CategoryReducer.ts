import { addCategoryRequest, addCategorySuccess, updateCategoryRequest, updateCategorySuccess, removeCategoryRequest, removeCategorySuccess, fetchCategoryRequest, fetchCategorySuccess } from '../actions/CategoryAction';
import { createSlice } from "@reduxjs/toolkit";
import * as _ from 'lodash';
import Helpers from '../commons/utils/Helpers';

const initialState = {
    data: Array(),
    loading: false
}

export const CategoryReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        sortCategory: (state, action) => {
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
            .addCase(fetchCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategorySuccess, (state, action: any) => {
                state.loading = false;
                state.data = action?.payload;
            })
            .addCase(addCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(addCategorySuccess, (state, action: any) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(updateCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(updateCategorySuccess, (state, action: any) => {
                state.loading = false;
                const index = state.data.findIndex(element => element?.id === action?.payload?.id);
                state.data[index] = action.payload;
            })
            .addCase(removeCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(removeCategorySuccess, (state, action: any) => {
                state.loading = false;
                state.data = state.data.filter(value => {
                    if (value?.id !== action?.payload?.id) return value;
                })
            });
    }
});

export const { sortCategory } = CategoryReducer.actions;
export const selectCategory = (state: any) => state.category;//reducer name