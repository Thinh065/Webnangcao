const orderModel = require('../../models/orderModel')
const userModel = require('../../models/userModel')

const getAllOrders = async (req, res) => {
    try {
        const userId = req.userId

        // Check if user is admin
        const user = await userModel.findById(userId)

        if (!user || user.role !== 'QUẢN TRỊ VIÊN') {
            return res.status(403).json({
                message: "Từ chối truy cập. Chỉ quản trị viên mới có thể xem tất cả đơn hàng",
                success: false,
                error: true
            })
        }

        // Get all orders
        const orders = await orderModel.find().sort({ createdAt: -1 })

        return res.json({
            data: orders,
            message: "Lấy danh sách đơn hàng thành công",
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Error getting orders:", err)
        return res.json({
            message: err?.message || "Lỗi khi lấy danh sách đơn hàng",
            success: false,
            error: true
        })
    }
}

module.exports = getAllOrders