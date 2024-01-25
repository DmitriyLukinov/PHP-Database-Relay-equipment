import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Row, Button, Table } from 'react-bootstrap';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {getMeasuringInstruments, enableReducting, getItemNames, selectMeasuringInstruments, selecttableCellParams
} from '../../features/relaysSlice';
import DropDown1 from '../components/DropDown1';
import DropDown2 from '../components/DropDown2';
import DropDown3 from '../components/DropDown3';

export default function MeasuringInstruments({measuringInstruments, setFieldValue}){

    const instruments = useSelector(selectMeasuringInstruments);
    const tableCellParams = useSelector(selecttableCellParams);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMeasuringInstruments({measuringInstruments}));
    }, [])

    return (
        <>
            <Row className ='tableLabel'>
                <Button className="addNew"
                    variant="primary" size="sm" id="add_measuringTable"
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
                        <th>
                            Year
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                            </svg>
                        </th>
                        <th>Quantity</th>
                        <th>Next verification</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { instruments.map((item, index)=>{
                        return <tr key={index}>
                            <td onClick={(e)=>{dispatch(getItemNames(e))}}>
                                {
                                    enableReducting(tableCellParams, index, 0, "measuringTable")
                                    ? <DropDown1 setFieldValue={setFieldValue}/> : item.device
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(getItemNames(e))}}>
                                {
                                    enableReducting(tableCellParams, index, 1, "measuringTable")
                                    ? <DropDown2 setFieldValue={setFieldValue}/> : item.device_type
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(getItemNames(e))}}>
                                {
                                    enableReducting(tableCellParams, index, 2, "measuringTable")
                                    ? <DropDown3 setFieldValue={setFieldValue}/> :item.measurement_limit
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(getItemNames(e))}}>
                                {
                                    enableReducting(tableCellParams, index, 3, "measuringTable")
                                    ? <Field name="newRelayParam[3]" size="sm" type="text" autoFocus/> : item.year
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(getItemNames(e))}}>
                                {
                                    enableReducting(tableCellParams, index, 4, "measuringTable")
                                    ? <Field name="newRelayParam[4]" size="sm" type="text" autoFocus/> : item.quantity
                                }
                            </td>
                            <td onClick={(e)=>{dispatch(getItemNames(e))}}>
                                {
                                    enableReducting(tableCellParams, index, 5, "measuringTable")
                                    ? <Field name="newRelayParam[5]" size="sm" type="text" autoFocus/> : item.next_verification
                                }
                            </td>
                            <td><Button variant="danger" size="sm">Delete</Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    );
}