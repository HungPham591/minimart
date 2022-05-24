import { all, call, put, takeLatest } from "redux-saga/effects";
import { addCategoryAPI, removeCategoryAPI, updateCategoryAPI, addCategorySuccess, updateCategorySuccess, removeCategorySuccess, addCategoryRequest, updateCategoryRequest, removeCategoryRequest, fetchCategoryAPI, fetchCategorySuccess, fetchCategoryRequest } from './../actions/category.action';

function* fetchCategorySaga(action: any): any {
    const data = yield call(fetchCategoryAPI, action.payload);
    yield put(fetchCategorySuccess(data));
}
function* addCategorySaga(action: any): any {
    const data = yield call(addCategoryAPI, action.payload);
    yield put(addCategorySuccess(data));
}
function* updateCategorySaga(action: any): any {
    const data = yield call(updateCategoryAPI, action.payload);
    yield put(updateCategorySuccess(data));
}
function* removeCategorySaga(action: any): any {
    const data = yield call(removeCategoryAPI, action.payload);
    yield put(removeCategorySuccess(data));
}

export function* categorySaga(): any {
    yield all([
        takeLatest(fetchCategoryRequest, fetchCategorySaga),
        takeLatest(addCategoryRequest, addCategorySaga),
        takeLatest(updateCategoryRequest, updateCategorySaga),
        takeLatest(removeCategoryRequest, removeCategorySaga),
    ]);
}
