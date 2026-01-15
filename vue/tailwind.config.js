/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      borderRadius: {
        'custom': 'var(--custom-radius)',
        'custom-sm': 'calc(var(--custom-radius) * 0.75)',
        'custom-lg': 'calc(var(--custom-radius) * 5)',
        'custom-full': '9999px',
      },
      colors: {
        primary: 'var(--el-color-primary)',
        primaryLight: 'var(--el-color-primary-light)',
        success: 'var(--el-color-success)',
        warning: 'var(--el-color-warning)',
        danger: 'var(--el-color-danger)',
        info: 'var(--el-color-info)',
        error: 'var(--el-color-error)',
        borderBase: 'var(--default-border-base)',
        borderLight: 'var(--default-border-light)',
        borderLighter: 'var(--default-border-lighter)',
        borderExtraLight: 'var(--default-border-extra-light)',
        bgDefault: 'var(--default-bg-color)',
        boxDefault: 'var(--default-box-color)',
      }
    },
  },
  plugins: [],
}
