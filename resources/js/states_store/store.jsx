import { configureStore } from '@reduxjs/toolkit';
import substationSlice from '../features/subst_fiderSlice';
import relaysSlice from '../features/relaysSlice';
import filterSlice from '../features/filterSlice';

const store = configureStore({
    reducer: {
        substation: substationSlice,
        relays: relaysSlice,
        filter: filterSlice,
    }});

export default store;