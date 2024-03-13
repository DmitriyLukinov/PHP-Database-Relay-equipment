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
    let currentPath = window.location.pathname;
    currentPath = currentPath.replace(/\/$/, '');
    currentPath = currentPath.replace(/\/get\/filtered\/data.*/, '');
    const newPath = `${currentPath}/get/filtered/data`;
    router.get(newPath, values);
})

export const back = createAsyncThunk('filter/getRelays', async ()=>{
    let currentPath = window.location.pathname;
    currentPath = currentPath.replace(/\/$/, '');
    currentPath = currentPath.replace(/\/get\/filtered\/data.*/, '');
    currentPath.length===0 ? router.get('/') : router.get(`${currentPath}`);
})

export function sortYear (item, setItem){
    let tr = [...item];
    tr.sort(function(a, b) {return a.year - b.year;})                                                                     
    setItem(tr);
}
export function sortSubstation(item, setItem){
    let tr = [...item];
    tr.sort(function(a, b) {
        let substationA = a.substation.toLowerCase();
        let substationB = b.substation.toLowerCase();
        if (substationA < substationB) return -1;
        if (substationA > substationB) return 1;
        return 0;
    });                                                                     
    setItem(tr);
}

export const {showFilter, hideFilter} = filterSlice.actions

export default filterSlice.reducer