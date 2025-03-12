function removeVietnameseTones(str) {
    return str
        .normalize("NFD") // Chuyển đổi ký tự thành Unicode (NFD)
        .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
        .replace(/đ/g, "d") // Chuyển đ thành d
        .replace(/Đ/g, "D") // Chuyển Đ thành D
}

function convertText() {
    const inputText = document.getElementById("inputText").value;
    const result = removeVietnameseTones(inputText);
    document.getElementById("result").innerText = result;
}