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

        itemToChange: [],
    },
    reducers:{
        getCurrentRelays: (state, action)=>{state.currentRelays = [...action.payload.currentRelays];},
        getVoltageRelays: (state, action)=>{state.voltageRelays = [...action.payload.voltageRelays];},
        getMeasuringInstruments: (state, action)=>{state.measuringInstruments = [...action.payload.measuringInstruments];},
        getCurrentTrans: (state, action)=>{state.currentTransformers = [...action.payload.currentTransformers];},

        abort: (state)=>{
            state.tableCellParams = [];
            state.dropDown1 = [];
            state.dropDown2 = [];
            state.dropDown3 = [];
            state.itemToChange = [];
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getItemNames.fulfilled, (state,action)=>{
            if(state.tableCellParams.length===0 || (state.tableCellParams.at(-1).row===action.payload.row && state.tableCellParams.at(-1).table===action.payload.tableID)){
                if(state.tableCellParams.length===0){
                    let t = document.getElementById(action.payload.tableID);
                    let arr = [];
                    if(action.payload.tableID==="measuringTable"){
                        for(let i=0; i<6; ++i){
                            let item = t.rows[action.payload.row+1].cells[i].innerText;
                            arr.push(item);
                        }
                    }
                    else{
                        for(let i=0; i<5; ++i){
                            let item = t.rows[action.payload.row+1].cells[i].innerText;
                            arr.push(item);
                        }
                    }
                    state.itemToChange = [...arr];
                }
                let arr = [...state.tableCellParams];
                arr.push({
                    row: action.payload.row,
                    column: action.payload.column, 
                    table: action.payload.tableID
                });
                state.tableCellParams = [...arr];

                switch(action.payload.tableID){
                    case 'currentTable':
                        if(action.payload.column===0) state.dropDown1 = [...action.payload.items];                                           
                        if(action.payload.column===2) state.dropDown3 = [...action.payload.items];
                    break;                        
                    case 'voltageTable':
                        if(action.payload.column===0) state.dropDown1 = [...action.payload.items];
                    break;
                    case 'measuringTable':
                        if(action.payload.column===0) state.dropDown1 = [...action.payload.items];                                           
                        if(action.payload.column===1) state.dropDown2 = [...action.payload.items];                        
                        if(action.payload.column===2 ) state.dropDown3 = [...action.payload.items];
                    break;
                    case 'transTable':
                        if(action.payload.column===0) state.dropDown1 = [...action.payload.items];
                        if((action.payload.column===1 || action.payload.column===2)){
                            state.dropDown2 = [...action.payload.items];
                            state.dropDown3 = [...action.payload.items];
                        }
                    break;
                }
            }
        })
        .addCase(applyChanges.fulfilled, ()=>{
            console.log('yes');
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
export const applyChanges = createAsyncThunk('relays/applyChanges', async ()=>{
    console.log('ppp');
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

export const selectItemToChange = (state)=>state.relays.itemToChange

export const { getCurrentRelays, getVoltageRelays, getMeasuringInstruments, getCurrentTrans, abort
} = relaysSlice.actions
export default relaysSlice.reducer