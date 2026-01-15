import useSettingsStore from '@/store/modules/settings'
import { handleElementThemeColor } from '@/utils/theme'

export function useTheme() {
  const settingsStore = useSettingsStore()

  /**
   * 设置系统主题模式
   * @param {boolean} isDark 是否暗黑模式
   */
  const setSystemTheme = (isDark) => {
    // 1. 防闪烁：禁用过渡
    const css = document.createElement('style')
    css.appendChild(
      document.createTextNode(
        `* {
           -webkit-transition: none !important;
           -moz-transition: none !important;
           -o-transition: none !important;
           -ms-transition: none !important;
           transition: none !important;
        }`
      )
    )
    document.head.appendChild(css)

    // 2. 切换 Class
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    // 3. 重算颜色：根据新的模式重新生成主题色
    handleElementThemeColor(settingsStore.theme, isDark)

    // 4. 恢复过渡：下一帧移除禁用样式
    // 使用 getComputedStyle 强制重排，确保 class 变更生效后再恢复 transition
    const _ = window.getComputedStyle(css).opacity
    document.head.removeChild(css)
  }

  return {
    setSystemTheme
  }
}
