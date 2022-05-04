import React, {FC, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {contactAction} from "../redux/actionCreators/contactAction";
import Contact from "../components/Contact";
import {TextField} from "@mui/material";

const Contacts: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {contacts, error, isLoading} = useAppSelector(state => state.contactReducer)
    const {isAuth} = useAppSelector(state => state.authReducer)
    useEffect(() => {
        dispatch(contactAction())
    }, [])
    if (!isAuth) navigate('/')
    if (isLoading) return <>Loading...</>
    if (error) return <>{error}</>
    return (
        <div>
            <Link to={'/'} style={{display: "flex", marginBottom: 20}}>
                назад
            </Link>
            <TextField label={'Добавить контакт'} variant="outlined"
                       style={{marginBottom: 20}}/>
            <div>
                {contacts.map(contact => {
                    return <Contact key={contact.id} {...contact}/>
                })}
            </div>
        </div>
    );
};

export default Contacts;
