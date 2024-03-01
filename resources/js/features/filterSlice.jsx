import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
    const response = await fetch('/filter',{
        method:'PUT',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken},
        body: JSON.stringify({values}),
    });
})

export const {showFilter, hideFilter} = filterSlice.actions

export default filterSlice.reducer