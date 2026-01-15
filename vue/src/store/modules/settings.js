import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { useTheme } from '@/hooks/useTheme'
import { setElementThemeColor } from '@/utils/theme'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      title: '',
      theme: storageSetting.theme || '#409EFF',
      sideTheme: storageSetting.sideTheme || sideTheme,
      showSettings: showSettings,
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
      // 新增：暗黑模式状态
      isDark: storageSetting.isDark || false
    }),
    actions: {
      setElementTheme(theme) {
        this.theme = theme
        setElementThemeColor(theme)
        this.saveSetting()
      },
      // 切换暗黑模式
      toggleDark(event) {
        const isDark = !this.isDark;
        this.isDark = isDark;
        
        const { setSystemTheme } = useTheme();

        // 核心：View Transition API 扩散动画逻辑
        const transition = document.startViewTransition ? 
          document.startViewTransition(async () => {
            setSystemTheme(isDark);
            this.saveSetting();
          }) : null;

        if (!transition || !event) {
          setSystemTheme(isDark);
          this.saveSetting();
          return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y)
        );

        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];
          document.documentElement.animate(
            {
              clipPath: isDark ? [...clipPath].reverse() : clipPath,
            },
            {
              duration: 400,
              easing: "ease-in",
              pseudoElement: isDark
                ? "::view-transition-old(root)"
                : "::view-transition-new(root)",
            }
          );
        });
      },
      
      // 保存配置到本地
      saveSetting() {
        localStorage.setItem('layout-setting', JSON.stringify({
          ...JSON.parse(localStorage.getItem('layout-setting') || '{}'),
          isDark: this.isDark,
          theme: this.theme,
          sideTheme: this.sideTheme,
          topNav: this.topNav,
          tagsView: this.tagsView,
          fixedHeader: this.fixedHeader,
          sidebarLogo: this.sidebarLogo,
          dynamicTitle: this.dynamicTitle
        }));
      },

      // 修改布局设置
      changeSetting(data) {
        const { key, value } = data
        if (this.hasOwnProperty(key)) {
          this[key] = value
        }
      },
      // 设置网页标题
      setTitle(title) {
        this.title = title
        useDynamicTitle();
      }
    }
  })

export default useSettingsStore
