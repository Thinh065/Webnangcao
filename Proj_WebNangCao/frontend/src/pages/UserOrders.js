import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import displayVNDCurrency from '../helpers/displayCurrency'
import moment from 'moment'
import { Link } from 'react-router-dom'

const OrderStatusBadge = ({ status }) => {
    let color = 'bg-gray-200 text-gray-800'

    switch(status) {
        case 'pending':
            color = 'bg-yellow-100 text-yellow-800'
            break
        case 'processing':
            color = 'bg-blue-100 text-blue-800'
            break
        case 'shipped':
            color = 'bg-purple-100 text-purple-800'
            break
        case 'delivered':
            color = 'bg-primary-100 text-primary-800'
            break
        case 'cancelled':
            color = 'bg-red-100 text-red-800'
            break
        default:
            color = 'bg-gray-200 text-gray-800'
    }

    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${color}`}>
            {status}
        </span>
    )
}

const UserOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.getUserOrders.url, {
                method: SummaryApi.getUserOrders.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                }
            })

            const responseData = await response.json()

            if (responseData.success) {
                setOrders(responseData.data)
            } else {
                toast.error(responseData.message || 'Failed to load orders')
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
            toast.error('An error occurred while loading orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const viewOrderDetails = (order) => {
        setSelectedOrder(order)
    }

    const closeOrderDetails = () => {
        setSelectedOrder(null)
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-6'>Đơn hàng của bạn</h1>

            {loading ? (
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <div className='animate-pulse space-y-4'>
                        <div className='h-4 bg-slate-200 rounded'></div>
                        <div className='h-4 bg-slate-200 rounded'></div>
                        <div className='h-4 bg-slate-200 rounded'></div>
                        <div className='h-4 bg-slate-200 rounded'></div>
                    </div>
                </div>
            ) : orders.length === 0 ? (
                <div className='bg-white p-6 rounded-lg shadow-md text-center'>
                    <p className='text-lg mb-4'>Bạn chưa đặt đơn hàng nào</p>
                    <Link to="/" className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                        Mua sắm ngay
                    </Link>
                </div>
            ) : (
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Mã đơn hàng</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày đặt</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tổng tiền</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Trạng thái</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {orders.map((order) => (
                                <tr key={order._id} className='hover:bg-gray-50'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                        {order._id.substring(order._id.length - 8)}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {moment(order.createdAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {displayVNDCurrency(order.totalAmount)}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <OrderStatusBadge status={order.status} />
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                        <button
                                            onClick={() => viewOrderDetails(order)}
                                            className='text-blue-600 hover:text-blue-900'
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto'>
                        <div className='p-6'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-xl font-semibold'>Chi tiết đơn hàng</h2>
                                <button
                                    onClick={closeOrderDetails}
                                    className='text-gray-500 hover:text-gray-700'
                                >
                                    &times;
                                </button>
                            </div>

                            <div className='mb-6'>
                                <h3 className='text-lg font-medium mb-2'>Thông tin đơn hàng</h3>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm text-gray-600'>Mã đơn hàng</p>
                                        <p className='font-medium'>{selectedOrder._id}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Ngày đặt</p>
                                        <p className='font-medium'>{moment(selectedOrder.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Trạng thái</p>
                                        <OrderStatusBadge status={selectedOrder.status} />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Phương thức thanh toán</p>
                                        <p className='font-medium capitalize'>{selectedOrder.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <h3 className='text-lg font-medium mb-2'>Thông tin giao hàng</h3>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-sm text-gray-600'>Họ tên</p>
                                        <p className='font-medium'>{selectedOrder.shippingInfo.fullName}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Số điện thoại</p>
                                        <p className='font-medium'>{selectedOrder.shippingInfo.phoneNumber}</p>
                                    </div>
                                    <div className='col-span-2'>
                                        <p className='text-sm text-gray-600'>Địa chỉ</p>
                                        <p className='font-medium'>{selectedOrder.shippingInfo.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className='text-lg font-medium mb-2'>Sản phẩm</h3>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 text-left'>
                                        <tr>
                                            <th className='px-4 py-2 text-sm font-medium text-gray-500'>Sản phẩm</th>
                                            <th className='px-4 py-2 text-sm font-medium text-gray-500'>Giá</th>
                                            <th className='px-4 py-2 text-sm font-medium text-gray-500'>Số lượng</th>
                                            <th className='px-4 py-2 text-sm font-medium text-gray-500'>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {selectedOrder.products.map((product, index) => (
                                            <tr key={index}>
                                                <td className='px-4 py-3 text-sm'>{product.name}</td>
                                                <td className='px-4 py-3 text-sm'>{displayVNDCurrency(product.price)}</td>
                                                <td className='px-4 py-3 text-sm'>{product.quantity}</td>
                                                <td className='px-4 py-3 text-sm'>{displayVNDCurrency(product.price * product.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className='bg-gray-50'>
                                        <tr>
                                            <td colSpan='3' className='px-4 py-3 text-sm font-medium text-right'>Tổng cộng:</td>
                                            <td className='px-4 py-3 text-sm font-medium'>{displayVNDCurrency(selectedOrder.totalAmount)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserOrders