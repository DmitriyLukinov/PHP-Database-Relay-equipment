import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const handleSuccess = (state, action) => {
    switch (action.payload.tableID) {
        case 'currentTable':
            state.currentRelays = [...action.payload.res];
        break;
        case 'voltageTable':
            state.voltageRelays = [...action.payload.res];
        break;
        case 'measuringTable':
            state.measuringInstruments = [...action.payload.res];
        break;
        case 'transTable':
            state.currentTransformers = [...action.payload.res];
        break;
    }
    relaysSlice.caseReducers.abort(state);
};
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
        itemModal: false,

        itemToChange: [],
        addNewPressed: false,

        popUp: false,
        errorMessageText: '',
        columnID: '',
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
            state.addNewPressed = false;

            state.errorMessageText = '';
            state.columnID = '';
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
            state.addNewPressed = true;
        },

        showItemModal:(state)=>{state.itemModal = true},
        hideItemModal:(state)=>{state.itemModal = false},

        showPopUp:(state, action)=>{
            if(action.payload){
                state.popUp = true;
                state.errorMessageText = action.payload.message;
                state.columnID = action.payload.column;
            }
        },
        hidePopUp:(state)=>{
            state.popUp = false;
            state.errorMessageText = '';
            state.columnID = '';
        },

        insertItem:(state, action)=>{
            switch(state.tableCellParams.at(-1).column){
                case 0:
                    state.dropDown1[0].unshift(action.payload);
                break;
                case 1:
                    state.dropDown2[0].unshift(action.payload);
                break;
                case 2:
                    state.dropDown3[0].unshift(action.payload);
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
            handleSuccess(state, action);
        })
        .addCase(deleteItem.fulfilled, (state, action)=>{
            if(action.payload.res==='justDel'){
                switch (action.payload.tableID) {
                    case 'currentTable':
                        state.currentRelays.pop();
                    break;
                    case 'voltageTable':
                        state.voltageRelays.pop();
                    break;
                    case 'measuringTable':
                        state.measuringInstruments.pop();
                    break;
                    case 'transTable':
                        state.currentTransformers.pop();
                    break;
                }
                relaysSlice.caseReducers.abort(state);
            }
            else handleSuccess(state, action);
        })
        .addCase(updateItem.fulfilled, (state, action)=>{
            handleSuccess(state, action);
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
export const updateItem = createAsyncThunk('relays/updateItem', async({substation, newItem, oldItem, tableID})=>{
    const response = await fetch('/updateItem', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken},
        body: JSON.stringify({substation, newItem, oldItem, tableID}),
    })
    let res = await response.json();
    return ({res, tableID});
})

function getItemFromTable(t, row, column, itemToDelete){
    if(t.rows[row+1]){
        for(let i=0; i<column; ++i){
            let item = t.rows[row+1].cells[i].innerText;                                                          
            itemToDelete.push(item);
        }
    }
}
export const deleteItem = createAsyncThunk('relays/deleteItem', async ({e, substation, tableID}, {getState})=>{
    const state = getState();
    if(state.relays.tableCellParams.length===0){
        let t = document.getElementById(tableID);
        let itemToDelete = [];
        let row = e.currentTarget.closest('tr').sectionRowIndex;
        if(tableID==="measuringTable"){ getItemFromTable(t, row, 6, itemToDelete); }
        else{ getItemFromTable(t, row, 5, itemToDelete); }
        
        if (itemToDelete.every(element => element === '')) {
            return({res:'justDel', tableID});
        }
        else{
            const response = await fetch('/deleteItem',{
                method: "DELETE",
                headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken},
                body: JSON.stringify({substation, itemToDelete, tableID}),
            })
            const res = await response.json();
            return({res, tableID});
        }
    }  
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
export const selectNewSelectValue1 = (state)=>state.relays.newSelectValue1
export const selectNewSelectValue2 = (state)=>state.relays.newSelectValue2
export const selectNewSelectValue3 = (state)=>state.relays.newSelectValue3
export const itemModal = (state)=>state.relays.itemModal

export const selectItemToChange = (state)=>state.relays.itemToChange
export const selectAddNewPressed = (state)=>state.relays.addNewPressed

export const selectPopUp = (state)=>state.relays.popUp
export const selectErrorMessageText = (state)=>state.relays.errorMessageText
export const selectColumnID = (state)=>state.relays.columnID

export const { getCurrentRelays, getVoltageRelays, getMeasuringInstruments, getCurrentTrans, abort, addNew, 
    setInputField, showItemModal, hideItemModal, showPopUp, hidePopUp, insertItem,
} = relaysSlice.actions
export default relaysSlice.reducer