import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './reducers/themeSlice'
import postReducer from './reducers/postSlice'
import imageReducer from './reducers/imageSlice'
import authReducer from './reducers/authSlice'
import createSagaMiddleware from 'redux-saga'
import rootsaga from "./sagas/rootsaga";

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
    reducer: {
        themeReducer,
        postReducer,
        imageReducer,
        authReducer
    },
    middleware : [sagaMiddleWare],
});

sagaMiddleWare.run(rootsaga)

export type RootState = ReturnType<typeof store.getState>

export default store