import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Button, Card, Navbar, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import CurrentRelays from './filteredRelays/currentRelays';
import VoltageRelays from './filteredRelays/voltageRelays';
import MeasuringInstruments from './filteredRelays/MeasuringInstruments';
import CurrentTransformers from './filteredRelays/CurrentTransformers';
import Filter from './components/FilterModal';
import { showFilter, back } from '../features/filterSlice';
import ErrorMessage from './components/ErrorMessage';
import '../../css/common styles.css';

const FilteredRelays = ({currentRelays, voltageRelays, measInstruments, currentTranses})=>{

    const dispatch = useDispatch();

    return(
        <>
        <Card className="card">
            <Navbar expand="lg" className="navBar" fixed="top">
                <Col className='headerCol'>
                    <Button className='navButton' variant="secondary" onClick={()=>dispatch(back())}>
                        Back
                    </Button>
                    <div class="vertical-separator"></div>
                    <Button className='navButton' variant="info" onClick={()=>{dispatch(showFilter())}}>
                        Filter
                    </Button>
                </Col>
                <h1>Relay equipment</h1>
            </Navbar>
        </Card>
        {currentRelays.length > 0 ? <CurrentRelays currentRelays={currentRelays} /> :null}
        {voltageRelays.length > 0 ? <VoltageRelays voltageRelays={voltageRelays} /> : null}
        {measInstruments.length > 0 ? <MeasuringInstruments measInstruments={measInstruments} /> : null}
        {currentTranses.length > 0 ? <CurrentTransformers currentTranses={currentTranses} /> : null}
        <Filter />
        <ErrorMessage />
        </>
    )
}

export default FilteredRelays;