const orderModel = require('../../models/orderModel')
const userModel = require('../../models/userModel')

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        const userId = req.userId

        // Check if user is admin
        const user = await userModel.findById(userId)
        
        if (!user || user.role !== 'ADMIN') {
            return res.status(403).json({
                message: "Từ chối truy cập. Chỉ quản trị viên mới có thể cập nhật trạng thái đơn hàng",
                success: false,
                error: true
            })
        }

        if (!orderId || !status) {
            return res.status(400).json({
                message: "ID đơn hàng và trạng thái là bắt buộc",
                success: false,
                error: true
            })
        }

        const validStatuses = ['waiting', 'approved', 'cancelled']
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Trạng thái không hợp lệ. Phải là một trong: ${validStatuses.join(', ')}`,
                success: false,
                error: true
            })
        }

        // Find and update the order
        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng",
                success: false,
                error: true
            })
        }

        order.status = status
        await order.save()

        return res.json({
            data: order,
            message: `Đã cập nhật trạng thái đơn hàng thành "${status}" thành công`,
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Lỗi cập nhật trạng thái đơn hàng:", err)
        return res.status(500).json({
            message: err?.message || "Lỗi cập nhật trạng thái đơn hàng",
            success: false,
            error: true
        })
    }
}

module.exports = updateOrderStatus