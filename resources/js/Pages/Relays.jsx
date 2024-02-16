import React, {useState} from 'react';
import { Formik, Form, } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Button, Card, Navbar, Col } from 'react-bootstrap';
import CurrentRelays from './relays/CurrentRelays';
import VoltageRelays from './relays/VoltageRelays';
import MeasuringInstruments from './relays/MeasuringInstruments';
import CurrentTransformers from './relays/CurrentTransformers';
import { useSelector, useDispatch } from 'react-redux';
import {abort, postNewItem, updateItem, selectItemToChange, selecttableCellParams, selectAddNewPressed, showPopUp,
    hidePopUp, selectPopUp,
} from '../features/relaysSlice';
import ItemModal from './components/ItemModal';

const Relays = ({currentRelays, voltageRelays, measuringInstruments, currentTransformers, substation})=>{

    let oldItem = useSelector(selectItemToChange);
    const AddNewPressed = useSelector(selectAddNewPressed);
    const tableCellParams = useSelector(selecttableCellParams);
    const popUp = useSelector(selectPopUp);
    const dispatch = useDispatch();

    function checkFormat(regexp, relayParam, err, column, errors){
        if(regexp.test(relayParam))
        dispatch(hidePopUp())
        else{
            dispatch(showPopUp({message:err, column: column}));
            errors.col3='err';
        }
    }

    const validate = (values) => {
        const errors = {};
        switch(tableCellParams.at(-1).table){
            case 'currentTable':
                for(let cell of tableCellParams){
                    switch(cell.column){
                        case 0:
                            checkFormat(/^[^\s].{0,19}$/, values.newRelayParam[0], 'zzz', 'column0', errors)
                        break;
                        case 2:
                            checkFormat(/^(?!0\d+\.\d*$|0\d*$)\d+(\.\d+)?$/, values.newRelayParam[2], 'yyy', 'column2', errors)
                        break;
                        case 3:
                            checkFormat(/^(19[0-9][0-9]|20[0-9][0-9]|21[0-4][0-9]|215[0-5])$/, values.newRelayParam[3], 'ppp', 'column3', errors);
                        break;
                        case 4: 
                            checkFormat(/^[1-9]\d{0,2}$/, values.newRelayParam[4], 'ooo', 'column4', errors)
                        break;
                    }
                }             
            break;           
        }
        return errors;
    };

    return(
        <>
        <Formik 
            initialValues={{newRelayParam:['','','','','','']}}
            validate={validate}
            validateOnChange={false}
            onSubmit={(values)=>{
                let newItem = [...oldItem];
                console.log(values);
                //values.newRelayParam.map((item, index)=>{if(item!=='') newItem[index]=item});
                // AddNewPressed
                // ? dispatch(postNewItem({substation, newItem, tableID: tableCellParams.at(-1).table}))
                // : dispatch(updateItem({substation, newItem, oldItem, tableID: tableCellParams.at(-1).table}))
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

                        <CurrentRelays currentRelays={currentRelays} setFieldValue={setFieldValue} substation={substation}/>
                        <VoltageRelays voltageRelays={voltageRelays} setFieldValue={setFieldValue} substation={substation}/>
                        <MeasuringInstruments measuringInstruments={measuringInstruments} setFieldValue={setFieldValue} substation={substation}/>
                        <CurrentTransformers currentTransformers={currentTransformers} setFieldValue={setFieldValue} substation={substation}/>
                        <ItemModal />
                    </Form>
                )
            }
        </Formik>
        </>
    );
}

export default Relays;