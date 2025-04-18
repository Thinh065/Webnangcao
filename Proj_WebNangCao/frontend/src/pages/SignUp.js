import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [data,setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : ""
  })
  const navigate = useNavigate()

  const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }

  // Removed handleUploadPic function


  const handleSubmit = async(e) =>{
      e.preventDefault()

      if(data.password === data.confirmPassword){

        const dataResponse = await fetch(SummaryApi.signUP.url,{
            method : SummaryApi.signUP.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })

          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }

      }else{
        toast.error("Vui lòng kiểm tra mật khẩu và xác nhận mật khẩu")
      }

  }

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto shadow-md rounded-md'>
                    <h2 className='text-2xl font-semibold text-center mb-6 text-primary-600'>Đăng ký</h2>

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                      <div className='grid'>
                              <label className='mb-1 font-medium'>Họ tên : </label>
                              <div className='bg-slate-100 p-2 rounded'>
                                  <input
                                      type='text'
                                      placeholder='Nhập họ tên của bạn'
                                      name='name'
                                      value={data.name}
                                      onChange={handleOnChange}
                                      required
                                      className='w-full h-full outline-none bg-transparent'/>
                              </div>
                          </div>
                        <div className='grid'>
                            <label className='mb-1 font-medium'>Email : </label>
                            <div className='bg-slate-100 p-2 rounded'>
                                <input
                                    type='email'
                                    placeholder='Nhập email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required
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
                                    required
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

                        <div>
                            <label className='mb-1 font-medium'>Xác nhận mật khẩu : </label>
                            <div className='bg-slate-100 p-2 flex rounded'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Nhập lại mật khẩu'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>

                                <div className='cursor-pointer text-xl text-gray-500' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
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

                        <button className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 w-full rounded-md hover:shadow-lg transition-all mt-2'>Đăng ký</button>

                    </form>

                    <p className='mt-6 text-center'>Đã có tài khoản? <Link to={"/login"} className='text-primary-600 hover:text-primary-700 hover:underline font-medium'>Đăng nhập</Link></p>
            </div>


        </div>
    </section>
  )
}

export default SignUp