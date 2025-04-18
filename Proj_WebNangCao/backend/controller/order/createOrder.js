const orderModel = require('../../models/orderModel')
const cartProductModel = require('../../models/cartProduct')

const createOrder = async (req, res) => {
    try {
        const { shippingInfo, paymentMethod } = req.body
        const userId = req.userId

        // Get cart items
        const cartItems = await cartProductModel.find({ userId }).populate('productId')

        if (!cartItems || cartItems.length === 0) {
            return res.json({
                message: "Giỏ hàng trống",
                success: false,
                error: true
            })
        }

        // Format products for order
        const products = cartItems.map(item => ({
            productId: item.productId._id,
            name: item.productId.productName,
            price: item.productId.sellingPrice,
            quantity: item.quantity
        }))

        // Calculate total amount
        const totalAmount = cartItems.reduce(
            (total, item) => total + (item.quantity * item.productId.sellingPrice),
            0
        )

        // Create new order
        const order = new orderModel({
            userId,
            products,
            shippingInfo,
            paymentMethod,
            totalAmount
        })

        await order.save()

        try {
            // Clear cart after order is placed
            console.log(`Clearing cart for user ${userId}`)
            const deleteResult = await cartProductModel.deleteMany({ userId })
            console.log(`Cart cleared, deleted ${deleteResult.deletedCount} items`)
        } catch (cartError) {
            console.error("Error clearing cart:", cartError)
            // We won't return an error here since the order was already created
            // But we'll log it for debugging
        }

        return res.json({
            data: order,
            message: "Đặt hàng thành công",
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Error creating order:", err)
        return res.json({
            message: err?.message || "Lỗi khi tạo đơn hàng",
            success: false,
            error: true
        })
    }
}

module.exports = createOrder