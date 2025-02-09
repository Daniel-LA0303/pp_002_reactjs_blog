import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLoginRequestI } from '../../types/auth';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { fetchLogin } from '../../slices/authSlice';

const Login = () => {

    /**
     * state redux
    */
    const dispatch = useDispatch<AppDispatch>();
    const loadingAuth = useSelector((state: RootState) => state.auth.loading);
    const errorAuth = useSelector((state: RootState) => state.auth.errorAuth);
    const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);

    const [formData, setFormData] = useState<AuthLoginRequestI>({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)

        try {
            const res = await dispatch(fetchLogin(formData));
            console.log(res.payload);
        } catch (error: any) {
            console.log(error);
            
        }
        
    }

    if (loadingAuth) {
        return <Spinner />;
    }

    return (
        <>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>
                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input type="text" id="email" name="email" onChange={handleChange} value={formData.email} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
                        </div>

                        <div className="mb-6 text-blue-500">
                        <a href="#" className="hover:underline">Forgot Password?</a>
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </form>

                    <div className="mt-6 text-blue-500 text-center">
                        <Link to={"/register"} className="hover:underline">Sign up Here</Link>
                    </div>
                </div>
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
            </div>
        </>
    )
}

export default Login