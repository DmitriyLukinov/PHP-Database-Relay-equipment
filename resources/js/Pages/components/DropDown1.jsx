import React, {useEffect,} from 'react';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {selectdropDown1, showItemModal, } from '../../features/relaysSlice';

export default function DropDown1({setFieldValue}){

    const dispatch = useDispatch();
    const items = useSelector(selectdropDown1);
    useEffect(()=>{setFieldValue("newRelayParam[0]", items[0][0])}, []);

    return(
        <Field name = "newRelayParam[0]" id = "column0" as="select" 
            onInput={(e)=>{e.currentTarget.value==="addNew" ? dispatch(showItemModal()) : null}}
        >
            {items[0].map((item, index)=>{
                return(<option key={index} value={item}>{item}</option>);
            })}
            <option value="addNew">Add new</option>
        </Field>
    );
}
