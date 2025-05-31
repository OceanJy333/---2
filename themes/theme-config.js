// 主题配置系统 - 高级配色体系
const ThemeConfig = {
    // 主题列表
    themes: {
        // 现代简约风格 - 全新配色体系
        modern: {
            name: '现代简约',
            id: 'modern',
            description: '清新简洁的现代设计风格',
            colors: {
                // === 品牌色系 ===
                // 主品牌色
                primary: '#1976d2',
                primaryDark: '#1565c0',
                primaryLight: '#42a5f5',
                primaryPale: '#e3f2fd',
                primaryAccent: '#2196f3',
                
                // 辅助品牌色
                secondary: '#6c757d',
                secondaryDark: '#495057',
                secondaryLight: '#adb5bd',
                secondaryPale: '#f8f9fa',
                
                // === 中性色系 ===
                // 白色系
                white: '#ffffff',
                whiteSmoke: '#f8f9fa',
                lightGray: '#f5f5f5',
                
                // 灰色系
                gray50: '#fafafa',
                gray100: '#f5f5f5',
                gray200: '#eeeeee',
                gray300: '#e0e0e0',
                gray400: '#bdbdbd',
                gray500: '#9e9e9e',
                gray600: '#757575',
                gray700: '#616161',
                gray800: '#424242',
                gray900: '#212121',
                
                // === 语义色系 ===
                // 成功色
                success: '#4caf50',
                successDark: '#388e3c',
                successLight: '#81c784',
                successPale: '#e8f5e9',
                successBg: '#f1f8e9',
                
                // 警告色
                warning: '#ff9800',
                warningDark: '#f57c00',
                warningLight: '#ffb74d',
                warningPale: '#fff8e1',
                warningBg: '#fffde7',
                
                // 错误色
                error: '#f44336',
                errorDark: '#d32f2f',
                errorLight: '#e57373',
                errorPale: '#ffebee',
                errorBg: '#fce4ec',
                
                // 信息色
                info: '#2196f3',
                infoDark: '#1976d2',
                infoLight: '#64b5f6',
                infoPale: '#e3f2fd',
                infoBg: '#f0f7ff',
                
                // === 功能色系 ===
                // 背景色
                background: '#f8f9fa',
                backgroundAlt: '#ffffff',
                backgroundDark: '#f5f5f5',
                
                // 表面色
                surface: '#ffffff',
                surfaceHover: '#f5f5f5',
                surfaceActive: '#eeeeee',
                surfaceDisabled: '#fafafa',
                surfaceElevated: '#ffffff',
                
                // 文字色
                textPrimary: '#212121',
                textSecondary: '#757575',
                textTertiary: '#9e9e9e',
                textDisabled: '#bdbdbd',
                textInverse: '#ffffff',
                textMuted: '#6c757d',
                
                // 边框色
                border: '#e0e0e0',
                borderLight: '#f0f0f0',
                borderDark: '#bdbdbd',
                borderFocus: '#2196f3',
                borderHover: '#d0d0d0',
                
                // === 交互色系 ===
                // 悬停状态
                hoverBg: '#f5f5f5',
                hoverBorder: '#d0d0d0',
                hoverText: '#1976d2',
                
                // 激活状态
                activeBg: '#e8f0fe',
                activeBorder: '#1976d2',
                activeText: '#1565c0',
                
                // 选中状态
                selectedBg: '#e3f2fd',
                selectedBorder: '#1976d2',
                selectedText: '#1976d2',
                
                // 禁用状态
                disabledBg: '#fafafa',
                disabledBorder: '#e0e0e0',
                disabledText: '#bdbdbd',
                
                // === 阴影和透明度 ===
                shadow: 'rgba(0, 0, 0, 0.1)',
                shadowHover: 'rgba(0, 0, 0, 0.15)',
                shadowFocus: 'rgba(33, 150, 243, 0.25)',
                shadowError: 'rgba(244, 67, 54, 0.25)',
                shadowSuccess: 'rgba(76, 175, 80, 0.25)',
                
                // 遮罩
                overlay: 'rgba(0, 0, 0, 0.5)',
                overlayLight: 'rgba(0, 0, 0, 0.3)',
                backdropBlur: 'rgba(255, 255, 255, 0.8)',
                
                // === 数据可视化色系 ===
                chartPrimary: '#1976d2',
                chartSecondary: '#ff9800',
                chartTertiary: '#4caf50',
                chartQuaternary: '#9c27b0',
                chartFifth: '#f44336',
                chartSixth: '#00bcd4',
                
                // === 品牌辅助色 ===
                google: '#4285f4',
                googleRed: '#ea4335',
                googleYellow: '#fbbc05',
                googleGreen: '#34a853',
                
                // === 特殊功能色 ===
                highlight: '#fff176',
                highlightBg: '#fffde7',
                link: '#1976d2',
                linkHover: '#1565c0',
                linkVisited: '#7b1fa2',
                code: '#e91e63',
                codeBg: '#fce4ec'
            },
            fonts: {
                family: '"PingFang SC", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                sizes: {
                    xs: '12px',
                    sm: '14px',
                    base: '16px',
                    lg: '18px',
                    xl: '20px',
                    '2xl': '24px',
                    '3xl': '32px',
                    '4xl': '40px',
                    '5xl': '48px'
                },
                weights: {
                    light: '300',
                    normal: '400',
                    medium: '500',
                    semibold: '600',
                    bold: '700',
                    black: '900'
                },
                lineHeights: {
                    tight: '1.2',
                    normal: '1.5',
                    relaxed: '1.6',
                    loose: '1.8'
                }
            },
            spacing: {
                px: '1px',
                xs: '4px',
                sm: '8px',
                base: '16px',
                lg: '24px',
                xl: '32px',
                '2xl': '48px',
                '3xl': '64px',
                '4xl': '96px'
            },
            borderRadius: {
                none: '0',
                xs: '2px',
                sm: '4px',
                base: '6px',
                lg: '8px',
                xl: '12px',
                '2xl': '16px',
                '3xl': '24px',
                full: '50%'
            },
            animations: {
                duration: '0.3s',
                durationFast: '0.15s',
                durationSlow: '0.5s',
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easingOut: 'cubic-bezier(0, 0, 0.2, 1)',
                easingIn: 'cubic-bezier(0.4, 0, 1, 1)'
            }
        },
        
        // 深色专业风格 - 升级配色
        professional: {
            name: '深色专业',
            id: 'professional',
            description: '专业高效的深色主题',
            colors: {
                // === 品牌色系 ===
                primary: '#6366f1',
                primaryDark: '#5856eb',
                primaryLight: '#8b5cf6',
                primaryPale: '#1e1b4b',
                primaryAccent: '#7c3aed',
                
                secondary: '#64748b',
                secondaryDark: '#475569',
                secondaryLight: '#94a3b8',
                secondaryPale: '#1e293b',
                
                // === 中性色系 ===
                white: '#ffffff',
                whiteSmoke: '#f8fafc',
                lightGray: '#f1f5f9',
                
                // 深色灰色系
                gray50: '#f8fafc',
                gray100: '#f1f5f9',
                gray200: '#e2e8f0',
                gray300: '#cbd5e1',
                gray400: '#94a3b8',
                gray500: '#64748b',
                gray600: '#475569',
                gray700: '#334155',
                gray800: '#1e293b',
                gray900: '#0f172a',
                
                // === 语义色系 ===
                success: '#10b981',
                successDark: '#059669',
                successLight: '#34d399',
                successPale: '#064e3b',
                successBg: '#022c22',
                
                warning: '#f59e0b',
                warningDark: '#d97706',
                warningLight: '#fbbf24',
                warningPale: '#451a03',
                warningBg: '#1c0701',
                
                error: '#ef4444',
                errorDark: '#dc2626',
                errorLight: '#f87171',
                errorPale: '#450a0a',
                errorBg: '#1c0a0a',
                
                info: '#3b82f6',
                infoDark: '#2563eb',
                infoLight: '#60a5fa',
                infoPale: '#1e3a8a',
                infoBg: '#0c1e3a',
                
                // === 功能色系 ===
                background: '#0f172a',
                backgroundAlt: '#1e293b',
                backgroundDark: '#020617',
                
                surface: '#1e293b',
                surfaceHover: '#334155',
                surfaceActive: '#475569',
                surfaceDisabled: '#1e293b',
                surfaceElevated: '#334155',
                
                textPrimary: '#f8fafc',
                textSecondary: '#cbd5e1',
                textTertiary: '#94a3b8',
                textDisabled: '#64748b',
                textInverse: '#0f172a',
                textMuted: '#64748b',
                
                border: '#334155',
                borderLight: '#475569',
                borderDark: '#1e293b',
                borderFocus: '#6366f1',
                borderHover: '#475569',
                
                // === 交互色系 ===
                hoverBg: '#334155',
                hoverBorder: '#475569',
                hoverText: '#8b5cf6',
                
                activeBg: '#1e1b4b',
                activeBorder: '#6366f1',
                activeText: '#a5b4fc',
                
                selectedBg: '#1e1b4b',
                selectedBorder: '#6366f1',
                selectedText: '#c7d2fe',
                
                disabledBg: '#1e293b',
                disabledBorder: '#334155',
                disabledText: '#64748b',
                
                // === 阴影和透明度 ===
                shadow: 'rgba(0, 0, 0, 0.5)',
                shadowHover: 'rgba(0, 0, 0, 0.7)',
                shadowFocus: 'rgba(99, 102, 241, 0.4)',
                shadowError: 'rgba(239, 68, 68, 0.4)',
                shadowSuccess: 'rgba(16, 185, 129, 0.4)',
                
                overlay: 'rgba(0, 0, 0, 0.8)',
                overlayLight: 'rgba(0, 0, 0, 0.6)',
                backdropBlur: 'rgba(15, 23, 42, 0.8)',
                
                // === 数据可视化色系 ===
                chartPrimary: '#6366f1',
                chartSecondary: '#f59e0b',
                chartTertiary: '#10b981',
                chartQuaternary: '#8b5cf6',
                chartFifth: '#ef4444',
                chartSixth: '#06b6d4',
                
                google: '#4285f4',
                googleRed: '#ea4335',
                googleYellow: '#fbbc05',
                googleGreen: '#34a853',
                
                highlight: '#fbbf24',
                highlightBg: '#451a03',
                link: '#60a5fa',
                linkHover: '#3b82f6',
                linkVisited: '#a78bfa',
                code: '#f472b6',
                codeBg: '#831843'
            },
            fonts: {
                family: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, system-ui, sans-serif',
                sizes: {
                    xs: '12px',
                    sm: '14px',
                    base: '16px',
                    lg: '18px',
                    xl: '20px',
                    '2xl': '24px',
                    '3xl': '32px',
                    '4xl': '40px',
                    '5xl': '48px'
                },
                weights: {
                    light: '300',
                    normal: '400',
                    medium: '500',
                    semibold: '600',
                    bold: '700',
                    black: '900'
                },
                lineHeights: {
                    tight: '1.2',
                    normal: '1.5',
                    relaxed: '1.6',
                    loose: '1.8'
                }
            },
            spacing: {
                px: '1px',
                xs: '4px',
                sm: '8px',
                base: '16px',
                lg: '24px',
                xl: '32px',
                '2xl': '48px',
                '3xl': '64px',
                '4xl': '96px'
            },
            borderRadius: {
                none: '0',
                xs: '3px',
                sm: '6px',
                base: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '20px',
                '3xl': '28px',
                full: '50%'
            },
            animations: {
                duration: '0.25s',
                durationFast: '0.1s',
                durationSlow: '0.4s',
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easingOut: 'cubic-bezier(0, 0, 0.2, 1)',
                easingIn: 'cubic-bezier(0.4, 0, 1, 1)'
            }
        },
        
        // 外星人风格 - Alienware inspired
        alien: {
            name: '外星人',
            id: 'alien',
            description: '未来科技感的外星人风格，灵感来自Alienware官网',
            colors: {
                // === 品牌色系 ===
                // 外星人紫 - 主色（来自官网的紫色调）
                primary: '#7C3AED',
                primaryDark: '#5B21B6',
                primaryLight: '#8B5CF6',
                primaryPale: '#1E1B4B',
                primaryAccent: '#6366F1',
                
                // 科技蓝 - 辅助色（外星人经典蓝）
                secondary: '#00D4FF',
                secondaryDark: '#0099CC',
                secondaryLight: '#33DDFF',
                secondaryPale: '#001A1F',
                
                // === 中性色系 ===
                white: '#FFFFFF',
                whiteSmoke: '#F0F8FF',
                lightGray: '#E8F4F8',
                
                // 深色科技灰色系
                gray50: '#F0F8FF',
                gray100: '#E8F4F8',
                gray200: '#D1E7ED',
                gray300: '#B8D4DA',
                gray400: '#94B3B8',
                gray500: '#6B8E94',
                gray600: '#4A6B70',
                gray700: '#334147',
                gray800: '#1A2D33',
                gray900: '#0F1A1D',
                
                // === 语义色系 ===
                // 科技绿 - 成功色
                success: '#00FF88',
                successDark: '#00CC6A',
                successLight: '#33FFAA',
                successPale: '#001A11',
                successBg: '#0D1F17',
                
                // 能量橙 - 警告色
                warning: '#FF6B35',
                warningDark: '#E5551F',
                warningLight: '#FF8B5A',
                warningPale: '#1F0A05',
                warningBg: '#2A1309',
                
                // 危险红 - 错误色
                error: '#FF4444',
                errorDark: '#E53935',
                errorLight: '#FF6666',
                errorPale: '#1F0808',
                errorBg: '#2A0F0F',
                
                // 信息色 - 使用主色
                info: '#00D4FF',
                infoDark: '#0099CC',
                infoLight: '#33DDFF',
                infoPale: '#001A1F',
                infoBg: '#0D1A1F',
                
                // === 功能色系 ===
                // 深空背景（参考Alienware官网的深灰黑色）
                background: '#0A0A0A',
                backgroundAlt: '#1A1A1A',
                backgroundDark: '#000000',
                
                // 表面色 - 深灰为主
                surface: '#1A1A1A',
                surfaceHover: '#2A2A2A',
                surfaceActive: '#3A3A3A',
                surfaceDisabled: '#151515',
                surfaceElevated: '#252525',
                
                // 文字色 - 高对比度（Alienware官网风格）
                textPrimary: '#F8FAFC',
                textSecondary: '#CBD5E1',
                textTertiary: '#64748B',
                textDisabled: '#475569',
                textInverse: '#0F172A',
                textMuted: '#94A3B8',
                
                // 边框色 - 深灰为主
                border: '#374151',
                borderLight: '#4B5563',
                borderDark: '#1F2937',
                borderFocus: '#8B5CF6',  // 紫色焦点
                borderHover: '#6B7280',
                
                // === 交互色系 ===
                // 悬停状态 - 轻微紫色点缀
                hoverBg: '#2A2A2A',
                hoverBorder: '#8B5CF6',  // 紫色边框
                hoverText: '#A78BFA',   // 浅紫色文字
                
                // 激活状态 - 紫色科技感
                activeBg: '#1F2937',
                activeBorder: '#8B5CF6',
                activeText: '#A78BFA',
                
                // 选中状态 - 紫色高亮
                selectedBg: '#1F2937',
                selectedBorder: '#8B5CF6',
                selectedText: '#A78BFA',
                
                // 禁用状态 - 灰色
                disabledBg: '#151515',
                disabledBorder: '#374151',
                disabledText: '#475569',
                
                // === 阴影和透明度 ===
                // 轻微紫色发光效果
                shadow: 'rgba(139, 92, 246, 0.15)',
                shadowHover: 'rgba(139, 92, 246, 0.25)',
                shadowFocus: 'rgba(139, 92, 246, 0.4)',
                shadowError: 'rgba(255, 68, 68, 0.4)',
                shadowSuccess: 'rgba(0, 255, 136, 0.4)',
                
                // 遮罩 - 深灰为主
                overlay: 'rgba(10, 10, 10, 0.85)',
                overlayLight: 'rgba(10, 10, 10, 0.7)',
                backdropBlur: 'rgba(10, 10, 10, 0.8)',
                
                // === 数据可视化色系 ===
                chartPrimary: '#7C3AED',
                chartSecondary: '#00D4FF',
                chartTertiary: '#00FF88',
                chartQuaternary: '#FF6B35',
                chartFifth: '#FF4444',
                chartSixth: '#FFAA00',
                
                // 品牌色保持不变
                google: '#4285f4',
                googleRed: '#ea4335',
                googleYellow: '#fbbc05',
                googleGreen: '#34a853',
                
                // 特殊功能色 - 外星人紫色科技感
                highlight: '#A78BFA',
                highlightBg: '#1E1B4B',
                link: '#8B5CF6',
                linkHover: '#A78BFA',
                linkVisited: '#00D4FF',
                code: '#F59E0B',
                codeBg: '#1E1B4B'
            },
            fonts: {
                family: '"Orbitron", "JetBrains Mono", "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                sizes: {
                    xs: '12px',
                    sm: '14px',
                    base: '16px',
                    lg: '18px',
                    xl: '20px',
                    '2xl': '24px',
                    '3xl': '32px',
                    '4xl': '40px',
                    '5xl': '48px'
                },
                weights: {
                    light: '300',
                    normal: '400',
                    medium: '500',
                    semibold: '600',
                    bold: '700',
                    black: '900'
                },
                lineHeights: {
                    tight: '1.2',
                    normal: '1.4',
                    relaxed: '1.6',
                    loose: '1.8'
                }
            },
            spacing: {
                px: '1px',
                xs: '4px',
                sm: '8px',
                base: '16px',
                lg: '24px',
                xl: '32px',
                '2xl': '48px',
                '3xl': '64px',
                '4xl': '96px'
            },
            borderRadius: {
                none: '0',
                xs: '2px',
                sm: '4px',
                base: '6px',
                lg: '10px',
                xl: '14px',
                '2xl': '18px',
                '3xl': '26px',
                full: '50%'
            },
            animations: {
                duration: '0.3s',
                durationFast: '0.15s',
                durationSlow: '0.6s',
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easingOut: 'cubic-bezier(0, 0, 0.2, 1)',
                easingIn: 'cubic-bezier(0.4, 0, 1, 1)'
            }
        }
    },

    // 默认主题
    defaultTheme: 'modern',

    // 自动主题切换配置
    autoTheme: {
        // 启用自动切换
        enabled: true,
        
        // 自动切换模式
        // 'system' - 跟随系统设置
        // 'time' - 根据时间自动切换
        // 'both' - 优先系统设置，无系统设置时使用时间
        mode: 'both',
        
        // 时间配置 (24小时制)
        timeConfig: {
            // 白天开始时间
            dayStart: 6,
            // 夜晚开始时间  
            nightStart: 18
        },
        
        // 主题映射配置
        themeMapping: {
            // 浅色模式使用的主题
            light: 'modern',
            // 深色模式使用的主题
            dark: 'professional'
        },
        
        // 用户偏好设置
        userPreference: {
            // 'auto' - 自动模式
            // 'light' - 强制浅色
            // 'dark' - 强制深色
            // 'alien' - 强制外星人主题
            mode: 'auto'
        }
    },

    // 主题应用的CSS变量映射 - 大幅扩展
    cssVariables: {
        // === 核心颜色映射 ===
        colors: {
            // 品牌色
            '--primary-color': 'primary',
            '--primary-dark': 'primaryDark',
            '--primary-light': 'primaryLight',
            '--primary-pale': 'primaryPale',
            '--primary-accent': 'primaryAccent',
            '--primary-hover': 'primaryDark',
            
            '--secondary-color': 'secondary',
            '--secondary-dark': 'secondaryDark',
            '--secondary-light': 'secondaryLight',
            '--secondary-pale': 'secondaryPale',
            
            // 中性色
            '--white': 'white',
            '--gray-50': 'gray50',
            '--gray-100': 'gray100',
            '--gray-200': 'gray200',
            '--gray-300': 'gray300',
            '--gray-400': 'gray400',
            '--gray-500': 'gray500',
            '--gray-600': 'gray600',
            '--gray-700': 'gray700',
            '--gray-800': 'gray800',
            '--gray-900': 'gray900',
            
            // 语义色
            '--success-color': 'success',
            '--success-dark': 'successDark',
            '--success-light': 'successLight',
            '--success-pale': 'successPale',
            '--success-bg': 'successBg',
            
            '--warning-color': 'warning',
            '--warning-dark': 'warningDark',
            '--warning-light': 'warningLight',
            '--warning-pale': 'warningPale',
            '--warning-bg': 'warningBg',
            
            '--error-color': 'error',
            '--error-dark': 'errorDark',
            '--error-light': 'errorLight',
            '--error-pale': 'errorPale',
            '--error-bg': 'errorBg',
            
            '--info-color': 'info',
            '--info-dark': 'infoDark',
            '--info-light': 'infoLight',
            '--info-pale': 'infoPale',
            '--info-bg': 'infoBg',
            
            // 功能色
            '--background-color': 'background',
            '--background-alt': 'backgroundAlt',
            '--background-dark': 'backgroundDark',
            
            '--surface-color': 'surface',
            '--surface-hover': 'surfaceHover',
            '--surface-active': 'surfaceActive',
            '--surface-disabled': 'surfaceDisabled',
            '--surface-elevated': 'surfaceElevated',
            
            '--text-color': 'textPrimary',
            '--text-primary': 'textPrimary',
            '--text-secondary': 'textSecondary',
            '--text-tertiary': 'textTertiary',
            '--text-disabled': 'textDisabled',
            '--text-inverse': 'textInverse',
            '--text-muted': 'textMuted',
            '--text-light': 'textSecondary',
            '--text-lighter': 'textTertiary',
            
            '--border-color': 'border',
            '--border-light': 'borderLight',
            '--border-dark': 'borderDark',
            '--border-focus': 'borderFocus',
            '--border-hover': 'borderHover',
            
            // 交互色
            '--hover-bg': 'hoverBg',
            '--hover-border': 'hoverBorder',
            '--hover-text': 'hoverText',
            
            '--active-bg': 'activeBg',
            '--active-border': 'activeBorder',
            '--active-text': 'activeText',
            
            '--selected-bg': 'selectedBg',
            '--selected-border': 'selectedBorder',
            '--selected-text': 'selectedText',
            
            '--disabled-bg': 'disabledBg',
            '--disabled-border': 'disabledBorder',
            '--disabled-text': 'disabledText',
            
            // 阴影和效果
            '--shadow-color': 'shadow',
            '--shadow-hover': 'shadowHover',
            '--shadow-focus': 'shadowFocus',
            '--shadow-error': 'shadowError',
            '--shadow-success': 'shadowSuccess',
            
            '--overlay': 'overlay',
            '--overlay-light': 'overlayLight',
            '--backdrop-blur': 'backdropBlur',
            
            // 数据可视化
            '--chart-primary': 'chartPrimary',
            '--chart-secondary': 'chartSecondary',
            '--chart-tertiary': 'chartTertiary',
            '--chart-quaternary': 'chartQuaternary',
            '--chart-fifth': 'chartFifth',
            '--chart-sixth': 'chartSixth',
            
            // 品牌辅助色
            '--google-blue': 'google',
            '--google-red': 'googleRed',
            '--google-yellow': 'googleYellow',
            '--google-green': 'googleGreen',
            
            // 特殊色
            '--highlight': 'highlight',
            '--highlight-bg': 'highlightBg',
            '--link': 'link',
            '--link-hover': 'linkHover',
            '--link-visited': 'linkVisited',
            '--code': 'code',
            '--code-bg': 'codeBg'
        },
        
        // === 字体映射 ===
        fonts: {
            '--font-family': 'family',
            '--font-size-xs': 'sizes.xs',
            '--font-size-sm': 'sizes.sm',
            '--font-size-base': 'sizes.base',
            '--font-size-lg': 'sizes.lg',
            '--font-size-xl': 'sizes.xl',
            '--font-size-2xl': 'sizes.2xl',
            '--font-size-3xl': 'sizes.3xl',
            '--font-size-4xl': 'sizes.4xl',
            '--font-size-5xl': 'sizes.5xl',
            
            '--font-weight-light': 'weights.light',
            '--font-weight-normal': 'weights.normal',
            '--font-weight-medium': 'weights.medium',
            '--font-weight-semibold': 'weights.semibold',
            '--font-weight-bold': 'weights.bold',
            '--font-weight-black': 'weights.black',
            
            '--line-height-tight': 'lineHeights.tight',
            '--line-height-normal': 'lineHeights.normal',
            '--line-height-relaxed': 'lineHeights.relaxed',
            '--line-height-loose': 'lineHeights.loose'
        },
        
        // === 间距映射 ===
        spacing: {
            '--spacing-px': 'px',
            '--spacing-xs': 'xs',
            '--spacing-sm': 'sm',
            '--spacing-base': 'base',
            '--spacing-lg': 'lg',
            '--spacing-xl': 'xl',
            '--spacing-2xl': '2xl',
            '--spacing-3xl': '3xl',
            '--spacing-4xl': '4xl'
        },
        
        // === 圆角映射 ===
        borderRadius: {
            '--radius-none': 'none',
            '--radius-xs': 'xs',
            '--radius-sm': 'sm',
            '--radius-base': 'base',
            '--radius-lg': 'lg',
            '--radius-xl': 'xl',
            '--radius-2xl': '2xl',
            '--radius-3xl': '3xl',
            '--radius-full': 'full'
        },
        
        // === 动画映射 ===
        animations: {
            '--animation-duration': 'duration',
            '--animation-duration-fast': 'durationFast',
            '--animation-duration-slow': 'durationSlow',
            '--animation-easing': 'easing',
            '--animation-easing-out': 'easingOut',
            '--animation-easing-in': 'easingIn'
        }
    }
};

// 确保全局可访问
if (typeof window !== 'undefined') {
    window.ThemeConfig = ThemeConfig;
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeConfig;
} 