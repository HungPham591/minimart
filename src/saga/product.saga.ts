import { all, call, put, takeLatest } from "redux-saga/effects";
import { addProductAPI, removeProductAPI, updateProductAPI, addProductRequest, updateProductRequest, addProductSuccess, updateProductSuccess, removeProductSuccess, removeProductRequest, fetchProductSuccess, fetchProductAPI, fetchProductRequest } from './../actions/product.action';

function* fetchProductSaga(action: any): any {
    const data = yield call(fetchProductAPI, action.payload);
    yield put(fetchProductSuccess(data));
}
function* addProductSaga(action: any): any {
    const data = yield call(addProductAPI, action.payload);
    yield put(addProductSuccess(data));
}
function* updateProductSaga(action: any): any {
    const data = yield call(updateProductAPI, action.payload);
    yield put(updateProductSuccess(data));
}
function* removeProductSaga(action: any): any {
    const data = yield call(removeProductAPI, action.payload);
    yield put(removeProductSuccess(data));
}

export function* productSaga(): any {
    yield all([
        takeLatest(fetchProductRequest, fetchProductSaga),
        takeLatest(addProductRequest, addProductSaga),
        takeLatest(updateProductRequest, updateProductSaga),
        takeLatest(removeProductRequest, removeProductSaga),
    ])
}
