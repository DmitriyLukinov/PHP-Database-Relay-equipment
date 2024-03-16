import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Row, Button, Table } from 'react-bootstrap';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {getCurrentTrans, enableReducting, getItemNames1, deleteItem, addNew, selectCurrentTrans, selecttableCellParams,
setInputField} from '../../features/relaysSlice';
import DropDown1 from '../components/DropDown1';
import DropDown2 from '../components/DropDown2';
import DropDown3 from '../components/DropDown3';

export default function CurrentTransformers({currentTransformers, setFieldValue, substation}){

    const transes = useSelector(selectCurrentTrans);
    const tableCellParams = useSelector(selecttableCellParams);
    const dispatch = useDispatch();

    const setSelectField = (e, column)=>{
        let data = {
            row: e.currentTarget.parentElement.sectionRowIndex,
            column: column,
            tableID: "transTable",
        }
        dispatch(getItemNames1(data));
    }
    useEffect(()=>{
        dispatch(getCurrentTrans({currentTransformers}));
    }, [])

    return(
        <>
            <div className ='tableLabel'>
                <Button onClick={(e)=>{
                    dispatch(addNew(e));
                    for(let i =0; i<3; i++){
                        let data = {
                            row: transes.length,
                            column: i,
                            tableID: "transTable",
                        }
                        dispatch(getItemNames1(data));
                    }
                    dispatch(setInputField({row:transes.length, column: 3, tableID: 'transTable'}));
                    dispatch(setInputField({row:transes.length, column: 4, tableID: 'transTable'}));
                }}
                    className="addNew" type="button"
                    variant="primary" size="sm" id="add_transTable"
                >
                    Add new
                </Button>
                <h5>Current Transformers</h5>
            </div>
            <Table striped bordered hover size="sm" id="transTable" className='equipmentTable'>
                <thead>
                    <tr>                   
                        <th>Type</th>
                        <th>Coil 0.5</th>
                        <th>Coil 10P</th>
                        <th>Year</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { transes.map((trans, index)=>{
                        return <tr key={index}>
                            <td onClick={(e)=>{setSelectField(e,0)}}>
                                {   
                                    enableReducting(tableCellParams, index, 0, "transTable")
                                    ? <DropDown1 setFieldValue={setFieldValue}/> : trans.type                                 
                                }
                            </td>
                            <td onClick={(e)=>{setSelectField(e,1)}}>
                                {
                                    enableReducting(tableCellParams, index, 1, "transTable")
                                    ? <DropDown2 setFieldValue={setFieldValue}/> :trans.coil_05
                                }
                            </td>
                            <td onClick={(e)=>{setSelectField(e,2)}}>
                                {
                                    enableReducting(tableCellParams, index, 2, "transTable")
                                    ? <DropDown3 setFieldValue={setFieldValue}/> :trans.coil_10p
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 3, tableID: 'transTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 3, "transTable")
                                    ? <Field name="newRelayParam[3]" id='column3' size="sm" type="text" autoFocus/> :trans.year
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(setInputField({
                                row:e.currentTarget.parentElement.sectionRowIndex, column: 4, tableID: 'transTable'}))}}>
                                {
                                    enableReducting(tableCellParams, index, 4, "transTable")
                                    ? <Field name="newRelayParam[4]" id='column4' size="sm" type="text" autoFocus/> :trans.quantity
                                }
                            </td>
                            <td>
                                <Button onClick={(e)=>{
                                    dispatch(deleteItem({e:e, substation:substation, tableID: 'transTable'}))
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