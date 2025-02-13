import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import React, { useState } from 'react';
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

function Login() {
    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const HandleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const api_url = process.env.REACT_APP_API_URL;
                const response = await axios.post(`${api_url}/login`, values);
                alert("Login successful!");
                navigate('/home');
            } catch (error) {
                console.error("Login failed:", error.response?.data || error);
                alert("Login failed! Check your credentials.");
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label><strong>Email</strong></label>
                        <input type="email" name='email' value={values.email} onChange={HandleInput} className='form-control' />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>

                    <div className='mb-3'>
                        <label><strong>Password</strong></label>
                        <input type="password" name='password' value={values.password} onChange={HandleInput} className='form-control' />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>

                    <button type="submit" className='btn btn-success w-100'>Login</button>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none mt-2'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;


