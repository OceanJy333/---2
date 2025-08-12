/**
 * AI助手侧边栏交互库
 * @version 1.0.0
 * @description 一个功能丰富的侧边栏交互库，支持项目管理、对话管理、拖拽操作等
 */

(function(global, factory) {
    'use strict';
    
    // UMD (Universal Module Definition) 模式
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // Node.js 或 CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // 浏览器全局变量
        global.AISidebar = factory();
    }
}(typeof window !== 'undefined' ? window : this, function() {
    'use strict';

    /**
     * 默认配置
     */
    const defaultConfig = {
        // 选择器配置
        selectors: {
            projectsList: '#projects-list',
            uncategorizedArea: '#uncategorized-conversations',
            newProjectIcon: '#new-project-icon',
            newConversationIcon: '#new-conversation-icon',
            aiAssistantMenu: '#ai-assistant-menu',
            aiAssistantSubmenu: '#ai-assistant-submenu'
        },
        
        // 功能配置
        features: {
            dragAndDrop: true,          // 启用拖拽
            inlineEdit: true,           // 启用内联编辑
            projectManagement: true,    // 启用项目管理
            conversationManagement: true, // 启用对话管理
            tooltips: true,             // 启用提示
            animations: true            // 启用动画
        },
        
        // UI配置
        ui: {
            maxNameLength: 20,          // 最大名称长度
            tooltipDelay: 0,            // tooltip延迟
            animationDuration: 300,     // 动画持续时间
            confirmDelete: true,        // 删除前确认
            autoFocusOnEdit: true      // 编辑时自动聚焦
        },
        
        // 回调函数
        callbacks: {
            onProjectCreate: null,
            onProjectDelete: null,
            onProjectRename: null,
            onConversationCreate: null,
            onConversationDelete: null,
            onConversationRename: null,
            onConversationMove: null,
            onHighlight: null
        },
        
        // 文本配置（支持国际化）
        texts: {
            newProjectName: '新项目',
            newConversationTitle: '新对话',
            confirmProjectDelete: '确定要删除项目"{name}"吗？项目内的对话将移回未归类区域。',
            confirmConversationDelete: '确定要删除对话"{name}"吗？',
            emptyNameError: '名称不能为空',
            nameTooLongError: '名称不能超过{max}个字符',
            invalidCharsError: '名称不能包含以下字符：/ \\ : * ? " < > |',
            projectCreateSuccess: '新建项目成功',
            projectRenameSuccess: '项目重命名成功',
            conversationCreateSuccess: '新建对话成功',
            conversationRenameSuccess: '对话重命名成功',
            conversationMoveSuccess: '移动对话成功'
        }
    };

    /**
     * 工具函数模块
     */
    const Utils = {
        // 深度合并对象
        deepMerge(target, source) {
            const output = Object.assign({}, target);
            if (isObject(target) && isObject(source)) {
                Object.keys(source).forEach(key => {
                    if (isObject(source[key])) {
                        if (!(key in target))
                            Object.assign(output, { [key]: source[key] });
                        else
                            output[key] = this.deepMerge(target[key], source[key]);
                    } else {
                        Object.assign(output, { [key]: source[key] });
                    }
                });
            }
            return output;
            
            function isObject(item) {
                return item && typeof item === 'object' && !Array.isArray(item);
            }
        },
        
        // 生成唯一ID
        generateId(prefix = 'item') {
            return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        },
        
        // 防抖函数
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // 格式化文本
        formatText(template, values) {
            return template.replace(/{(\w+)}/g, (match, key) => {
                return values.hasOwnProperty(key) ? values[key] : match;
            });
        },
        
        // 验证名称
        validateName(name, maxLength) {
            const trimmedName = name.trim();
            
            if (trimmedName.length < 1) {
                return { valid: false, error: 'empty' };
            }
            
            if (trimmedName.length > maxLength) {
                return { valid: false, error: 'tooLong' };
            }
            
            const forbiddenChars = /[\/\\:*?"<>|]/;
            if (forbiddenChars.test(trimmedName)) {
                return { valid: false, error: 'invalidChars' };
            }
            
            return { valid: true };
        }
    };

    /**
     * UI反馈模块
     */
    const UIFeedback = {
        // 显示操作提示
        showTip(message, duration = 2000) {
            const existingTip = document.querySelector('.operation-tip');
            if (existingTip) {
                existingTip.remove();
            }
            
            const tip = document.createElement('div');
            tip.className = 'operation-tip';
            tip.textContent = message;
            document.body.appendChild(tip);
            
            setTimeout(() => {
                tip.classList.add('fade-out');
                setTimeout(() => tip.remove(), 300);
            }, duration);
        },
        
        // 显示tooltip
        showTooltip(element, text) {
            const existingTooltip = document.querySelector('.custom-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }

            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = text;
            document.body.appendChild(tooltip);

            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + 'px';
            tooltip.style.top = (rect.top - tooltipRect.height - 8) + 'px';

            requestAnimationFrame(() => {
                tooltip.classList.add('show');
            });
        },
        
        // 隐藏tooltip
        hideTooltip() {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 200);
            }
        },
        
        // 确认对话框
        confirm(message) {
            return window.confirm(message);
        }
    };

    /**
     * 高亮管理模块
     */
    const HighlightManager = {
        // 高亮元素
        highlight(element) {
            this.clearAll();
            element.classList.add('highlighted');
        },
        
        // 高亮AI助手
        highlightAIAssistant(menuId) {
            this.clearAll();
            const aiAssistantMenu = document.getElementById(menuId);
            if (aiAssistantMenu) {
                const menuContent = aiAssistantMenu.querySelector('.menu-item-content');
                if (menuContent) {
                    menuContent.classList.add('highlighted');
                }
            }
        },
        
        // 清除所有高亮
        clearAll() {
            const highlightedElements = document.querySelectorAll('.highlighted');
            highlightedElements.forEach(el => el.classList.remove('highlighted'));
        }
    };

    /**
     * 项目管理模块
     */
    class ProjectManager {
        constructor(sidebar) {
            this.sidebar = sidebar;
            this.config = sidebar.config;
        }
        
        // 创建新项目
        create(name = null) {
            const projectId = Utils.generateId('project');
            const projectName = name || this.config.texts.newProjectName;
            const projectsList = document.querySelector(this.config.selectors.projectsList);
            
            if (!projectsList) return null;
            
            const newProject = document.createElement('div');
            newProject.className = 'project-item';
            newProject.dataset.projectId = projectId;
            newProject.dataset.lastUsed = Date.now();
            
            newProject.innerHTML = `
                <div class="project-header-item">
                    <i class="fas fa-chevron-down text-blue-500"></i>
                    <span class="project-name">${projectName}</span>
                    <div class="project-actions">
                        <button class="project-edit-btn" title="重命名">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="project-delete-btn" title="删除项目">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="project-conversations"></div>
            `;
            
            projectsList.insertBefore(newProject, projectsList.firstChild);
            
            // 添加拖拽监听
            if (this.config.features.dragAndDrop) {
                this.sidebar.dragDropManager.addProjectListeners(newProject);
            }
            
            // 触发回调
            if (this.config.callbacks.onProjectCreate) {
                this.config.callbacks.onProjectCreate({
                    id: projectId,
                    name: projectName,
                    element: newProject
                });
            }
            
            UIFeedback.showTip(this.config.texts.projectCreateSuccess);
            
            // 自动进入编辑模式
            if (this.config.features.inlineEdit) {
                setTimeout(() => {
                    this.edit(newProject, true);
                }, 150);
            }
            
            return newProject;
        }
        
        // 编辑项目名称
        edit(projectItem, isNew = false) {
            if (!this.config.features.inlineEdit) return;
            
            const nameElement = projectItem.querySelector('.project-name');
            const currentName = nameElement.textContent;
            
            if (nameElement.querySelector('input')) return;
            
            const inlineEdit = new InlineEditor(
                nameElement,
                currentName,
                this.config.texts.newProjectName,
                this.config.ui.maxNameLength
            );
            
            inlineEdit.onConfirm = (newName) => {
                const validation = Utils.validateName(newName, this.config.ui.maxNameLength);
                
                if (!validation.valid) {
                    this.handleValidationError(validation.error);
                    return false;
                }
                
                if (newName !== currentName) {
                    nameElement.textContent = newName;
                    
                    if (this.config.callbacks.onProjectRename) {
                        this.config.callbacks.onProjectRename({
                            id: projectItem.dataset.projectId,
                            oldName: currentName,
                            newName: newName,
                            element: projectItem
                        });
                    }
                    
                    UIFeedback.showTip(this.config.texts.projectRenameSuccess);
                }
                
                return true;
            };
            
            inlineEdit.show(isNew);
        }
        
        // 删除项目
        delete(projectItem) {
            const projectName = projectItem.querySelector('.project-name').textContent;
            const confirmMessage = Utils.formatText(
                this.config.texts.confirmProjectDelete,
                { name: projectName }
            );
            
            if (!this.config.ui.confirmDelete || UIFeedback.confirm(confirmMessage)) {
                // 移动对话到未归类
                const conversations = projectItem.querySelectorAll('.conversation-item');
                const uncategorizedArea = document.querySelector(this.config.selectors.uncategorizedArea);
                
                if (uncategorizedArea) {
                    conversations.forEach(conversation => {
                        conversation.className = 'conversation-item';
                        conversation.draggable = true;
                        uncategorizedArea.appendChild(conversation);
                    });
                    
                    this.sidebar.conversationManager.updateCount();
                }
                
                // 触发回调
                if (this.config.callbacks.onProjectDelete) {
                    this.config.callbacks.onProjectDelete({
                        id: projectItem.dataset.projectId,
                        name: projectName
                    });
                }
                
                projectItem.remove();
            }
        }
        
        // 切换展开/收缩
        toggle(projectItem) {
            const conversations = projectItem.querySelector('.project-conversations');
            const toggleBtn = projectItem.querySelector('.project-header-item > i');
            
            if (conversations.style.display === 'none') {
                conversations.style.display = 'block';
                toggleBtn.className = 'fas fa-chevron-down';
            } else {
                conversations.style.display = 'none';
                toggleBtn.className = 'fas fa-chevron-right';
            }
        }
        
        // 处理验证错误
        handleValidationError(error) {
            let message = '';
            switch (error) {
                case 'empty':
                    message = this.config.texts.emptyNameError;
                    break;
                case 'tooLong':
                    message = Utils.formatText(
                        this.config.texts.nameTooLongError,
                        { max: this.config.ui.maxNameLength }
                    );
                    break;
                case 'invalidChars':
                    message = this.config.texts.invalidCharsError;
                    break;
            }
            UIFeedback.showTip(message);
        }
    }

    /**
     * 对话管理模块
     */
    class ConversationManager {
        constructor(sidebar) {
            this.sidebar = sidebar;
            this.config = sidebar.config;
        }
        
        // 创建新对话
        create() {
            // 高亮AI助手
            HighlightManager.highlightAIAssistant(this.config.selectors.aiAssistantMenu.replace('#', ''));
            
            // 触发回调
            if (this.config.callbacks.onConversationCreate) {
                this.config.callbacks.onConversationCreate({
                    timestamp: Date.now()
                });
            }
            
            UIFeedback.showTip(this.config.texts.conversationCreateSuccess);
            
            return null; // 按需求，新建对话不显示在侧边栏
        }
        
        // 编辑对话标题
        edit(conversationItem) {
            if (!this.config.features.inlineEdit) return;
            
            const titleElement = conversationItem.querySelector('.conversation-title');
            const currentTitle = titleElement.textContent;
            
            if (titleElement.querySelector('input')) return;
            
            const inlineEdit = new InlineEditor(
                titleElement,
                currentTitle,
                this.config.texts.newConversationTitle,
                this.config.ui.maxNameLength
            );
            
            inlineEdit.onConfirm = (newTitle) => {
                const validation = Utils.validateName(newTitle, this.config.ui.maxNameLength);
                
                if (!validation.valid) {
                    this.sidebar.projectManager.handleValidationError(validation.error);
                    return false;
                }
                
                if (newTitle !== currentTitle) {
                    titleElement.textContent = newTitle;
                    
                    if (this.config.callbacks.onConversationRename) {
                        this.config.callbacks.onConversationRename({
                            id: conversationItem.dataset.chatId,
                            oldTitle: currentTitle,
                            newTitle: newTitle,
                            element: conversationItem
                        });
                    }
                    
                    UIFeedback.showTip(this.config.texts.conversationRenameSuccess);
                }
                
                return true;
            };
            
            inlineEdit.show();
        }
        
        // 删除对话
        delete(conversationItem) {
            const title = conversationItem.querySelector('.conversation-title').textContent;
            const confirmMessage = Utils.formatText(
                this.config.texts.confirmConversationDelete,
                { name: title }
            );
            
            if (!this.config.ui.confirmDelete || UIFeedback.confirm(confirmMessage)) {
                // 触发回调
                if (this.config.callbacks.onConversationDelete) {
                    this.config.callbacks.onConversationDelete({
                        id: conversationItem.dataset.chatId,
                        title: title
                    });
                }
                
                conversationItem.remove();
                this.updateCount();
            }
        }
        
        // 更新未归类对话计数
        updateCount() {
            const uncategorizedConversations = document.querySelectorAll(
                `${this.config.selectors.uncategorizedArea} .conversation-item`
            );
            const countElement = document.querySelector('.conversation-count');
            if (countElement) {
                countElement.textContent = uncategorizedConversations.length;
            }
        }
        
        // 高亮对话
        highlight(conversationElement) {
            HighlightManager.highlight(conversationElement);
            
            if (this.config.callbacks.onHighlight) {
                this.config.callbacks.onHighlight({
                    id: conversationElement.dataset.chatId,
                    title: conversationElement.querySelector('.conversation-title').textContent,
                    element: conversationElement
                });
            }
            
            UIFeedback.showTip('已选中对话：' + conversationElement.querySelector('.conversation-title').textContent);
        }
    }

    /**
     * 拖拽管理模块
     */
    class DragDropManager {
        constructor(sidebar) {
            this.sidebar = sidebar;
            this.config = sidebar.config;
            this.draggedItem = null;
        }
        
        // 初始化拖拽
        init() {
            if (!this.config.features.dragAndDrop) return;
            
            // 为现有对话添加拖拽
            const conversations = document.querySelectorAll('.conversation-item[draggable="true"]');
            conversations.forEach(item => this.addConversationListeners(item));
            
            // 为现有项目添加接收拖拽
            const projects = document.querySelectorAll('.project-item');
            projects.forEach(project => this.addProjectListeners(project));
            
            // 为未归类区域添加接收拖拽
            const uncategorizedArea = document.querySelector(this.config.selectors.uncategorizedArea);
            if (uncategorizedArea) {
                this.addUncategorizedListeners(uncategorizedArea);
            }
        }
        
        // 为对话添加拖拽监听
        addConversationListeners(conversation) {
            conversation.addEventListener('dragstart', (e) => {
                this.draggedItem = conversation;
                e.dataTransfer.setData('text/plain', conversation.dataset.chatId);
                conversation.classList.add('dragging');
            });
            
            conversation.addEventListener('dragend', (e) => {
                conversation.classList.remove('dragging');
                this.draggedItem = null;
            });
        }
        
        // 为项目添加接收拖拽监听
        addProjectListeners(project) {
            project.addEventListener('dragover', (e) => {
                e.preventDefault();
                project.classList.add('drag-over');
            });
            
            project.addEventListener('dragleave', (e) => {
                if (!project.contains(e.relatedTarget)) {
                    project.classList.remove('drag-over');
                }
            });
            
            project.addEventListener('drop', (e) => {
                e.preventDefault();
                project.classList.remove('drag-over');
                
                if (this.draggedItem) {
                    this.moveToProject(this.draggedItem, project);
                }
            });
        }
        
        // 为未归类区域添加接收拖拽监听
        addUncategorizedListeners(area) {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.classList.add('drag-over');
            });
            
            area.addEventListener('dragleave', (e) => {
                if (!area.contains(e.relatedTarget)) {
                    area.classList.remove('drag-over');
                }
            });
            
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('drag-over');
                
                if (this.draggedItem) {
                    this.moveToUncategorized(this.draggedItem);
                }
            });
        }
        
        // 移动对话到项目
        moveToProject(conversation, project) {
            const projectConversations = project.querySelector('.project-conversations');
            const conversationTitle = conversation.querySelector('.conversation-title').textContent;
            const projectName = project.querySelector('.project-name').textContent;
            
            projectConversations.appendChild(conversation);
            this.sidebar.conversationManager.updateCount();
            
            if (this.config.callbacks.onConversationMove) {
                this.config.callbacks.onConversationMove({
                    conversationId: conversation.dataset.chatId,
                    conversationTitle: conversationTitle,
                    targetType: 'project',
                    targetId: project.dataset.projectId,
                    targetName: projectName
                });
            }
            
            UIFeedback.showTip(this.config.texts.conversationMoveSuccess);
        }
        
        // 移动对话到未归类
        moveToUncategorized(conversation) {
            const uncategorizedArea = document.querySelector(this.config.selectors.uncategorizedArea);
            const conversationTitle = conversation.querySelector('.conversation-title').textContent;
            
            uncategorizedArea.appendChild(conversation);
            this.sidebar.conversationManager.updateCount();
            
            if (this.config.callbacks.onConversationMove) {
                this.config.callbacks.onConversationMove({
                    conversationId: conversation.dataset.chatId,
                    conversationTitle: conversationTitle,
                    targetType: 'uncategorized',
                    targetId: null,
                    targetName: '未归类'
                });
            }
            
            UIFeedback.showTip(this.config.texts.conversationMoveSuccess);
        }
    }

    /**
     * 内联编辑器类
     */
    class InlineEditor {
        constructor(element, currentValue, placeholder, maxLength) {
            this.element = element;
            this.currentValue = currentValue;
            this.placeholder = placeholder;
            this.maxLength = maxLength;
            this.onConfirm = null;
            this.onCancel = null;
        }
        
        show(autoSelect = true) {
            this.element.innerHTML = `
                <div class="inline-edit-container">
                    <input type="text" 
                           class="inline-edit-input" 
                           value="${this.currentValue}" 
                           placeholder="${this.placeholder}" 
                           maxlength="${this.maxLength}">
                    <div class="inline-edit-actions">
                        <button class="inline-edit-confirm" title="确认">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="inline-edit-cancel" title="取消">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
            
            const input = this.element.querySelector('.inline-edit-input');
            const confirmBtn = this.element.querySelector('.inline-edit-confirm');
            const cancelBtn = this.element.querySelector('.inline-edit-cancel');
            
            // 聚焦
            setTimeout(() => {
                input.focus();
                if (autoSelect) {
                    input.select();
                }
            }, 50);
            
            // 事件处理
            const confirm = (e) => {
                if (e) e.stopPropagation();
                const newValue = input.value.trim();
                
                if (this.onConfirm && this.onConfirm(newValue) !== false) {
                    this.element.textContent = newValue || this.currentValue;
                } else if (!newValue) {
                    this.element.textContent = this.currentValue;
                }
            };
            
            const cancel = (e) => {
                if (e) e.stopPropagation();
                this.element.textContent = this.currentValue;
                if (this.onCancel) this.onCancel();
            };
            
            // 绑定事件
            confirmBtn.addEventListener('click', confirm);
            cancelBtn.addEventListener('click', cancel);
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    confirm();
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    cancel();
                }
            });
            
            // Blur处理
            let blurTimeout;
            input.addEventListener('blur', () => {
                blurTimeout = setTimeout(() => {
                    if (!document.activeElement || 
                        (!document.activeElement.closest('.inline-edit-confirm') && 
                         !document.activeElement.closest('.inline-edit-cancel'))) {
                        confirm();
                    }
                }, 200);
            });
            
            confirmBtn.addEventListener('mousedown', () => clearTimeout(blurTimeout));
            cancelBtn.addEventListener('mousedown', () => clearTimeout(blurTimeout));
        }
    }

    /**
     * 主侧边栏类
     */
    class AISidebar {
        constructor(config = {}) {
            // 合并配置
            this.config = Utils.deepMerge(defaultConfig, config);
            
            // 初始化模块
            this.projectManager = new ProjectManager(this);
            this.conversationManager = new ConversationManager(this);
            this.dragDropManager = new DragDropManager(this);
            
            // 绑定到实例
            this.utils = Utils;
            this.uiFeedback = UIFeedback;
            this.highlightManager = HighlightManager;
        }
        
        /**
         * 初始化侧边栏
         */
        init() {
            // 绑定事件
            this.bindEvents();
            
            // 初始化拖拽
            this.dragDropManager.init();
            
            // 初始化tooltip
            if (this.config.features.tooltips) {
                this.initTooltips();
            }
            
            return this;
        }
        
        /**
         * 绑定事件
         */
        bindEvents() {
            // 新建项目按钮
            const newProjectIcon = document.querySelector(this.config.selectors.newProjectIcon);
            if (newProjectIcon) {
                newProjectIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.projectManager.create();
                });
            }
            
            // 新建对话按钮
            const newConversationIcon = document.querySelector(this.config.selectors.newConversationIcon);
            if (newConversationIcon) {
                newConversationIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.conversationManager.create();
                });
            }
            
            // AI助手菜单点击
            const aiAssistantMenu = document.querySelector(this.config.selectors.aiAssistantMenu);
            if (aiAssistantMenu) {
                const menuContent = aiAssistantMenu.querySelector('.menu-item-content');
                if (menuContent) {
                    menuContent.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (!e.target.closest('.ai-assistant-icons')) {
                            this.conversationManager.create();
                        }
                    });
                }
            }
            
            // 项目操作事件委托
            const projectsList = document.querySelector(this.config.selectors.projectsList);
            if (projectsList) {
                projectsList.addEventListener('click', (e) => {
                    const target = e.target;
                    const projectItem = target.closest('.project-item');
                    
                    if (!projectItem) return;
                    
                    if (target.closest('.project-header-item') && !target.closest('.project-actions')) {
                        this.projectManager.toggle(projectItem);
                    } else if (target.closest('.project-edit-btn')) {
                        e.stopPropagation();
                        this.projectManager.edit(projectItem);
                    } else if (target.closest('.project-delete-btn')) {
                        e.stopPropagation();
                        this.projectManager.delete(projectItem);
                    } else if (target.closest('.conversation-item')) {
                        const conversationItem = target.closest('.conversation-item');
                        
                        if (target.closest('.conversation-edit-btn')) {
                            e.stopPropagation();
                            this.conversationManager.edit(conversationItem);
                        } else if (target.closest('.conversation-delete-btn')) {
                            e.stopPropagation();
                            this.conversationManager.delete(conversationItem);
                        } else if (!target.closest('.conversation-actions')) {
                            this.conversationManager.highlight(conversationItem);
                        }
                    }
                });
            }
            
            // 未归类对话事件委托
            const uncategorizedArea = document.querySelector(this.config.selectors.uncategorizedArea);
            if (uncategorizedArea) {
                uncategorizedArea.addEventListener('click', (e) => {
                    const target = e.target;
                    const conversationItem = target.closest('.conversation-item');
                    
                    if (!conversationItem) return;
                    
                    if (target.closest('.conversation-edit-btn')) {
                        e.stopPropagation();
                        this.conversationManager.edit(conversationItem);
                    } else if (target.closest('.conversation-delete-btn')) {
                        e.stopPropagation();
                        this.conversationManager.delete(conversationItem);
                    } else if (!target.closest('.conversation-actions')) {
                        this.conversationManager.highlight(conversationItem);
                    }
                });
            }
            
            // 防止编辑输入框点击事件冒泡
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('inline-edit-input')) {
                    e.stopPropagation();
                }
            });
        }
        
        /**
         * 初始化tooltips
         */
        initTooltips() {
            const newProjectIcon = document.querySelector(this.config.selectors.newProjectIcon);
            const newConversationIcon = document.querySelector(this.config.selectors.newConversationIcon);
            
            if (newProjectIcon) {
                newProjectIcon.addEventListener('mouseenter', () => {
                    UIFeedback.showTooltip(newProjectIcon, '新建项目');
                });
                
                newProjectIcon.addEventListener('mouseleave', () => {
                    UIFeedback.hideTooltip();
                });
            }
            
            if (newConversationIcon) {
                newConversationIcon.addEventListener('mouseenter', () => {
                    UIFeedback.showTooltip(newConversationIcon, '新建对话');
                });
                
                newConversationIcon.addEventListener('mouseleave', () => {
                    UIFeedback.hideTooltip();
                });
            }
        }
        
        /**
         * 销毁实例
         */
        destroy() {
            // 移除所有事件监听器
            // 清理DOM元素
            // 这里可以根据需要添加清理逻辑
        }
        
        /**
         * 获取版本信息
         */
        static get version() {
            return '1.0.0';
        }
    }
    
    return AISidebar;
}));