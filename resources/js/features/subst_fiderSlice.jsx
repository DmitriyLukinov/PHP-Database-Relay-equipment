import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { router } from '@inertiajs/react'
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

export const substationSlice = createSlice({
    name: 'substation',
    initialState: {
      substationOrFider: [],
      name: "",
      row: "",
      itemToChange: "",
    },
    reducers: {
        getSubstations: (state, action)=>{
            state.substationOrFider = [...action.payload.txt];
            state.name = action.payload.name;
        },
        addNew: (state, action)=>{
            if(action.payload===""){
                let now = [...state.substationOrFider, ''];
                state.row = now.length-1;
                state.substationOrFider = now;
            }
        },
        setRedactingField:(state, action)=>{
            if(state.row === ""){
                let itemToChange = action.payload.currentTarget;
                state.itemToChange = itemToChange.previousSibling.textContent;
                state.row = itemToChange.closest('tr').sectionRowIndex;
            }
        },
        abort:(state)=>{
            state.row = "";
            state.itemToChange = "";
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getFiders.fulfilled, (state, action)=>{
            state.substationOrFider = [...action.payload.data.fiders];
            state.name = action.payload.substation;
        })
        .addCase(applyChanges.fulfilled, (state, action)=>{
            try{
                if(state.name==='Substation' && state.itemToChange===''){
                    action.payload.res.items.splice(action.payload.res.items.length-2, 1);
                }
                state.substationOrFider = [...action.payload.res.items];
                state.row = "";
                state.itemToChange = "";
            }
            catch{}
        })
        .addCase(deleteObjectSF.fulfilled, (state, action)=>{            
            if(action.payload.res.items === 'No need for server request'){
                let now = [...state.substationOrFider];
                now.pop();
                state.substationOrFider = now;
                state.row = "";
            }
            else if(action.payload.res.items==='deletion prohoibited')
            {alert('Equipment exists');}
            else if(action.payload.res.items==='deletion approved'){
                let now = [...state.substationOrFider];
                now.splice(action.payload.delRow, 1);
                state.substationOrFider = now;
            }
            else if(action.payload.res.items!=='deletion prohoibited' && action.payload.res.items!=='deletion approved')
            {state.substationOrFider = [...action.payload.res.items];}
        })
        .addCase(back.fulfilled, (state, action)=>{
            state.substationOrFider = [...action.payload.res.substations];
            state.name = 'Substation';
            state.row = "";
            state.itemToChange = "";
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
    router.get(`/${substation}/${fider}`);
})

export const applyChanges = createAsyncThunk(
    'substation/applyChanges', async({newItem, itemToChange, substation, items})=>{
    let data = {newItem: newItem, itemToChange: itemToChange, substation: substation}

    async function fetchingData(newItem, items){
        if(newItem!==''){
            for(let item of items){
                if(newItem===item){alert('Such item esists!'); throw new Error();}
            }
            const response = await fetch("/changeObjectSF", {
                method: "PUT",
                headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken},
                body: JSON.stringify(data)
            });
            const res = await response.json();
            return res;
        }
    }

    let res;
    if(substation!=='Substation'){
        if(newItem.length>5){ alert('Too long data. Only 5 characters are available'); throw new Error();}
        res = await fetchingData(newItem, items);
    }
    if(substation==='Substation' && itemToChange!==''){
        if(newItem.length>20){ alert('Too long data. Only 20 characters are available'); throw new Error();}
        res = await fetchingData(newItem, items);
    }
    if(substation==='Substation' && itemToChange===''){
        if(newItem.length>20){ alert('Too long data. Only 20 characters are available'); throw new Error();}
        if(newItem!==''){
            for(let item of items){ if(newItem===item){alert('Such item esists!'); throw new Error();}}
            items = [...items, newItem];
            res = await new Promise((resolve)=>{resolve({items: items})});
        }
    }
    return {res};
})

export const deleteObjectSF = createAsyncThunk( 'substation/deleteObjectSF', async ({e, substation, row})=>{
    if(row===""){
        let itemToDelete = e.currentTarget.previousSibling.previousSibling; 
        let delRow = itemToDelete.closest("tr").sectionRowIndex;
        if(itemToDelete.textContent==='' ){
            const res = await new Promise((resolve)=>{resolve({items: 'No need for server request'})});
            return {res};
        }
        if(itemToDelete.textContent!==''){
            const response = await fetch("/del/smth", {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken},
                body: JSON.stringify({substation: substation, itemToDelete: itemToDelete.textContent})
            });
            const res = await response.json();
            return {res, delRow};
        }
    }
    else throw new Error();
})

export const back = createAsyncThunk('substation/back', async (substation)=>{
    if(substation!=='Substation'){
        console.log('yes');
        const response = await fetch('/return/to/substations',{
            method: "GET"
        })
        const res = await response.json();
        window.history.pushState({}, '', res.url);
        return {res};
    }
    else throw new Error();
})

export const enableReducting = (index, row)=>{if(index === row){return true;}}

export const { getSubstations, addNew, abort, setRedactingField } = substationSlice.actions
export const selectSubctation = (state) => state.substation.substationOrFider
export const selectName = (state) => state.substation.name
export const selectRow = (state) => state.substation.row
export const selectItemToChange =(state)=>state.substation.itemToChange
export default substationSlice.reducer