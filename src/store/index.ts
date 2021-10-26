import {combineReducers, configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

const rootReducer = combineReducers({
    data: reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
};

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default store;

