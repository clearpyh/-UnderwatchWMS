import { handleThemeStyle } from "./theme";

const THEME_KEY = "app-theme-mode";

/**
 * 初始化主题
 * 1. 检查本地存储
 * 2. 检查系统偏好
 * 3. 应用模式
 */
export function initTheme() {
  const storedMode = localStorage.getItem(THEME_KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedMode === "dark" || (!storedMode && systemDark)) {
    toggleDarkMode(true);
  } else {
    toggleDarkMode(false);
  }
}

/**
 * 切换暗黑模式
 * @param {boolean} isDark
 */
export function toggleDarkMode(isDark) {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add("dark");
    localStorage.setItem(THEME_KEY, "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem(THEME_KEY, "light");
  }
}

/**
 * 设置主色调
 * 同时更新 Semantic Variable 和 Element Plus 变量
 * @param {string} color Hex color
 */
export function setPrimaryColor(color) {
  // 更新基础语义变量
  document.documentElement.style.setProperty("--color-primary", color);

  // 更新 Element Plus 变量 (调用原有逻辑以生成 light/dark 变体)
  handleThemeStyle(color);
}

/**
 * 设置全局圆角
 * @param {string} radius (e.g., '4px', '6px')
 */
export function setGlobalRadius(radius) {
  document.documentElement.style.setProperty('--custom-radius', radius);
}

/**
 * 设置全局字体
 * @param {string} fontFamily
 */
export function setGlobalFont(fontFamily) {
  document.documentElement.style.setProperty('--el-font-family', fontFamily);
}
