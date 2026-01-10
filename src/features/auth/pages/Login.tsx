import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLoginRequestI, AuthSuccessResponseI } from '../types/auth';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import { fetchLogin, resetAuthError } from '../store/authSlice';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { AppContext } from '../../../context/AppContext';
import ModalError from '../../../components/Modals/ModalError';
import { ApiResponse } from '../../../types/global';

const Login = () => {

    // context when there is an error
    const { showError, handleCloseModal, openErrorModal, errorModalMessage} = useContext(AppContext);

    // route
    const route = useNavigate();

    /**
     * Redux section
     */
    const dispatch = useDispatch<AppDispatch>();
    const loadingAuth = useSelector((state: RootState) => state.auth.loading);
    const errorAuth= useSelector((state: RootState) => state.auth.errorAuth);
    const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);

    // form data
    const [formData, setFormData] = useState<AuthLoginRequestI>({
        email: "",
        password: ""
    });

    /**
     * useEffect section
     */
    useEffect(() => {
        if (errorAuth) {
          console.error('Error to get the data');
        }
    } , [errorAuth]);

      // reset error
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);

        try {
            const res = await dispatch(fetchLogin(formData)).unwrap();
            route("/home-dev");
            console.log("res-auth", res);
        } catch (error: any) {
            console.log(error);
        }
    };

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

            <div className=" flex justify-center items-center h-screen">
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <div className='mx-auto w-full sm:w-5/6'>
                        <h1 className="text-2xl font-semibold mb-4">Login</h1>
                        <form onSubmit={handleSubmit}>
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
                                    type="text"
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

                            <div className="mb-4 flex items-center">
                                <FormControlLabel control={<Checkbox color="primary" />} label="Remember Me" />
                            </div>

                            <div className="mb-6 text-blue-500">
                                <a href="#" className="hover:underline">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                className="inline-block w-full border text-white border-blue-600 bg-blue-600 hover:text-blue-600 hover:bg-white font-semibold rounded-md py-2 px-6 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Login
                            </button>

                        </form>
                        <div className="mt-6 text-center">
                            <Link
                                to={"/register"}
                                className="inline-block w-full border text-blue-500 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-md py-2 px-6 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Sign up Here
                            </Link>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to={"/reset-password"}
                                className="inline-block w-full border text-blue-500 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-md py-2 px-6 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                I forget my password
                            </Link>
                        </div>

                    </div>
                </div>

                <div className="w-1/2 h-screen hidden lg:flex justify-center items-center bg-gradient-to-r from-blue-200 to-blue-600">
                    <img src="/team-login.png" alt="Placeholder Image" className="object-cover" />
                </div>
            </div>
        </>
    );
};

export default Login;