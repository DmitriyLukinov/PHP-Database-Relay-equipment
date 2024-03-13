import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Row, Button, Table } from 'react-bootstrap';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {getMeasuringInstruments, enableReducting, getItemNames1, deleteItem, addNew, selectMeasuringInstruments, 
    selecttableCellParams, setInputField} from '../../features/relaysSlice';
import DropDown1 from '../components/DropDown1';
import DropDown2 from '../components/DropDown2';
import DropDown3 from '../components/DropDown3';

export default function MeasuringInstruments({measuringInstruments, setFieldValue, substation}){

    const instruments = useSelector(selectMeasuringInstruments);
    const tableCellParams = useSelector(selecttableCellParams);
    const dispatch = useDispatch();
    const setSelectField = (e, column)=>{
        let data = {
            row: e.currentTarget.parentElement.sectionRowIndex,
            column: column,
            tableID: "measuringTable",
        }
        dispatch(getItemNames1(data));
    }
    useEffect(()=>{
        dispatch(getMeasuringInstruments({measuringInstruments}));
    }, [])

    return (
        <>
            <Row className ='tableLabel'>
                <Button className="addNew" variant="primary" size="sm" id="add_measuringTable"
                onClick={(e)=>{
                    dispatch(addNew(e));
                    for(let i =0; i<3; i++){
                        let data = {
                            row: instruments.length,
                            column: i,
                            tableID: "measuringTable",
                        }
                        dispatch(getItemNames1(data));
                    }
                    dispatch(setInputField({row:instruments.length, column: 3, tableID: 'measuringTable'}));
                    dispatch(setInputField({row:instruments.length, column: 4, tableID: 'measuringTable'}));
                    dispatch(setInputField({row:instruments.length, column: 5, tableID: 'measuringTable'}));
                }}
                >
                    Add new
                </Button>
                <h5>Measuring Instruments</h5>
            </Row>
            <Table striped bordered hover size="sm" id="measuringTable" className='equipmentTable'>
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Device type</th>
                        <th>Limit</th>
                        <th>Year</th>
                        <th>Quantity</th>
                        <th>Next verification</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { instruments.map((item, index)=>{
                        return <tr key={index}>
                            <td onClick={(e)=>{setSelectField(e,0)}}>
                                {
                                    enableReducting(tableCellParams, index, 0, "measuringTable")
                                    ? <DropDown1 setFieldValue={setFieldValue}/> : item.device
                                }
                            </td>
                            <td onClick={(e)=>{setSelectField(e,1)}}>
                                {
                                    enableReducting(tableCellParams, index, 1, "measuringTable")
                                    ? <DropDown2 setFieldValue={setFieldValue}/> : item.device_type
                                }
                            </td>
                            <td onClick={(e)=>{setSelectField(e,2)}}>
                                {
                                    enableReducting(tableCellParams, index, 2, "measuringTable")
                                    ? <DropDown3 setFieldValue={setFieldValue}/> :item.measurement_limit
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 3, tableID: 'measuringTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 3, "measuringTable")
                                    ? <Field name="newRelayParam[3]" id='column3' size="sm" type="text" autoFocus/> : item.year
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 4, tableID: 'measuringTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 4, "measuringTable")
                                    ? <Field name="newRelayParam[4]" id='column4' size="sm" type="text" autoFocus/> : item.quantity
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 5, tableID: 'measuringTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 5, "measuringTable")
                                    ? <Field name="newRelayParam[5]" id='column5' size="sm" type="text" autoFocus/> : item.next_verification
                                }
                            </td>
                            <td>
                                <Button onClick={(e)=>{
                                    dispatch(deleteItem({e:e, substation:substation, tableID: 'measuringTable'}))
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