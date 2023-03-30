import './InboxEmailItem.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../store/ui-slice";
import { Button } from "react-bootstrap";



const InboxEmailItem = (props) => {

    const isRead = useSelector(state => state.ui.isRead);

    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const openEmailHandler = () => {
        setShow(!show)
        dispatch(uiActions.setRead(true))
    }

    return (
        <>
            <tr style={{backgroundColor: `${isRead === false ? 'lightblue' : 'white'}`}}>
                <td>{props.toEmail}</td>
                <td><Button variant="success" onClick={openEmailHandler}>Open Email</Button></td>
            </tr>

            {show && <h2>{props.body}</h2>}
        </>
    )

}

export default InboxEmailItem;