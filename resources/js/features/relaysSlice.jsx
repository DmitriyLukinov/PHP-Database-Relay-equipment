import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
        },

        setInputField: (state, action)=>{
            if(state.tableCellParams.length===0 || 
                (state.tableCellParams.at(-1).row===action.payload.row && state.tableCellParams.at(-1).table===action.payload.tableID)){
                if(state.tableCellParams.length===0){
                    let t = document.getElementById(action.payload.tableID);
                    let arr = [];
                    if(action.payload.tableID==="measuringTable"){
                        if(t.rows[action.payload.row+1]){
                            for(let i=0; i<6; ++i){
                                let item = t.rows[action.payload.row+1].cells[i].innerText;                                                          
                                arr.push(item);
                            }
                        }
                    }
                    else{
                        if(t.rows[action.payload.row+1]){
                            for(let i=0; i<5; ++i){
                                let item = t.rows[action.payload.row+1].cells[i].innerText;                                                          
                                arr.push(item);
                            }
                        }
                    }
                    state.itemToChange = [...arr];
                }
                state.tableCellParams.push({
                    row: action.payload.row,
                    column: action.payload.column, 
                    table: action.payload.tableID,
                });
            }
        },
        addNew: (state, action)=>{
            switch(action.payload.currentTarget.id){
                case 'add_currentTable':
                    state.currentRelays.push({});
                break;
                case 'add_voltageTable':
                    state.voltageRelays.push({});
                break;
                case 'add_measuringTable':
                    state.measuringInstruments.push({});
                break;
                case 'add_transTable':
                    state.currentTransformers.push({});
                break;
            }
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getItemNames1.fulfilled, (state, action)=>{
            if(state.tableCellParams.length===0 || (state.tableCellParams.at(-1).row===action.payload.data.row && state.tableCellParams.at(-1).table===action.payload.data.tableID)){
                if(state.tableCellParams.length===0){
                    let t = document.getElementById(action.payload.data.tableID);
                    let arr = [];
                    if(action.payload.data.tableID==="measuringTable"){
                        for(let i=0; i<6; ++i){
                            let item = t.rows[action.payload.data.row+1].cells[i].innerText;
                            arr.push(item);
                        }
                    }
                    else{
                        for(let i=0; i<5; ++i){
                            let item = t.rows[action.payload.data.row+1].cells[i].innerText;
                            arr.push(item);
                        }
                    }
                    state.itemToChange = [...arr];
                }
                let arr = [...state.tableCellParams];
                arr.push({
                    row: action.payload.data.row,
                    column: action.payload.data.column, 
                    table: action.payload.data.tableID
                });
                state.tableCellParams = [...arr];

                switch(action.payload.data.tableID){
                    case 'currentTable':
                        if(action.payload.data.column===0) state.dropDown1 = [...action.payload.items];                                           
                        if(action.payload.data.column===2) state.dropDown3 = [...action.payload.items];
                    break;                        
                    case 'voltageTable':
                        if(action.payload.data.column===0) state.dropDown1 = [...action.payload.items];
                    break;
                    case 'measuringTable':
                        if(action.payload.data.column===0) state.dropDown1 = [...action.payload.items];                                           
                        if(action.payload.data.column===1) state.dropDown2 = [...action.payload.items];                        
                        if(action.payload.data.column===2 ) state.dropDown3 = [...action.payload.items];
                    break;
                    case 'transTable':
                        if(action.payload.data.column===0) state.dropDown1 = [...action.payload.items];
                        if((action.payload.data.column===1 || action.payload.data.column===2)){
                            state.dropDown2 = [...action.payload.items];
                            state.dropDown3 = [...action.payload.items];
                        }
                    break;
                }
            }
        })
        .addCase(postNewItem.fulfilled, (state, action)=>{
            switch(action.payload.tableID){
                case 'currentTable':
                    state.currentRelays = [...action.payload.res];
                    relaysSlice.caseReducers.abort(state);
                break;
                case 'voltageTable':
                    state.voltageRelays = [...action.payload.res];
                    relaysSlice.caseReducers.abort(state);
                break;
                case 'measuringTable':
                    state.measuringInstruments = [...action.payload.res];
                    relaysSlice.caseReducers.abort(state);
                break;
                case 'transTable':
                    state.currentTransformers = [...action.payload.res];
                    relaysSlice.caseReducers.abort(state);
                break;
            }
        })
    }
})

export const getItemNames1 = createAsyncThunk('relays/getItemNames1', async (data)=>{
    const response = await fetch(`/show/item/names?column=${data.column}&tableID=${data.tableID}`,{method:'GET'});
    const items = await response.json();
    return {items, data };
})

export const postNewItem = createAsyncThunk('relays/postNewItem', async({substation, newItem, tableID})=>{
    const response = await fetch('/postNewItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken},
        body: JSON.stringify({substation, newItem, tableID}),
    })
    let res = await response.json();
    return ({res, tableID});
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

export const { getCurrentRelays, getVoltageRelays, getMeasuringInstruments, getCurrentTrans, abort, addNew, 
    setInputField
} = relaysSlice.actions
export default relaysSlice.reducer