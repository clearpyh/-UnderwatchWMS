export function getThemePalette() {
  const style = getComputedStyle(document.documentElement)
  const primary = style.getPropertyValue('--el-color-primary').trim() || '#409EFF'
  const bgPage = style.getPropertyValue('--bg-page').trim() || '#ffffff'
  const bgContainer = style.getPropertyValue('--bg-container').trim() || '#ffffff'
  const textPrimary = style.getPropertyValue('--text-primary').trim() || '#303133'
  const textRegular = style.getPropertyValue('--text-regular').trim() || '#606266'
  const borderBase = style.getPropertyValue('--border-color-base').trim() || '#dcdfe6'
  return {
    primary,
    bgPage,
    bgContainer,
    textPrimary,
    textRegular,
    borderBase
  }
}
