import React from 'react';
import { Field } from 'formik';

export default function DropDownACDC(){

    return(
        <Field as="select">
            <option>~</option>
            <option>=</option>
        </Field>
    );
}