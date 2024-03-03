import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Button, Card, Navbar, Col, Row } from 'react-bootstrap';
import CurrentRelays from './filteredRelays/currentRelays';

const FilteredRelays = ({currentRelays})=>{

    return(
        <>
        <Card className="card">
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Row className='headerCol'>
                    <Button className='navButton' variant="secondary" >Back</Button>
                    <div class="vertical-separator"></div>
                    <Button className='navButton' variant="info"
                    >
                        Filter
                    </Button>
                </Row>
                <h1>Relay equipment</h1>
            </Navbar>
        </Card>
        <CurrentRelays currentRelays={currentRelays} />
        </>
    )
}

export default FilteredRelays;