import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpValidation from './SignupValidation';

function Signup() {
    const [values, setValues] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const validationErrors = SignUpValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const api_url = process.env.REACT_APP_API_URL;
                await axios.post(`${api_url}/signup`, values);
                alert("Signup successful!");
                navigate("/");
            } catch (error) {
                console.error("Signup error:", error.response?.data || error);
                alert("Signup failed! Try again.");
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
            <div className='bg-white p-4 rounded w-25'>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <input type="text" name="name" placeholder="Name" className='form-control mb-3' value={values.name} onChange={handleInput} required />
                    {errors.name && <p className="text-danger">{errors.name}</p>}

                    <input type="email" name="email" placeholder="Email" className='form-control mb-3' value={values.email} onChange={handleInput} required />
                    {errors.email && <p className="text-danger">{errors.email}</p>}

                    <input type="password" name="password" placeholder="Password" className='form-control mb-3' value={values.password} onChange={handleInput} required />
                    {errors.password && <p className="text-danger">{errors.password}</p>}

                    <button type="submit" className='btn btn-success w-100'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;


