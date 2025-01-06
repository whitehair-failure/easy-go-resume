/* 图片上传 */
// 获取DOM元素

function uploadImg(fileInput, uploadAvatarBtn, img) {
  // 监听点击事件，触发文件上传
  uploadAvatarBtn.addEventListener("click", function () {
    fileInput.click(); // 模拟点击文件输入框
  });
  avatar.addEventListener("click", function () {
    fileInput.click(); // 模拟点击文件输入框
  });

  // 监听文件选择事件，替换图片
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0]; // 获取用户选择的文件
    if (file) {
      const reader = new FileReader(); // 创建文件读取器
      reader.onload = function (e) {
        img.style.display = "block"; // 隐藏图片
        img.src = e.target.result; // 替换图片源为上传的文件
      };
      reader.readAsDataURL(file); // 读取文件
    }
  });
}

function deleteAvatar(deleteAvatarBtn, img) {
  // 监听点击事件，删除头像
  deleteAvatarBtn.addEventListener("click", function () {
    img.style.display = "none"; // 隐藏图片
    img.src = ""; // 清空图片
  });
}

/* 添加分割线 */
// 获取盒子元素
const box = document.getElementById("box");

// 定义A4页面的高度
const A4_HEIGHT = (29.7 - 2) * 37.7952755906; // A4 高度 (mm 转换为 px)

// 检测高度是否超过A4页面的高度
function checkHeight() {
  const boxHeight = box.offsetHeight; // 获取盒子的当前高度
  const pnesCount = Math.floor(boxHeight / A4_HEIGHT); // 计算需要多少条横线

  // 移除已有的横线
  const existingpnes = box.querySelectorAll(".pne");
  existingpnes.forEach((pne) => pne.remove());

  // 添加横线
  for (let i = 1; i <= pnesCount; i++) {
    const pne = document.createElement("div");
    pne.className = "pne";
    pne.style.top = `${i * A4_HEIGHT}px`; // 横线位置
    box.appendChild(pne);
  }
}

// 初始化检测高度
checkHeight();

setInterval(checkHeight, 1000); // 每隔1秒检测一次高度

// 监听窗口大小变化时重新检测高度（比如盒子内容可能因响应式布局变化）
// window.addEventpstener("resize", checkHeight);

/* 添加编辑工具栏 */

// 获取DOM元素
const locationStorageButton = document.getElementById("locationStorage");

// 监听按钮1：存储内容到本地存储
locationStorageButton.addEventListener("click", function () {
  // 过滤掉包含ql-toolbar类名的元素
  const elementsToRemove = box.querySelectorAll(".ql-toolbar");
  elementsToRemove.forEach((element) => {
    element.remove(); // 从DOM中移除
  });

  // 获取#box内的HTML内容（过滤后的内容）
  const content = box.innerHTML;

  // 将内容存储到浏览器的本地存储
  localStorage.setItem("boxContent", content);

  // 提示存储成功
  alert("内容已成功存储到本地存储！");
});

const exportTextButton = document.getElementById("exportText");
const importTextButton = document.getElementById("importText");

// 监听按钮2：导出为文本文件
exportTextButton.addEventListener("click", function () {
  // 过滤掉包含ql-toolbar类名的元素
  const elementsToRemove = box.querySelectorAll(".ql-toolbar");
  elementsToRemove.forEach((element) => {
    element.remove(); // 从DOM中移除
  });

  // 获取#box内的HTML内容（过滤后的内容）
  const content = box.innerHTML;

  // 创建一个Blob对象并导出为文本文件
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "boxContent.txt";
  link.click();
});

// 监听按钮3：导入文本文件
importTextButton.addEventListener("click", function () {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt";
  input.onchange = function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      // 获取文件内容
      const fileContent = e.target.result;

      // 存储到本地存储
      localStorage.setItem("boxContent", fileContent);

      // 刷新页面
      window.location.reload();
    };

    reader.readAsText(file);
  };
  input.click();
});

const printPDFButton = document.getElementById("printPDF");
const clearLocalStorageButton = document.getElementById("clearLocalStorage");

// 监听按钮4：打印为PDF
printPDFButton.addEventListener("click", function () {
  // 调用浏览器的打印功能
  window.print();
});

// 监听按钮5：清除本地存储
// clearLocalStorageButton.addEventListener("click", function () {
//   // 清除本地存储
//   localStorage.removeItem("boxContent");

//   // 提示清除成功
//   alert("本地存储已清除！");

//   // 刷新页面
//   window.location.reload();
// });

const confirmationOverlay = document.getElementById("confirmationOverlay");
const cancelClearButton = document.getElementById("cancelClear");
const confirmClearButton = document.getElementById("confirmClear");

// 监听清除本地存储按钮
clearLocalStorageButton.addEventListener("click", function () {
  // 显示二次确认弹窗
  confirmationOverlay.style.display = "flex";
  confirmationOverlay.style.animation = "fadeIn 0.3s ease-in-out";
  const confirmDialog = document.querySelector(".confirm-dialog");
  confirmDialog.style.animation = "fadeInDialog 0.3s ease-in-out forwards";
});

// 监听取消按钮
cancelClearButton.addEventListener("click", function () {
  // 添加消失的动画
  const confirmDialog = document.querySelector(".confirm-dialog");
  const overlay = document.querySelector(".overlay");

  confirmDialog.style.animation = "fadeOut 0.3s ease-in-out forwards";
  overlay.style.animation = "fadeOutOverlay 0.3s ease-in-out forwards";

  // 在动画结束后隐藏弹窗
  setTimeout(function () {
    confirmationOverlay.style.display = "none";
  }, 300); // 动画时间匹配
});

// 监听确认按钮
confirmClearButton.addEventListener("click", function () {
  // 清除本地存储
  localStorage.removeItem("boxContent");

  // 提示清除成功
  alert("本地存储已清除！");

  // 添加消失的动画
  const confirmDialog = document.querySelector(".confirm-dialog");
  const overlay = document.querySelector(".overlay");

  confirmDialog.style.animation = "fadeOut 0.3s ease-in-out forwards";
  overlay.style.animation = "fadeOutOverlay 0.3s ease-in-out forwards";

  // 在动画结束后隐藏弹窗并刷新页面
  setTimeout(function () {
    confirmationOverlay.style.display = "none";
    window.location.reload();
  }, 300); // 动画时间匹配
});

// 页面加载时，检查localStorage中是否有已存储的内容
window.onload = function () {
  const avatar = document.getElementById("avatar");
  const uploadAvatarBtn = document.getElementById("upload-avatar");
  const deleteAvatarBtn = document.getElementById("delete-avatar");
  const fileInput = document.getElementById("fileInput");
  const img = avatar.querySelector("img");

  uploadImg(fileInput, avatar, img);
  uploadImg(fileInput, uploadAvatarBtn, img);
  deleteAvatar(deleteAvatarBtn, img);
};

/* 类名选择 */
// 获取选择框元素
const classSelect = document.getElementById("classSelect");

// 监听选择框的变化
classSelect.addEventListener("change", function () {
  // 获取选择的类名
  const selectedClass = this.value;

  // 获取 box 内的所有 h2 标签
  const h2Tags = document.querySelectorAll("#box h2");

  // 将所有 h2 标签的 class 更新为选中的类名
  h2Tags.forEach(function (h2) {
    h2.className = selectedClass;
  });
});
/* 类名选择 */

/* 颜色选择 */
const colorInput = document.getElementById('colorInput');
const applyColorBtn = document.getElementById('applyColor');

// 辅助函数：验证颜色格式
function isValidColor(value) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  return hexRegex.test(value) || rgbRegex.test(value);
}

// 应用颜色到页面
function applyColorToPage(color) {
  // 修改 header 的边框颜色
  document.querySelector('.header').style.borderColor = color;

  // 修改所有 h2 和 h3 的字体颜色、下边框颜色和伪类颜色
  const headings = document.querySelectorAll('h2, h3');
  headings.forEach(heading => {
    heading.style.color = color;
    heading.style.borderBottomColor = color;

    // 修改伪类颜色
    const pseudoStyle = `content: ''; background-color: ${color};`;
    heading.style.setProperty('--before-color', color);
    heading.style.setProperty('--after-color', color);
  });
}

colorInput.addEventListener('input', () => {
  const color = colorInput.value;

  if (isValidColor(color)) {
    applyColorToPage(color);
  } else {
    alert('请输入有效的颜色值！');
  }
})

// 按钮点击事件
applyColorBtn.addEventListener('click', () => {
  const color = colorInput.value;

  if (isValidColor(color)) {
    applyColorToPage(color);
  } else {
    alert('请输入有效的颜色值！');
  }
});