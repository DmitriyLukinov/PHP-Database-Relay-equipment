import React from 'react';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import {selectdropDown2} from '../../features/relaysSlice';

export default function DropDown2(){

    const items = useSelector(selectdropDown2);

    return(
        <Field as="select">
            {items[0].map((item, index)=>{
                return(<option key={index}>{item}</option>);
            })}
            <option>Add new</option>
        </Field>
    );
}