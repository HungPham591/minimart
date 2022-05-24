import { all } from 'redux-saga/effects';
import { categorySaga } from './category.saga';
import { productSaga } from './product.saga';


export default function* rootSaga() {
    yield all([categorySaga(), productSaga()]);
}