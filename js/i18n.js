import {
  forEachquillEditorItems,
} from "./init.js";
import { enCharacter, jaCharacter, zhCharacter } from "./kyara.js";

const languages = {
  en: {
    sectionTitlePlaceholder: "Enter section title",

    langDropdown: {
      title: "Language",
      options: {
        en: "English",
        ja: "日本語",
        zh: "简体中文",
      },
    },
    resumeExampleDropdown: {
      title: "Resume Example",
      options: {
        miku: "Miku Hatsune",
        momoka: "Momoka Sakurai",
        ShigureUi: "Ui Shigure",
        GawrGura: "Gawr Gura",
        TadokoroKoji: "Koji Tadokoro",
        griffith: "Griffith",
        voldemort: "Voldemort",
      },
    },
    H2Dropdown: {
      title: "Heading Style Selection",
      options: {
        style: "Innocent",
        style1: "Style 1",
        style2: "Style 2",
        style3: "Style 3",
        style4: "Style 4",
        style5: "Style 5",
      },
    },

    operationOptionsTitle: {
      title1: "Resume Examples / Language Selection",
      title4: "Avatar",
      title2: "Add Section",
      title3: "Heading Style / Theme Color Selection",
      title5: "Module Spacing",
      title6: "Line Spacing",
      title7: "Browser Storage",
      title8: "Save File",
      title9: "Save Resume Text",
    },

    btns: {
      uploadAvatar: "Upload Avatar",
      deleteAvatar: "Delete Avatar",
      add: "Add",
      storage: "Local Storage",
      clear: "Clear Storage",
      print: "Print to PDF",
      exportImg: "Export as Image",
      exportText: "Export Resume Text",
      importText: "Import Resume Text",
      collapsePanel: "Collapse",
    },

    clearDialog: {
      description: "Are you sure you want to clear the local storage?",
      confirm: "Confirm",
      cancel: "Cancel",
    },
  },

  ja: {
    sectionTitlePlaceholder: "セクションタイトルを入力",

    langDropdown: {
      title: "言語選択",
      options: {
        en: "English",
        ja: "日本語",
        zh: "简体中文",
      },
    },
    resumeExampleDropdown: {
      title: "履歴書例",
      options: {
        miku: "初音ミク",
        momoka: "桜井桃華",
        ShigureUi: "しぐれうい",
        GawrGura: "がうる ぐら",
        TadokoroKoji: "田所浩二",
        griffith: "グリフィス",
        voldemort: "ヴォルデモート",
      },
    },
    H2Dropdown: {
      title: "見出しスタイル選択",
      options: {
        style: "無邪気",
        style1: "スタイル1",
        style2: "スタイル2",
        style3: "スタイル3",
        style4: "スタイル4",
        style5: "スタイル5",
      },
    },

    operationOptionsTitle: {
      title1: "優れた履歴書例 / 言語選択",
      title4: "アバター",
      title2: "セクションの追加",
      title3: "見出しスタイル / テーマカラー選択",
      title5: "モジュール間の間隔",
      title6: "行間",
      title7: "ブラウザストレージ",
      title8: "ファイルの保存",
      title9: "履歴書テキストの保存",
    },

    btns: {
      uploadAvatar: "アップロード",
      deleteAvatar: "アバターを削除",
      add: "追加",
      storage: "ローカルストレージ",
      clear: "ストレージをクリア",
      print: "PDFとして印刷",
      exportImg: "画像にエクスポート",
      exportText: "エクスポート",
      importText: "インポート",
      collapsePanel: "折りたたむ",
    },

    clearDialog: {
      description: "ローカルストレージをクリアしてもよろしいですか？",
      confirm: "確認",
      cancel: "キャンセル",
    },
  },

  zh: {
    sectionTitlePlaceholder: "输入模板标题",

    langDropdown: {
      title: "语言选择",
      options: {
        en: "English",
        ja: "日本語",
        zh: "简体中文",
      },
    },
    resumeExampleDropdown: {
      title: "简历选择",
      options: {
        miku: "初音未来",
        momoka: "樱井桃华",
        ShigureUi: "时雨羽衣",
        GawrGura: "噶呜·古拉",
        TadokoroKoji: "李田所",
        griffith: "格里菲斯",
        voldemort: "伏地魔",
      },
    },
    H2Dropdown: {
      title: "标题样式选择",
      options: {
        style: "纯真",
        style1: "样式1",
        style2: "样式2",
        style3: "样式3",
        style4: "样式4",
        style5: "样式5",
      },
    },

    operationOptionsTitle: {
      title1: "优秀简历示例 / 语言选择",
      title4: "头像",
      title2: "新增模板",
      title3: "标题样式/主题色选择",
      title5: "模块间距",
      title6: "文字行距",
      title7: "浏览器存储",
      title8: "文件保存",
      title9: "简历文本保存",
    },

    btns: {
      uploadAvatar: "上传头像",
      deleteAvatar: "删除头像",
      add: "添加",
      storage: "本地存储",
      clear: "清除存储",
      print: "打印为PDF",
      exportImg: "导出为图片",
      exportText: "导出简历文本",
      importText: "导入简历文本",
      collapsePanel: "收起面板",
    },

    clearDialog: {
      description: "确定要清除本地存储吗？",
      confirm: "确定",
      cancel: "取消",
    },
  },
};

/* 语言选择 */
const langDropdownButton = document.getElementById("langDropdownButton");
const langDropdownOptions = document.getElementById("langDropdownOptions");
const langOptions = langDropdownOptions.querySelectorAll(
  ".langDropdown-option"
);
let langDropdownIsOpen = false;

// 获取页面上的所有需要动态切换文本的元素
const i18nElements = document.querySelectorAll("[data-i18n]");
// 获取 input 元素
const inputElement = document.getElementById("section-title");
// 获取并设置默认语言
let currentLanguage = localStorage.getItem("language") || "en";

// 更新页面上的文本
// 更新页面上的文本，支持多层嵌套的语言配置
function updateLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("language", language);
  // 遍历所有需要翻译的元素
  i18nElements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const keys = key.split("."); // 通过 . 来分割多层次的键

    let translatedText = languages[language];

    // 通过递归或逐层查找，获取最终的文本
    for (let i = 0; i < keys.length; i++) {
      if (translatedText[keys[i]]) {
        translatedText = translatedText[keys[i]];
      } else {
        translatedText = null;
        break;
      }
    }

    // 如果找到对应的文本，则更新元素的内容
    if (translatedText !== null) {
      element.textContent = translatedText;
    }
  });

  const resumeBox = document.getElementById("resumeBox");
  const savedContent = localStorage.getItem("resume-text");

  // 根据语言更改 placeholder
  inputElement.placeholder = languages[language].sectionTitlePlaceholder;

  if (!savedContent) {
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
    forEachquillEditorItems();
  }
}

// Toggle dropdown visibility
langDropdownButton.addEventListener("click", () => {
  if (langDropdownIsOpen) {
    langDropdownOptions.classList.remove("open");
    langDropdownOptions.classList.add("close");
    setTimeout(() => langDropdownOptions.classList.remove("close"), 300);
  } else {
    langDropdownOptions.classList.add("open");
  }
  langDropdownIsOpen = !langDropdownIsOpen;
});

// Handle option selection
langOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    const selectedlang = e.target.dataset.value;

    // Update button text
    langDropdownButton.textContent = e.target.textContent;
    // Update language
    updateLanguage(selectedlang);

    // Close dropdown
    langDropdownOptions.classList.remove("open");
    langDropdownOptions.classList.add("close");
    setTimeout(() => langDropdownOptions.classList.remove("close"), 300);
    langDropdownIsOpen = false;
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !langDropdownButton.contains(e.target) &&
    !langDropdownOptions.contains(e.target)
  ) {
    if (langDropdownIsOpen) {
      langDropdownOptions.classList.remove("open");
      langDropdownOptions.classList.add("close");
      setTimeout(() => langDropdownOptions.classList.remove("close"), 300);
      langDropdownIsOpen = false;
    }
  }
});

// 默认加载页面时，更新为默认语言
updateLanguage(currentLanguage);
