import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const substationSlice = createSlice({
    name: 'substation',
    initialState: {
      value: [],
      name: "Substation"
    },
    reducers: {
        getSubstations: (state, action)=>{
            state.value = [...action.payload];
        },
        text: ()=>{console.log('test');},
    },
    extraReducers: (builder)=>{
        builder.addCase(getFiders.fulfilled, (state, action)=>{
            state.value = [...action.payload.data.fiders];
            state.name = action.payload.substation;
        })
    }
})

export const getFiders = createAsyncThunk('substation/getFiders', async (substation) => {
    const response = await fetch(`/${substation}`, {
        method: "GET",
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
    const data = await response.json();
    window.history.pushState({}, '', data.url);
    return {data, substation};
});

export const getRelays = createAsyncThunk('substation/getRelays', async ({substation, fider})=>{
    await fetch(`/${substation}/${fider}`, {
        method: "GET",
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    });
})

export const { getSubstations, text } = substationSlice.actions
export const selectSubctation = (state) => state.substation.value
export const selectName = (state) => state.substation.name
export default substationSlice.reducer