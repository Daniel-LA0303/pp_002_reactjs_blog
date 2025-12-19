import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLoginRequestI } from '../types/auth';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import { fetchLogin } from '../store/authSlice';

/**
 * icons
 */
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const Login = () => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const [error, setError] = useState<any>({});

    // route
    const route = useNavigate();

    /**
     * Redux section
     */
    const dispatch = useDispatch<AppDispatch>();
    const loadingAuth = useSelector((state: RootState) => state.auth.loading);

    // form data
    const [formData, setFormData] = useState<AuthLoginRequestI>({
        email: "",
        password: ""
    });

    /**
     * Functions section
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(formData.email === '' || formData.password === ''){
            setError({
                message: "All fields are requiered"
            })
            return;
        }

        try {
            await dispatch(fetchLogin(formData)).unwrap();
            route("/home-dev");
        } catch (error: any) {
            console.log(error);
            setError(error);
        }
    };

    if (loadingAuth) {
        return <Spinner />;
    }

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <main className="relative z-10 flex w-full max-w-4xl flex-row items-stretch rounded-xl bg-white/60 dark:bg-slate-900/60 shadow-2xl shadow-slate-300/10 dark:shadow-slate-950/20 backdrop-blur-lg">

                    <div className="flex w-full flex-col p-8 md:w-1/2 md:p-10 bg-white">
                        <div className="mb-6 flex flex-col items-center">
                            <div className="flex h-12 w-full items-center justify-center rounded-full bg-primary mb-4">
                                <span className=" text-white text-3xl">BLOG LA</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Welcome Again!</h1>
                            <p className="mt-2 text-base font-normal text-slate-600">Login to continue create Blogs!</p>
                        </div>
                        <form
                            className="w-full"
                            onSubmit={handleSubmit}
                        >

                            <p className='text-red-500 text-center font-bold text-lg'>{error?.message === "All fields are requiered" ? error?.message : ""}</p>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <p className='text-red-500'>{error?.message === "User not found" ? error?.message : ""}</p>
                                    <label className="text-sm font-medium text-[#0d121b] pb-2" htmlFor="email">Email</label>
                                    <div className="relative flex w-full items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-slate-400"><AccountCircleOutlinedIcon /></span>
                                        <input
                                            className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light/50 dark:bg-background-dark/50 p-3 pl-11 text-base font-normal text-[#0d121b] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:border-primary"
                                            id="email"
                                            name='email'
                                            placeholder="example@example.com"
                                            type="text"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className='text-red-500'>{error?.message === "Invalid credentials" ? error?.message : ""}</p>
                                    <div className="flex items-center justify-between pb-2">
                                        <label className="text-sm font-medium text-[#0d121b]" htmlFor="password">Password</label>
                                        <Link to={"/reset-password"} className="text-sm font-normal text-blue-500 hover:underline" >forget your password?</Link>
                                    </div>
                                    <div className="relative flex w-full items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-slate-400"><LockOpenOutlinedIcon /></span>

                                        <input
                                            className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light/50 dark:bg-background-dark/50 p-3 px-11 text-base font-normal text-[#0d121b] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:border-primary"
                                            id="password"
                                            name="password"
                                            placeholder="Introduce your password"
                                            type={`${viewPassword ? 'text' : 'password'}`}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            onClick={() => setViewPassword(!viewPassword)}
                                            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            type="button"
                                        >
                                            <span className="material-symbols-outlined">{viewPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-blue-500 text-base font-medium text-white transition-colors hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                                type="submit"
                            >Login</button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-base font-normal text-slate-600">Sign up Here <Link to={"/register"} className="font-medium text-blue-500 hover:underline">New account</Link></p>
                            <Link to={"/"} className="font-medium text-blue-500 hover:underline">Visit site without login</Link>
                        </div>
                    </div>

                    <div className="hidden w-1/2 md:flex relative flex-col items-center justify-center overflow-hidden rounded-r-xl bg-gradient-to-r from-blue-500 via-blue-500 to-[#423c3c]">

                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/30"></div>
                        <div className="relative flex flex-col items-center gap-6 text-center px-12">

                            {/* Icono principal */}
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white backdrop-blur-sm">
                                <img src="/login.png" alt="" />
                            </div>

                            {/* Texto */}
                            <h2 className="text-3xl font-semibold text-white">
                                Welcome back
                            </h2>

                            <p className="text-white/80 text-lg max-w-md">
                                Continue where you left off and keep building amazing things.
                            </p>

                            {/* Badges suaves */}
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                                    <LockOpenOutlinedIcon /> Secure access
                                </span>
                                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                                    <BoltOutlinedIcon /> Fast login
                                </span>
                                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
                                    <RocketLaunchOutlinedIcon /> Continue your work
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-10 left-10 right-10 text-center">
                            <p className="text-white/70 text-base">
                                Your ideas are waiting for you.
                            </p>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
};

export default Login;