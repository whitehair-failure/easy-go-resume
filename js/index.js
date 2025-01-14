import {
  toolbarOptions,
  forEachquillEditorItems,
  uploadAvatarInit,
  deleteAvatarInit,
  checkHeight,
} from "./init.js";
import { enCharacter, jaCharacter, zhCharacter } from "./kyara.js";

// console.log('momoka',momoka);

// 页面加载
// 获取简历盒子
const resumeBox = document.getElementById("resumeBox");
// 默认标题样式
let currentH2Style = "style-1";

// 获取本地存储简历内容
const savedContent = localStorage.getItem("resume-text");
let currentH2StyleText = localStorage.getItem("currentH2StyleText") || "样式4";
let currentColor = localStorage.getItem("currentColor") || "#33CCBB";
if (savedContent) {
  // 如果存在，渲染存储的内容到#box
  console.log("存在已存储的内容");
  resumeBox.innerHTML = savedContent;
  const dropdownButton = document.getElementById("dropdownButton");
  dropdownButton.textContent = currentH2StyleText;
} else {
  let currentLanguage = localStorage.getItem("language") || "en";
  let currentCharacters = null;
  switch (currentLanguage) {
    case "en":
      currentCharacters = enCharacter;
      break;
    case "ja":
      currentCharacters = jaCharacter;
      break;
    case "zh":
      currentCharacters = zhCharacter;
      break;
    default:
      currentCharacters = enCharacter;
      break;
  }
  // 如果不存在，渲染默认内容到#box
  resumeBox.innerHTML = currentCharacters.miku;
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
  link.download = "resume-text.txt";
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
      localStorage.setItem("resume-text", fileContent);
      localStorage.setItem("currentColor", currentColor);

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

// 监听按钮：存储内容到本地存储
locationStorageButton.addEventListener("click", function () {
  // 过滤掉包含ql-toolbar类名的元素
  const elementsToRemove = resumeBox.querySelectorAll(".ql-toolbar");
  elementsToRemove.forEach((element) => {
    element.remove(); // 从DOM中移除
  });

  // 获取#box内的HTML内容（过滤后的内容）
  const content = resumeBox.innerHTML;

  // 将内容存储到浏览器的本地存储
  localStorage.setItem("resume-text", content);
  localStorage.setItem("currentColor", currentColor);
  localStorage.setItem("currentH2StyleText", currentH2StyleText);

  // 提示存储成功
  alert("内容已成功存储到本地存储！");
});

// 监听按钮：清除本地存储
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
  localStorage.removeItem("resume-text");
  localStorage.removeItem("currentH2StyleText");
  localStorage.removeItem("currentColor");

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

    let currentLanguage = localStorage.getItem("language") || "en";

    let currentCharacters = null;
    let currentStyleTextContent = "样式";

    switch (currentLanguage) {
      case "en":
        currentCharacters = enCharacter;
        currentStyleTextContent = "Style";
        break;
      case "ja":
        currentCharacters = jaCharacter;
        currentStyleTextContent = "スタイル";
        break;
      case "zh":
        currentCharacters = zhCharacter;
        currentStyleTextContent = "样式";
        break;
      default:
        currentCharacters = enCharacter;
        currentStyleTextContent = "Style";
        break;
    }

    if (selectedRole == "miku") {
      resumeBox.innerHTML = currentCharacters.miku;
      currentH2Style = "style-1";
      dropdownButton.textContent = `${currentStyleTextContent}1`;
      currentH2StyleText = `${currentStyleTextContent}1`;
      currentColor = "#33CCBB";
    } else if (selectedRole == "momoka") {
      currentH2Style = "style-5";
      dropdownButton.textContent = `${currentStyleTextContent}5`;
      currentH2StyleText = `${currentStyleTextContent}5`;
      currentColor = "#EF95CF";
      resumeBox.innerHTML = currentCharacters.momoka;
    } else if (selectedRole == "griffith") {
      resumeBox.innerHTML = currentCharacters.griffith;
      dropdownButton.textContent = "纯真";
      currentH2StyleText = "纯真";
      currentColor = "#000000";
    } else if (selectedRole == "voldemort") {
      resumeBox.innerHTML = currentCharacters.voldemort;
      dropdownButton.textContent = `${currentStyleTextContent}3`;
      currentH2StyleText = `${currentStyleTextContent}3`;
      currentColor = "#000000";
    } else if (selectedRole == "ShigureUi") {
      dropdownButton.textContent = `${currentStyleTextContent}5`;
      currentH2StyleText = `${currentStyleTextContent}5`;
      currentColor = "#EED8C3";
      resumeBox.innerHTML = currentCharacters.ShigureUi;
    } else if (selectedRole == "GawrGura") {
      dropdownButton.textContent = `${currentStyleTextContent}4`;
      currentH2StyleText = `${currentStyleTextContent}4`;
      currentColor = "#3A69B2";
      resumeBox.innerHTML = currentCharacters.GawrGura;
    } else if (selectedRole == "TadokoroKoji") {
      dropdownButton.textContent = `${currentStyleTextContent}2`;
      currentH2StyleText = `${currentStyleTextContent}2`;
      currentColor = "#EE4514";
      resumeBox.innerHTML = currentCharacters.TadokoroKoji;
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
const colorHEXInput = document.getElementById("colorHEXInput");

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

  const slider1 = document.getElementById("progress1");
  const slider2 = document.getElementById("progress2");
  slider1.style.setProperty("--thumb-background-color", color);
  slider2.style.setProperty("--thumb-background-color", color);
  colorHEXInput.value = color;
  colorInput.value = color;
}

colorHEXInput.addEventListener("input", () => {
  const color = colorHEXInput.value;

  if (isValidColor(color)) {
    applyColorToPage(color);
  }
});

colorInput.addEventListener("input", () => {
  const color = colorInput.value;

  if (isValidColor(color)) {
    applyColorToPage(color);
  }
});
/* 颜色选择结束 */

// 添加 section 模板
function addSection() {
  console.log(446669);

  const title = document.getElementById("section-title").value;
  if (!title) {
    alert("请输入模板标题！");
    return;
  }

  // 获取当前颜色
  const colorInput = document.getElementById("colorInput");
  const color = colorInput.value;
  // 获取新模块ID
  let quillEditorItems = document.querySelectorAll(".quill-editor-item");
  let oldLastId = quillEditorItems[quillEditorItems.length - 1].id.replace(
    "editor-container",
    ""
  );
  oldLastId = parseInt(oldLastId);
  let newEditorContainerId = oldLastId + 1;
  newEditorContainerId = "editor-container" + newEditorContainerId;

  const sectionHTML = `
      <div class="section">
        <h2 class="${currentH2Style}" style="color:${color}; border-bottom-color: ${color}; --before-color: ${color}; --after-color: ${color};"">${title}</h2>
        <div id="editor-container${newEditorContainerId}" class="quill-editor-item">
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

  // 初始化 Quill 编辑器
  new Quill(`#editor-container${newEditorContainerId}`, {
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
      let newEditorContainer = document.getElementById(
        `editor-container${newEditorContainerId}`
      );

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

/* 侧边栏动画 */
function leftContainerChange() {
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");

  const collapsePanel = document.querySelector(".collapse-panel");
  const ReimuHakurei = document.querySelector(".ReimuHakurei");

  if (leftContainer.style.width === "0px") {
    collapsePanel.style.opacity = "1";
    ReimuHakurei.style.right = "0px";

    setTimeout(() => {
      ReimuHakurei.style.display = "none";

      leftContainer.style.width = "300px";
      leftContainer.style.padding = "20px";
      rightContainer.style.width = "calc(100% - 340px)";
      rightContainer.style.marginLeft = "340px";
    }, 300);
  } else {
    leftContainer.style.width = "0px";
    leftContainer.style.padding = "20px 0";
    rightContainer.style.width = "100%";
    rightContainer.style.marginLeft = "0";

    setTimeout(() => {
      ReimuHakurei.style.display = "block";
      collapsePanel.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      ReimuHakurei.style.right = "-160px";
    }, 600);
  }
}
let collapsePanel = document.querySelector(".collapse-panel");
let ReimuHakurei = document.querySelector(".ReimuHakurei");
collapsePanel.addEventListener("click", leftContainerChange);
ReimuHakurei.addEventListener("click", leftContainerChange);
/* 侧边栏动画 */

/**
 * 初始化进度条组件
 * @param {string} containerId - 进度条的容器ID
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {number} initialValue - 初始值
 * @param {function} onChange - 进度变化时触发的回调函数
 */
function createProgressBar(
  containerId,
  min = 0,
  max = 100,
  initialValue = 0,
  onChange
) {
  const container = document.getElementById(containerId);

  if (!container) return; // 如果容器不存在，直接返回

  // 创建进度条相关元素
  const progressBar = document.createElement("input");
  progressBar.type = "range";
  progressBar.classList.add("progress-bar");
  progressBar.min = min;
  progressBar.max = max;
  progressBar.value = initialValue;
  progressBar.step = 1;

  const progressTrack = document.createElement("div");
  progressTrack.classList.add("progress-track");

  const progressValue = document.createElement("div");
  progressValue.classList.add("progress-value");
  progressValue.textContent = initialValue;

  // 将元素添加到容器中
  container.appendChild(progressTrack);
  container.appendChild(progressBar);
  progressTrack.appendChild(progressValue);

  // 更新进度指示器和进度条背景
  function updateProgress() {
    const value = progressBar.value;
    progressTrack.style.width =
      (Math.floor(value - min) / Math.floor(max - min)) * 100 + "%";

    //   let tt = (Math.floor(value - min) / Math.floor(max - min)) * 100
    // // 更新进度值的显示位置
    // progressValue.style.left = `calc(${tt}% - 15px)`;

    // 如果有传入 onChange 回调函数，则触发回调
    if (typeof onChange === "function") {
      let selfValue = onChange(value);
      progressValue.textContent = selfValue || value / 100;
    }
  }

  // 更新进度条
  progressBar.addEventListener("input", updateProgress);

  // 长按拖动
  let isDragging = false;

  progressBar.addEventListener("mousedown", function () {
    isDragging = true;
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
    }
  });

  document.addEventListener("mousemove", function (event) {
    if (isDragging) {
      let rect = progressBar.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let value = Math.max(min, Math.min((x / rect.width) * max, max));
      progressBar.value = value;
      updateProgress();
    }
  });

  // 初始化时更新
  updateProgress();
}

// 页面加载时初始化多个进度条
document.addEventListener("DOMContentLoaded", function () {
  // 头像功能
  uploadAvatarInit();
  deleteAvatarInit();

  // 初始化检测高度
  checkHeight();
  setInterval(checkHeight, 1000); // 每隔1秒检测一次高度

  forEachquillEditorItems();

  /* 颜色 */
  document.getElementById("colorInput").value = currentColor;
  applyColorToPage(currentColor);

  // 定义每个进度条的 onChange 事件回调
  createProgressBar("progress1", 125, 300, 175, function (value) {
    console.log("进度条 1 当前进度:", value);
    const tags = document.querySelectorAll(
      "#resumeBox h3,#resumeBox p,#resumeBox li"
    );
    let lineHeight = value / 100;
    tags.forEach((h2) => {
      h2.classList.remove("ql-lineheight-1-25");
      h2.classList.remove("ql-lineheight-1-375");
      h2.classList.remove("ql-lineheight-1-5");
      h2.classList.remove("ql-lineheight-1-75");
      h2.classList.remove("ql-lineheight-1-875");
      h2.classList.remove("ql-lineheight-2");
      h2.classList.remove("ql-lineheight-3");
      h2.style.lineHeight = lineHeight;
    });
    return lineHeight;
  });

  createProgressBar("progress2", 0, 50, 16, function (value) {
    console.log("进度条 2 当前进度:", value);
    const tags = document.querySelectorAll(".section");
    const h2Tags = document.querySelectorAll("h2");
    let marginTop = value;
    tags.forEach((h2) => {
      h2.style.marginTop = marginTop + "px";
    });
    if (marginTop < 6) {
      h2Tags.forEach((h2) => {
        h2.style.marginBottom = marginTop + "px";
      });
    } else {
      h2Tags.forEach((h2) => {
        h2.style.marginBottom = 6 + "px";
      });
    }
    return marginTop + "px";
  });
});
