import React, { useContext, useState } from 'react'
// Removed login icon import
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    console.log("data login",data)

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-md rounded-md'>
                    <h2 className='text-2xl font-semibold text-center mb-6 text-primary-600'>Đăng nhập</h2>

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label className='mb-1 font-medium'>Email : </label>
                            <div className='bg-slate-100 p-2 rounded'>
                                <input
                                    type='email'
                                    placeholder='Nhập email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label className='mb-1 font-medium'>Mật khẩu : </label>
                            <div className='bg-slate-100 p-2 flex rounded'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Nhập mật khẩu'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl text-gray-500' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 w-full rounded-md hover:shadow-lg transition-all mt-2'>Đăng nhập</button>

                    </form>

                    <p className='mt-6 text-center'>Chưa có tài khoản? <Link to={"/sign-up"} className='text-primary-600 hover:text-primary-700 hover:underline font-medium'>Đăng ký</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login