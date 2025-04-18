import React, { useState } from 'react'
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayVNDCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const handleDeleteProduct = async () => {
        if (deleting) return

        setDeleting(true)
        try {
            const response = await fetch(SummaryApi.deleteProduct.url, {
                method: SummaryApi.deleteProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    productId: data._id
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                toast.success(responseData.message || 'Đã xóa sản phẩm thành công')
                fetchdata() // Refresh the product list
            } else {
                toast.error(responseData.message || 'Không thể xóa sản phẩm')
            }
        } catch (error) {
            console.error('Error deleting product:', error)
            toast.error('Đã xảy ra lỗi khi xóa sản phẩm')
        } finally {
            setDeleting(false)
            setShowDeleteConfirm(false)
        }
    }

    return (
        <div className='bg-white p-4 rounded relative w-[220px] h-[280px]'>
            {showDeleteConfirm && (
                <div className='absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center p-4 z-10'>
                    <p className='text-primary-600 font-medium text-center mb-4'>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
                    <div className='flex gap-3'>
                        <button
                            className='px-3 py-1 bg-gray-200 rounded'
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={deleting}
                        >
                            Hủy
                        </button>
                        <button
                            className='px-3 py-1 bg-primary-600 text-white rounded'
                            onClick={handleDeleteProduct}
                            disabled={deleting}
                        >
                            {deleting ? 'Đang xóa...' : 'Xóa'}
                        </button>
                    </div>
                </div>
            )}

            <div className='flex flex-col h-full'>
                <div className='h-[160px] flex justify-center items-center mb-2'>
                    <img src={data?.productImage[0]} alt={data?.productName || 'Hình ảnh sản phẩm'} className='max-h-full max-w-full object-contain'/>
                </div>
                <h1 className='text-ellipsis line-clamp-2 h-[48px] text-sm font-medium'>{data.productName}</h1>

                <div className='mt-auto'>
                    <p className='font-semibold text-primary-600'>
                        {displayVNDCurrency(data.sellingPrice)}
                    </p>

                    <div className='flex gap-2 justify-end mt-2'>
                        <div
                            className='p-2 bg-primary-100 hover:bg-primary-600 rounded-full hover:text-white cursor-pointer'
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            <MdDelete/>
                        </div>
                        <div
                            className='p-2 bg-primary-100 hover:bg-primary-600 rounded-full hover:text-white cursor-pointer'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline/>
                        </div>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata}/>
            )}
        </div>
    )
}

export default AdminProductCard