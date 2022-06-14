import { createSlice } from "@reduxjs/toolkit";
import { addCategoryRequest, addCategorySuccess, fetchCategoryRequest, fetchCategorySuccess, removeCategoryRequest, removeCategorySuccess, updateCategoryRequest, updateCategorySuccess } from '../actions/CategoryAction';
import Helpers from '../commons/utils/Helpers';

const initialState = {
    data: Array(),
    loading: false,
    defaultData: Array(),
    filter: null,
}

const sort = (condition: any, data: any): any[] => {
    const { search, typeOfSearch, filter } = condition;
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
        }
    }
    return rs;
}

export const CategoryReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        sortCategory: (state, action) => {
            state.filter = action.payload;
            state.data = sort(state.filter, state.defaultData);
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
                state.defaultData = action?.payload;
            })
            .addCase(addCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(addCategorySuccess, (state, action: any) => {
                state.loading = false;
                state.defaultData.push(action.payload);
                state.data = sort(state.filter, state.defaultData);
            })
            .addCase(updateCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(updateCategorySuccess, (state, action: any) => {
                state.loading = false;
                const index = state.defaultData.findIndex(element => element?.id === action?.payload?.id);
                state.defaultData[index] = action.payload;
                state.data = sort(state.filter, state.defaultData);
            })
            .addCase(removeCategoryRequest, (state) => {
                state.loading = true;
            })
            .addCase(removeCategorySuccess, (state, action: any) => {
                state.loading = false;
                state.defaultData = state.defaultData.filter(value => {
                    if (value?.id !== action?.payload?.id) return value;
                });
                state.data = sort(state.filter, state.defaultData);
            });
    }
});

export const { sortCategory } = CategoryReducer.actions;
export const selectCategory = (state: any) => state.category;//reducer name