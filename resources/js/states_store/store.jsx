import { configureStore } from '@reduxjs/toolkit';
import substationSlice from '../features/subst_fiderSlice';
import relaysSlice from '../features/relaysSlice';

const store = configureStore({
    reducer: {
        substation: substationSlice,
        relays: relaysSlice
    }});

export default store;