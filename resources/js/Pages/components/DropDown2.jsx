import React, {useEffect} from 'react';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {selectdropDown2, showItemModal, selectNewSelectValue2} from '../../features/relaysSlice';

export default function DropDown2({setFieldValue}){

    const dispatch = useDispatch();
    const items = useSelector(selectdropDown2);
    const newSelectValue2 = useSelector(selectNewSelectValue2);
    useEffect(()=>{setFieldValue("newRelayParam[1]", items[0][0])}, []);

    return(
        <Field name = "newRelayParam[1]" as="select" value={newSelectValue2}
            onInput={(e)=>{e.currentTarget.value==="addNew" ? dispatch(showItemModal()) : null}}
        >
            {items[0].map((item, index)=>{
                return(<option key={index}>{item}</option>);
            })}
            <option value="addNew">Add new</option>
        </Field>
    );
}