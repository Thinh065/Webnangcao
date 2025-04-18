const productModel = require("../../models/productModel")
const productCategory = require("../../helpers/productCategory")

// Hàm chuyển đổi tiếng Việt có dấu thành không dấu
function removeVietnameseAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase();
}

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.search

        if (!query || query.trim() === '') {
            return res.json({
                data: [],
                message: "Vui lòng nhập từ khóa tìm kiếm",
                error: false,
                success: true
            })
        }

        console.log(`Đang tìm kiếm sản phẩm với từ khóa: "${query}"`)

        // Chuyển đổi từ khóa tìm kiếm thành không dấu để so sánh
        const normalizedQuery = removeVietnameseAccents(query)
        console.log(`Từ khóa sau khi chuẩn hóa: "${normalizedQuery}"`)

        // Tìm danh mục phù hợp với từ khóa
        let matchedCategories = [];

        // Kiểm tra xem từ khóa có khớp với tên danh mục nào không
        if (normalizedQuery.includes('dien thoai') || normalizedQuery.includes('dienthoai')) {
            matchedCategories.push('dienthoai');
        }
        if (normalizedQuery.includes('laptop')) {
            matchedCategories.push('laptop');
        }

        console.log('Danh mục phù hợp:', matchedCategories);

        // Sử dụng regex để tìm kiếm không phân biệt chữ hoa/thường
        const regex = new RegExp(query, 'i')

        // Tìm kiếm sản phẩm
        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { brandName: regex },
                { category: { $in: matchedCategories } }
            ]
        })

        console.log(`Tìm thấy ${product.length} sản phẩm với từ khóa "${query}"`)

        res.json({
            data: product,
            message: `Tìm thấy ${product.length} sản phẩm`,
            error: false,
            success: true
        })
    } catch(err){
        console.error("Lỗi khi tìm kiếm sản phẩm:", err)
        res.status(500).json({
            message: err.message || "Lỗi server",
            error: true,
            success: false
        })
    }
}

module.exports = searchProduct