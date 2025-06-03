/**
 * 增强配置 - Tailwind CSS 和 Font Awesome 优化
 * ================================================
 */

// Tailwind CSS 自定义配置
const TailwindEnhancedConfig = {
    // 自定义颜色扩展
    colors: {
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
        },
        success: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
        },
        warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
        },
        danger: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
        },
        // 渐变色配置
        gradients: {
            'primary-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'success-green': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'warning-orange': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'purple-pink': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'blue-indigo': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }
    },

    // 自定义间距
    spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
    },

    // 自定义阴影
    boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 0 1px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 0 1px rgba(59, 130, 246, 0.3), 0 8px 32px rgba(59, 130, 246, 0.25)',
    },

    // 自定义动画
    animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
    },

    // 自定义关键帧
    keyframes: {
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        slideIn: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
            '0%': { transform: 'scale(0.3)', opacity: '0' },
            '50%': { transform: 'scale(1.05)' },
            '70%': { transform: 'scale(0.9)' },
            '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
        },
    },
};

// Font Awesome 图标映射配置
const FontAwesomeIconMap = {
    // 导航图标
    navigation: {
        dashboard: 'fas fa-tachometer-alt',
        products: 'fas fa-cube',
        users: 'fas fa-users',
        contacts: 'fas fa-address-book',
        analytics: 'fas fa-chart-bar',
        settings: 'fas fa-cog',
        help: 'fas fa-question-circle',
        home: 'fas fa-home',
        menu: 'fas fa-bars',
        close: 'fas fa-times',
        back: 'fas fa-arrow-left',
        forward: 'fas fa-arrow-right',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        chevronLeft: 'fas fa-chevron-left',
        chevronRight: 'fas fa-chevron-right',
        chevronUp: 'fas fa-chevron-up',
        chevronDown: 'fas fa-chevron-down',
    },

    // 操作图标
    actions: {
        add: 'fas fa-plus',
        edit: 'fas fa-edit',
        delete: 'fas fa-trash',
        save: 'fas fa-save',
        cancel: 'fas fa-times',
        confirm: 'fas fa-check',
        search: 'fas fa-search',
        filter: 'fas fa-filter',
        sort: 'fas fa-sort',
        upload: 'fas fa-upload',
        download: 'fas fa-download',
        copy: 'fas fa-copy',
        share: 'fas fa-share',
        print: 'fas fa-print',
        refresh: 'fas fa-sync-alt',
        reload: 'fas fa-redo',
        undo: 'fas fa-undo',
        expand: 'fas fa-expand',
        compress: 'fas fa-compress',
        fullscreen: 'fas fa-expand-arrows-alt',
    },

    // 状态图标
    status: {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle',
        info: 'fas fa-info-circle',
        pending: 'fas fa-clock',
        loading: 'fas fa-spinner',
        online: 'fas fa-circle',
        offline: 'fas fa-circle',
        active: 'fas fa-dot-circle',
        inactive: 'fas fa-circle',
    },

    // 通信图标
    communication: {
        email: 'fas fa-envelope',
        emailOpen: 'fas fa-envelope-open',
        phone: 'fas fa-phone',
        chat: 'fas fa-comments',
        message: 'fas fa-comment',
        notification: 'fas fa-bell',
        alert: 'fas fa-exclamation',
        announcement: 'fas fa-bullhorn',
        video: 'fas fa-video',
        microphone: 'fas fa-microphone',
        speaker: 'fas fa-volume-up',
    },

    // 用户图标
    user: {
        profile: 'fas fa-user',
        team: 'fas fa-users',
        admin: 'fas fa-user-shield',
        guest: 'fas fa-user-circle',
        avatar: 'fas fa-user-circle',
        settings: 'fas fa-user-cog',
        logout: 'fas fa-sign-out-alt',
        login: 'fas fa-sign-in-alt',
        register: 'fas fa-user-plus',
        edit: 'fas fa-user-edit',
        delete: 'fas fa-user-times',
        block: 'fas fa-user-slash',
        verify: 'fas fa-user-check',
    },

    // 内容图标
    content: {
        document: 'fas fa-file-alt',
        image: 'fas fa-image',
        video: 'fas fa-video',
        audio: 'fas fa-music',
        pdf: 'fas fa-file-pdf',
        excel: 'fas fa-file-excel',
        word: 'fas fa-file-word',
        powerpoint: 'fas fa-file-powerpoint',
        archive: 'fas fa-file-archive',
        code: 'fas fa-file-code',
        text: 'fas fa-file-alt',
        folder: 'fas fa-folder',
        folderOpen: 'fas fa-folder-open',
        link: 'fas fa-link',
        bookmark: 'fas fa-bookmark',
        tag: 'fas fa-tag',
        tags: 'fas fa-tags',
    },

    // 电商图标
    ecommerce: {
        product: 'fas fa-cube',
        cart: 'fas fa-shopping-cart',
        order: 'fas fa-receipt',
        payment: 'fas fa-credit-card',
        shipping: 'fas fa-truck',
        delivery: 'fas fa-shipping-fast',
        warehouse: 'fas fa-warehouse',
        inventory: 'fas fa-boxes',
        price: 'fas fa-dollar-sign',
        discount: 'fas fa-percent',
        coupon: 'fas fa-ticket-alt',
        gift: 'fas fa-gift',
        wishlist: 'fas fa-heart',
        compare: 'fas fa-balance-scale',
        review: 'fas fa-star',
        rating: 'fas fa-star-half-alt',
    },

    // 社交媒体图标
    social: {
        facebook: 'fab fa-facebook',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        youtube: 'fab fa-youtube',
        linkedin: 'fab fa-linkedin',
        tiktok: 'fab fa-tiktok',
        pinterest: 'fab fa-pinterest',
        snapchat: 'fab fa-snapchat',
        discord: 'fab fa-discord',
        telegram: 'fab fa-telegram',
        whatsapp: 'fab fa-whatsapp',
        wechat: 'fab fa-weixin',
        share: 'fas fa-share-alt',
        like: 'fas fa-thumbs-up',
        dislike: 'fas fa-thumbs-down',
        follow: 'fas fa-user-plus',
        unfollow: 'fas fa-user-minus',
    },

    // 技术图标
    tech: {
        ai: 'fas fa-robot',
        api: 'fas fa-plug',
        database: 'fas fa-database',
        server: 'fas fa-server',
        cloud: 'fas fa-cloud',
        security: 'fas fa-shield-alt',
        bug: 'fas fa-bug',
        code: 'fas fa-code',
        terminal: 'fas fa-terminal',
        git: 'fab fa-git-alt',
        github: 'fab fa-github',
        docker: 'fab fa-docker',
        aws: 'fab fa-aws',
        google: 'fab fa-google',
        microsoft: 'fab fa-microsoft',
        apple: 'fab fa-apple',
        android: 'fab fa-android',
        linux: 'fab fa-linux',
        windows: 'fab fa-windows',
    },

    // 分析图标
    analytics: {
        chart: 'fas fa-chart-bar',
        line: 'fas fa-chart-line',
        pie: 'fas fa-chart-pie',
        area: 'fas fa-chart-area',
        trending: 'fas fa-trending-up',
        growth: 'fas fa-arrow-trend-up',
        decline: 'fas fa-arrow-trend-down',
        report: 'fas fa-file-chart',
        dashboard: 'fas fa-tachometer-alt',
        metrics: 'fas fa-gauge',
        kpi: 'fas fa-bullseye',
        target: 'fas fa-crosshairs',
        goal: 'fas fa-flag-checkered',
        performance: 'fas fa-rocket',
        insights: 'fas fa-lightbulb',
        data: 'fas fa-database',
    },
};

// 组件类映射配置
const ComponentClassMap = {
    // 按钮组件
    buttons: {
        primary: 'btn-primary-enhanced',
        secondary: 'btn-secondary-enhanced',
        success: 'btn-success-enhanced',
        warning: 'btn-warning-enhanced',
        danger: 'btn-danger-enhanced',
        outline: 'btn-outline-enhanced',
        ghost: 'btn-enhanced bg-transparent hover:bg-gray-50',
        link: 'btn-enhanced bg-transparent text-blue-600 hover:text-blue-700',
        icon: 'btn-enhanced p-2 rounded-full',
        floating: 'btn-enhanced rounded-full shadow-floating',
    },

    // 卡片组件
    cards: {
        default: 'card-enhanced',
        elevated: 'card-enhanced shadow-elevated',
        floating: 'card-enhanced shadow-floating',
        bordered: 'card-enhanced border-2',
        gradient: 'card-enhanced bg-gradient-to-br from-white to-blue-50',
        glass: 'card-enhanced glass-effect',
        compact: 'card-enhanced p-3',
        spacious: 'card-enhanced p-8',
    },

    // 表单组件
    forms: {
        input: 'form-input-enhanced',
        label: 'form-label-enhanced',
        error: 'form-error-enhanced',
        group: 'form-group-enhanced',
        select: 'form-input-enhanced',
        textarea: 'form-input-enhanced resize-none',
        checkbox: 'form-checkbox text-blue-600 focus:ring-blue-500',
        radio: 'form-radio text-blue-600 focus:ring-blue-500',
        switch: 'form-switch text-blue-600 focus:ring-blue-500',
    },

    // 导航组件
    navigation: {
        nav: 'nav-enhanced',
        item: 'nav-item-enhanced',
        active: 'nav-item-active-enhanced',
        sidebar: 'sidebar-enhanced',
        sidebarItem: 'sidebar-nav-item-enhanced',
        sidebarActive: 'sidebar-nav-item-active-enhanced',
        breadcrumb: 'flex items-center space-x-2 text-sm text-gray-500',
        tab: 'px-4 py-2 text-sm font-medium rounded-md',
        tabActive: 'px-4 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700',
    },

    // 状态组件
    status: {
        badge: 'badge-enhanced',
        badgePrimary: 'badge-primary-enhanced',
        badgeSuccess: 'badge-success-enhanced',
        badgeWarning: 'badge-warning-enhanced',
        badgeDanger: 'badge-danger-enhanced',
        badgeSecondary: 'badge-secondary-enhanced',
        alert: 'alert-enhanced',
        alertSuccess: 'alert-success-enhanced',
        alertWarning: 'alert-warning-enhanced',
        alertDanger: 'alert-danger-enhanced',
        alertInfo: 'alert-info-enhanced',
        spinner: 'loading-spinner-enhanced',
        progress: 'progress-enhanced',
    },

    // 数据显示组件
    dataDisplay: {
        table: 'table-enhanced',
        tableHeader: 'table-header-enhanced',
        tableCell: 'table-cell-enhanced',
        list: 'divide-y divide-gray-200',
        listItem: 'py-3 flex items-center justify-between',
        avatar: 'avatar-enhanced',
        avatarSm: 'avatar-sm-enhanced',
        avatarMd: 'avatar-md-enhanced',
        avatarLg: 'avatar-lg-enhanced',
        avatarXl: 'avatar-xl-enhanced',
        tag: 'tag-enhanced',
        tooltip: 'tooltip-enhanced',
    },
};

// 响应式断点配置
const ResponsiveBreakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

// 主题集成配置
const ThemeIntegration = {
    // 确保与现有主题系统兼容
    preserveThemeVariables: true,
    
    // 主题切换时的CSS变量映射
    themeVariableMapping: {
        'modern': {
            '--primary-color': 'theme("colors.blue.600")',
            '--success-color': 'theme("colors.green.500")',
            '--warning-color': 'theme("colors.yellow.500")',
            '--error-color': 'theme("colors.red.500")',
        },
        'professional': {
            '--primary-color': 'theme("colors.indigo.600")',
            '--success-color': 'theme("colors.emerald.500")',
            '--warning-color': 'theme("colors.amber.500")',
            '--error-color': 'theme("colors.rose.500")',
        },
        'alien': {
            '--primary-color': 'theme("colors.purple.600")',
            '--success-color': 'theme("colors.cyan.500")',
            '--warning-color': 'theme("colors.orange.500")',
            '--error-color': 'theme("colors.pink.500")',
        },
    },
};

// 性能配置增强版
const PerformanceConfig = {
    // 启用GPU加速的组件
    gpuAccelerated: [
        '.card-enhanced',
        '.btn-enhanced',
        '.modal-enhanced',
        '.dropdown-menu-enhanced',
        '.fa-icon',
        '.animated',
        '.transition-all',
        '.transform',
        '[class*="scale-"]',
        '[class*="rotate-"]',
        '[class*="translate-"]',
    ],
    
    // 懒加载配置
    lazyLoading: {
        images: true,
        components: true,
        icons: true,
        threshold: 0.1,
        rootMargin: '50px',
        // 新增预加载配置
        preloadCount: 3,
        placeholderColor: '#f3f4f6',
    },
    
    // 动画性能配置
    animations: {
        reducedMotion: true,
        duration: 200,
        fastDuration: 150,
        slowDuration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // 动画队列管理
        maxConcurrent: 5,
        useRAF: true,
    },
    
    // 内存优化配置
    memory: {
        enableGC: true,
        maxCacheSize: 50, // MB
        cleanupInterval: 300000, // 5分钟
        observerCleanup: true,
    },
    
    // 网络优化配置
    network: {
        enableCompression: true,
        cacheStrategy: 'stale-while-revalidate',
        preloadCritical: true,
        resourceHints: {
            preconnect: [
                'https://cdn.staticfile.org',
                'https://cdn.jsdelivr.net'
            ],
            prefetch: [
                'style-enhanced.css',
                'performance-optimizer.js'
            ],
            preload: [
                'https://cdn.staticfile.org/font-awesome/6.4.0/webfonts/fa-solid-900.woff2'
            ]
        },
    },
    
    // 虚拟滚动配置
    virtualScroll: {
        enabled: true,
        itemHeight: 80,
        bufferSize: 5,
        threshold: 50, // 超过50项启用虚拟滚动
    },
    
    // 图片优化配置
    imageOptimization: {
        enableWebP: true,
        enableLazyLoad: true,
        quality: 85,
        maxWidth: 1920,
        maxHeight: 1080,
        placeholder: 'blur',
    },
};

// 可访问性配置
const AccessibilityConfig = {
    // 焦点管理
    focusManagement: {
        visible: true,
        trapFocus: true,
        restoreFocus: true,
    },
    
    // 键盘导航
    keyboardNavigation: {
        enabled: true,
        skipLinks: true,
        arrowKeys: true,
    },
    
    // 屏幕阅读器支持
    screenReader: {
        announcements: true,
        liveRegions: true,
        landmarks: true,
    },
    
    // 颜色对比度
    colorContrast: {
        level: 'AA',
        checkContrast: true,
    },
};

// 工具函数
const EnhancedUtils = {
    // 获取图标类名
    getIcon(category, name) {
        return FontAwesomeIconMap[category]?.[name] || 'fas fa-question-circle';
    },

    // 获取组件类名
    getComponentClass(category, name) {
        return ComponentClassMap[category]?.[name] || '';
    },

    // 应用主题
    applyTheme(themeName) {
        const themeVars = ThemeIntegration.themeVariableMapping[themeName];
        if (themeVars) {
            const root = document.documentElement;
            Object.entries(themeVars).forEach(([prop, value]) => {
                root.style.setProperty(prop, value);
            });
        }
    },

    // 切换暗色模式
    toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
    },

    // 检查浏览器特性支持
    supportsFeature(feature) {
        const features = {
            'content-visibility': 'contentVisibility' in document.documentElement.style,
            'backdrop-filter': 'backdropFilter' in document.documentElement.style,
            'css-grid': CSS.supports('display', 'grid'),
            'css-flexbox': CSS.supports('display', 'flex'),
            'css-variables': CSS.supports('--test', 'value'),
        };
        return features[feature] || false;
    },

    // 初始化性能优化
    initPerformanceOptimizations() {
        // 添加GPU加速类
        PerformanceConfig.gpuAccelerated.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.classList.add('gpu-accelerated'));
        });

        // 初始化懒加载
        if (PerformanceConfig.lazyLoading.images) {
            this.initLazyLoading();
        }

        // 检查减少动画偏好
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduce-motion');
        }
    },

    // 初始化懒加载
    initLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: PerformanceConfig.lazyLoading.threshold,
            rootMargin: PerformanceConfig.lazyLoading.rootMargin,
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    },

    // 初始化可访问性功能
    initAccessibility() {
        // 添加跳转链接
        if (AccessibilityConfig.keyboardNavigation.skipLinks) {
            this.addSkipLinks();
        }

        // 管理焦点
        if (AccessibilityConfig.focusManagement.visible) {
            this.manageFocus();
        }

        // 键盘导航
        if (AccessibilityConfig.keyboardNavigation.enabled) {
            this.initKeyboardNavigation();
        }
    },

    // 添加跳转链接
    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = '跳转到主内容';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);
    },

    // 管理焦点
    manageFocus() {
        // 为所有交互元素添加焦点样式
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(el => {
            el.classList.add('focus-visible-enhanced');
        });
    },

    // 初始化键盘导航
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC键关闭模态框
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal-enhanced[style*="block"]');
                if (openModal) {
                    openModal.style.display = 'none';
                }
            }

            // Tab键管理焦点
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    },

    // 处理Tab导航
    handleTabNavigation(e) {
        const focusableElements = Array.from(document.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ));

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    },
};

// 扩展图标映射配置
const ExtendedIconMap = {
    // 内容图标
    content: {
        document: 'fas fa-file',
        image: 'fas fa-image',
        video: 'fas fa-video',
        audio: 'fas fa-music',
        text: 'fas fa-file-alt',
        pdf: 'fas fa-file-pdf',
        excel: 'fas fa-file-excel',
        word: 'fas fa-file-word',
        folder: 'fas fa-folder',
        archive: 'fas fa-archive',
        attachment: 'fas fa-paperclip',
        link: 'fas fa-link',
    },

    // 电商图标
    ecommerce: {
        product: 'fas fa-box',
        cart: 'fas fa-shopping-cart',
        order: 'fas fa-shopping-bag',
        payment: 'fas fa-credit-card',
        money: 'fas fa-dollar-sign',
        discount: 'fas fa-tags',
        shipping: 'fas fa-shipping-fast',
        warehouse: 'fas fa-warehouse',
        inventory: 'fas fa-boxes',
        barcode: 'fas fa-barcode',
    },

    // 社交媒体图标
    social: {
        youtube: 'fab fa-youtube',
        facebook: 'fab fa-facebook',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        linkedin: 'fab fa-linkedin',
        tiktok: 'fab fa-tiktok',
        whatsapp: 'fab fa-whatsapp',
        telegram: 'fab fa-telegram',
        wechat: 'fab fa-weixin',
        google: 'fab fa-google',
    },

    // 技术图标
    tech: {
        robot: 'fas fa-robot',
        ai: 'fas fa-brain',
        code: 'fas fa-code',
        database: 'fas fa-database',
        server: 'fas fa-server',
        cloud: 'fas fa-cloud',
        api: 'fas fa-plug',
        security: 'fas fa-shield-alt',
        bug: 'fas fa-bug',
        tools: 'fas fa-tools',
    },

    // 分析图标
    analytics: {
        chart: 'fas fa-chart-bar',
        line: 'fas fa-chart-line',
        pie: 'fas fa-chart-pie',
        area: 'fas fa-chart-area',
        trend: 'fas fa-trending-up',
        growth: 'fas fa-arrow-trend-up',
        report: 'fas fa-file-chart',
        data: 'fas fa-database',
        insights: 'fas fa-lightbulb',
        metrics: 'fas fa-tachometer-alt',
    },
};

// 组件增强类映射
const ComponentEnhancedClasses = {
    // 按钮组件
    buttons: {
        primary: 'btn-primary-enhanced hover:shadow-elevated transform hover:scale-105 transition-all duration-200',
        secondary: 'btn-secondary-enhanced hover:shadow-elevated transform hover:scale-105 transition-all duration-200',
        success: 'btn-success-enhanced hover:shadow-elevated transform hover:scale-105 transition-all duration-200',
        warning: 'btn-warning-enhanced hover:shadow-elevated transform hover:scale-105 transition-all duration-200',
        danger: 'btn-danger-enhanced hover:shadow-elevated transform hover:scale-105 transition-all duration-200',
        outline: 'btn-outline-enhanced hover:shadow-elevated transform hover:scale-105 transition-all duration-200',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200',
        floating: 'fixed bottom-6 right-6 btn-primary-enhanced rounded-full w-14 h-14 shadow-floating hover:shadow-strong',
    },

    // 卡片组件
    cards: {
        basic: 'card-enhanced hover:shadow-elevated transition-shadow duration-300',
        interactive: 'card-enhanced hover:shadow-elevated transform hover:scale-102 transition-all duration-300 cursor-pointer',
        featured: 'card-enhanced bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-elevated transition-all duration-300',
        glass: 'bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg shadow-soft',
        elevated: 'card-enhanced shadow-medium hover:shadow-strong transition-shadow duration-300',
    },

    // 表单组件
    forms: {
        input: 'form-input-enhanced focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200',
        inputSuccess: 'form-input-enhanced border-green-300 focus:ring-green-500 focus:border-green-500',
        inputError: 'form-input-enhanced border-red-300 focus:ring-red-500 focus:border-red-500',
        textarea: 'form-input-enhanced resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        select: 'form-input-enhanced cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        checkbox: 'rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0',
        radio: 'text-blue-600 focus:ring-blue-500 focus:ring-offset-0',
    },

    // 导航组件
    navigation: {
        navbar: 'bg-white shadow-sm border-b border-gray-200',
        sidebar: 'bg-white shadow-lg border-r border-gray-200 w-64',
        menuItem: 'flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200',
        activeMenuItem: 'flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700 border-r-2 border-blue-700',
        breadcrumb: 'flex items-center space-x-2 text-sm text-gray-500',
        tab: 'px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 transition-colors duration-200',
        activeTab: 'px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600',
    },

    // 状态组件
    status: {
        badge: 'badge-enhanced',
        badgePrimary: 'badge-primary-enhanced',
        badgeSuccess: 'badge-success-enhanced',
        badgeWarning: 'badge-warning-enhanced',
        badgeDanger: 'badge-danger-enhanced',
        badgeSecondary: 'badge-secondary-enhanced',
        alert: 'alert-enhanced',
        alertSuccess: 'alert-success-enhanced border-l-4 border-green-500',
        alertWarning: 'alert-warning-enhanced border-l-4 border-yellow-500',
        alertDanger: 'alert-danger-enhanced border-l-4 border-red-500',
        alertInfo: 'alert-info-enhanced border-l-4 border-blue-500',
    },

    // 数据展示组件
    data: {
        table: 'table-enhanced',
        tableStriped: 'table-enhanced divide-y divide-gray-200',
        tableHover: 'table-enhanced divide-y divide-gray-200 hover:bg-gray-50',
        list: 'bg-white shadow-sm rounded-lg divide-y divide-gray-200',
        listItem: 'px-6 py-4 hover:bg-gray-50 transition-colors duration-200',
        statCard: 'bg-white p-6 rounded-lg shadow-sm border border-gray-200',
        metricCard: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-medium',
    },

    // 交互组件
    interactive: {
        dropdown: 'dropdown-enhanced',
        dropdownMenu: 'dropdown-menu-enhanced animate-fade-in',
        modal: 'modal-enhanced',
        modalBackdrop: 'modal-backdrop-enhanced',
        modalPanel: 'modal-panel-enhanced animate-scale-in',
        tooltip: 'tooltip-enhanced animate-fade-in',
        popover: 'bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4 animate-scale-in',
    },

    // 布局组件
    layout: {
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        section: 'py-12',
        grid: 'grid gap-6',
        flexCenter: 'flex items-center justify-center',
        flexBetween: 'flex items-center justify-between',
        divider: 'border-t border-gray-200',
        spacer: 'h-6',
    },

    // 动画组件
    animations: {
        fadeIn: 'animate-fade-in',
        slideIn: 'animate-slide-in',
        scaleIn: 'animate-scale-in',
        bounceIn: 'animate-bounce-in',
        pulse: 'animate-pulse-soft',
        spin: 'animate-spin',
        bounce: 'animate-bounce',
    },
};

// 响应式断点配置
const ResponsiveBreakpoints = {
    mobile: '(max-width: 640px)',
    tablet: '(min-width: 641px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)',
    largeDesktop: '(min-width: 1440px)',
};

// 主题增强配置
const ThemeEnhancedConfig = {
    // 与现有主题系统集成
    integration: {
        preserveExisting: true,
        enhanceWithTailwind: true,
        maintainCompatibility: true,
    },

    // 主题变量映射到Tailwind
    variableMapping: {
        '--primary-color': 'text-blue-600',
        '--primary-bg': 'bg-blue-600',
        '--primary-border': 'border-blue-600',
        '--success-color': 'text-green-600',
        '--success-bg': 'bg-green-600',
        '--success-border': 'border-green-600',
        '--warning-color': 'text-yellow-600',
        '--warning-bg': 'bg-yellow-600',
        '--warning-border': 'border-yellow-600',
        '--danger-color': 'text-red-600',
        '--danger-bg': 'bg-red-600',
        '--danger-border': 'border-red-600',
    },

    // 深色模式支持
    darkMode: {
        enabled: true,
        strategy: 'class', // 'media' or 'class'
        selector: '[data-theme="professional"], [data-theme="alien"]',
    },
};

// 性能优化配置
const PerformanceConfig = {
    // CSS 优化
    css: {
        purge: true,
        minify: true,
        compress: true,
    },

    // 图片优化
    images: {
        lazyLoad: true,
        webpSupport: true,
        placeholders: true,
    },

    // 字体优化
    fonts: {
        preload: ['woff2'],
        display: 'swap',
        fallbacks: true,
    },

    // 动画优化
    animations: {
        reducedMotion: true,
        gpuAcceleration: true,
        willChange: true,
    },
};

// 辅助功能配置
const AccessibilityConfig = {
    // 颜色对比度
    contrast: {
        aa: true, // WCAG 2.1 AA级
        aaa: false, // WCAG 2.1 AAA级
    },

    // 键盘导航
    keyboard: {
        focusVisible: true,
        tabIndex: true,
        skipLinks: true,
    },

    // 屏幕阅读器
    screenReader: {
        ariaLabels: true,
        landmarks: true,
        liveRegions: true,
    },

    // 减动效
    reducedMotion: {
        respectPreference: true,
        fallbackStyles: true,
    },
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TailwindEnhancedConfig,
        FontAwesomeIconMap,
        ComponentEnhancedClasses,
        ResponsiveBreakpoints,
        ThemeEnhancedConfig,
        PerformanceConfig,
        AccessibilityConfig,
    };
}

// 浏览器环境下的全局配置
if (typeof window !== 'undefined') {
    window.EnhancedConfig = {
        TailwindEnhancedConfig,
        FontAwesomeIconMap,
        ComponentEnhancedClasses,
        ResponsiveBreakpoints,
        ThemeEnhancedConfig,
        PerformanceConfig,
        AccessibilityConfig,
    };

    // 初始化增强功能
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Enhanced UI Configuration loaded');
        
        // 应用增强样式类
        applyEnhancedClasses();
        
        // 初始化图标映射
        initializeIconMapping();
        
        // 设置响应式监听
        setupResponsiveListeners();
        
        // 初始化辅助功能
        initializeAccessibility();
    });
}

// 应用增强样式类
function applyEnhancedClasses() {
    // 自动应用增强类到现有元素
    const elementsToEnhance = [
        { selector: '.btn-primary', classes: ComponentEnhancedClasses.buttons.primary },
        { selector: '.btn-secondary', classes: ComponentEnhancedClasses.buttons.secondary },
        { selector: '.card', classes: ComponentEnhancedClasses.cards.basic },
        { selector: '.form-input', classes: ComponentEnhancedClasses.forms.input },
        { selector: '.menu-item', classes: ComponentEnhancedClasses.navigation.menuItem },
        { selector: '.badge', classes: ComponentEnhancedClasses.status.badge },
    ];

    elementsToEnhance.forEach(({ selector, classes }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.className += ` ${classes}`;
        });
    });
}

// 初始化图标映射
function initializeIconMapping() {
    // 自动替换通用图标类
    const iconMappings = [
        { oldClass: 'icon-dashboard', newClass: FontAwesomeIconMap.navigation.dashboard },
        { oldClass: 'icon-user', newClass: FontAwesomeIconMap.user.profile },
        { oldClass: 'icon-settings', newClass: FontAwesomeIconMap.navigation.settings },
        { oldClass: 'icon-search', newClass: FontAwesomeIconMap.actions.search },
        { oldClass: 'icon-add', newClass: FontAwesomeIconMap.actions.add },
        { oldClass: 'icon-edit', newClass: FontAwesomeIconMap.actions.edit },
        { oldClass: 'icon-delete', newClass: FontAwesomeIconMap.actions.delete },
    ];

    iconMappings.forEach(({ oldClass, newClass }) => {
        const elements = document.querySelectorAll(`.${oldClass}`);
        elements.forEach(element => {
            element.className = element.className.replace(oldClass, newClass);
        });
    });
}

// 设置响应式监听
function setupResponsiveListeners() {
    Object.entries(ResponsiveBreakpoints).forEach(([name, query]) => {
        const mediaQuery = window.matchMedia(query);
        
        function handleBreakpointChange(e) {
            document.body.classList.toggle(`is-${name}`, e.matches);
        }
        
        mediaQuery.addListener(handleBreakpointChange);
        handleBreakpointChange(mediaQuery);
    });
}

// 初始化辅助功能
function initializeAccessibility() {
    // 键盘导航支持
    if (AccessibilityConfig.keyboard.focusVisible) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // 减动效支持
    if (AccessibilityConfig.reducedMotion.respectPreference) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleReducedMotion(e) {
            document.body.classList.toggle('reduce-motion', e.matches);
        }
        
        prefersReducedMotion.addListener(handleReducedMotion);
        handleReducedMotion(prefersReducedMotion);
    }
}

// 工具函数
const EnhancedUtils = {
    // 获取图标类名
    getIcon(category, name) {
        return FontAwesomeIconMap[category]?.[name] || '';
    },

    // 获取组件类名
    getComponentClass(category, name) {
        return ComponentEnhancedClasses[category]?.[name] || '';
    },

    // 应用主题
    applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
    },

    // 切换深色模式
    toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
    },

    // 检查是否支持功能
    supportsFeature(feature) {
        const support = {
            'backdrop-filter': CSS.supports('backdrop-filter', 'blur(10px)'),
            'grid': CSS.supports('display', 'grid'),
            'flexbox': CSS.supports('display', 'flex'),
            'custom-properties': CSS.supports('--test', 'test'),
        };
        return support[feature] || false;
    },
};

// 全局暴露工具函数
if (typeof window !== 'undefined') {
    window.EnhancedUtils = EnhancedUtils;
} 