import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const relaysSlice = createSlice({
    name: 'relays',
    initialState: {
        currentRelays: [],
        voltageRelays: [],
        measuringInstruments: [],
        currentTransformers: [],

        tableCellParams: [],
        dropDown1: [],
        dropDown2: [],
        dropDown3: [],
    },
    reducers:{
        getCurrentRelays: (state, action)=>{state.currentRelays = [...action.payload.currentRelays];},
        getVoltageRelays: (state, action)=>{state.voltageRelays = [...action.payload.voltageRelays];},
        getMeasuringInstruments: (state, action)=>{state.measuringInstruments = [...action.payload.measuringInstruments];},
        getCurrentTrans: (state, action)=>{state.currentTransformers = [...action.payload.currentTransformers];},
    },
    extraReducers: (builder)=>{
        builder.addCase(getItemNames.fulfilled, (state,action)=>{
            if(state.tableCellParams.length===0 || state.tableCellParams.at(-1).row===action.payload.row){
                let arr = [...state.tableCellParams];
                arr.push({
                    row: action.payload.row,
                    column: action.payload.column, 
                    table: action.payload.tableID
                });
                state.tableCellParams = [...arr];
            }

            if(action.payload.column===0 && action.payload.tableID==='transTable'){
                state.dropDown1 = [...action.payload.items];
            }
            if((action.payload.column===1 || action.payload.column===2) && action.payload.tableID==='transTable'){
                state.dropDown2 = [...action.payload.items];
                state.dropDown3 = [...action.payload.items];
            }
            if(action.payload.column===0 && action.payload.tableID==='measuringTable'){
                state.dropDown1 = [...action.payload.items];
            }
        })
    }
})

export const getItemNames = createAsyncThunk('relays/getItemNames', async (e)=>{
    let targetCell = e.currentTarget;
    let row = targetCell.parentElement.sectionRowIndex;
    let column =  targetCell.cellIndex;
    let tableID = targetCell.closest('[id]').id;
    const response = await fetch(`/show/item/names?column=${column}&tableID=${tableID}`,{method:'GET'});
    const items = await response.json();
    return {items, row, column, tableID };
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
export const selectdropDown1 = (state)=>state.relays.dropDown1
export const selectdropDown2 = (state)=>state.relays.dropDown2
export const selectdropDown3 = (state)=>state.relays.dropDown3
export const { getCurrentRelays, getVoltageRelays, getMeasuringInstruments, getCurrentTrans,
} = relaysSlice.actions
export default relaysSlice.reducer