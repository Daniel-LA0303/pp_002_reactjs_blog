import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpRequestI } from '../types/auth';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import { fetchRegisterRequest } from '../services/authService';

/**
 * icons
 */
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const Register = () => {

    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const [error, setError] = useState<any>({});
        const [message, setMessage] = useState<string>("");

    // context when there is an error
    // const { showError, handleCloseModal, openErrorModal, errorModalMessage } = useContext(AppContext);

    // route
    const route = useNavigate();

    /**
     * Redux section
     */
    // redux
    // const dispatch = useDispatch<AppDispatch>();
    const loadingAuth = useSelector((state: RootState) => state.auth.loading);
    // const errorAuth = useSelector((state: RootState) => state.auth.errorAuth);
    // const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);

    // form data
    const [formData, setFormData] = React.useState<SignUpRequestI>({
        username: "",
        email: "",
        password: ""
    });




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

        setError({});

        if (formData.email === '' || formData.password === '' || formData.username === '') {
            console.log("All info is requiered");

            return
        }

        try {
            const res2 = await fetchRegisterRequest(formData);
            setMessage(res2.message);

            setTimeout(() => {
                route("/login")
            }, 3000)
            //route("/home-dev");
            console.log("res-auth", res2);
        } catch (error: any) {
            console.log(error);
            setError(error);
        }
    }

    if (loadingAuth) {
        return <Spinner />;
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen'>

                {message && <p className='text-white text-center text-3xl mb-5 font-light bg-blue-500 px-8 py-3 rounded-full'>{message}</p>}
                <main className="relative z-10 flex w-full max-w-4xl flex-row items-stretch rounded-xl bg-white/60 dark:bg-slate-900/60 shadow-2xl shadow-slate-300/10 dark:shadow-slate-950/20 backdrop-blur-lg">

                    <div className="hidden w-1/2 flex-col items-center justify-center overflow-hidden rounded-r-xl md:flex relative bg-gradient-to-r from-blue-500 via-blue-500 to-[#423c3c]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 dark:from-primary/20 dark:to-black/30"></div>
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute top-[20%] left-[25%] animate-float">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-blue-300 px-4 py-2 text-lg font-medium hover:bg-blue-200 hover:text-white">#Blogs</span>
                            </div>
                            <div className="absolute top-[35%] right-[15%] animate-float-delay-1">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-300">#Tecnology</span>
                            </div>
                            <div className="absolute bottom-[30%] left-[10%] animate-float-delay-2">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-slate-200 px-5 py-2.5 text-xl font-semibold text-slate-700 hover:bg-slate-300">#Test</span>
                            </div>
                            <div className="absolute top-[55%] left-[40%] animate-float-delay-3">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-blue-300 px-3 py-1.5 text-base hover:bg-primary hover:text-white">#Inspiración</span>
                            </div>
                            <div className="absolute bottom-[20%] right-[30%] animate-float">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-slate-200 px-4 py-2 text-md text-slate-600 hover:bg-slate-300">#DevOps</span>
                            </div>
                            <div className="absolute top-[15%] right-[35%] animate-float-delay-2">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-300">#Containers</span>
                            </div>
                            <div className="absolute bottom-[45%] right-[5%] animate-float-delay-3">
                                <span className="tag-cloud-item cursor-pointer rounded-full bg-blue-300 px-3 py-1.5 text-sm hover:bg-primary hover:text-white">#Future</span>
                            </div>
                        </div>
                        <div className="absolute bottom-10 left-10 right-10 text-center">
                            <p className="text-white text-lg font-light">Explore and create new ideas.</p>
                        </div>
                    </div>

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
                            <div className="space-y-4">

                                <div className="flex flex-col">
                                    <p className='text-red-500'>{error?.response?.data?.data?.username && error?.response?.data?.data?.username}</p>
                                    <label className="text-sm font-medium text-[#0d121b] pb-2" htmlFor="email">Username</label>
                                    <div className="relative flex w-full items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-slate-400"><AccountCircleOutlinedIcon /></span>
                                        <input
                                            className="form-input h-12 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 bg-background-light/50 dark:bg-background-dark/50 p-3 pl-11 text-base font-normal text-[#0d121b] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:border-primary"
                                            id="username"
                                            name='username'
                                            placeholder="joe.darmon"
                                            type="text"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className='text-red-500'>{error?.response?.data?.data?.email && error?.response?.data?.data?.email}</p>
                                    <label className="text-sm font-medium text-[#0d121b] pb-2" htmlFor="email">Email</label>
                                    <div className="relative flex w-full items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-slate-400"><EmailOutlinedIcon /></span>
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
                                    {/* <p className='text-red-500'>{error?.message === "Invalid credentials" ? error?.message : ""}</p> */}
                                    <div className="flex items-center justify-between pb-2">
                                        <label className="text-sm font-medium text-[#0d121b]" htmlFor="password">Password</label>
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


                </main>
            </div>
        </>
    )
}

export default Register