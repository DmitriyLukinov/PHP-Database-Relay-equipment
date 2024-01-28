import React, {useEffect} from 'react';
import { Formik, Form, Field } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Button, Card, Navbar, Col } from 'react-bootstrap';
import CurrentRelays from './relays/CurrentRelays';
import VoltageRelays from './relays/VoltageRelays';
import MeasuringInstruments from './relays/MeasuringInstruments';
import CurrentTransformers from './relays/CurrentTransformers';
import { useSelector, useDispatch } from 'react-redux';
import {abort, applyChanges, selectItemToChange, selecttableCellParams, selectdropDown1
} from '../features/relaysSlice';


const Relays = ({currentRelays, voltageRelays, measuringInstruments, currentTransformers, substation})=>{

    let oldItem = useSelector(selectItemToChange);
    const tableCellParams = useSelector(selecttableCellParams);
    const dispatch = useDispatch();

    return(
        <>
        <Formik 
            initialValues={{
                newRelayParam:['','','','','',''],
            }}
            onSubmit={(values)=>{
                let newItem = [...oldItem];
                values.newRelayParam.map((item, index)=>{if(item!=='') newItem[index]=item});
                console.log(oldItem);
                console.log(newItem);
            }}>
            {
                ({ setFieldValue, setValues }) =>(
                    <Form>
                        <Card className="card">
                            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                                <Col className='headerCol'>
                                    <Button className='navButton' variant="secondary" >Back</Button>
                                    <Button className='navButton' variant="secondary" type="button"
                                        onClick={()=>{
                                            dispatch(abort());
                                            setValues({newRelayParam:['','','','','','']});                                                                       
                                        }}>
                                        Abort
                                    </Button>
                                    <Button className='navButton' variant="secondary" type="submit">Apply changes</Button>
                                    <div class="vertical-separator"></div>
                                    <Button className='navButton' variant="info">Filter</Button>
                                </Col>
                                <h4>{substation[0]}-</h4><h4>{substation[1]}</h4>
                                <h1>Relay equipment</h1>
                            </Navbar>
                        </Card>

                        <CurrentRelays currentRelays={currentRelays} setFieldValue={setFieldValue}/>
                        <VoltageRelays voltageRelays={voltageRelays} setFieldValue={setFieldValue}/>
                        <MeasuringInstruments measuringInstruments={measuringInstruments} setFieldValue={setFieldValue}/>
                        <CurrentTransformers currentTransformers={currentTransformers} setFieldValue={setFieldValue}/>
                    </Form>
                )
            }
        </Formik>
        </>
    );
}

export default Relays;