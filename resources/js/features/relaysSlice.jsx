import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const relaysSlice = createSlice({
    name: 'relays',
    initialState: {
        currentRelays: [],
        voltageRelays: [],
        measuringInstruments: [],
        currentTransformers: [],
        tableCellParams: []
    },
    reducers:{
        getCurrentRelays: (state, action)=>{state.currentRelays = [...action.payload.currentRelays];},
        getVoltageRelays: (state, action)=>{state.voltageRelays = [...action.payload.voltageRelays];},
        getMeasuringInstruments: (state, action)=>{state.measuringInstruments = [...action.payload.measuringInstruments];},
        getCurrentTrans: (state, action)=>{state.currentTransformers = [...action.payload.currentTransformers];},
        
        setRedactingField:(state, action)=>{
            let targetCell = action.payload.currentTarget;
            let row = targetCell.parentElement.sectionRowIndex;
            if(state.tableCellParams.length===0 || state.tableCellParams.at(-1).row===row){
                let arr = [...state.tableCellParams];
                arr.push({
                    row: row,
                    column: targetCell.cellIndex, 
                    table: targetCell.closest('[id]').id
                });
                state.tableCellParams = [...arr];
                console.log(state.tableCellParams);
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getItemNames.fulfilled, (state,action)=>{
            console.log(action.payload);
        })
    }
})

export const getItemNames = createAsyncThunk('relays/getItemNames', async ()=>{
    const response = await fetch('/show/item/names',{method:'GET'});
    const items = await response.json();
    return items;
})

export const enableReducting = (cellArray, row, column, table)=>{
    for(let cell of cellArray){
        if(cell.row===row && cell.column===column && cell.table===table)
        return true;
    }
}

export const selectCurrentRelays = (state) => state.relays.currentRelays
export const selectVoltageRelays = (state) => state.relays.voltageRelays
export const selectMeasuringInstruments = (state) => state.relays.measuringInstruments
export const selectCurrentTrans = (state) => state.relays.currentTransformers
export const selecttableCellParams = (state)=>state.relays.tableCellParams
export const { getCurrentRelays, getVoltageRelays, getMeasuringInstruments, getCurrentTrans,
setRedactingField } = relaysSlice.actions
export default relaysSlice.reducer