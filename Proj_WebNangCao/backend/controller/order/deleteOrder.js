const orderModel = require('../../models/orderModel')
const userModel = require('../../models/userModel')

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body
        const userId = req.userId

        // Check if user is admin
        const user = await userModel.findById(userId)

        if (!user || user.role !== 'QUẢN TRỊ VIÊN') {
            return res.status(403).json({
                message: "Từ chối truy cập. Chỉ quản trị viên mới có thể xóa đơn hàng",
                success: false,
                error: true
            })
        }

        if (!orderId) {
            return res.status(400).json({
                message: "ID đơn hàng là bắt buộc",
                success: false,
                error: true
            })
        }

        // Find and delete the order
        const order = await orderModel.findByIdAndDelete(orderId)
        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng",
                success: false,
                error: true
            })
        }

        return res.json({
            message: "Đã xóa đơn hàng thành công",
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Lỗi xóa đơn hàng:", err)
        return res.status(500).json({
            message: err?.message || "Lỗi xóa đơn hàng",
            success: false,
            error: true
        })
    }
}

module.exports = deleteOrder