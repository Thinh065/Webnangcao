const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'POST' && pathname === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            console.log('Form Data:', formData);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Received: ${JSON.stringify(formData)}</h1>`);
        });
    } else {
        let filePath = path.join(__dirname, pathname === '' ? 'product.html' : pathname);
        let contentType = 'text/html';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>Page Not Found</h1>');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf8');
            }
        });
    }
});

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/product.html');
    console.log('Server is running on http://localhost:4000/register.html');
});