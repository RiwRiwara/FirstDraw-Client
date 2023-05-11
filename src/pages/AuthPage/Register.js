import Navbar from '../../components/common/navbar/navbar'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup';
import Swal from "sweetalert2";

function Register() {
    const navigate = useNavigate();
    const [displayname, setDisplayname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const {signup, err, isLoading} = useSignup()

    const submitForm = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            Swal.fire("Notification", "password does not match!", "error");
          }else{
              await signup(displayname, email, password)
              navigate('/login', { replace: true });
          }
    }

    return (
        <div>
            <Navbar />
            <div className="divform p-3">
                <form onSubmit={submitForm}>
                    <div className="h1 d-flex justify-content-center fw-bold">Register<i className="m-1 fw-bold bi bi-box-arrow-in-left"></i></div>
                    <p className='d-flex justify-content-center'>Membership to give special experience!</p>
                    <div class="mb-3">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-person-fill"></i></span>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Display name"
                                onChange={(e) => setDisplayname(e.target.value)}
                                value={displayname}
                                
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><i className="bi bi-envelope-fill"></i></span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon2"><i className="bi bi-lock-fill"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon3"><i className="bi bi-lock-fill"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-enter password" 
                                onChange={(e) => setPassword2(e.target.value)}
                                value={password2}
                                />

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></div>
            </div>

        </div>
    )
}

export default Register