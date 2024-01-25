import React, {useEffect} from 'react';
import { Field } from 'formik';

export default function DropDownACDC({setFieldValue}) {

    useEffect(()=>{setFieldValue("newRelayParam[1]", "~")}, []);

    return (
        <Field name="newRelayParame[1]" as="select" >
            <option value="~">~</option>
            <option value="=">=</option>
        </Field>
    );
}