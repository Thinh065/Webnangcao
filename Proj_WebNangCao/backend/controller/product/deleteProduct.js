const productModel = require('../../models/productModel')
const userModel = require('../../models/userModel')

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const userId = req.userId

        // Check if user is admin
        const user = await userModel.findById(userId)

        if (!user || user.role !== 'QUẢN TRỊ VIÊN') {
            return res.status(403).json({
                message: "Từ chối truy cập. Chỉ quản trị viên mới có thể xóa sản phẩm",
                success: false,
                error: true
            })
        }

        if (!productId) {
            return res.status(400).json({
                message: "Cần cung cấp ID sản phẩm",
                success: false,
                error: true
            })
        }

        // Find and delete the product
        const product = await productModel.findByIdAndDelete(productId)
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
                success: false,
                error: true
            })
        }

        return res.json({
            message: "Xóa sản phẩm thành công",
            success: true,
            error: false
        })

    } catch (err) {
        console.error("Error deleting product:", err)
        return res.status(500).json({
            message: err?.message || "Lỗi khi xóa sản phẩm",
            success: false,
            error: true
        })
    }
}

module.exports = deleteProduct