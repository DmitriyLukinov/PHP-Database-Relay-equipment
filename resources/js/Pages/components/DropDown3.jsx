import React from 'react';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import {selectdropDown3} from '../../features/relaysSlice';

export default function DropDown3(){

    const items = useSelector(selectdropDown3);

    return(
        <Field as="select">
            {items[0].map((item, index)=>{
                return(<option key={index}>{item}</option>);
            })}
            <option>Add new</option>
        </Field>
    );
}