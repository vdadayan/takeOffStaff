import React, {FC, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addContactAction, contactAction} from "../redux/actionCreators/contactAction";
import Contact from "../components/Contact";
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

export type InputsContact = {
    name: string,
    search: string
};

const Contacts: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {contacts, error, isLoading} = useAppSelector(state => state.contactReducer)
    const {register, handleSubmit, formState: {errors}} = useForm<InputsContact>();
    const {isAuth} = useAppSelector(state => state.authReducer)
    const onSubmit: SubmitHandler<InputsContact> = async (data) => {
        const user = {
            ...data,
            id: Math.random()
        }
        await dispatch(addContactAction(user))
        await dispatch(contactAction(''))
    };

    const searchContacts: SubmitHandler<InputsContact> = async (data) => {
        console.log(data)
        await dispatch(contactAction(data.search))
    }
    useEffect(() => {
        dispatch(contactAction(''))
    }, [])
    if (!isAuth) navigate('/')
    if (error) return <>{error}</>
    return (
        <div>
            <Link to={'/'} style={{display: "flex", marginBottom: 20}}> Назад </Link>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <TextField className={'text-field'} {...register('name')} label={'Введите имя'} variant="outlined"/>
                <Button type={'submit'} variant="contained">Добавить контакт</Button>
            </form>
            <form action="" onChange={handleSubmit(searchContacts)}>
                <TextField className={'text-field'} {...register('search')} label={'Поиск по контактам'}
                           variant="outlined"/>
            </form>

            {!isLoading && <div>
                {contacts?.map(contact => {
                    return <Contact key={contact.id} {...contact}/>
                })}
            </div>}
        </div>
    );
};

export default Contacts;
