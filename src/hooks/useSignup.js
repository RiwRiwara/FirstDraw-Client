import React, { useState,  } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (displayname, email, password) => {
        setIsLoading(true)
        setError(null)

        axios
            .post(`${process.env.REACT_APP_API}/signup`, { displayname, email, password })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response))

                dispatch({type:'LOGIN', payload:response})
                setIsLoading(false)

                Swal.fire("Notification", "Register Successful!", "success");
                navigate('/login', { replace: true });
            })
            .catch((err) => {
                Swal.fire("Notification", err.response.data.error, "error");
                setIsLoading(false)
                setError(err)
            });
    };

    return {signup, isLoading, error}
}


