import 'bootstrap/dist/css/bootstrap.min.css'; //без этого импорта бутстрап не работает
import { Overlay, Popover } from 'react-bootstrap';
import { selectPopUp, selectErrorMessageText, selectColumnID } from '../../features/relaysSlice';
import { useSelector } from 'react-redux';

export default function ErrorMessage(){

    const show = useSelector(selectPopUp);
    const err = useSelector(selectErrorMessageText);
    const columnID = useSelector(selectColumnID);

    return(
        <Overlay target={document.getElementById(columnID)} show={show} placement="right">
            <Popover>
                <Popover.Header as="h3" id='incorrectFormat'>Incorrect format</Popover.Header>
                <Popover.Body>
                    <span>{err}</span>
                </Popover.Body>
            </Popover>
        </Overlay>
    )
}