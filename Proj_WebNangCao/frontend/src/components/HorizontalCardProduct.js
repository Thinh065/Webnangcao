import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayVNDCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = useCallback(async() => {
        setLoading(true)
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setData(categoryProduct?.data || [])
        } catch (error) {
            console.error("Error fetching category products:", error)
        } finally {
            setLoading(false)
        }
    }, [category])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading || `Sản phẩm ${category}`}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 z-10 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 z-10 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>

                {loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                </div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'>Đang tải...</h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <div className='w-full'>
                                            <p className='text-primary-600 font-medium p-1 bg-slate-200 w-1/2 animate-pulse rounded-md'></p>
                                            <p className='text-slate-500 line-through p-1 bg-slate-200 w-1/3 animate-pulse rounded-md mt-1'></p>
                                        </div>
                                        <div className='w-[100px] h-[28px] bg-slate-200 animate-pulse rounded-md'></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link
                                key={product?._id || index}
                                to={"/product/"+product?._id}
                                className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 bg-white rounded-md shadow hover:shadow-md flex overflow-hidden'
                            >
                                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                    <img
                                        src={product.productImage[0]}
                                        alt={product?.productName || 'Hình ảnh sản phẩm'}
                                        className='object-contain h-full w-full hover:scale-110 transition-all mix-blend-multiply'
                                    />
                                </div>
                                <div className='p-3 flex flex-col justify-between flex-grow'>
                                    <div>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500 text-sm'>{product?.category}</p>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='w-full'>
                                            <p className='text-primary-600 font-medium'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                            {product?.price > product?.sellingPrice && (
                                                <p className='text-slate-500 text-xs line-through'>{displayVNDCurrency(product?.price)}</p>
                                            )}
                                        </div>
                                        <button
                                            className='text-xs bg-primary-600 hover:bg-primary-700 text-white h-[28px] w-[150px] rounded-md font-medium flex items-center justify-center whitespace-nowrap'
                                            onClick={(e)=>handleAddToCart(e,product?._id)}
                                        >
                                            + Giỏ
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default HorizontalCardProduct