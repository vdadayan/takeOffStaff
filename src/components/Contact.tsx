import React, {FC} from 'react';
import {IContacts} from "../types/contactType";
import {useAppDispatch} from "../hooks/redux";
import {contactAction, removeContactAction} from "../redux/actionCreators/contactAction";

const Contact: FC<IContacts> = (props) => {
    const dispatch = useAppDispatch()
    const handleDelete = async (id: number) => {
        await dispatch(removeContactAction(id))
        await dispatch(contactAction())
    }
    return (
        <div className='contact'>
            <p className='contact__text'>{`${props.name} ${props.surname}`}</p>
            <button type={"button"} onClick={e => handleDelete(props.id)}>удалить</button>
        </div>
    );
};

export default Contact;
