import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import logger from "redux-logger";
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import reducer from '../reducers';
import rootSaga from '../saga/index';


const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware
});
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga);


export {
    store,
    persistor
}
