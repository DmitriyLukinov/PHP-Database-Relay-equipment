import React, {useEffect} from 'react';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {selectdropDown3, showItemModal, selectNewSelectValue3} from '../../features/relaysSlice';

export default function DropDown3({setFieldValue}){

    const dispatch = useDispatch();
    const items = useSelector(selectdropDown3);
    const newSelectValue3 = useSelector(selectNewSelectValue3);
    useEffect(()=>{setFieldValue("newRelayParam[2]", items[0][0])}, []);

    return(
        <Field name = "newRelayParam[2]" as="select" value={newSelectValue3}
            onInput={(e)=>{e.currentTarget.value==="addNew" ? dispatch(showItemModal()) : null}}
        >
            {items[0].map((item, index)=>{
                return(<option key={index}>{item}</option>);
            })}
            <option value="addNew">Add new</option>
        </Field>
    );
}