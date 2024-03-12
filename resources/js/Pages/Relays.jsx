import React from 'react';
import { Formik, Form, } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Button, Card, Navbar, Col } from 'react-bootstrap';
import CurrentRelays from './relays/CurrentRelays';
import VoltageRelays from './relays/VoltageRelays';
import MeasuringInstruments from './relays/MeasuringInstruments';
import CurrentTransformers from './relays/CurrentTransformers';
import { useSelector, useDispatch } from 'react-redux';
import {abort, postNewItem, updateItem, selectItemToChange, selecttableCellParams, selectAddNewPressed, showPopUp,
    hidePopUp, 
} from '../features/relaysSlice';
import ItemModal from './components/ItemModal';
import Filter from './components/FilterModal';
import { showFilter } from '../features/filterSlice';
import { getFidersBack } from '../features/subst_fiderSlice';

const Relays = ({currentRelays, voltageRelays, measuringInstruments, currentTransformers, substation})=>{

    let oldItem = useSelector(selectItemToChange);
    const AddNewPressed = useSelector(selectAddNewPressed);
    const tableCellParams = useSelector(selecttableCellParams);
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
        if(tableCellParams.length>0){
            switch(tableCellParams.at(-1).table){
                case 'currentTable':
                case 'voltageTable':
                    for(let cell of tableCellParams){
                        switch(cell.column){
                            case 0:
                                checkFormat(/^[^\s].{0,5}$/, values.newRelayParam[0], 'zzz', 'column0', errors)
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
                case 'measuringTable':
                    for(let cell of tableCellParams){
                        switch(cell.column){
                            case 0:
                                checkFormat(/^[^\s].{0,29}$/, values.newRelayParam[0], 'zzz', 'column0', errors)
                            break;
                            case 1:
                                checkFormat(/^[^\s].{0,19}$/, values.newRelayParam[1], 'zzz', 'column1', errors)
                            break;
                            case 2:
                                checkFormat(/^\d+(\.\d+)?-\d+(\.\d+)? [A-Za-zА-Яа-я]+$/, values.newRelayParam[2], 'yyy', 'column2', errors)
                            break;
                            case 3:
                                checkFormat(/^(19[0-9][0-9]|20[0-9][0-9]|21[0-4][0-9]|215[0-5])$/, values.newRelayParam[3], 'ppp', 'column3', errors);
                            break;
                            case 4: 
                                checkFormat(/^[1-9]\d{0,10}$/, values.newRelayParam[4], 'ooo', 'column4', errors)
                            break;
                            case 5:
                                checkFormat(/^(?:19|20)\d\d-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-9]|3[01])|(?:0[13-9]|1[0-2])-(?:0[1-9]|1\d|2[0-9]|30)|(?:0[13578]|1[02])-31)$/, values.newRelayParam[5], 'pup', 'column5', errors)
                            break;
                        } 
                    }
                break;
                case 'transTable':
                    for(let cell of tableCellParams){
                        switch(cell.column){
                            case 0:
                                checkFormat(/^[^\s].{0,5}$/, values.newRelayParam[0], 'zzz', 'column0', errors)
                            break;
                            case 1:
                                checkFormat(/^[1-9]\d{0,5}\/[1-9]\d{0,5}$/, values.newRelayParam[1], 'yyy', 'column1', errors)
                            break;
                            case 2:
                                checkFormat(/^[1-9]\d{0,5}\/[1-9]\d{0,5}$/, values.newRelayParam[2], 'kkk', 'column2', errors)
                            break;
                            case 3:
                                checkFormat(/^(19[0-9][0-9]|20[0-9][0-9]|21[0-4][0-9]|215[0-5])$/, values.newRelayParam[3], 'ppp', 'column3', errors)
                            break;
                            case 4:
                                checkFormat(/^[1-9]\d{0,10}$/, values.newRelayParam[4], 'ooo', 'column4', errors)
                            break;
                        }
                    }
                break;           
            }
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
                if(tableCellParams.length>0){
                    let newItem = [...oldItem];
                    values.newRelayParam.map((item, index)=>{if(item!=='') newItem[index]=item});
                    AddNewPressed
                    ? dispatch(postNewItem({substation, newItem, tableID: tableCellParams.at(-1).table}))
                    : dispatch(updateItem({substation, newItem, oldItem, tableID: tableCellParams.at(-1).table}))
                }              
            }}>
            {
                ({ setFieldValue, setValues }) =>(
                    <Form>
                        <Card className="card">
                            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                                <Col className='headerCol'>
                                    <Button className='navButton' variant="secondary" onClick={()=>{
                                        let path = window.location.pathname;
                                        let parts = path.split('/').filter(Boolean);
                                        dispatch(abort());
                                        dispatch(getFidersBack(decodeURIComponent(parts[0])));
                                    }}>
                                        Back
                                    </Button>
                                    <Button className='navButton' variant="secondary" type="button"
                                        onClick={()=>{
                                            dispatch(abort());
                                            setValues({newRelayParam:['','','','','','']});                                                                       
                                        }}>
                                        Abort
                                    </Button>
                                    <Button className='navButton' variant="secondary" type="submit">Apply changes</Button>
                                    <div class="vertical-separator"></div>
                                    <Button className='navButton' variant="info"
                                        onClick={()=>{
                                            tableCellParams.length===0 ? dispatch(showFilter()) : null;
                                        }}
                                    >
                                        Filter
                                    </Button>
                                </Col>
                                <h4>{substation[0]}-</h4><h4>{substation[1]}</h4>
                                <h1>Relay equipment</h1>
                            </Navbar>
                        </Card>

                        <CurrentRelays currentRelays={currentRelays} setFieldValue={setFieldValue} substation={substation}/>
                        <VoltageRelays voltageRelays={voltageRelays} setFieldValue={setFieldValue} substation={substation}/>
                        <MeasuringInstruments measuringInstruments={measuringInstruments} setFieldValue={setFieldValue} substation={substation}/>
                        <CurrentTransformers currentTransformers={currentTransformers} setFieldValue={setFieldValue} substation={substation}/>
                        <ItemModal setFieldValue={setFieldValue}/>                       
                    </Form>
                )
            }
        </Formik>
        <Filter />
        </>
    );
}

export default Relays;