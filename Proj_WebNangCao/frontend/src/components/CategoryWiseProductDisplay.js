import React, { useCallback, useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayVNDCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategroyWiseProductDisplay = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(null)
    const loadingList = new Array(4).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = useCallback(async() => {
        setLoading(true)
        setError(null)
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category)
            if (categoryProduct?.success) {
                setData(categoryProduct?.data || [])
            } else {
                setError(categoryProduct?.message || "Failed to load products")
                console.error("Error response:", categoryProduct)
            }
        } catch (error) {
            setError("Error loading products")
            console.error("Error fetching category products:", error)
        } finally {
            setLoading(false)
        }
    }, [category])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading || `${category} Products`}</h2>

            {error && (
                <div className='bg-primary-100 border border-primary-400 text-primary-700 px-4 py-3 rounded mb-4'>
                    <p>{error}</p>
                    <button
                        className='text-sm text-blue-600 underline mt-2'
                        onClick={() => fetchData()}
                    >
                        Try Again
                    </button>
                </div>
            )}

            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 gap-4 overflow-x-scroll scrollbar-none transition-all'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={`loading-${index}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-md shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'>Loading...</h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-primary-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : data.length === 0 ? (
                    <div className='col-span-full text-center p-4'>
                        <p>No products found in this category.</p>
                    </div>
                ) : (
                    data.map((product, index) => (
                        <Link
                            key={product?._id || `product-${index}`}
                            to={"/product/"+product?._id}
                            className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-md shadow hover:shadow-md'
                            onClick={scrollTop}
                        >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                {product.productImage && product.productImage[0] ? (
                                    <img
                                        src={product.productImage[0]}
                                        alt={product?.productName || "Product image"}
                                        className='object-scale-down h-full max-h-40 hover:scale-105 transition-all mix-blend-multiply'
                                    />
                                ) : (
                                    <div className='text-gray-400'>No image available</div>
                                )}
                            </div>
                            <div className='p-4 flex flex-col gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black mb-1'>{product?.productName || "Unnamed Product"}</h2>
                                <p className='capitalize text-slate-500 text-sm'>{product?.category || "Uncategorized"}</p>
                                <div className='flex gap-3 items-center mt-1'>
                                    <p className='text-primary-600 font-medium'>{displayVNDCurrency(product?.sellingPrice || 0)}</p>
                                    {product?.price > product?.sellingPrice && (
                                        <p className='text-slate-500 text-sm line-through'>{displayVNDCurrency(product?.price || 0)}</p>
                                    )}
                                </div>
                                <button
                                    className='text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-full mt-2 w-full'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategroyWiseProductDisplay