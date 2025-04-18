import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.get("q") || ""
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault()

    if(search.trim()){
      navigate(`/search?q=${search}`)
    }
    // Không chuyển hướng khi từ khóa rỗng
  }

  const clearSearch = () => {
    setSearch('')
    navigate('/')
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
            <div className='flex items-center gap-4'>
                <Link to={"/"}>
                    <Logo w={90} h={50}/>
                </Link>

                <form onSubmit={handleSubmitSearch} className='hidden lg:flex items-center w-full max-w-[400px] relative group'>
                    <div className='absolute left-3 text-gray-400 group-focus-within:text-primary-600'>
                      <GrSearch />
                    </div>
                    <input
                      type='text'
                      placeholder='Tìm kiếm sản phẩm...'
                      className='w-full outline-none py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-100 transition-all'
                      onChange={handleSearch}
                      value={search}
                    />
                    {search && (
                      <button
                        type='button'
                        onClick={clearSearch}
                        className='absolute right-3 text-gray-400 hover:text-primary-600 text-xl font-medium'
                      >
                        ×
                      </button>
                    )}
                    <button
                      type='submit'
                      className='absolute right-10 text-gray-400 hover:text-primary-600 hidden'
                    >
                      <GrSearch />
                    </button>
                </form>
            </div>


            <div className='flex items-center gap-7'>

                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        <FaRegCircleUser/>
                      </div>
                    )
                  }


                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav>
                          <Link to={"/user-profile"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Thông tin cá nhân</Link>
                          <Link to={"/my-orders"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Đơn hàng của tôi</Link>
                          {
                            (user?.role === ROLE.ADMIN || user?.role === "ADMIN") && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Quản trị viên</Link>
                            )
                          }

                        </nav>
                      </div>
                    )
                  }

                </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><FaShoppingCart/></span>

                          <div className='bg-primary-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }



                <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-primary-600 hover:bg-primary-700'>Đăng xuất</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-primary-600 hover:bg-primary-700'>Đăng nhập</Link>
                    )
                  }

                </div>

            </div>

      </div>
    </header>
  )
}

export default Header