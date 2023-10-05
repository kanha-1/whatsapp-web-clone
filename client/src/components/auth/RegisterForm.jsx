import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux'
import { PulseLoader } from "react-spinners"
import { Link, useNavigate } from "react-router-dom"
import InputFields from './InputFields';
import { changeStatus, registerUser } from '../../features/userSlice';
import UserPicture from './UserPicture';
import axios from 'axios';

function RegisterForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [picture, setPicture] = useState()
    const [imagePreview, setImagePreview] = useState('')
    const { status, error } = useSelector((state) => state.user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
    });
    const onSubmit = async (data) => {
        dispatch(changeStatus('loading'))
        let response;
        if (picture) {
            await uploadPicture().then(async (url) => {
                response = await dispatch(registerUser({ ...data, picture: url.secure_url }))
            })
        } else {
            response = await dispatch(registerUser({ ...data, picture: "" }))
        }
        if (response?.payload?.user) {
            navigate('/')
        }

    };
    const uploadPicture = async () => {
        let formData = new FormData()
        formData.append("upload_preset", "whatapp-web")
        formData.append("file", picture)
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/dsseuwzzr/image/upload`, formData)
        return data
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
            <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
                <div className="text-center dark:text-dark_text_1">
                    <h2 className='mt-6 text-3xl font-bold'>Welcome</h2>
                    <p className="mt-2 text-sm">Sign Up</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <InputFields
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        error={errors?.name?.message}
                        register={register}
                    />
                    <InputFields
                        name="email"
                        type="text"
                        placeholder="Email Address"
                        error={errors?.email?.message}
                        register={register}
                    />
                    {/* will create a auto generated status function - user can also modify it  */}
                    <InputFields
                        name="status"
                        type="text"
                        placeholder="Status (Optional)"
                        error={errors?.status?.message}
                        register={register}
                    />
                    <InputFields
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors?.password?.message}
                        register={register}
                    />

                    {/* profile picture */}
                    <UserPicture setImagePreview={setImagePreview}
                        imagePreview={imagePreview}
                        setPicture={setPicture} />
                    {error ?
                        <div>
                            <p className='text-red-400'>{error}</p>
                        </div>
                        : null}
                    <button className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold
                     focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
                        type="submit">{status === 'loading' ? <PulseLoader color="#fff" size={10} /> : "Register"}</button>
                </form>
                <p className="flex flex-row items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                    <span>Registered user ? </span>
                    <Link to="/login" className='hover:underline ml-2 font-semibold transition ease-in duration-300'> LogIn</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm