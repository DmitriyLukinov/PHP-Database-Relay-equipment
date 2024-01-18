import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Row, Button, Table } from 'react-bootstrap';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {getCurrentRelays, selectCurrentRelays} from '../../features/relaysSlice';

export default function CurrentRelays({currentRelays}){

    const relays = useSelector(selectCurrentRelays);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCurrentRelays({currentRelays}));
    }, [])

    return (
        <>
            <Row id ='currentLabel'>
                <Button className="addNew" variant="primary" size="sm"
                id="add_currentTable" style={{ marginTop: '100px' }}>Add new</Button>
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
                            <td>{relay.relay_type}</td>
                            <td>{relay.ac_dc}</td>
                            <td>{relay.relay_current}</td>
                            <td>{relay.year}</td>
                            <td>{relay.quantity}</td>
                            <td><Button variant="danger" size="sm" >Delete</Button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    );
}
