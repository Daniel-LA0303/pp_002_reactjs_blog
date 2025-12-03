import { TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSuccessResponseI, SignUpRequestI } from '../../types/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchRegister, resetAuthError } from '../../slices/authSlice';
import { AppContext } from '../../context/AppContext';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import ModalError from '../../components/Tools/ModalError/ModalError';
import { ApiResponse } from '../../types/category';
import { fetchRegisterRequest } from '../../services/authService';

const Register = () => {

    // context when there is an error
    const { showError, handleCloseModal, openErrorModal, errorModalMessage} = useContext(AppContext);

    // route
    const route = useNavigate();

    /**
     * Redux section
     */
    // redux
    const dispatch = useDispatch<AppDispatch>();
    const loadingAuth = useSelector((state: RootState) => state.auth.loading);
    const errorAuth= useSelector((state: RootState) => state.auth.errorAuth);
    const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);

    // form data
    const [formData, setFormData] = React.useState<SignUpRequestI>({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    /**
     * useEffect section
     */

    useEffect(() => {
        if (errorAuth) {
          console.error('Error to get the data');
        }
    } , [errorAuth]);

    useEffect(() => {
        dispatch(resetAuthError());
    }, []);

    useEffect(() => {
        if (errorAuth && errorMessage?.status as number === 401) {
            console.log(errorMessage);
          
            showError(errorMessage);
        }
    }, [errorAuth]);

    useEffect(() => {
        if (!openErrorModal) {
            dispatch(resetAuthError());
        }
    }, [openErrorModal, dispatch]);

    /**
     * Functions section
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)

        if(formData.email === '' || formData.password === '' || formData.username === ''){
            console.log("All info is requiered");
            
            return
        }

        try {
            //const res = await dispatch(fetchRegister(formData)).unwrap();

            const res2 = await fetchRegisterRequest(formData);
            setMessage(res2.message);

            setTimeout(() => {
                route("/login")
            }, 3000)
            //route("/home-dev");
            console.log("res-auth", res2);
        } catch (error: any) {
            console.log(error);
        }
    }

    if (loadingAuth) {
        return <Spinner />;
    }
    
    return (
        <>
            <ModalError
                open={openErrorModal}
                message={errorModalMessage} 
                onClose={handleCloseModal}
            />
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:flex justify-center items-center bg-gradient-to-r from-blue-600 to-blue-200">
                    <img src="/auth-register.png" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <div className="mx-auto w-full sm:w-5/6">
                        {
                            message && 
                            <p className='text-red-400 font-bold text-sm mb-2'>{message}</p> 
                        }
                        <h1 className="text-2xl font-semibold mb-4">Register</h1>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <p className="text-red-400 font-bold text-sm mb-2">
                                    {errorAuth && errorMessage &&
                                    typeof errorMessage === "object" && "data" in errorMessage 
                                    ? (errorMessage as ApiResponse<AuthSuccessResponseI>).data.username
                                    : errorMessage && typeof errorMessage === "object" && errorMessage?.status === 401
                                    ? errorMessage?.message
                                    : null
                                    }
                                </p>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </div>

                            <div className="mb-4">
                                <p className="text-red-400 font-bold text-sm mb-2">
                                    {errorAuth && errorMessage &&
                                    typeof errorMessage === "object" && "data" in errorMessage 
                                    ? (errorMessage as ApiResponse<AuthSuccessResponseI>).data.email
                                    : errorMessage && typeof errorMessage === "object" && errorMessage?.status === 401
                                    ? errorMessage?.message
                                    : null
                                    }
                                </p>                                
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </div>

                            <div className="mb-4">
                                <p className="text-red-400 font-bold text-sm mb-2">
                                    {errorAuth && errorMessage &&
                                    typeof errorMessage === "object" && "data" in errorMessage 
                                    ? (errorMessage as ApiResponse<AuthSuccessResponseI>).data.password
                                    : errorMessage && typeof errorMessage === "object" && errorMessage?.status === 401
                                    ? errorMessage?.message
                                    : null
                                    }
                                </p>                               
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </div>

                            <div className="mb-6 text-blue-500">
                                <a href="#" className="hover:underline">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                className="inline-block w-full border text-white border-blue-600 bg-blue-600 hover:text-blue-600 hover:bg-white font-semibold rounded-md py-2 px-6 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Register
                            </button>
                            <div className="mt-6 text-center">
                                <Link
                                    to={"/login"}
                                    className="inline-block w-full border text-blue-500 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-md py-2 px-6 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Already have an account?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register