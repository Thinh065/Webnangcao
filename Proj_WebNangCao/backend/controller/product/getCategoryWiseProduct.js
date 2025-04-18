const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query

        if (!category) {
            return res.status(400).json({
                message: "Yêu cầu tham số danh mục",
                success: false,
                error: true
            });
        }

        console.log(`Đang tìm sản phẩm cho danh mục: ${category}`);
        const product = await productModel.find({ category })

        console.log(`Tìm thấy ${product.length} sản phẩm cho danh mục: ${category}`);
        
        return res.json({
            data: product,
            message: "Lấy sản phẩm thành công",
            success: true,
            error: false
        })
    } catch(err){
        console.error("Lỗi trong getCategoryWiseProduct:", err);
        return res.status(500).json({
            message: err.message || "Lỗi server",
            error: true,
            success: false
        })
    }
}

module.exports = getCategoryWiseProduct