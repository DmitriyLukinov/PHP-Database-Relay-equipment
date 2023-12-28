import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Test = ({txt}) => {

    const [tx, setTxt] = useState(txt);

    async function serve(substation) {
        const resp = await fetch(`/s?sbst=${substation}`, {
            method: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        });

        resp.json().then(({data, url})=>{
            setTxt(data);
            window.history.pushState({}, '', url);
        })
    }

    return (
        <>
            <Table striped bordered hover>
            <thead>
                <tr><th>Substation</th></tr>
            </thead>
            <tbody>
                {tx.map(function(item, index){
                    return <tr key={index}>
                        <td>
                            <Button variant='link' size='sm' onClick={() => serve(item)}>{item}</Button>
                        </td>
                    </tr>
                })}               
            </tbody>
            </Table>
        </>
    );
};

export default Test;