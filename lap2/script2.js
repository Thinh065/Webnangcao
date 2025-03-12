let data = [
    { id: 1, name: "Nguyễn Văn A", age: 25, city: "Hà Nội" },
    { id: 2, name: "Trần Thị B", age: 30, city: "HCM City" },
    { id: 3, name: "Lê Văn C", age: 35, city: "Đà Nẵng" },
    { id: 4, name: "Phạm Thị D", age: 28, city: "Huế" },
    { id: 5, name: "Hoàng Văn E", age: 40, city: "Nha Trang" },
    { id: 6, name: "Trần Văn F", age: 32, city: "Hà Nội" },
    { id: 7, name: "Bùi Văn G", age: 22, city: "HCM City" },
    { id: 8, name: "Ngô Thị H", age: 27, city: "Vũng Tàu" },
    { id: 9, name: "Phan Văn I", age: 31, city: "Cần Thơ" },
    { id: 10, name: "Đặng Thị J", age: 29, city: "Huế" }
];

// a. Hiển thị danh sách người dùng
function displayUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = data.map(user => 
        `<p>${user.id}. ${user.name}, Tuổi: ${user.age}, Thành phố: ${user.city}</p>`
    ).join("");
}

// b. Hiển thị người có tuổi lớn nhất
function displayOldestUser() {
    const oldest = data.reduce((max, user) => user.age > max.age ? user : max, data[0]);
    document.getElementById("functionOutput").innerHTML = 
        `<p>Người lớn tuổi nhất: ${oldest.name}, Tuổi: ${oldest.age}, Thành phố: ${oldest.city}</p>`;
}

// c. Hiển thị thông tin người có ID là 4
function displayUserById(id) {
    const user = data.find(user => user.id === id);
    document.getElementById("functionOutput").innerHTML = 
        `<p>Người có ID = ${id}: ${user.name}, Tuổi: ${user.age}, Thành phố: ${user.city}</p>`;
}

// d. Hiển thị từ người thứ 3 đến người thứ 7
function displayUsersRange(start, end) {
    const users = data.slice(start - 1, end);
    document.getElementById("functionOutput").innerHTML = 
        users.map(user => `<p>${user.id}. ${user.name}, Tuổi: ${user.age}, Thành phố: ${user.city}</p>`).join("");
}

// e. Sắp xếp danh sách theo tuổi giảm dần
function sortUsersByAge() {
    const sorted = [...data].sort((a, b) => b.age - a.age);
    document.getElementById("userList").innerHTML = 
        sorted.map(user => `<p>${user.id}. ${user.name}, Tuổi: ${user.age}, Thành phố: ${user.city}</p>`).join("");
}

// f. Tìm kiếm theo tên không phân biệt chữ hoa chữ thường
function searchByName() {
    const searchName = document.getElementById("searchName").value.trim().toLowerCase();
    const searchResultDiv = document.getElementById("searchResult");

    if (searchName === "") {
        searchResultDiv.innerHTML = "<p>Vui lòng nhập tên để tìm kiếm.</p>";
        return;
    }

    // Lọc danh sách theo tên (không phân biệt hoa thường)
    const results = data.filter(user => user.name.toLowerCase().includes(searchName));

    if (results.length > 0) {
        searchResultDiv.innerHTML = results.map(user =>
            `<p>${user.id}. ${user.name}, Tuổi: ${user.age}, Thành phố: ${user.city}</p>`
        ).join("");
    } else {
        searchResultDiv.innerHTML = "<p>Không tìm thấy người dùng phù hợp!</p>";
    }
}

document.getElementById("searchButton").addEventListener("click", searchByName);

// g. Thêm người mới
function addUser(event) {
    event.preventDefault();
    const newName = document.getElementById("newName").value;
    const newAge = parseInt(document.getElementById("newAge").value);
    const newCity = document.getElementById("newCity").value;

    if (newName.length < 8 || /\d|[^a-zA-Z\s]/.test(newName)) {
        document.getElementById("addUserError").textContent = "Tên phải ít nhất 8 ký tự và không chứa số hoặc ký tự đặc biệt.";
        return;
    }
    if (newAge <= 0 || isNaN(newAge)) {
        document.getElementById("addUserError").textContent = "Tuổi phải là số nguyên dương.";
        return;
    }

    data.push({ id: data.length + 1, name: newName, age: newAge, city: newCity });
    displayUsers();
    document.getElementById("addUserError").textContent = "";
    document.getElementById("addUserForm").reset();
}

// h. Tách danh sách chỉ chứa tên riêng
function extractFirstNames() {
    const names = data.map(user => user.name.split(" ").slice(-1).join(""));
    document.getElementById("functionOutput").innerHTML = 
        `<p>${names.join(", ")}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
    document.getElementById("searchButton").addEventListener("click", searchByName);
    document.getElementById("oldestUserButton").addEventListener("click", displayOldestUser);
    document.getElementById("userByIdButton").addEventListener("click", () => displayUserById(4));
    document.getElementById("usersRangeButton").addEventListener("click", () => displayUsersRange(3, 7));
    document.getElementById("sortUsersButton").addEventListener("click", sortUsersByAge);
    document.getElementById("extractNamesButton").addEventListener("click", extractFirstNames);
});