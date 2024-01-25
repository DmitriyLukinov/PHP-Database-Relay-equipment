import React, {useEffect} from 'react';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import {selectdropDown1} from '../../features/relaysSlice';

export default function DropDown1({setFieldValue}){

    const items = useSelector(selectdropDown1);
    useEffect(()=>{setFieldValue("newRelayParam[0]", items[0][0])}, []);

    return(
        <Field name = "newRelayParam[0]" as="select">
            {items[0].map((item, index)=>{
                return(<option key={index} value={item}>{item}</option>);
            })}
            <option>Add new</option>
        </Field>
    );
}
