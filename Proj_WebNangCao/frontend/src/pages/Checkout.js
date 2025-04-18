import React, { useCallback, useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayVNDCurrency from '../helpers/displayCurrency'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()
    const context = useContext(Context)

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: ''
    })

    // Payment method state
    const [paymentMethod, setPaymentMethod] = useState('cod')

    // Form validation state
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)

    const fetchData = useCallback(async() => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })

        const responseData = await response.json()

        if(responseData.success) {
            setData(responseData.data)
        }
    }, [])

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await fetchData()
            setLoading(false)
        }

        loadData()
    }, [fetchData])

    // Validate form whenever form data changes
    useEffect(() => {
        validateForm()
    }, [formData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    const validateForm = () => {
        const newErrors = {}

        // Validate full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ tên'
        }

        // Validate address
        if (!formData.address.trim()) {
            newErrors.address = 'Vui lòng nhập địa chỉ'
        }

        // Validate phone number
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Vui lòng nhập số điện thoại'
        } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Vui lòng nhập số điện thoại hợp lệ (10-11 số)'
        }

        setErrors(newErrors)
        setIsFormValid(Object.keys(newErrors).length === 0)
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)

    const handleCompletePayment = async () => {
        // Validate form before processing
        validateForm()

        if (!isFormValid) {
            toast.error('Vui lòng điền đầy đủ thông tin')
            return
        }

        setProcessing(true)

        try {
            // Save order to database
            const response = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    shippingInfo: formData,
                    paymentMethod: paymentMethod
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                // Update cart count in context
                context.fetchUserAddToCart()
                toast.success('Đặt hàng thành công!')
                navigate('/')
            } else {
                toast.error(responseData.message || 'Đặt hàng không thành công')
            }
        } catch (error) {
            console.error('Error placing order:', error)
            toast.error('Đã xảy ra lỗi khi đặt hàng')
        } finally {
            setProcessing(false)
        }
    }

    if (loading) {
        return (
            <div className='container mx-auto p-4'>
                <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md animate-pulse'>
                    <div className='h-8 bg-slate-200 rounded mb-4'></div>
                    <div className='h-4 bg-slate-200 rounded mb-2'></div>
                    <div className='h-4 bg-slate-200 rounded mb-2'></div>
                    <div className='h-4 bg-slate-200 rounded mb-2'></div>
                    <div className='h-8 bg-slate-200 rounded mt-4'></div>
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className='container mx-auto p-4'>
                <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-center'>
                    <h1 className='text-2xl font-semibold mb-4'>Giỏ hàng của bạn đang trống</h1>
                    <p className='mb-4'>Bạn không có sản phẩm nào để thanh toán.</p>
                    <button
                        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                        onClick={() => navigate('/')}
                    >
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md'>
                <h1 className='text-2xl font-semibold mb-4'>Thanh toán</h1>

                <div className='mb-6'>
                    <h2 className='text-lg font-medium mb-2'>Tóm tắt đơn hàng</h2>
                    <div className='border-b pb-4'>
                        {data.map((item) => (
                            <div key={item._id} className='flex justify-between mb-2'>
                                <div>
                                    <span className='font-medium'>{item.productId.productName}</span>
                                    <span className='text-gray-600 ml-2'>x{item.quantity}</span>
                                </div>
                                <span>{displayVNDCurrency(item.productId.sellingPrice * item.quantity)}</span>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-between font-semibold text-lg mt-4'>
                        <span>Tổng cộng ({totalQty} sản phẩm):</span>
                        <span>{displayVNDCurrency(totalPrice)}</span>
                    </div>
                </div>

                <div className='mb-6'>
                    <h2 className='text-lg font-medium mb-2'>Thông tin giao hàng</h2>
                    <div className='grid gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Họ tên <span className='text-primary-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full border ${errors.fullName ? 'border-primary-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                                placeholder='Nhập họ tên của bạn'
                            />
                            {errors.fullName && (
                                <p className='text-primary-500 text-sm mt-1'>{errors.fullName}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Địa chỉ <span className='text-primary-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full border ${errors.address ? 'border-primary-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                                placeholder='Nhập địa chỉ của bạn'
                            />
                            {errors.address && (
                                <p className='text-primary-500 text-sm mt-1'>{errors.address}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Số điện thoại <span className='text-primary-500'>*</span>
                            </label>
                            <input
                                type='text'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full border ${errors.phoneNumber ? 'border-primary-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                                placeholder='Nhập số điện thoại của bạn'
                            />
                            {errors.phoneNumber && (
                                <p className='text-primary-500 text-sm mt-1'>{errors.phoneNumber}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-6'>
                    <h2 className='text-lg font-medium mb-2'>Phương thức thanh toán</h2>
                    <div className='flex items-center mb-2'>
                        <input
                            type='radio'
                            id='cod'
                            name='payment'
                            value='cod'
                            checked={paymentMethod === 'cod'}
                            onChange={handlePaymentMethodChange}
                            className='mr-2'
                        />
                        <label htmlFor='cod'>Thanh toán khi nhận hàng</label>
                    </div>
                    <div className='flex items-center'>
                        <input
                            type='radio'
                            id='card'
                            name='payment'
                            value='card'
                            checked={paymentMethod === 'card'}
                            onChange={handlePaymentMethodChange}
                            className='mr-2'
                        />
                        <label htmlFor='card'>Thẻ tín dụng/Ghi nợ</label>
                    </div>
                </div>

                <button
                    className={`w-full py-3 rounded-md text-white font-medium ${processing ? 'bg-gray-400' : isFormValid ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    onClick={handleCompletePayment}
                    disabled={processing || !isFormValid}
                >
                    {processing ? 'Đang xử lý...' : 'Hoàn tất đơn hàng'}
                </button>

                {!isFormValid && (
                    <p className='text-center text-primary-500 text-sm mt-2'>
                        Vui lòng điền đầy đủ thông tin để hoàn tất đơn hàng
                    </p>
                )}
            </div>
        </div>
    )
}

export default Checkout