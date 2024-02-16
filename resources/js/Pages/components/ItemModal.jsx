import React from 'react';
import { Formik, Form, Field} from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import {Button, Modal} from 'react-bootstrap';
import { itemModal, hideItemModal, insertItem, } from '../../features/relaysSlice';
import { useSelector, useDispatch, } from 'react-redux';

export default function ItemModal(){
    const show = useSelector(itemModal);
    const dispatch = useDispatch();

    return (
        <>
            <Modal show={show} onHide={()=>dispatch(hideItemModal())} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Enter a new item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input id="modalItemField" type="text" autoFocus required></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" 
                        onClick={()=>{
                            const input = document.getElementById('modalItemField');
                            if(input.value!==''){
                                dispatch(insertItem(input.value));
                                dispatch(hideItemModal());
                            }
                        }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}