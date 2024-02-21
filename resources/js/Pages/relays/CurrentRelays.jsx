import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Row, Button, Table, } from 'react-bootstrap';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {getCurrentRelays, enableReducting, getItemNames1, deleteItem, addNew, selectCurrentRelays, selecttableCellParams,
setInputField, } from '../../features/relaysSlice';
import DropDown1 from '../components/DropDown1';
import DropDown3 from '../components/DropDown3';
import DropDownACDC from '../components/DropDownACDC';
import ErrorMessage from '../components/ErrorMessage';

export default function CurrentRelays({currentRelays, setFieldValue, substation}){

    const relays = useSelector(selectCurrentRelays);
    const tableCellParams = useSelector(selecttableCellParams);
    const dispatch = useDispatch();
    const setSelectField = (e, column)=>{
        let data = {
            row: e.currentTarget.parentElement.sectionRowIndex,
            column: column,
            tableID: "currentTable",
        }
        dispatch(getItemNames1(data));
    }
    useEffect(()=>{
        dispatch(getCurrentRelays({currentRelays}));
    }, [])

    return (
        <>
            <Row id ='currentLabel'>
                <Button className="addNew" variant="primary" size="sm" id="add_currentTable" style={{ marginTop: '100px' }}
                onClick={(e)=>{
                    if(tableCellParams.length===0){
                        dispatch(addNew(e));
                        dispatch(setInputField({row:relays.length, column: 3, tableID: 'currentTable'}));
                        dispatch(setInputField({row:relays.length, column: 4, tableID: 'currentTable'}));
                        for(let i =0; i<3; i++){
                            let data = {
                                row: relays.length,
                                column: i,
                                tableID: "currentTable",
                            }
                            dispatch(getItemNames1(data));
                        }
                    }                  
                }}>
                    Add new
                </Button>
                <h5>Current Ralays</h5>
            </Row>
            <Table striped bordered hover size="sm" id="currentTable" className='equipmentTable'>
                <thead>
                <tr>
                    <th>Relay Type</th>
                    <th>AC/DC</th>
                    <th>
                    Relay Current
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                    </svg>
                    </th>
                    <th>
                    Year
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                    </svg>
                    </th>
                    <th>Quantity</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    { relays.map((relay, index)=>{
                        return <tr key={index}>
                            <td onClick={(e)=>{setSelectField(e,0)}}>
                                {
                                    enableReducting(tableCellParams, index, 0, "currentTable") 
                                    ? <DropDown1 setFieldValue={setFieldValue}/> : relay.relay_type
                                }
                            </td>
                            <td onClick={(e)=>{setSelectField(e,1)}}>
                                {
                                    enableReducting(tableCellParams, index, 1, "currentTable") 
                                    ? <DropDownACDC setFieldValue={setFieldValue}/> : relay.ac_dc
                                }
                            </td>
                            <td onClick={(e)=>{setSelectField(e,2)}}>
                                {
                                    enableReducting(tableCellParams, index, 2, "currentTable") 
                                    ? <DropDown3 setFieldValue={setFieldValue}/> : relay.relay_current
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 3, tableID: 'currentTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 3, "currentTable") 
                                    ? <Field name="newRelayParam[3]" id='column3' size="sm" type="text" autoFocus/> 
                                    : relay.year
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 4, tableID: 'currentTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 4, "currentTable") 
                                    ? <Field name="newRelayParam[4]" id='column4' size="sm" type="text" autoFocus/> 
                                    : relay.quantity
                                }
                            </td>
                            <td>
                                <Button onClick={(e)=>{
                                    dispatch(deleteItem({e:e, substation:substation, tableID: 'currentTable'}))
                                }} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <ErrorMessage />
        </>
    );
}
