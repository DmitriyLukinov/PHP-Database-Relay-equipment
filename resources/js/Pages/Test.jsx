import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Test = ({txt}) => {

    return (
        <>
            <Table striped bordered hover>
            <thead>
                <tr><th>Substation</th></tr>
            </thead>
            <tbody>
                {txt.map(function(item, index){
                    return <tr key={index}>
                        <td>
                            {/* <Button variant='link' size='sm'> { item } </Button>*/}
                            <Link href="/s" method="get" data={{ sbst: item }} preserveState>{item}</Link>
                        </td>
                    </tr>
                })}               
            </tbody>
            </Table>
        </>
    );
};

export default Test;