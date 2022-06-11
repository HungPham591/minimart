import { all } from 'redux-saga/effects';
import { categorySaga } from './CategorySaga';
import { productSaga } from './ProductSaga';


export default function* rootSaga() {
    yield all([categorySaga(), productSaga()]);
}