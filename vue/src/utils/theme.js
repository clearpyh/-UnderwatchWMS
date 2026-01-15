// 处理主题样式
export function handleThemeStyle(theme) {
  const isDark = document.documentElement.classList.contains('dark')
  handleElementThemeColor(theme, isDark)
}

export function setElementThemeColor(color) {
  const style = document.documentElement.style
  style.setProperty('--el-color-primary', color)
  const isDark = document.documentElement.classList.contains('dark')
  handleElementThemeColor(color, isDark)
  const mixColor = '#ffffff'
  for (let i = 1; i < 16; i++) {
    const ratio = i / 16
    const itemColor = colourBlend(color, mixColor, ratio)
    style.setProperty(`--el-color-primary-custom-${i}`, itemColor)
  }
}

/**
 * 设置 Element Plus 主题色
 * @param {string} theme 主题色Hex
 * @param {boolean} isDark 是否暗黑模式
 */
export function handleElementThemeColor(theme, isDark = false) {
  document.documentElement.style.setProperty('--el-color-primary', theme)
  
  // 生成 Light 序列 (light-1 到 light-9)
  for (let i = 1; i <= 9; i++) {
    // 暗黑模式下，Light 序列需要与黑色混合以降低亮度；亮色模式下与白色混合变浅
    const color = isDark ? getDarkColor(theme, i / 10) : getLightColor(theme, i / 10)
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, color)
  }

  // 生成 Dark 序列 (dark-1 到 dark-9)
  for (let i = 1; i <= 9; i++) {
    // 始终与黑色混合变深
    document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, getDarkColor(theme, i / 10))
  }
  
  // 生成自定义淡色变体 (用于特殊背景等)
  for (let i = 1; i <= 15; i++) {
     document.documentElement.style.setProperty(`--el-color-primary-custom-${i}`, getLightColor(theme, i / 20))
  }
}

// hex颜色转rgb颜色
export function hexToRgb(str) {
	str = str.replace('#', '')
	let hexs = str.match(/../g)
	for (let i = 0; i < 3; i++) {
		hexs[i] = parseInt(hexs[i], 16)
	}
	return hexs
}

// rgb颜色转Hex颜色
export function rgbToHex(r, g, b) {
	let hexs = [r.toString(16), g.toString(16), b.toString(16)]
	for (let i = 0; i < 3; i++) {
		if (hexs[i].length == 1) {
			hexs[i] = `0${hexs[i]}`
		}
	}
	return `#${hexs.join('')}`
}

export function colourBlend(color1, color2, ratio) {
  const validRatio = Math.max(0, Math.min(1, Number(ratio)))
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  const r = Math.round(rgb1[0] * (1 - validRatio) + rgb2[0] * validRatio)
  const g = Math.round(rgb1[1] * (1 - validRatio) + rgb2[1] * validRatio)
  const b = Math.round(rgb1[2] * (1 - validRatio) + rgb2[2] * validRatio)
  return rgbToHex(r, g, b)
}

// 变浅颜色值
export function getLightColor(color, level) {
	let rgb = hexToRgb(color)
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
	}
	return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// 变深颜色值
export function getDarkColor(color, level) {
	let rgb = hexToRgb(color)
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor(rgb[i] * (1 - level))
	}
	return rgbToHex(rgb[0], rgb[1], rgb[2])
}
