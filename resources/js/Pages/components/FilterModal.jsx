import React from 'react';
import { Formik, Form, Field} from "formik";
import { useSelector, useDispatch, } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { selectFilterModal, getFilterRelays, hideFilter } from '../../features/filterSlice';
import { showPopUp, hidePopUp } from '../../features/relaysSlice';
import '../../../css/filter form.css';


export default function Filter(){

    const show = useSelector(selectFilterModal);
    const dispatch = useDispatch();

    const validate = (values)=>{
        const errors = {};
        if(values.nextVerification.length===4 || values.nextVerification.length===7 || values.nextVerification.length===10 || values.nextVerification.length===0) dispatch(hidePopUp())
        else {
            dispatch(showPopUp({message:'pip', column: 'nextVerification'}));
            errors.col3='err';
        }
        return errors;
    }

    return (
        <>
      <Modal show={show} size="lg" backdrop="static" className='filterEquipment'
        onHide={()=>{
            dispatch(hideFilter());
            dispatch(hidePopUp());
        }}
      >
        <Modal.Header closeButton> <Modal.Title>Filter</Modal.Title> </Modal.Header>
        <Modal.Body>
            <Formik 
                initialValues={{ substation:'', fider:'', relayType:'', relayRange:'', voltageRelayType:'', voltageType:'', device:'', deviceType:'',
                limit:'', nextVerification:'', transType:'', coil_05:'', coil_10p:'', year:'', }}
                validate={validate} 
                validateOnChange={false}
                onSubmit={(values)=>{
                    dispatch(getFilterRelays(values));
                    dispatch(hideFilter());
                }}
            >
                <Form>
                <Container className='filterBody'>
                    <Row className='bodyRow'>
                    <Col>
                        <label htmlFor="substation">Substation</label>
                        <Field name="substation" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="fider">Fider</label>
                        <Field name="fider" type="text" className="form-control" autoComplete="off"/>           
                    </Col>
                    <Col>
                        <label htmlFor="relayType">Year</label>
                        <Field name="year" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    </Row>
                    <Row className='bodyRow'>
                    <Col>
                        <label htmlFor="relayType">Current relay type</label>
                        <Field name="relayType" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="relayType">Current relay range</label>
                        <Field name="relayRange" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    </Row>
                    <Row className='bodyRow'> 
                    <Col>
                        <label htmlFor="voltageRelayType">Voltage relay type</label>
                        <Field name="voltageRelayType" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="voltageType">=/~ (For voltage relays only)</label>
                        <Field name="voltageType" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    </Row>
                    <Row className='bodyRow'>
                    <Col>
                        <label htmlFor="device">M.I., device</label>
                        <Field name="device" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="deviceType">M.I., type</label>
                        <Field name="deviceType" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="limit">M.I., limit</label>
                        <Field name="limit" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="nextVerification">Next verifacation</label>
                        <Field name="nextVerification" type="text" className="form-control" autoComplete="off" id="nextVerification" />
                    </Col>
                    </Row>
                    <Row className='bodyRow'>
                    <Col>
                        <label htmlFor="transType">Current trans, type</label>
                        <Field name="transType" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="coil_05">Coil 0.5</label>
                        <Field name="coil_05" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    <Col>
                        <label htmlFor="coil_10p">Coil 10P</label>
                        <Field name="coil_10p" type="text" className="form-control" autoComplete="off"/>
                    </Col>
                    </Row>
                </Container>

                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button> 
                </Modal.Footer>
                </Form>
            </Formik>        
        </Modal.Body>
      </Modal>
    </>
    )
}