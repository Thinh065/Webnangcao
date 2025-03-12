// server.js
const http = require('http');
const url = require('url');
const fs = require('fs');
const mongoose = require('mongoose');

// Kết nối đến MongoDB (không cần sử dụng các tùy chọn deprecated)
mongoose.connect('mongodb+srv://cuongtanquocr:3N0RbsPhiMj8Hzb6@lab4.n1y7y.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// --- Định nghĩa Schema và Model ---

// Schema Category với các trường: name và parent (nếu có)
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }
});
const Category = mongoose.model('Category', CategorySchema);

// Schema Product với các trường: name, description, price, categories, images, show
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  images: [String],
  show: { type: Boolean, default: true }
});
const Product = mongoose.model('Product', ProductSchema);

// --- Tạo HTTP Server ---
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // --- Phục vụ file HTML (giao diện) ---
  if (pathname === '/' && req.method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
    return;
  }

  // --- API ENDPOINTS ---

  // Lấy danh sách các category và xây dựng cây (mỗi category có trường subcategories nếu có)
  if (pathname === '/categories' && req.method === 'GET') {
    (async () => {
      try {
        const categories = await Category.find({}).lean();
        // Xây dựng cây category
        const categoryMap = {};
        categories.forEach(cat => {
          cat.subcategories = [];
          categoryMap[cat._id] = cat;
        });
        const roots = [];
        categories.forEach(cat => {
          if (cat.parent) {
            if (categoryMap[cat.parent]) {
              categoryMap[cat.parent].subcategories.push(cat);
            }
          } else {
            roots.push(cat);
          }
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(roots));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    })();
    return;
  }

  // Lấy danh sách các product
  // Hỗ trợ query: ?search=... (tìm kiếm theo tên) và ?category=... (lấy sản phẩm theo category)
  if (pathname === '/products' && req.method === 'GET') {
    (async () => {
      try {
        if (parsedUrl.query.search) {
          const searchName = parsedUrl.query.search;
          const products = await Product.find({ name: { $regex: searchName, $options: 'i' } }).populate('categories');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(products));
          return;
        }
        if (parsedUrl.query.category) {
          const catId = parsedUrl.query.category;
          const products = await Product.find({ categories: catId }).populate('categories');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(products));
          return;
        }
        const products = await Product.find({}).populate('categories');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    })();
    return;
  }

  // Thêm 1 category mới (POST /category)
  if (pathname === '/category' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newCategory = new Category({
          name: data.name,
          parent: data.parent || null
        });
        const savedCategory = await newCategory.save();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(savedCategory));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Thêm 1 product mới (POST /product)
  if (pathname === '/product' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newProduct = new Product({
          name: data.name,
          description: data.description,
          price: data.price,
          categories: data.categories, // mong đợi mảng id của category
          images: data.images,
          show: data.show
        });
        const savedProduct = await newProduct.save();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(savedProduct));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Sửa 1 category theo id (PUT /category?id=...)
  if (pathname === '/category' && req.method === 'PUT') {
    const id = parsedUrl.query.id;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing category id' }));
      return;
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedCategory));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Sửa 1 product theo id (PUT /product?id=...)
  if (pathname === '/product' && req.method === 'PUT') {
    const id = parsedUrl.query.id;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing product id' }));
      return;
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedProduct));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Xóa 1 product theo id (DELETE /product?id=...)
  if (pathname === '/product' && req.method === 'DELETE') {
    const id = parsedUrl.query.id;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing product id' }));
      return;
    }
    (async () => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedProduct));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    })();
    return;
  }

  // Xóa 1 category theo id (DELETE /category?id=...)
  // Chỉ cho phép xóa khi category đó không được sử dụng trong product nào và không có category con
  if (pathname === '/category' && req.method === 'DELETE') {
    const id = parsedUrl.query.id;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing category id' }));
      return;
    }
    (async () => {
      try {
        // Kiểm tra xem có sản phẩm nào sử dụng category này không
        const product = await Product.findOne({ categories: id });
        if (product) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Không thể xóa vì category đang được sử dụng bởi sản phẩm nào đó' }));
          return;
        }
        // Kiểm tra xem có category con không
        const subcategory = await Category.findOne({ parent: id });
        if (subcategory) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Không thể xóa vì category có chứa category con' }));
          return;
        }
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedCategory));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    })();
    return;
  }

  // Nếu không tìm thấy route phù hợp
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});
