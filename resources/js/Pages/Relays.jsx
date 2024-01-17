import React, {useEffect} from 'react';
import { Formik, Form } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Button, Table, Card, Navbar, Col } from 'react-bootstrap';

const Relays = ({relays})=>{

    useEffect(()=>{console.log(relays)},[])

    return(
        <>
            <Formik>
                <Form>
                    <Card className="card">
                        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                            <Col className='headerCol'>
                                <Button className='navButton' variant="secondary" >Back</Button>
                                <Button className='navButton' variant="secondary">Abort</Button>
                                <Button className='navButton' variant="secondary" type="submit">Apply changes</Button>
                                <div class="vertical-separator"></div>
                                <Button className='navButton' variant="info">Filter</Button>
                            </Col>
                            <h4>OOO</h4>
                            <h1>Relay equipment</h1>
                        </Navbar>
                    </Card>
                </Form>
            </Formik>
        </>
    );
}

export default Relays;