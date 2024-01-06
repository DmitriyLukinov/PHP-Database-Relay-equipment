import React, {useState, useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { getSubstations, getFiders, getRelays, selectSubctation, selectName } from '../features/subst_fiderSlice';

const Test = ({ txt }) => {
    //const [tx, setTxt] = useState(txt);
    //const [obj, setObj] = useState("Substation");
    // const s_f = useRef(getFiders);
  
    // useEffect(() => {
    //     const handlePopState = () => {
    //         const path = window.location.pathname;
    
    //         if (path.startsWith('/')) {
    //             const parts = path.split('/').filter(Boolean);
    //             console.log(parts.length);
    
    //             if (parts.length === 0) {
    //                 setObj("Substation");
    //                 s_f.current = getFiders;
    //             } else if (parts.length === 1) {
    //                 setObj(decodeURIComponent(parts[0]));
    //                 s_f.current = getRelays;
    //             }
    //         }
    //     };
    //     handlePopState();
    // }, []);
  
    // async function getRelays(fider, substation) {
    //   const resp = await fetch(`/${substation}/${fider}`, {
    //     method: 'GET',
    //     headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //   });
    // }

    const name = useSelector(selectName);
    const subs = useSelector(selectSubctation);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getSubstations(txt));
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
        <Table striped bordered hover>
          <thead>
            <tr><th>{name}</th></tr>
          </thead>
          <tbody>
            {subs.map(function (item, index) {
              return <tr key={index}>
                <td>
                  <Button variant='link' size='sm' onClick={() => {
                      fiders_relays(item, name)
                    }}>{item}
                  </Button>
                </td>
              </tr>
            })}
          </tbody>
        </Table>
      </>
    );
};
  
export default Test;