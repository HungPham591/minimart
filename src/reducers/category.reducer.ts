import { addCategoryRequest, addCategorySuccess, updateCategoryRequest, updateCategorySuccess, removeCategoryRequest, removeCategorySuccess, fetchCategoryRequest, fetchCategorySuccess } from './../actions/category.action';
import { createSlice } from "@reduxjs/toolkit";
import * as _ from 'lodash';

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
                    if (action?.payload?.id !== value?.id) return value;
                })
            });
    }
});

export const { sortCategory } = CategoryReducer.actions;
export const selectCategory = (state: any) => state.category;//reducer name