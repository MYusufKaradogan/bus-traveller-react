import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { base } from './reducer/base.reducer';
import { authentication } from './reducer/auth.reducer';
import { alert } from './reducer/alert.reducer';
import {inventory} from "./reducer/inventory.reducer";

const rootReducer = combineReducers({
    base,
    alert,
    authentication,
    inventory,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { serviceApi: null }
            }
        })
})