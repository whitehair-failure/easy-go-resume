import { toolbarOptions, forEachquillEditorItems } from "./init.js";
import { miku, momoka, ShigureUi, griffith, voldemort } from "./kyara.js";

// console.log('momoka',momoka);

// 获取简历盒子
const resumeBox = document.getElementById("resumeBox");
// 默认标题样式
let currentH2Style = "style-1";
let currentColor = "#33CCBB";

/* 图片上传 */
function uploadAvatarInit() {
  const avatar = document.getElementById("avatar");
  const uploadAvatarBtn = document.getElementById("upload-avatar");
  const fileInput = document.getElementById("fileInput");
  const img = avatar.querySelector("img");

  // 监听点击事件，触发文件上传
  avatar.addEventListener("click", function () {
    fileInput.click(); // 模拟点击文件输入框
  });
  uploadAvatarBtn.addEventListener("click", function () {
    fileInput.click(); // 模拟点击文件输入框
  });

  // 监听文件选择事件，替换图片
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0]; // 获取用户选择的文件
    if (file) {
      const reader = new FileReader(); // 创建文件读取器
      reader.onload = function (e) {
        img.style.display = "block"; // 显示图片
        img.src = e.target.result; // 替换图片源为上传的文件
      };
      reader.readAsDataURL(file); // 读取文件
    }
  });
}

function deleteAvatarInit() {
  const avatar = document.getElementById("avatar");
  const img = avatar.querySelector("img");
  const deleteAvatarBtn = document.getElementById("delete-avatar");
  // 监听点击事件，删除头像
  deleteAvatarBtn.addEventListener("click", function () {
    img.style.display = "none"; // 隐藏图片
    img.src = ""; // 清空图片
  });
}

/* 添加分割线 */
function checkHeight() {
  // 定义A4页面的高度
  const A4_HEIGHT = (29.7 - 2) * 37.7952755906; // A4 高度 (mm 转换为 px)

  const boxHeight = resumeBox.offsetHeight; // 获取盒子的当前高度
  const pnesCount = Math.floor(boxHeight / A4_HEIGHT); // 计算需要多少条横线

  // 移除已有的横线
  const existingpnes = resumeBox.querySelectorAll(".pne");
  existingpnes.forEach((pne) => pne.remove());

  // 添加横线
  for (let i = 1; i <= pnesCount; i++) {
    const pne = document.createElement("div");
    pne.className = "pne";
    pne.style.top = `${i * A4_HEIGHT}px`; // 横线位置
    resumeBox.appendChild(pne);
  }
}

/* 添加编辑工具栏 */
// pdf打印按钮
const printPDFButton = document.getElementById("printPDF");
// 导入导出按钮
const exportTextButton = document.getElementById("exportText");
const importTextButton = document.getElementById("importText");
// 本地存储按钮
const locationStorageButton = document.getElementById("locationStorage");
// 清除本地存储按钮
const clearLocalStorageButton = document.getElementById("clearLocalStorage");
// 清除本地存储二次确认弹窗
const confirmationOverlay = document.getElementById("confirmationOverlay");
const confirmClearButton = document.getElementById("confirmClear");
const cancelClearButton = document.getElementById("cancelClear");

// 监听按钮1：存储内容到本地存储
locationStorageButton.addEventListener("click", function () {
  // 过滤掉包含ql-toolbar类名的元素
  const elementsToRemove = resumeBox.querySelectorAll(".ql-toolbar");
  elementsToRemove.forEach((element) => {
    element.remove(); // 从DOM中移除
  });

  // 获取#box内的HTML内容（过滤后的内容）
  const content = resumeBox.innerHTML;

  // 将内容存储到浏览器的本地存储
  localStorage.setItem("boxContent", content);

  // 提示存储成功
  alert("内容已成功存储到本地存储！");
});

// 监听按钮2：导出为文本文件
exportTextButton.addEventListener("click", function () {
  // 过滤掉包含ql-toolbar类名的元素
  const elementsToRemove = resumeBox.querySelectorAll(".ql-toolbar");
  elementsToRemove.forEach((element) => {
    element.remove(); // 从DOM中移除
  });

  // 获取#box内的HTML内容（过滤后的内容）
  const content = resumeBox.innerHTML;

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

// 监听按钮4：打印为PDF
printPDFButton.addEventListener("click", function () {
  // 调用浏览器的打印功能
  window.print();
});

// 监听按钮5：清除本地存储
clearLocalStorageButton.addEventListener("click", function () {
  // 显示二次确认弹窗
  confirmationOverlay.style.display = "flex";
  confirmationOverlay.style.animation = "fadeIn 0.3s ease-in-out";
  const confirmDialog = document.querySelector(".confirm-dialog");
  confirmDialog.style.animation = "fadeInDialog 0.3s ease-in-out forwards";
});

// 监听取消清除按钮
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

// 监听确认清除按钮
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
  // 图片功能
  uploadAvatarInit();
  deleteAvatarInit();

  // 初始化检测高度
  checkHeight();
  setInterval(checkHeight, 1000); // 每隔1秒检测一次高度

  forEachquillEditorItems();

  /* 颜色 */
  document.getElementById("colorInput").value = currentColor;
  applyColorToPage(currentColor);
  /* 标题样式 */
  const dropdownButton = document.getElementById("dropdownButton");
  const h2Tags = document.querySelectorAll("#resumeBox h2");
  // Update button text
  dropdownButton.textContent = "样式1";

  // Update class of all h2 tags
  h2Tags.forEach((h2) => {
    h2.className = currentH2Style;
  });
};

/* 类名选择 */
// 获取选择框元素
const dropdownButton = document.getElementById("dropdownButton");
const dropdownOptions = document.getElementById("dropdownOptions");
const options = dropdownOptions.querySelectorAll(".dropdown-option");

let isOpen = false;

// Toggle dropdown visibility
dropdownButton.addEventListener("click", () => {
  if (isOpen) {
    dropdownOptions.classList.remove("open");
    dropdownOptions.classList.add("close");
    setTimeout(() => dropdownOptions.classList.remove("close"), 300);
  } else {
    dropdownOptions.classList.add("open");
  }
  isOpen = !isOpen;
});

// Handle option selection
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    const h2Tags = document.querySelectorAll("#resumeBox h2");
    const selectedClass = e.target.dataset.value;
    currentH2Style = selectedClass;
    // Update button text
    dropdownButton.textContent = e.target.textContent;

    // Update class of all h2 tags
    h2Tags.forEach((h2) => {
      h2.className = selectedClass;
    });

    // Close dropdown
    dropdownOptions.classList.remove("open");
    dropdownOptions.classList.add("close");
    setTimeout(() => dropdownOptions.classList.remove("close"), 300);
    isOpen = false;
  });
});
/* 类名选择 */

/* 角色选择 */
const roleDropdownButton = document.getElementById("roleDropdownButton");
const roleDropdownOptions = document.getElementById("roleDropdownOptions");
const roleOptions = roleDropdownOptions.querySelectorAll(
  ".roleDropdown-option"
);
let roleDropdownIsOpen = false;

// Toggle dropdown visibility
roleDropdownButton.addEventListener("click", () => {
  if (roleDropdownIsOpen) {
    roleDropdownOptions.classList.remove("open");
    roleDropdownOptions.classList.add("close");
    setTimeout(() => roleDropdownOptions.classList.remove("close"), 300);
  } else {
    roleDropdownOptions.classList.add("open");
  }
  roleDropdownIsOpen = !roleDropdownIsOpen;
});

// Handle option selection
roleOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    const selectedRole = e.target.dataset.value;

    // Update button text
    roleDropdownButton.textContent = e.target.textContent;

    if (selectedRole == "miku") {
      resumeBox.innerHTML = miku;
      currentH2Style = "style-1";
      dropdownButton.textContent = "样式1";
      currentColor = "#33CCBB";
    } else if (selectedRole == "momoka") {
      currentH2Style = "style-5";
      dropdownButton.textContent = "样式5";
      currentColor = "#EF95CF";
      resumeBox.innerHTML = momoka;
    } else if (selectedRole == "griffith") {
      resumeBox.innerHTML = griffith;
      dropdownButton.textContent = "纯真";
      currentColor = "#000000";
    } else if (selectedRole == "voldemort") {
      resumeBox.innerHTML = voldemort;
      dropdownButton.textContent = "样式3";
      currentColor = "#000000";
    } else if (selectedRole == "ShigureUi") {
      dropdownButton.textContent = "样式5";
      currentColor = "#EED8C3";
      resumeBox.innerHTML = ShigureUi;
    }

    // 工具栏初始化
    forEachquillEditorItems();
    // 图片功能
    uploadAvatarInit();
    deleteAvatarInit();
    // 颜色功能
    document.getElementById("colorInput").value = currentColor;
    applyColorToPage(currentColor);

    // Close dropdown
    roleDropdownOptions.classList.remove("open");
    roleDropdownOptions.classList.add("close");
    setTimeout(() => roleDropdownOptions.classList.remove("close"), 300);
    roleDropdownIsOpen = false;
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !dropdownButton.contains(e.target) &&
    !dropdownOptions.contains(e.target)
  ) {
    if (isOpen) {
      dropdownOptions.classList.remove("open");
      dropdownOptions.classList.add("close");
      setTimeout(() => dropdownOptions.classList.remove("close"), 300);
      isOpen = false;
    }
  }
  if (
    !roleDropdownButton.contains(e.target) &&
    !roleDropdownOptions.contains(e.target)
  ) {
    if (roleDropdownIsOpen) {
      roleDropdownOptions.classList.remove("open");
      roleDropdownOptions.classList.add("close");
      setTimeout(() => roleDropdownOptions.classList.remove("close"), 300);
      roleDropdownIsOpen = false;
    }
  }
});

/* 颜色选择 */
const colorInput = document.getElementById("colorInput");
const applyColorBtn = document.getElementById("applyColor");

// 辅助函数：验证颜色格式
function isValidColor(value) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  return hexRegex.test(value) || rgbRegex.test(value);
}

// 应用颜色到页面
function applyColorToPage(color) {
  // 修改 header 的边框颜色
  document.querySelector(".header").style.borderColor = color;

  // 修改所有 h2 和 h3 的字体颜色、下边框颜色和伪类颜色
  const headings = document.querySelectorAll("h2");
  headings.forEach((heading) => {
    heading.style.color = color;
    heading.style.borderBottomColor = color;

    // 修改伪类颜色
    const pseudoStyle = `content: ''; background-color: ${color};`;
    heading.style.setProperty("--before-color", color);
    heading.style.setProperty("--after-color", color);
  });
}

colorInput.addEventListener("input", () => {
  const color = colorInput.value;

  if (isValidColor(color)) {
    applyColorToPage(color);
  } else {
    alert("请输入有效的颜色值！");
  }
});

// 按钮点击事件
applyColorBtn.addEventListener("click", () => {
  const color = colorInput.value;

  if (isValidColor(color)) {
    applyColorToPage(color);
  } else {
    alert("请输入有效的颜色值！");
  }
});
/* 颜色选择结束 */

// 添加 section 模板
function addSection() {
  const title = document.getElementById("section-title").value;
  if (!title) {
    alert("请输入模板标题！");
    return;
  }

  let oldQlToolbarItems = document.querySelectorAll(".ql-toolbar");
  const colorInput = document.getElementById("colorInput");
  const color = colorInput.value;

  const sectionHTML = `
      <div class="section">
        <h2 class="${currentH2Style}" style="color:${color}; border-bottom-color: ${color}; --before-color: ${color}; --after-color: ${color};"">${title}</h2>
        <div id="editor-container${oldQlToolbarItems.length}" class="quill-editor-item">
          <ul>
            <li>持续探索AI与音乐的结合，致力于虚拟表演技术的发展。</li>
            <li>喜欢和粉丝互动，通过音乐表达情感和传递正能量。</li>
            <li>偶尔客串动画角色，为更多文化作品注入生命力。</li>
          </ul>
        </div>
        <div class="delete-btn" onclick="removeSection(this)">删除</div>
      </div>
    `;

  // 将新 section 添加到 resumeBox 内部
  document
    .getElementById("resumeBox")
    .insertAdjacentHTML("beforeend", sectionHTML);
  // 清空输入框
  document.getElementById("section-title").value = "";

  let newEditorContainer = document.getElementById(
    `editor-container${oldQlToolbarItems.length}`
  );

  // 初始化 Quill 编辑器
  new Quill(`#editor-container${oldQlToolbarItems.length}`, {
    theme: "snow",
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: "Compose an epic...",
  });

  let qlToolbarItems = document.querySelectorAll(".ql-toolbar");

  console.log("qlToolbarItems", qlToolbarItems);

  for (var i = 0; i < qlToolbarItems.length; i++) {
    // let quillEditorItem = quillEditorItems[i];
    let qlToolbarItem = qlToolbarItems[i];

    qlToolbarItem.addEventListener("mouseover", () => {
      // quillEditorItem.style = "border: 1px solid #33CCBB !important;";
      qlToolbarItem.style.display = "block";
    });

    qlToolbarItem.addEventListener("mouseout", () => {
      // quillEditorItem.style = "border: none !important;";
      qlToolbarItem.style.display = "none";
    });

    if (i === qlToolbarItems.length - 1) {
      newEditorContainer.addEventListener("mouseover", () => {
        newEditorContainer.style = "border: 1px solid #33CCBB !important;";
        qlToolbarItem.style.display = "block";
      });

      newEditorContainer.addEventListener("mouseout", () => {
        newEditorContainer.style = "border: none !important;";
        qlToolbarItem.style.display = "none";
      });
    }
  }
}

document.getElementById("add-section").addEventListener("click", addSection);
