import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Row, Button, Table } from 'react-bootstrap';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {getVoltageRelays, enableReducting, getItemNames1, deleteItem, addNew, selectVoltageRelays, selecttableCellParams,
setInputField} from '../../features/relaysSlice';
import DropDown1 from '../components/DropDown1';
import DropDownACDC from '../components/DropDownACDC';

export default function CurrentRelays({voltageRelays, setFieldValue, substation}){

    const relays = useSelector(selectVoltageRelays);
    const tableCellParams = useSelector(selecttableCellParams);
    const dispatch = useDispatch();
    const setSelectField = (e, column)=>{
        let data = {
            row: e.currentTarget.parentElement.sectionRowIndex,
            column: column,
            tableID: "voltageTable",
        }
        dispatch(getItemNames1(data));
    }

    useEffect(()=>{
        dispatch(getVoltageRelays({voltageRelays}));
    }, [])

    return(
        <>
            <Row className ='tableLabel'>
                <Button className="addNew" variant="primary" size="sm" id="add_voltageTable"
                onClick={(e)=>{
                    dispatch(addNew(e));
                    for(let i =0; i<2; i++){
                        let data = {
                            row: relays.length,
                            column: i,
                            tableID: "voltageTable",
                        }
                        dispatch(getItemNames1(data));
                    }
                    dispatch(setInputField({row:relays.length, column: 2, tableID: 'voltageTable'}));
                    dispatch(setInputField({row:relays.length, column: 3, tableID: 'voltageTable'}));
                    dispatch(setInputField({row:relays.length, column: 4, tableID: 'voltageTable'}));
                }}>
                    Add new
                </Button>
                <h5>Voltage Ralays</h5>
            </Row>
            <Table striped bordered hover size="sm" id="voltageTable" className='equipmentTable'>
                <thead>
                    <tr>
                        <th>Relay Type</th>
                        <th>AC/DC</th>
                        <th>Relay Voltage</th>
                        <th>Year</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { relays.map((relay, index)=>{
                        return <tr key={index}>
                            <td onClick={(e) => {setSelectField(e,0)}}>
                                {
                                    enableReducting(tableCellParams, index, 0, "voltageTable") 
                                    ? <DropDown1 setFieldValue={setFieldValue}/> : relay.relay_type
                                }
                            </td>
                            <td onClick={(e) => {setSelectField(e,1)}}>
                                {
                                    enableReducting(tableCellParams, index, 1, "voltageTable") 
                                    ? <DropDownACDC setFieldValue={setFieldValue}/> : relay.ac_dc
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 2, tableID: 'voltageTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 2, "voltageTable") 
                                    ? <Field name="newRelayParam[2]" id='column2'size="sm" type="text" autoFocus/> 
                                    : relay.relay_voltage
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 3, tableID: 'voltageTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 3, "voltageTable") 
                                    ? <Field name="newRelayParam[3]" id='column3' size="sm" type="text" autoFocus/> 
                                    : relay.year
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 4, tableID: 'voltageTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 4, "voltageTable") 
                                    ? <Field name="newRelayParam[4]" id='column4' size="sm" type="text" autoFocus/> 
                                    : relay.quantity
                                }
                            </td>
                            <td>
                                <Button onClick={(e)=>{
                                    dispatch(deleteItem({e:e, substation:substation, tableID: 'voltageTable'}))
                                }} variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    );
}