// 主题管理器 - 升级版
class ThemeManager {
    constructor() {
        this.currentTheme = 'modern';
        this.isInitialized = false;
        this.transitionDuration = 300;
        
        // 自动主题相关状态
        this.autoMode = 'auto'; // 'auto', 'light', 'dark', 'alien'
        this.isSystemDarkMode = false;
        this.isNightTime = false;
        this.timeCheckTimer = null;
        this.systemThemeMediaQuery = null;
        
        // 绑定方法
        this.init = this.init.bind(this);
        this.applyTheme = this.applyTheme.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.createUI = this.createUI.bind(this);
        
        // 自动主题方法
        this.detectSystemTheme = this.detectSystemTheme.bind(this);
        this.detectTimeTheme = this.detectTimeTheme.bind(this);
        this.updateAutoTheme = this.updateAutoTheme.bind(this);
        this.setAutoMode = this.setAutoMode.bind(this);
        this.onSystemThemeChange = this.onSystemThemeChange.bind(this);
        this.startTimeCheck = this.startTimeCheck.bind(this);
        this.stopTimeCheck = this.stopTimeCheck.bind(this);
        
        // 自动初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            // 检查ThemeConfig是否可用
            if (typeof ThemeConfig === 'undefined') {
                console.warn('ThemeConfig not found, loading from window object');
                if (typeof window.ThemeConfig !== 'undefined') {
                    window.ThemeConfig = window.ThemeConfig;
                } else {
                    console.error('ThemeConfig is required for theme system');
                    return;
                }
            }

            // 加载保存的设置
            this.loadSavedSettings();
            
            // 初始化自动主题系统
            this.initAutoTheme();
            
            // 应用初始主题
            this.updateAutoTheme();
            
            // 创建UI
            this.createUI();
            
            // 启动监听器
            this.startAutoThemeListeners();
            
            this.isInitialized = true;
            console.log(`主题管理器初始化完成，当前主题: ${this.currentTheme}`);
            
        } catch (error) {
            console.error('主题管理器初始化失败:', error);
        }
    }

    loadSavedSettings() {
        try {
            // 加载自动模式设置
            const savedAutoMode = localStorage.getItem('theme-auto-mode');
            if (savedAutoMode && ['auto', 'light', 'dark', 'alien'].includes(savedAutoMode)) {
                this.autoMode = savedAutoMode;
            } else {
                this.autoMode = ThemeConfig.autoTheme.userPreference.mode;
            }

            // 加载手动选择的主题（仅在手动模式下使用）
            const savedTheme = localStorage.getItem('selected-theme');
            if (savedTheme && ThemeConfig.themes[savedTheme]) {
                this.currentTheme = savedTheme;
            } else {
                this.currentTheme = ThemeConfig.defaultTheme;
            }
        } catch (error) {
            console.warn('无法加载保存的主题设置:', error);
            this.autoMode = ThemeConfig.autoTheme.userPreference.mode;
            this.currentTheme = ThemeConfig.defaultTheme;
        }
    }

    applyTheme(themeId, smooth = true) {
        try {
            const theme = ThemeConfig.themes[themeId];
            if (!theme) {
                console.error(`主题不存在: ${themeId}`);
                return false;
            }

            // 添加切换动画类
            if (smooth) {
                document.body.classList.add('theme-switching');
                setTimeout(() => {
                    document.body.classList.remove('theme-switching');
                }, this.transitionDuration);
            }

            // 设置主题数据属性
            document.documentElement.setAttribute('data-theme', themeId);
            
            // 应用CSS变量
            this.setCSSVariables(theme);
            
            // 更新当前主题
            this.currentTheme = themeId;
            
            // 保存到localStorage
            try {
                localStorage.setItem('selected-theme', themeId);
            } catch (error) {
                console.warn('无法保存主题设置:', error);
            }
            
            // 触发主题变更事件
            this.dispatchThemeEvent(themeId, theme);
            
            console.log(`主题已应用: ${theme.name}`);
            return true;
            
        } catch (error) {
            console.error('应用主题失败:', error);
            return false;
        }
    }

    setCSSVariables(theme) {
        const root = document.documentElement;
        const variables = ThemeConfig.cssVariables;
        
        // 清除之前的变量
        this.clearPreviousVariables();
        
        // 应用颜色变量
        this.applyCategoryVariables(root, theme.colors, variables.colors);
        
        // 生成并应用透明度变量
        this.generateAlphaVariables(root, theme.colors);
        
        // 应用字体变量
        this.applyCategoryVariables(root, theme.fonts, variables.fonts);
        
        // 应用间距变量
        this.applyCategoryVariables(root, theme.spacing, variables.spacing);
        
        // 应用圆角变量
        this.applyCategoryVariables(root, theme.borderRadius, variables.borderRadius);
        
        // 应用动画变量
        this.applyCategoryVariables(root, theme.animations, variables.animations);
    }

    generateAlphaVariables(root, colors) {
        // 为主要颜色生成透明度变量
        const colorNames = ['primary', 'success', 'warning', 'error', 'info'];
        const alphaLevels = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.90];
        
        colorNames.forEach(colorName => {
            const baseColor = colors[colorName];
            if (baseColor) {
                // 将hex颜色转换为RGB
                const rgb = this.hexToRgb(baseColor);
                if (rgb) {
                    alphaLevels.forEach(alpha => {
                        const alphaValue = Math.round(alpha * 100);
                        const variableName = `--${colorName}-alpha-${alphaValue.toString().padStart(2, '0')}`;
                        const rgbaValue = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
                        root.style.setProperty(variableName, rgbaValue);
                    });
                }
            }
        });
        
        // 添加黑白透明度变量
        const blackAlphas = [0.03, 0.05, 0.08, 0.10, 0.12, 0.15];
        const whiteAlphas = [0.30, 0.50, 0.80];
        
        blackAlphas.forEach(alpha => {
            const alphaValue = Math.round(alpha * 100);
            const variableName = `--black-alpha-${alphaValue.toString().padStart(2, '0')}`;
            const rgbaValue = `rgba(0, 0, 0, ${alpha})`;
            root.style.setProperty(variableName, rgbaValue);
        });
        
        whiteAlphas.forEach(alpha => {
            const alphaValue = Math.round(alpha * 100);
            const variableName = `--white-alpha-${alphaValue.toString().padStart(2, '0')}`;
            const rgbaValue = `rgba(255, 255, 255, ${alpha})`;
            root.style.setProperty(variableName, rgbaValue);
        });
    }

    hexToRgb(hex) {
        // 移除#符号
        hex = hex.replace('#', '');
        
        // 处理3位和6位十六进制
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        if (hex.length !== 6) {
            return null;
        }
        
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return { r, g, b };
    }

    applyCategoryVariables(root, themeValues, variableMap) {
        Object.entries(variableMap).forEach(([cssVar, themePath]) => {
            const value = this.getNestedValue(themeValues, themePath);
            if (value !== undefined) {
                root.style.setProperty(cssVar, value);
            }
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }

    clearPreviousVariables() {
        const root = document.documentElement;
        const allVariables = Object.values(ThemeConfig.cssVariables).flatMap(category => 
            Object.keys(category)
        );
        
        allVariables.forEach(variable => {
            root.style.removeProperty(variable);
        });
    }

    toggleTheme() {
        const themeIds = Object.keys(ThemeConfig.themes);
        const currentIndex = themeIds.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeIds.length;
        const nextTheme = themeIds[nextIndex];
        
        this.applyTheme(nextTheme);
    }

    createUI() {
        // 移除已存在的主题切换器
        const existing = document.querySelector('.theme-switcher');
        if (existing) {
            existing.remove();
        }

        // 创建主题切换器容器
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        
        // 创建切换按钮
        const button = document.createElement('button');
        button.className = 'theme-toggle-btn';
        button.innerHTML = `
            <i class="ri-palette-line"></i>
            <div class="theme-tooltip">切换主题</div>
        `;
        
        // 创建主题面板
        const panel = document.createElement('div');
        panel.className = 'theme-panel';
        panel.innerHTML = this.generatePanelHTML();
        
        // 组装UI
        switcher.appendChild(button);
        switcher.appendChild(panel);
        document.body.appendChild(switcher);
        
        // 绑定事件
        this.bindEvents(button, panel);
        
        // 更新UI状态
        this.updateUIState();
    }

    generatePanelHTML() {
        const themes = ThemeConfig.themes;
        
        let html = `
            <div class="theme-panel-header">
                <h3>
                    <i class="ri-palette-line panel-icon"></i>
                    主题设置
                </h3>
            </div>
            <div class="auto-mode-section">
                <h4>自动模式</h4>
                <div class="auto-mode-options">
                    <button class="auto-mode-btn ${this.autoMode === 'auto' ? 'active' : ''}" data-mode="auto">
                        <i class="ri-sun-line"></i>
                        <span>自动</span>
                    </button>
                    <button class="auto-mode-btn ${this.autoMode === 'light' ? 'active' : ''}" data-mode="light">
                        <i class="ri-sun-fill"></i>
                        <span>浅色</span>
                    </button>
                    <button class="auto-mode-btn ${this.autoMode === 'dark' ? 'active' : ''}" data-mode="dark">
                        <i class="ri-moon-fill"></i>
                        <span>深色</span>
                    </button>
                    <button class="auto-mode-btn ${this.autoMode === 'alien' ? 'active' : ''}" data-mode="alien">
                        <i class="ri-aliens-line"></i>
                        <span>外星人</span>
                    </button>
                </div>
            </div>
        `;
        

        
        return html;
    }

    generatePreviewColors(theme) {
        const colors = [
            theme.colors.primary || theme.colors.chartPrimary,
            theme.colors.warning || theme.colors.chartSecondary,
            theme.colors.success || theme.colors.chartTertiary,
            theme.colors.info || theme.colors.chartQuaternary
        ];
        
        return colors
            .filter(color => color)
            .map(color => `<div class="theme-preview-color" style="background-color: ${color}"></div>`)
            .join('');
    }

    bindEvents(button, panel) {
        let isOpen = false;
        
        // 按钮点击事件
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen = !isOpen;
            panel.classList.toggle('show', isOpen);
            
            // 切换按钮图标
            const icon = button.querySelector('i');
            if (isOpen) {
                icon.className = 'ri-close-line';
            } else {
                icon.className = 'ri-palette-line';
            }
        });
        
        // 自动模式按钮点击事件
        panel.addEventListener('click', (e) => {
            const autoModeBtn = e.target.closest('.auto-mode-btn');
            if (autoModeBtn) {
                const mode = autoModeBtn.dataset.mode;
                this.setAutoMode(mode);
                this.updatePanelUI();
                return;
            }


        });
        
        // 点击外部关闭面板
        document.addEventListener('click', (e) => {
            if (isOpen && !panel.contains(e.target) && !button.contains(e.target)) {
                isOpen = false;
                panel.classList.remove('show');
                button.querySelector('i').className = 'ri-palette-line';
            }
        });
        
        // ESC键关闭面板
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                isOpen = false;
                panel.classList.remove('show');
                button.querySelector('i').className = 'ri-palette-line';
            }
        });
    }

    updateUIState() {
        const options = document.querySelectorAll('.theme-option');
        options.forEach(option => {
            const isActive = option.dataset.theme === this.currentTheme;
            option.classList.toggle('active', isActive);
        });
    }

    updatePanelUI() {
        // 更新自动模式按钮状态
        const autoModeBtns = document.querySelectorAll('.auto-mode-btn');
        autoModeBtns.forEach(btn => {
            const isActive = btn.dataset.mode === this.autoMode;
            btn.classList.toggle('active', isActive);
        });



        // 更新主题选项状态
        this.updateUIState();
    }

    // === 自动主题功能 ===
    
    initAutoTheme() {
        // 初始化系统主题检测
        this.detectSystemTheme();
        
        // 初始化时间检测
        this.detectTimeTheme();
        
        console.log(`自动主题系统初始化完成 - 模式: ${this.autoMode}`);
    }

    detectSystemTheme() {
        if (window.matchMedia) {
            this.systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.isSystemDarkMode = this.systemThemeMediaQuery.matches;
            
            console.log(`系统主题检测: ${this.isSystemDarkMode ? '深色' : '浅色'}`);
        } else {
            console.warn('浏览器不支持系统主题检测');
        }
    }

    detectTimeTheme() {
        const now = new Date();
        const hour = now.getHours();
        const config = ThemeConfig.autoTheme.timeConfig;
        
        // 判断是否为夜晚时间
        this.isNightTime = hour >= config.nightStart || hour < config.dayStart;
        
        console.log(`时间主题检测: ${hour}时 - ${this.isNightTime ? '夜晚' : '白天'}`);
    }

    updateAutoTheme() {
        if (!ThemeConfig.autoTheme.enabled) {
            // 自动主题已禁用，使用手动选择的主题
            this.applyTheme(this.currentTheme);
            return;
        }

        let targetTheme = this.currentTheme;

        switch (this.autoMode) {
            case 'auto':
                targetTheme = this.determineAutoTheme();
                break;
            case 'light':
                targetTheme = ThemeConfig.autoTheme.themeMapping.light;
                break;
            case 'dark':
                targetTheme = ThemeConfig.autoTheme.themeMapping.dark;
                break;
            case 'alien':
                // 强制使用外星人主题
                targetTheme = 'alien';
                break;
        }

        // 应用确定的主题
        if (targetTheme && ThemeConfig.themes[targetTheme]) {
            this.applyTheme(targetTheme);
        }
    }

    determineAutoTheme() {
        const config = ThemeConfig.autoTheme;
        let shouldUseDark = false;

        switch (config.mode) {
            case 'system':
                shouldUseDark = this.isSystemDarkMode;
                break;
            case 'time':
                shouldUseDark = this.isNightTime;
                break;
            case 'both':
            default:
                // 优先使用系统设置，如果浏览器不支持则使用时间
                if (this.systemThemeMediaQuery) {
                    shouldUseDark = this.isSystemDarkMode;
                } else {
                    shouldUseDark = this.isNightTime;
                }
                break;
        }

        return shouldUseDark ? config.themeMapping.dark : config.themeMapping.light;
    }

    setAutoMode(mode) {
        if (!['auto', 'light', 'dark', 'alien'].includes(mode)) {
            console.error('无效的自动模式:', mode);
            return false;
        }

        this.autoMode = mode;
        
        // 保存到localStorage
        try {
            localStorage.setItem('theme-auto-mode', mode);
        } catch (error) {
            console.warn('无法保存自动模式设置:', error);
        }

        // 更新主题
        this.updateAutoTheme();
        
        // 更新UI状态
        this.updatePanelUI();
        
        console.log(`自动模式已设置为: ${mode}`);
        return true;
    }

    onSystemThemeChange(e) {
        this.isSystemDarkMode = e.matches;
        console.log(`系统主题变化: ${this.isSystemDarkMode ? '深色' : '浅色'}`);
        
        // 仅在自动模式下响应系统变化
        if (this.autoMode === 'auto') {
            this.updateAutoTheme();
        }
    }

    startAutoThemeListeners() {
        // 监听系统主题变化
        if (this.systemThemeMediaQuery) {
            this.systemThemeMediaQuery.addListener(this.onSystemThemeChange);
        }
        
        // 启动时间检查定时器
        this.startTimeCheck();
    }

    startTimeCheck() {
        // 清除现有定时器
        this.stopTimeCheck();
        
        // 每分钟检查一次时间变化
        this.timeCheckTimer = setInterval(() => {
            const wasNightTime = this.isNightTime;
            this.detectTimeTheme();
            
            // 如果时间状态发生变化且在自动模式下，更新主题
            if (wasNightTime !== this.isNightTime && this.autoMode === 'auto') {
                console.log(`时间状态变化: ${this.isNightTime ? '切换到夜晚' : '切换到白天'}`);
                this.updateAutoTheme();
                    }
        }, 60000); // 60秒检查一次
    }

    stopTimeCheck() {
        if (this.timeCheckTimer) {
            clearInterval(this.timeCheckTimer);
            this.timeCheckTimer = null;
        }
    }

    watchSystemTheme() {
        // 此方法已被 startAutoThemeListeners 替代
        // 保留用于向后兼容
        this.startAutoThemeListeners();
    }

    dispatchThemeEvent(themeId, theme) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                themeId,
                theme,
                manager: this
            }
        });
        document.dispatchEvent(event);
    }

    // 公共API方法
    getCurrentTheme() {
        return this.currentTheme;
    }

    getThemeConfig(themeId) {
        return ThemeConfig.themes[themeId] || null;
    }

    getAllThemes() {
        return ThemeConfig.themes;
    }

    setTheme(themeId, smooth = true) {
        return this.applyTheme(themeId, smooth);
    }

    // 主题预设切换
    switchToLight() {
        return this.applyTheme('modern');
    }

    switchToDark() {
        return this.applyTheme('professional');
    }

    // 获取当前主题的特定颜色值
    getThemeColor(colorName) {
        const theme = this.getThemeConfig(this.currentTheme);
        return theme ? theme.colors[colorName] : null;
    }

    // 检查是否为深色主题
    isDarkTheme() {
        return this.currentTheme === 'professional';
    }

    // 性能优化：批量应用变量
    batchApplyVariables(variables) {
        const root = document.documentElement;
        Object.entries(variables).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    }

    // 重置到默认主题
    resetToDefault() {
        return this.applyTheme(ThemeConfig.defaultTheme);
    }

    // 销毁主题管理器
    destroy() {
        // 清理定时器
        this.stopTimeCheck();
        
        // 移除系统主题监听器
        if (this.systemThemeMediaQuery) {
            this.systemThemeMediaQuery.removeListener(this.onSystemThemeChange);
        }
        
        // 移除UI
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) {
            switcher.remove();
        }
        
        this.isInitialized = false;
        console.log('主题管理器已销毁');
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.themeManager = new ThemeManager();
    
    // 提供便捷的全局方法
    window.setTheme = (themeId) => window.themeManager.setTheme(themeId);
    window.toggleTheme = () => window.themeManager.toggleTheme();
    window.getCurrentTheme = () => window.themeManager.getCurrentTheme();
    
    console.log('主题管理器已加载，可使用 setTheme(), toggleTheme(), getCurrentTheme() 等方法');
}

// 导出供模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
} 