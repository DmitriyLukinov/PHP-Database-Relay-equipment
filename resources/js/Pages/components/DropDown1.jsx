import React, {useEffect} from 'react';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {selectdropDown1, showItemModal, selectNewSelectValue1} from '../../features/relaysSlice';

export default function DropDown1({setFieldValue}){

    const dispatch = useDispatch();
    const items = useSelector(selectdropDown1);
    const newSelectValue1 = useSelector(selectNewSelectValue1);
    useEffect(()=>{setFieldValue("newRelayParam[0]", items[0][0])}, []);

    return(
        <Field name = "newRelayParam[0]" as="select" value={newSelectValue1}
            onInput={(e)=>{e.currentTarget.value==="addNew" ? dispatch(showItemModal()) : null}}
        >
            {items[0].map((item, index)=>{
                return(<option key={index} value={item}>{item}</option>);
            })}
            <option value="addNew">Add new</option>
        </Field>
    );
}
