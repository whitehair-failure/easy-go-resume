const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["link", "image"],

  ["blockquote", "code-block"],

  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ font: [] }],
  [{ align: [] }],

  //.... 其他工具栏配置项
  [{ lineheight: ["1-25", "1-375", "1-5", "1-75", "1-875", "2", "3"] }], //行高

  // [{ 'line-height': ['1', false, '2'] }], // 这一步是自定义行高选择器

  ["clean"], // remove formatting button
];

//在这个位置添加下面代码
const Parchment = Quill.import("parchment");
class lineHeightAttributor extends Parchment.Attributor.Class {}
const lineHeightStyle = new lineHeightAttributor(
  "lineheight",
  "ql-lineheight",
  {
    scope: Parchment.Scope.BLOCK,
    whitelist: ["1-25", "1-375", "1-5", "1-75", "1-875", "2", "3"],
  }
);
Quill.register({ "formats/lineHeight": lineHeightStyle }, true);

function forEachquillEditorItems(newQuill) {
  console.log("forEachquillEditorItems =>114514");

  let quillEditorItems = document.querySelectorAll(".quill-editor-item");

  // 使用 map 获取所有元素的 id
  let ids = Array.from(quillEditorItems).map((item) => item.id);

  console.log(ids); // 输出所有 id

  let QuillArr = [];

  quillEditorItems.forEach((item, index) => {
    // 初始化 Quill 编辑器
    let newQuill = new Quill(`#${ids[index]}`, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Compose an epic...",
    });

    QuillArr.push(newQuill);
  });

  let qlToolbarItems = document.querySelectorAll(".ql-toolbar");

  console.log("qlToolbarItems", qlToolbarItems);

  
  for (var i = 0; i < quillEditorItems.length; i++) {

    let quillEditorItem = quillEditorItems[i];
    let qlToolbarItem = qlToolbarItems[i];

    console.log('qlToolbarItems[' + i + ']', qlToolbarItems[i]);

    qlToolbarItem.addEventListener('mouseover', () => {
      quillEditorItem.style = "border: 1px solid #33CCBB !important;";
      qlToolbarItem.style.display = 'block';
    });

    qlToolbarItem.addEventListener('mouseleave', () => {
      quillEditorItem.style = "border: none !important;";
      qlToolbarItem.style.display = 'none';
    });

    quillEditorItem.addEventListener('mouseover', () => {
      quillEditorItem.style = "border: 1px solid #33CCBB !important;";
      qlToolbarItem.style.display = 'block';
    });

    quillEditorItem.addEventListener('mouseleave', () => {
      quillEditorItem.style = "border: none !important;";
      qlToolbarItem.style.display = 'none';
    });

  }

  /* document.addEventListener("click", () => {
    for (var i = 0; i < QuillArr.length; i++) {
      let quillEditorItem = quillEditorItems[i];
      let qlToolbarItem = qlToolbarItems[i];
      let currentQuill = QuillArr[i];

      if (currentQuill.hasFocus()) {
        quillEditorItem.style = "border: 1px solid #33CCBB !important;";
        qlToolbarItem.style.display = "block";
      } else {
        quillEditorItem.style = "border: none !important;";
        qlToolbarItem.style.display = "none";
      }
    }
  }); */
}

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
const resumeBox = document.getElementById("resumeBox");
const rightContainer = document.querySelector(".right-container");

/* 添加分割线 */
function checkHeight() {
  // 定义A4页面的高度
  const A4_HEIGHT = (29.7 - 2) * 37.7952755906; // A4 高度 (cm 转换为 px)

  const boxHeight = resumeBox.offsetHeight; // 获取盒子的当前高度
  const pnesCount = Math.floor(boxHeight / A4_HEIGHT); // 计算需要多少条横线

  // 移除已有的横线
  const existingpnes = rightContainer.querySelectorAll(".pne");
  existingpnes.forEach((pne) => pne.remove());

  // 添加横线
  for (let i = 1; i <= pnesCount; i++) {
    const pne = document.createElement("div");
    pne.className = "pne";
    pne.style.top = `${i * A4_HEIGHT}px`; // 横线位置
    rightContainer.appendChild(pne);
  }
}

export {
  toolbarOptions,
  forEachquillEditorItems,
  uploadAvatarInit,
  deleteAvatarInit,
  checkHeight,
};
