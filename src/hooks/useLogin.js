import React, { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        axios
            .post(`${process.env.REACT_APP_API}/login`, { email, password })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response))
                localStorage.setItem('token', response.data.token);

                dispatch({type:'LOGIN', payload:response})
                
                setIsLoading(false)
                Swal.fire('Notification', 'Login Successful', 'success').then(() => {
                    navigate('/');
                });
            })
            .catch((err) => {
                setIsLoading(false)
                setError(err.response.data.error)
                Swal.fire("Notification", err.response.data.error, "error");


            });
    };

    return {login, isLoading, error}
}


