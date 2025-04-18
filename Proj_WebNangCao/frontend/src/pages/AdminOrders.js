import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import displayVNDCurrency from '../helpers/displayCurrency'
import moment from 'moment'
import { FaSearch } from 'react-icons/fa'

const OrderStatusBadge = ({ status }) => {
    let color = 'bg-gray-200 text-gray-800'

    switch(status) {
        case 'waiting':
            color = 'bg-yellow-100 text-yellow-800'
            break
        case 'approved':
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

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [updatingStatus, setUpdatingStatus] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.getAllOrders.url, {
                method: SummaryApi.getAllOrders.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                }
            })

            const responseData = await response.json()

            if (responseData.success) {
                setOrders(responseData.data)
                setFilteredOrders(responseData.data)
            } else {
                toast.error(responseData.message || 'Không thể tải đơn hàng')
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
            toast.error('Đã xảy ra lỗi khi tải đơn hàng')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        // Filter orders based on status and search term
        let result = orders

        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(order => order.status === statusFilter)
        }

        // Apply search filter if there's a search term
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase().trim()
            result = result.filter(order =>
                order._id.toLowerCase().includes(searchLower) ||
                order.shippingInfo.fullName.toLowerCase().includes(searchLower) ||
                order.shippingInfo.phoneNumber.includes(searchLower)
            )
        }

        setFilteredOrders(result)
    }, [statusFilter, orders, searchTerm])

    const viewOrderDetails = (order) => {
        setSelectedOrder(order)
        setShowDeleteConfirm(false)
    }

    const closeOrderDetails = () => {
        setSelectedOrder(null)
        setShowDeleteConfirm(false)
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        if (!orderId || !newStatus) return

        setUpdatingStatus(true)
        try {
            const response = await fetch(SummaryApi.updateOrderStatus.url, {
                method: SummaryApi.updateOrderStatus.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    status: newStatus
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                // Update orders list
                const updatedOrders = orders.map(order =>
                    order._id === orderId ? {...order, status: newStatus} : order
                )
                setOrders(updatedOrders)

                // Update selected order if open
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder({...selectedOrder, status: newStatus})
                }

                toast.success(responseData.message || 'Cập nhật trạng thái đơn hàng thành công')
            } else {
                toast.error(responseData.message || 'Không thể cập nhật trạng thái đơn hàng')
            }
        } catch (error) {
            console.error('Error updating order status:', error)
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng')
        } finally {
            setUpdatingStatus(false)
        }
    }

    const handleDeleteOrder = async () => {
        if (!selectedOrder || deleting) return

        setDeleting(true)
        try {
            const response = await fetch(SummaryApi.deleteOrder.url, {
                method: SummaryApi.deleteOrder.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    orderId: selectedOrder._id
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                // Remove the order from the list
                const updatedOrders = orders.filter(order => order._id !== selectedOrder._id)
                setOrders(updatedOrders)

                toast.success(responseData.message || 'Đã xóa đơn hàng thành công')
                closeOrderDetails()
            } else {
                toast.error(responseData.message || 'Không thể xóa đơn hàng')
                setShowDeleteConfirm(false)
            }
        } catch (error) {
            console.error('Error deleting order:', error)
            toast.error('Đã xảy ra lỗi khi xóa đơn hàng')
            setShowDeleteConfirm(false)
        } finally {
            setDeleting(false)
        }
    }

    const getStatusCounts = () => {
        const counts = { all: orders.length }
        orders.forEach(order => {
            counts[order.status] = (counts[order.status] || 0) + 1
        })
        return counts
    }

    const statusCounts = getStatusCounts()

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm('')
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-6'>Quản lý đơn hàng</h1>

            {/* Search Bar */}
            {!loading && orders.length > 0 && (
                <div className='mb-6'>
                    <div className='relative max-w-md'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <FaSearch className='text-gray-400' />
                        </div>
                        <input
                            type='text'
                            className='block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Tìm kiếm theo tên, mã đơn hàng, số điện thoại...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {searchTerm && (
                            <button
                                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                                onClick={clearSearch}
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Status Filter */}
            {!loading && orders.length > 0 && (
                <div className='mb-6'>
                    <div className='flex flex-wrap gap-2'>
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium ${statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            Tất cả ({statusCounts.all || 0})
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium ${statusFilter === 'waiting' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'}`}
                            onClick={() => setStatusFilter('waiting')}
                        >
                            Chờ duyệt ({statusCounts.waiting || 0})
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium ${statusFilter === 'approved' ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-800'}`}
                            onClick={() => setStatusFilter('approved')}
                        >
                            Đã duyệt ({statusCounts.approved || 0})
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium ${statusFilter === 'cancelled' ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-800'}`}
                            onClick={() => setStatusFilter('cancelled')}
                        >
                            Đã hủy ({statusCounts.cancelled || 0})
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <div className='animate-pulse space-y-4'>
                        <div className='h-4 bg-slate-200 rounded'></div>
                        <div className='h-4 bg-slate-200 rounded'></div>
                        <div className='h-4 bg-slate-200 rounded'></div>
                        <div className='h-4 bg-slate-200 rounded'></div>
                    </div>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className='bg-white p-6 rounded-lg shadow-md text-center'>
                    <p className='text-lg'>
                        {orders.length === 0
                            ? 'Không tìm thấy đơn hàng nào'
                            : searchTerm
                                ? `Không tìm thấy kết quả cho "${searchTerm}"`
                                : `Không tìm thấy đơn hàng ${statusFilter !== 'all' ? statusFilter : ''}`
                        }
                    </p>
                </div>
            ) : (
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <table className='w-full'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Mã đơn hàng</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Khách hàng</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ngày đặt</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tổng tiền</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Trạng thái</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className='hover:bg-gray-50'>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                        {order._id.substring(order._id.length - 8)}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                        {order.shippingInfo.fullName}
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
                                        <div className='flex items-center gap-2'>
                                            <OrderStatusBadge status={selectedOrder.status} />
                                            <select
                                                className='ml-2 border border-gray-300 rounded text-sm py-1 px-2'
                                                value={selectedOrder.status}
                                                onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                                                disabled={updatingStatus || showDeleteConfirm}
                                            >
                                                <option value="waiting">Chờ duyệt</option>
                                                <option value="approved">Đã duyệt</option>
                                                <option value="cancelled">Đã hủy</option>
                                            </select>
                                            {updatingStatus && (
                                                <span className='text-xs text-gray-500'>Đang cập nhật...</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Phương thức thanh toán</p>
                                        <p className='font-medium capitalize'>{selectedOrder.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <h3 className='text-lg font-medium mb-2'>Thông tin khách hàng</h3>
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

                            <div className='mt-6 flex justify-between'>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className='bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 disabled:opacity-50'
                                    disabled={deleting || showDeleteConfirm}
                                >
                                    Xóa đơn hàng
                                </button>
                                <button
                                    onClick={closeOrderDetails}
                                    className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300'
                                >
                                    Đóng
                                </button>
                            </div>

                            {/* Delete Confirmation Dialog */}
                            {showDeleteConfirm && (
                                <div className='mt-4 p-4 bg-primary-50 border border-primary-100 rounded-lg'>
                                    <p className='text-primary-600 mb-4'>Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác.</p>
                                    <div className='flex justify-end gap-3'>
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className='px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50'
                                            disabled={deleting}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleDeleteOrder}
                                            className='px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50'
                                            disabled={deleting}
                                        >
                                            {deleting ? 'Đang xóa...' : 'Xóa'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOrders