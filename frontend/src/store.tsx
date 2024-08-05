import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlices'
import { apiSlice } from './slices/apiSlices';


// for asynchronous or having a centralized useState()
const store = configureStore({
    reducer: {
        auth:authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true,
})

export default store;