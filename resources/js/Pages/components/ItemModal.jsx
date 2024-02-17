import React from 'react';
import { Formik, Form, Field} from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import {Button, Modal} from 'react-bootstrap';
import { itemModal, hideItemModal, selecttableCellParams, insertItem} from '../../features/relaysSlice';
import { useSelector, useDispatch, } from 'react-redux';

export default function ItemModal({setFieldValue}){
    const show = useSelector(itemModal);
    const dispatch = useDispatch();
    const tableCellParams = useSelector(selecttableCellParams);

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
                                tableCellParams.at(-1).column===0 ? setFieldValue("newRelayParam[0]", input.value): null;
                                tableCellParams.at(-1).column===1 ? setFieldValue("newRelayParam[1]", input.value): null;
                                tableCellParams.at(-1).column===2 ? setFieldValue("newRelayParam[2]", input.value): null;
                                
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