
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  ['link', 'image'],

  ['blockquote', 'code-block'],

  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'font': [] }],
  [{ 'align': [] }],

  //.... 其他工具栏配置项                             
  [{ 'lineheight': ["1-25", "1-375", "1-5", "1-75", "1-875", "2", "3"] }],//行高

  // [{ 'line-height': ['1', false, '2'] }], // 这一步是自定义行高选择器

  ['clean']                                         // remove formatting button
];

//在这个位置添加下面代码
const Parchment = Quill.import("parchment");
class lineHeightAttributor extends Parchment.Attributor.Class { }
const lineHeightStyle = new lineHeightAttributor(
  "lineheight",
  "ql-lineheight",
  {
    scope: Parchment.Scope.BLOCK,
    whitelist: ["1-25", "1-375", "1-5", "1-75", "1-875", "2", "3"],
  }
);
Quill.register({ "formats/lineHeight": lineHeightStyle }, true);

function forEachquillEditorItems() {

  console.log('forEachquillEditorItems =>114514');


  let quillEditorItems = document.querySelectorAll('.quill-editor-item');

  // 使用 map 获取所有元素的 id
  let ids = Array.from(quillEditorItems).map(item => item.id);

  console.log(ids); // 输出所有 id

  quillEditorItems.forEach((item, index) => {

    // 初始化 Quill 编辑器
    new Quill(`#${ids[index]}`, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Compose an epic...',
    });

  })

  let qlToolbarItems = document.querySelectorAll('.ql-toolbar');

  console.log('qlToolbarItems', qlToolbarItems);



  for (var i = 0; i < quillEditorItems.length; i++) {

    let quillEditorItem = quillEditorItems[i];
    let qlToolbarItem = qlToolbarItems[i];

    console.log('qlToolbarItems[' + i + ']', qlToolbarItems[i]);


    qlToolbarItem.addEventListener('mouseover', function (delta, oldDelta, source) {
      quillEditorItem.style = "border: 1px solid #33CCBB !important;";
      qlToolbarItem.style.display = 'block';
    });

    qlToolbarItem.addEventListener('mouseout', function (delta, oldDelta, source) {
      quillEditorItem.style = "border: none !important;";
      qlToolbarItem.style.display = 'none';
    });

    quillEditorItem.addEventListener('mouseover', function (delta, oldDelta, source) {
      quillEditorItem.style = "border: 1px solid #33CCBB !important;";
      qlToolbarItem.style.display = 'block';
    });

    quillEditorItem.addEventListener('mouseout', function (delta, oldDelta, source) {
      quillEditorItem.style = "border: none !important;";
      qlToolbarItem.style.display = 'none';
    });

  }
}

const savedContent = localStorage.getItem("boxContent");
if (savedContent) {
  // 如果存在，渲染存储的内容到#box
  console.log("存在已存储的内容");

  box.innerHTML = savedContent;
  // console.log('savedContent',savedContent);
}

export { toolbarOptions, forEachquillEditorItems };