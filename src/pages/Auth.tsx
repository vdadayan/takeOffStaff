import React, {useEffect} from 'react';
import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {authAction} from "../redux/actionCreators/authAction";
import {useNavigate} from "react-router-dom";
import {isAuthAction} from "../redux/reducers/authSlice";

export type Inputs = {
    login: string,
    password: string,
    required?: boolean,
};

const Auth = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const {login, password, isAuth} = useAppSelector(state => state.authReducer)
    const onSubmit: SubmitHandler<Inputs> = data => {
        if (!errors.password) {
            if (login === data.login && password === data.password) {
                dispatch(isAuthAction())
            }
        }
    };
    useEffect(() => {
        dispatch(authAction())
    }, [])
    if (isAuth) navigate('/contacts')
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div style={{display: "flex", flexDirection: "column", maxWidth: 300, margin: 50}}>
                <TextField {...register('login', {required: true})} label={'login'} variant="outlined"
                           style={{marginBottom: 20}}/>
                {errors.login && <span>This field is required</span>}
                <TextField {...register('password', {required: true})} label={'password'} variant="outlined"
                           type={"password"} style={{marginBottom: 20}}/>
                {errors.password && <span>This field is required</span>}
                <Button type={'submit'} variant="contained">send</Button>
            </div>
        </form>
    );
};

export default Auth;
