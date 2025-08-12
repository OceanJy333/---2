/**
 * 性能优化器 - Performance Optimizer
 * 专为 Font Awesome 6.5.1 + Tailwind CSS 2.2.9 优化
 * 集成懒加载、虚拟滚动、性能监控等功能
 */

class PerformanceOptimizer {
    constructor() {
        this.observedElements = new WeakMap();
        this.performanceMetrics = {};
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupVirtualScrolling();
        this.setupPerformanceMonitoring();
        this.optimizeAnimations();
        this.setupImageOptimization();
        this.optimizeFontAwesome();
        this.optimizeTailwind();

        console.log('📈 Performance Optimizer 已初始化 (Font Awesome 6.5.1 + Tailwind CSS 2.2.9)');
    }

    // 1. 懒加载优化
    setupLazyLoading() {
        // 图片懒加载
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        this.imageObserver.unobserve(img);
                    }
                }
            });
        }, { 
            rootMargin: '50px 0px',
            threshold: 0.1 
        });

        // Font Awesome 图标懒加载
        this.iconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icon = entry.target;
                    if (icon.dataset.icon) {
                        icon.className = `fas ${icon.dataset.icon}`;
                        icon.removeAttribute('data-icon');
                        this.iconObserver.unobserve(icon);
                    }
                }
            });
        });

        // 初始化懒加载元素
        this.initLazyElements();
    }

    initLazyElements() {
        // 懒加载图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy-image');
            this.imageObserver.observe(img);
        });

        // 懒加载图标
        document.querySelectorAll('[data-icon]').forEach(icon => {
            this.iconObserver.observe(icon);
        });
    }

    // 2. 虚拟滚动优化（用于长列表）
    setupVirtualScrolling() {
        const longLists = document.querySelectorAll('.virtual-scroll-container');
        
        longLists.forEach(container => {
            this.createVirtualList(container);
        });
    }

    createVirtualList(container) {
        const items = Array.from(container.children);
        if (items.length < 50) return; // 少于50项不需要虚拟化

        const itemHeight = 80; // 假设每项高度
        const visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
        let scrollTop = 0;
        let startIndex = 0;

        const virtualContainer = document.createElement('div');
        virtualContainer.style.height = `${items.length * itemHeight}px`;
        virtualContainer.style.position = 'relative';

        const visibleContainer = document.createElement('div');
        visibleContainer.style.position = 'absolute';
        visibleContainer.style.top = '0';
        visibleContainer.style.width = '100%';

        container.innerHTML = '';
        container.appendChild(virtualContainer);
        virtualContainer.appendChild(visibleContainer);

        const updateVisibleItems = () => {
            const newStartIndex = Math.floor(scrollTop / itemHeight);
            const endIndex = Math.min(newStartIndex + visibleCount, items.length);

            if (newStartIndex !== startIndex) {
                startIndex = newStartIndex;
                visibleContainer.innerHTML = '';
                
                for (let i = startIndex; i < endIndex; i++) {
                    const item = items[i].cloneNode(true);
                    item.style.position = 'absolute';
                    item.style.top = `${i * itemHeight}px`;
                    item.style.width = '100%';
                    visibleContainer.appendChild(item);
                }
            }
        };

        container.addEventListener('scroll', () => {
            scrollTop = container.scrollTop;
            requestAnimationFrame(updateVisibleItems);
        });

        updateVisibleItems();
    }

    // 3. 性能监控
    setupPerformanceMonitoring() {
        // 监控 LCP (Largest Contentful Paint)
        this.observeLCP();
        
        // 监控 FID (First Input Delay)
        this.observeFID();
        
        // 监控 CLS (Cumulative Layout Shift)
        this.observeCLS();

        // 内存使用监控
        this.monitorMemoryUsage();
    }

    observeLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.performanceMetrics.lcp = lastEntry.startTime;
                
                if (lastEntry.startTime > 2500) {
                    console.warn('⚠️ LCP 较慢:', lastEntry.startTime + 'ms');
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    observeFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.performanceMetrics.fid = entry.processingStart - entry.startTime;
                    
                    if (entry.processingStart - entry.startTime > 100) {
                        console.warn('⚠️ FID 较慢:', entry.processingStart - entry.startTime + 'ms');
                    }
                });
            });

            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    observeCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.performanceMetrics.cls = clsValue;
                
                if (clsValue > 0.1) {
                    console.warn('⚠️ CLS 值较高:', clsValue);
                }
            });

            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    monitorMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usage = memory.usedJSHeapSize / memory.totalJSHeapSize;
                
                if (usage > 0.9) {
                    console.warn('⚠️ 内存使用率过高:', Math.round(usage * 100) + '%');
                    this.performGarbageCollection();
                }
            }, 30000); // 每30秒检查一次
        }
    }

    performGarbageCollection() {
        // 清理可能的内存泄漏
        this.cleanupObservers();
        
        // 强制垃圾回收（仅在开发环境）
        if (window.gc && process.env.NODE_ENV === 'development') {
            window.gc();
        }
    }

    // 4. 动画优化
    optimizeAnimations() {
        // 检测用户的动画偏好
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduce-motion');
        }

        // 监听偏好变化
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.classList.add('reduce-motion');
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        });

        // 优化 CSS 动画
        this.optimizeCSSAnimations();
    }

    optimizeCSSAnimations() {
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        
        animatedElements.forEach(element => {
            // 添加 GPU 加速
            element.style.willChange = 'transform, opacity';
            element.style.transform = 'translateZ(0)';
            
            // 动画结束后清理
            element.addEventListener('animationend', () => {
                element.style.willChange = 'auto';
            }, { once: true });
        });
    }

    // 5. 图片优化
    setupImageOptimization() {
        // WebP 支持检测
        this.checkWebPSupport().then(supported => {
            if (supported) {
                this.convertImagesToWebP();
            }
        });

        // 图片压缩
        this.compressImages();
    }

    checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    convertImagesToWebP() {
        const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".png"]');
        
        images.forEach(img => {
            const webpSrc = img.src.replace(/\.(jpg|png)$/i, '.webp');
            
            // 检查 WebP 版本是否存在
            fetch(webpSrc, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        img.src = webpSrc;
                    }
                })
                .catch(() => {
                    // WebP 版本不存在，保持原图
                });
        });
    }

    compressImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                // 检查图片是否过大
                if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
                    console.warn('⚠️ 图片尺寸过大:', img.src);
                }
            });
        });
    }

    // 6. Font Awesome 6.5.1 优化
    optimizeFontAwesome() {
        // 预加载 Font Awesome 6.5.1 字体文件
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.as = 'font';
        fontPreload.href = 'https://cdn.staticfile.net/font-awesome/6.5.1/webfonts/fa-solid-900.woff2';
        fontPreload.type = 'font/woff2';
        fontPreload.crossOrigin = 'anonymous';
        document.head.appendChild(fontPreload);

        // 预加载常用图标类
        const commonIcons = [
            'fa-robot', 'fa-users', 'fa-envelope', 'fa-search', 'fa-bell',
            'fa-user-cog', 'fa-chevron-down', 'fa-plus', 'fa-trash', 'fa-comments',
            'fa-tachometer-alt', 'fa-cube', 'fa-lightbulb', 'fa-check-circle',
            'fa-play-circle', 'fa-video', 'fa-chart-bar', 'fa-paper-plane'
        ];

        // 为图标添加GPU加速
        document.querySelectorAll('.fas, .far, .fab, .fal, .fad').forEach(icon => {
            icon.style.transform = 'translateZ(0)';
            icon.style.backfaceVisibility = 'hidden';
            icon.style.fontDisplay = 'swap';
        });

        console.log('✅ Font Awesome 6.5.1 优化完成');
    }

    // 7. Tailwind CSS 2.2.9 优化
    optimizeTailwind() {
        // 优化 Tailwind 动画性能
        this.optimizeTailwindAnimations();

        // 优化响应式断点
        this.optimizeBreakpoints();

        // 优化 Tailwind 工具类
        this.optimizeTailwindUtilities();
    }

    optimizeTailwindAnimations() {
        // 为 Tailwind 动画类添加性能优化
        const animatedElements = document.querySelectorAll(
            '.transition-all, .transition-colors, .transition-transform, ' +
            '.hover\\:scale-110, .hover\\:bg-blue-50, .animate-pulse, .animate-spin, ' +
            '.hover\\:shadow-lg, .hover\\:-translate-y-1'
        );

        animatedElements.forEach(element => {
            // 根据动画类型设置 will-change
            if (element.className.includes('scale') ||
                element.className.includes('translate') ||
                element.className.includes('transform')) {
                element.style.willChange = 'transform';
            } else if (element.className.includes('bg-') ||
                       element.className.includes('text-') ||
                       element.className.includes('colors')) {
                element.style.willChange = 'background-color, color';
            } else if (element.className.includes('shadow')) {
                element.style.willChange = 'box-shadow';
            } else {
                element.style.willChange = 'auto';
            }

            // 添加GPU加速
            element.style.transform = element.style.transform || 'translateZ(0)';
        });
    }

    optimizeTailwindUtilities() {
        // 优化常用的 Tailwind 工具类性能
        const utilityElements = document.querySelectorAll(
            '.btn-enhanced, .card-enhanced, .form-input-enhanced, ' +
            '.dropdown-menu-enhanced, .badge-primary-enhanced'
        );

        utilityElements.forEach(element => {
            element.style.contain = 'layout style paint';
        });

        console.log('✅ Tailwind CSS 2.2.9 优化完成');
    }

    purgeUnusedClasses() {
        // 在生产环境中，这应该在构建时完成
        if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
            console.log('🧹 Tailwind CSS 类已优化');
        }
    }

    optimizeBreakpoints() {
        // 监听窗口大小变化，优化响应式加载
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.updateViewportClasses();
            }, 250);
        });
    }

    updateViewportClasses() {
        const width = window.innerWidth;
        const body = document.body;
        
        body.classList.remove('mobile', 'tablet', 'desktop');
        
        if (width < 768) {
            body.classList.add('mobile');
        } else if (width < 1024) {
            body.classList.add('tablet');
        } else {
            body.classList.add('desktop');
        }
    }

    // 8. 清理和销毁
    cleanupObservers() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        if (this.iconObserver) {
            this.iconObserver.disconnect();
        }
    }

    destroy() {
        this.cleanupObservers();
        this.observedElements = new WeakMap();
        this.performanceMetrics = {};
        
        console.log('🔄 Performance Optimizer 已清理');
    }

    // 9. 性能报告
    getPerformanceReport() {
        return {
            ...this.performanceMetrics,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB',
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
            } : null,
            timestamp: new Date().toISOString()
        };
    }

    // 10. 动态导入优化
    async loadModuleOptimized(modulePath) {
        try {
            const module = await import(modulePath);
            return module;
        } catch (error) {
            console.warn('⚠️ 模块加载失败:', modulePath, error);
            return null;
        }
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    if (window.performanceOptimizer) {
        window.performanceOptimizer.destroy();
    }
});

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
} 