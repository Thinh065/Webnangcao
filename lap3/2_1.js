const fs = require('fs');

// Ghi nội dung vào data.txt
fs.writeFile('data.txt', 'Lập trình web nâng cao\n', (err) => {
    if (err) throw err;
    console.log('File created and content written!');

    // Thêm nội dung thứ 2
    fs.appendFile('data.txt', 'Làm quen với NodeJS - <Tran Nhat Thinh>', (err) => {
        if (err) throw err;
        console.log('Content appended!');
    });
});