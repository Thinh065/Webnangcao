import React, { useContext } from 'react'
import displayVNDCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const ProductList = ({ data, loading, heading }) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id) => {
       await addToCart(e, id)
       fetchUserAddToCart()
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            {heading && <h2 className='text-2xl font-semibold py-4'>{heading}</h2>}

            <div className='flex flex-wrap items-center gap-4 md:gap-6'>
                {loading ? (
                    loadingList.map((product, index) => {
                        return(
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'>Đang tải...</h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-primary-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data && data.length > 0 ? (
                        data.map((product, index) => {
                            return(
                                <Link
                                    key={product?._id || index}
                                    to={"/product/"+product?._id}
                                    className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-md shadow hover:shadow-md'
                                >
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img
                                            src={product.productImage[0]}
                                            alt={product?.productName || 'Hình ảnh sản phẩm'}
                                            className='object-scale-down h-full max-h-40 hover:scale-105 transition-all mix-blend-multiply'
                                        />
                                    </div>
                                    <div className='p-4 flex flex-col gap-2'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black mb-1'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500 text-sm'>{product?.category}</p>
                                        <div className='flex gap-3 items-center mt-1'>
                                            <p className='text-primary-600 font-medium'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                            {product?.price > product?.sellingPrice && (
                                                <p className='text-slate-500 text-sm line-through'>{displayVNDCurrency(product?.price)}</p>
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
                            )
                        })
                    ) : (
                        <div className="w-full text-center py-8 text-gray-500">
                            Không tìm thấy sản phẩm nào
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default ProductList
