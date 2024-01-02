import React, {useState, useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Test = ({ txt }) => {
    const [tx, setTxt] = useState(txt);
    const [obj, setObj] = useState("Substation");
    const s_f = useRef(getFiders);
  
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
    
            if (path.startsWith('/')) {
                const parts = path.split('/').filter(Boolean);
                console.log(parts.length);
    
                if (parts.length === 0) {
                    setObj("Substation");
                    s_f.current = getFiders;
                } else if (parts.length === 1) {
                    setObj(decodeURIComponent(parts[0]));
                    s_f.current = getRelays;
                }
            }
        };
        handlePopState();
    }, []);
  
    async function getFiders(substation, fider) {
      const resp = await fetch(`/${substation}`, {
        method: 'GET',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
  
      resp.json().then(({ data, url }) => {
        setTxt(data);
        window.history.pushState({}, '', url);
      });
      setObj(substation);
      s_f.current = getRelays;
    }
  
    async function getRelays(fider, substation) {
      const resp = await fetch(`/${substation}/${fider}`, {
        method: 'GET',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
    }
  
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr><th>{obj}</th></tr>
          </thead>
          <tbody>
            {tx.map(function (item, index) {
              return <tr key={index}>
                <td>
                  <Button variant='link' size='sm' onClick={() => s_f.current(item, obj)}>{item}</Button>
                </td>
              </tr>
            })}
          </tbody>
        </Table>
      </>
    );
};
  
export default Test;