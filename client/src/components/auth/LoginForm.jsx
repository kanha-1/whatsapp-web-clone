import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema } from '../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from "react-spinners"
import { Link, useNavigate } from "react-router-dom"
import InputFields from './InputFields';
import { changeStatus, loginUser } from '../../features/userSlice';
function LoginForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, error } = useSelector((state) => state.user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(signinSchema),
    });
    const onSubmit = async (data) => {
        const response = await dispatch(loginUser({ ...data, }))
        if (response?.payload?.user) {
            navigate('/')
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
            <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
                <div className="text-center dark:text-dark_text_1">
                    <h2 className='mt-6 text-3xl font-bold'>Welcome Back !</h2>
                    <p className="mt-2 text-sm">Sign In</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">

                    <InputFields
                        name="email"
                        type="text"
                        placeholder="Email Address"
                        error={errors?.email?.message}
                        register={register}
                    />

                    <InputFields
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors?.password?.message}
                        register={register}
                    />
                    {error ?
                        <div>
                            <p className='text-red-400'>{error}</p>
                        </div>
                        : null}
                    <button className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold
                     focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
                        type="submit">{status === 'loading' ? <PulseLoader color="#fff" size={10} /> : "Login"}</button>
                </form>
                <p className="flex flex-row items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                    <span>Don't have a account ? </span>
                    <Link to="/register" className='hover:underline ml-2 font-semibold transition ease-in duration-300'> Register</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm