import React, {useEffect} from 'react';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import {selectdropDown2} from '../../features/relaysSlice';

export default function DropDown2({setFieldValue}){

    const items = useSelector(selectdropDown2);
    useEffect(()=>{setFieldValue("newRelayParam[1]", items[0][0])}, []);

    return(
        <Field name = "newRelayParam[1]" as="select">
            {items[0].map((item, index)=>{
                return(<option key={index}>{item}</option>);
            })}
            <option>Add new</option>
        </Field>
    );
}