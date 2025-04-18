const orderModel = require('../../models/orderModel')

const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId

        // Get user's orders
        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 })

        return res.json({
            data: orders,
            message: "Orders retrieved successfully",
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Error getting user orders:", err)
        return res.json({
            message: err?.message || "Error getting user orders",
            success: false,
            error: true
        })
    }
}

module.exports = getUserOrders 