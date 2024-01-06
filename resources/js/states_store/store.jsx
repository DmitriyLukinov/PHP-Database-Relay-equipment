import { configureStore } from '@reduxjs/toolkit';
import substationSlice from '../features/subst_fiderSlice';

const store = configureStore({reducer: {substation: substationSlice}});

export default store;