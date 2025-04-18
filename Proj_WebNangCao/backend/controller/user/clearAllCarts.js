const addToCartModel = require("../../models/cartProduct");
const userModel = require("../../models/userModel");

const clearAllCarts = async (req, res) => {
    try {
        const userId = req.userId;

        // Kiểm tra quyền admin
        const user = await userModel.findById(userId);
        if (!user || user.role !== "QUẢN TRỊ VIÊN") {
            return res.status(403).json({
                message: "Từ chối truy cập. Chỉ quản trị viên mới có thể xóa tất cả giỏ hàng",
                success: false,
                error: true
            });
        }

        // Xóa tất cả sản phẩm trong giỏ hàng
        const result = await addToCartModel.deleteMany({});

        return res.json({
            message: `Đã xóa ${result.deletedCount} sản phẩm trong giỏ hàng của tất cả người dùng`,
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Lỗi khi xóa giỏ hàng:", err);
        return res.status(500).json({
            message: err?.message || "Lỗi khi xóa giỏ hàng",
            success: false,
            error: true
        });
    }
};

module.exports = clearAllCarts;
