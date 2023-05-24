import React, { useState } from 'react'
import Navbar from '../../components/common/navbar/navbar'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const submitForm = async (e) => {
        await login(email, password);
        e.preventDefault()
    }

    const adminLogin = async () => {
        await login('Havedist@gmail.com', 'ssdsdA**A56Sf');
    };

    const userLogin = async () => {
        await login('test6@gmail.com', '.Awirut3526293')
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Navbar />
            <div class="divform p-3">
                <form onSubmit={submitForm}>
                    <div class="h1 d-flex justify-content-center fw-bold">Login <i class="m-1 fw-bold bi bi-box-arrow-in-left"></i></div>
                    <p className='d-flex justify-content-center'>Login to First Draw website!</p>

                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-envelope-fill"></i></span>
                            <input
                                type="email" class="form-control"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon2"><i class="bi bi-lock-fill"></i></span>
                            <input
                                type="password"
                                class="form-control"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>
                    <div class="mb-3 form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="" />
                        <label class="form-check-label" for="">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                    <a type='button' className='btn' onClick={adminLogin}>admin</a>
                    <a type='button' className='btn' onClick={userLogin}>user</a>
                </form>
                <div class="text-center mt-3">Don’t have an account?<Link to="/regsiter">Register</Link></div>
            </div>

        </div>
    )
}

export default Login