import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { router } from '@inertiajs/react'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filterModal: false,
    },
    reducers: {
        showFilter: (state)=>{state.filterModal = true;},
        hideFilter: (state)=>{state.filterModal = false;},
    }
})

export const selectFilterModal = (state)=>state.filter.filterModal
export const getFilterRelays = createAsyncThunk('filter/getFilterRelays', async(values)=>{
    const currentPath = window.location.pathname;
    const newPath = `${currentPath}/get/filtered/data`;
    router.get(newPath, values, {preserveState: true});
})

export const {showFilter, hideFilter} = filterSlice.actions

export default filterSlice.reducer