import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Card, Navbar, Col } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { getSubstations, getFiders, addNew, enableReducting, getRelays, applyChanges, abort, back,
  setRedactingField, deleteObjectSF, selectSubctation, selectName, selectRow, selectItemToChange
} from '../features/subst_fiderSlice';
import Filter from './components/FilterModal';
import { showFilter } from '../features/filterSlice';
import ErrorMessage from './components/ErrorMessage';
import '../../css/common styles.css';
import '../../css/styleSF.css';

const Test = ({txt}) => {
 
  const name = useSelector(selectName);
  const subs = useSelector(selectSubctation);
  const row = useSelector(selectRow);
  const itemToChange = useSelector(selectItemToChange);
  const dispatch = useDispatch();

  useEffect(()=>{
    const handlePopState = ()=>{
      const path = window.location.pathname;
      if (path.startsWith('/')){
        const parts = path.split('/').filter(Boolean);
        if (parts.length === 0){ 
          dispatch(getSubstations({txt, name:"Substation"}));
        }
        else if(parts.length === 1){
          dispatch(getFiders(decodeURIComponent(parts[0])));
          setFunctionSwitch(false);
        }
      }
    }
    handlePopState();
  },[]);

  const [functionSwitch, setFunctionSwitch] = useState(true);
    
  function fiders_relays(substation, fider){
    if (functionSwitch){
      dispatch(getFiders(substation));
      setFunctionSwitch(false);
    }
    else{
      dispatch(getRelays({substation: fider, fider: substation}));
    }
  }
  
  return (
    <>
      <Formik initialValues={{sbs_fider:''}} 
        onSubmit= {(values)=>{
          dispatch(applyChanges({
            newItem: values.sbs_fider, itemToChange: itemToChange, substation: name, items: subs
          }));
          values.sbs_fider = '';
        }}>
        <Form>
          <Card className="card">
            <Navbar expand="lg" className='navBar' fixed="top">
              <Col className='headerCol'>
                <Button className='navButton' variant="secondary" 
                  onClick={()=>{
                    dispatch(back(name));
                    setFunctionSwitch(true);
                  }}>
                  Back
                </Button>
                <Button className='navButton' variant="secondary" onClick={()=>dispatch(abort())}>Abort</Button>
                <Button className='navButton' variant="secondary" type="submit">Apply changes</Button>
                <div class="vertical-separator"></div>
                <Button className='navButton' variant="info" 
                  onClick={()=>{itemToChange==='' ? dispatch(showFilter()) : null;}}>
                  Filter
                </Button>
              </Col>
              <h1>Relay equipment</h1>
            </Navbar>
          </Card>

          <Button className="addNew" variant="primary" size="sm" id='addNewSF'
            onClick={()=>{dispatch(addNew(row)); }}
          >
            Add new
          </Button>
          <Table striped bordered hover id='tableSF' className='tableClass'>
            <thead>
              <tr><th>{name}</th></tr>
            </thead>
            <tbody>
              {subs.map(function (item, index) {
                return <tr key={index}>
                  <td id='tdTableSF'>
                    {
                      enableReducting(index, row)
                      ?<Field name="sbs_fider" type="text" autoFocus id='substationFider'/>
                      :<Button variant='link' size='sm' id='data' onClick={() => {fiders_relays(item, name)}}>
                        {item}
                      </Button>
                    }
                    <Button className='tableButton' variant="primary" size="sm" 
                      onClick={(e)=>{dispatch(setRedactingField(e))}}>
                      Change
                    </Button>
                    <Button className='tableButton' variant="danger" size="sm"
                    onClick={(e)=>{dispatch(deleteObjectSF({e, substation: name, row: row}))}}>
                      Delete
                    </Button>
                  </td>
                </tr>
              })}
            </tbody>
          </Table>
          <ErrorMessage />
        </Form>        
      </Formik>
      <Filter />
    </>
  );
};
  
export default Test;