var empList = localStorage.getItem("employeeList") ? JSON.parse(localStorage.getItem("employeeList")) : [];

var chosenIndex = -1;

const CHUA_CHON = "Chọn chức vụ";
const SEP = "Sếp";
const TRUONG_PHONG = "Trưởng phòng";
const NHAN_VIEN = "Nhân viên";

const XUAT_SAC = "Xuất sắc";
const GIOI = "Giỏi";
const KHA = "Khá";
const TRUNG_BINH = "Trung bình";

function Employee(_memberAccount, _fullName, _email, _password, _workDate, _basicSalary, _position, _workingHours) {
  this.memberAccount = _memberAccount;
  this.fullName = _fullName;
  this.email = _email;
  this.password = _password;
  this.workDate = _workDate;
  this.basicSalary = _basicSalary;
  this.position = _position;
  this.workingHours = _workingHours;
  this.calTotalSalary = function () {
    if (this.position === SEP) {
      return this.basicSalary * 3;
    }
    if (this.position === TRUONG_PHONG) {
      return this.basicSalary * 2;
    }
    return this.basicSalary;
  };
  this.classification = function () {
    if (this.workingHours >= 192) {
      return XUAT_SAC;
    }
    if (this.workingHours >= 176) {
      return GIOI;
    }
    if (this.workingHours >= 160) {
      return KHA;
    }
    return TRUNG_BINH;
  };

  // Em làm getter và setter để đảm bảo tính đóng gói trong OOP :v
  // Em tập để quen mốt mà làm programming language khác cho dễ
  this.getMemberAccount = function () {
    return this.memberAccount;
  };
  this.setMemberAccount = function (newMemberAccount) {
    this.memberAccount = newMemberAccount;
  };
  this.getFullName = function () {
    return this.fullName;
  };
  this.setFullName = function (newFullName) {
    this.fullName = newFullName;
  };
  this.getEmail = function () {
    return this.email;
  };
  this.setEmail = function (newEmail) {
    this.email = newEmail;
  };
  this.getPassword = function () {
    return this.password;
  };
  this.setPassword = function (newPassword) {
    this.password = newPassword;
  };
  this.getWorkDate = function () {
    return this.workDate;
  };
  this.setWorkDate = function (newWorkDate) {
    this.workDate = newWorkDate;
  };
  this.getBasicSalary = function () {
    return this.basicSalary;
  };
  this.setBasicSalary = function (newBasicSalary) {
    this.basicSalary = newBasicSalary;
  };
  this.getPosition = function () {
    return this.position;
  };
  this.setPosition = function (newPosition) {
    this.position = newPosition;
  };
  this.getWorkingHours = function () {
    return this.workingHours;
  };
  this.setWorkingHours = function (newWorkingHours) {
    this.workingHours = newWorkingHours;
  };
}

document.getElementById("luongCB").type = "number";
document.getElementById("gioLam").type = "number";

function formCheckRegexFalse(memberAccount = "999999", fullName, email, password, workDate, basicSalary, position, workingHours) {
  //   const accountRegex = /^\d{4,6}$/;
  const accountRegex = /^(?!.*0$)\d{4,6}$/;
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,10}$/;

  if (!accountRegex.test(memberAccount)) {
    alert('Tài khoản phải là số có 4-6 chữ số, cũng ko dc để "000000"');
    return !accountRegex.test(memberAccount);
  }
  if (!nameRegex.test(fullName)) {
    alert("Họ tên không được chứa số và kí tự đặc biệt");
    return !nameRegex.test(fullName);
  }
  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng");
    return !emailRegex.test(email);
  }
  if (!passwordRegex.test(password)) {
    alert("Mật khẩu phải có 6-10 kí tự, ít nhất 1 chữ hoa, 1 chữ số và 1 kí tự đặc biệt");
    return !passwordRegex.test(password);
  }
  if (workDate === "") {
    alert("Vui lòng chọn ngày làm");
    return workDate === "";
  }
  if (basicSalary === "") {
    alert("Vui lòng nhập lương cơ bản");
    return basicSalary === "";
  }
  if (basicSalary < 1e6 || basicSalary > 2e7) {
    alert("Lương cơ bản phải từ 1.000.000 - 20.000.000");
    return basicSalary < 1e6 || basicSalary > 2e7;
  }
  if (position === CHUA_CHON) {
    alert("Vui lòng chọn chức vụ");
    return position === CHUA_CHON;
  }
  if (workingHours < 80 || workingHours > 200) {
    alert("Giờ làm phải từ 80 - 200 giờ");
    return workingHours < 80 || workingHours > 200;
  }
  return false;
}

function getInfo() {
  const memberAccount = document.getElementById("tknv").value;
  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const workDate = document.getElementById("datepicker").value;
  const basicSalary = document.getElementById("luongCB").value * 1;
  const position = document.getElementById("chucvu").value;
  const workingHours = document.getElementById("gioLam").value * 1;
  if (formCheckRegexFalse(memberAccount, fullName, email, password, workDate, basicSalary, position, workingHours)) {
  } else {
    for (let i = 0; i < empList.length; i++) {
      if (empList[i].memberAccount === memberAccount || empList[i].email === email) {
        alert("Tài khoản đã tồn tại (ID hoặc email trùng)");
        return;
      }
    }
    let employee = new Employee(memberAccount, fullName, email, password, workDate, basicSalary, position, workingHours);
    empList.push(employee);
    localStorage.setItem("employeeList", JSON.stringify(empList));
    showInfo();

    emptyInput();

    document.getElementById("btnThemNV").setAttribute("data-dismiss", "modal");

    alert("Thêm nhân viên thành công");
  }
}

function emptyInput() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = CHUA_CHON;
  document.getElementById("gioLam").value = "";
}

btnThem.addEventListener("click", () => {
  emptyInput();
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").removeAttribute("data-dismiss");
});
btnThemNV.addEventListener("click", () => getInfo());

function showInfo() {
  let tableBody = document.getElementById("tableDanhSach");
  let content = "";
  for (let i = 0; i < empList.length; i++) {
    let emp = new Employee(
      empList[i].memberAccount,
      empList[i].fullName,
      empList[i].email,
      empList[i].password,
      empList[i].workDate,
      empList[i].basicSalary,
      empList[i].position,
      empList[i].workingHours,
    );
    content += renderContent(emp);
  }
  tableBody.innerHTML = content;
}

showInfo();

function deleteEmployee(memberAccount) {
  let index = empList.findIndex(emp => emp.memberAccount === memberAccount);
  if (index !== -1) {
    empList.splice(index, 1);
  }
  localStorage.setItem("employeeList", JSON.stringify(empList));
  showInfo();
  alert("Xóa nhân viên thành công");
}

function getEmployee(memberAccount) {
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";
  let index = empList.findIndex(emp => emp.memberAccount === memberAccount);
  chosenIndex = index;
  if (index !== -1) {
    let emp = empList[index];
    document.getElementById("tknv").value = emp.memberAccount;
    document.getElementById("name").value = emp.fullName;
    document.getElementById("email").value = emp.email;
    document.getElementById("password").value = emp.password;
    document.getElementById("datepicker").value = emp.workDate;
    document.getElementById("luongCB").value = emp.basicSalary;
    document.getElementById("chucvu").value = emp.position;
    document.getElementById("gioLam").value = emp.workingHours;
  }
}

function updateEmployee(memberAccount) {
  let index = empList.findIndex(emp => emp.memberAccount === memberAccount);
  if (
    formCheckRegexFalse(
      undefined,
      document.getElementById("name").value,
      document.getElementById("email").value,
      document.getElementById("password").value,
      document.getElementById("datepicker").value,
      document.getElementById("luongCB").value,
      document.getElementById("chucvu").value,
      document.getElementById("gioLam").value,
    )
  ) {
  } else {
    let emp = empList[index];
    emp.fullName = document.getElementById("name").value;
    emp.email = document.getElementById("email").value;
    emp.password = document.getElementById("password").value;
    emp.workDate = document.getElementById("datepicker").value;
    emp.basicSalary = document.getElementById("luongCB").value * 1;
    emp.position = document.getElementById("chucvu").value;
    emp.workingHours = document.getElementById("gioLam").value * 1;
    localStorage.setItem("employeeList", JSON.stringify(empList));
    showInfo();
    document.getElementById("btnCapNhat").setAttribute("data-dismiss", "modal");
    document.getElementById("tknv").disabled = false;
    alert("Cập nhật thành công");
  }
}

btnCapNhat.addEventListener("click", () => {
  let memberAccount = empList[chosenIndex].memberAccount;
  updateEmployee(memberAccount);
});

document.addEventListener("DOMContentLoaded", function () {
  var findType = document.getElementById("searchName");
  findType.addEventListener("keyup", findEmployeeByType);
});

function findEmployeeByType() {
  const type = this.value;
  if (type == "") {
    showInfo();
  } else {
    let tableBody = document.getElementById("tableDanhSach");
    let content = "";
    const regex = new RegExp(removeExtraSpaces(convertVietnameseToEnglish(type.trim().toLowerCase())), "g");
    for (let i = 0; i < empList.length; i++) {
      let emp = new Employee(
        empList[i].memberAccount,
        empList[i].fullName,
        empList[i].email,
        empList[i].password,
        empList[i].workDate,
        empList[i].basicSalary,
        empList[i].position,
        empList[i].workingHours,
      );
      if (convertVietnameseToEnglish(emp.classification().toLowerCase()).match(regex)) {
        content += renderContent(emp);
      }
    }
    tableBody.innerHTML = content;
  }
}

btnTimNV.addEventListener("click", () => findEmployeeByType());
btnTimNV.style.cursor = "pointer";

searchName.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    findEmployeeByType();
  }
});

function renderContent(emp) {
  return `
      <tr>
          <td>${emp.getMemberAccount()}</td>
          <td>${emp.getFullName()}</td>
          <td>${emp.getEmail()}</td>
          <td>${emp.getWorkDate()}</td>
          <td>${emp.getPosition()}</td>
          <td>${Intl.NumberFormat().format(emp.calTotalSalary())}</td>
          <td>${emp.classification()}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteEmployee('${emp.getMemberAccount()}')">Xóa</button>
            <button class="btn btn-info" data-toggle="modal"
              data-target="#myModal" onclick="getEmployee('${emp.getMemberAccount()}')">Sửa</button>
          </td>
      </tr>
    `;
}

function convertVietnameseToEnglish(input) {
  const diacriticsMap = {
    à: "a",
    á: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ằ: "a",
    ắ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    ầ: "a",
    ấ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    â: "a",
    è: "e",
    é: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ề: "e",
    ế: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    ì: "i",
    í: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ò: "o",
    ó: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ố: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ổ: "o",
    ố: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ớ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ù: "u",
    ú: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ừ: "u",
    ứ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ỳ: "y",
    ý: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
    đ: "d",
  };

  return input.replace(/[àáảãạăằắẳẵặầấẩẫậâèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộổốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/g, match => diacriticsMap[match] || match);
}

function removeExtraSpaces(inputString) {
  return inputString.replace(/\s+/g, " ").trim();
}

function applyNumberInputStyles() {
  const styleElement = document.createElement("style");

  const cssRules = `
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }
    `;

  styleElement.appendChild(document.createTextNode(cssRules));

  document.head.appendChild(styleElement);
}

applyNumberInputStyles();
