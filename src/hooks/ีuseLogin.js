import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios";
import Swal from "sweetalert2";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        axios
            .post(`${process.env.REACT_APP_API}/user/login`, { email, password })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response))

                dispatch({type:'LOGIN', payload:response})
                setIsLoading(false)

                Swal.fire("Notification", "Login Successful", "success");
            })
            .catch((err) => {
                Swal.fire("Notification", err.response, "error");
                setIsLoading(false)
                setError(err)
            });
    };

    return {login, isLoading, error}
}


