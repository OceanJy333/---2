// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 调试信息，检查关键元素是否存在
    console.log('文档加载完成');
    console.log('侧边栏用户信息元素存在：', !!document.querySelector('#sidebar-profile-clickable'));
    console.log('侧边栏下拉菜单元素存在：', !!document.querySelector('#sidebar-dropdown-menu'));

    // 初始化添加产品卡片点击事件
    function initAddProductCard() {
        const addProductCards = document.querySelectorAll('.add-product-card');
        addProductCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // 阻止事件冒泡，避免触发文档点击事件
                e.stopPropagation();

                console.log('添加产品卡片被点击 - 初始化函数');

                // 直接导航到新建商品分析页面
                // 隐藏当前内容区域
                const contentArea = document.querySelector('.content-area');
                if (contentArea) contentArea.style.display = 'none';

                // 隐藏其他容器
                const outreachContainer = document.querySelector('.outreach-container');
                const influencerContainer = document.querySelector('.influencer-container');
                const dashboardContainer = document.querySelector('.dashboard-container');
                const analyticsContainer = document.querySelector('.analytics-container');

                if (outreachContainer) outreachContainer.style.display = 'none';
                if (influencerContainer) influencerContainer.style.display = 'none';
                if (dashboardContainer) dashboardContainer.style.display = 'none';
                if (analyticsContainer) analyticsContainer.style.display = 'none';

                // 显示AI助手容器
                const aiAssistantContainer = document.querySelector('.ai-assistant-container');
                if (aiAssistantContainer) {
                    aiAssistantContainer.style.display = 'flex';

                    // 显示新建商品分析界面，隐藏聊天界面
                    const newProductContainer = document.querySelector('.new-product-container');
                    const chatContainer = document.querySelector('.chat-container');
                    if (newProductContainer) {
                        newProductContainer.style.display = 'flex';
                        console.log('显示新建商品分析界面 - 初始化函数中的添加产品卡片');
                    }
                    if (chatContainer) chatContainer.style.display = 'none';

                    // 更新页面标题
                    document.querySelector('.product-title').textContent = 'AI助手';

                    // 更新侧边栏菜单激活状态
                    const menuItems = document.querySelectorAll('.menu-item');
                    menuItems.forEach(item => item.classList.remove('active'));

                    // 激活AI助手菜单
                    const aiAssistantMenu = document.getElementById('ai-assistant-menu');
                    if (aiAssistantMenu) {
                        aiAssistantMenu.classList.add('active');
                        aiAssistantMenu.classList.add('expanded');

                        // 激活新建商品分析子菜单项
                        const submenuItems = document.querySelectorAll('.submenu-item');
                        submenuItems.forEach(item => item.classList.remove('active'));

                        const newProductMenuItem = document.querySelector('.submenu-item.new-product');
                        if (newProductMenuItem) {
                            newProductMenuItem.classList.add('active');
                        }
                    }
                }
            });
        });
    }

    // 初始化添加产品卡片
    initAddProductCard();

    // 调试滚动问题
    function debugScrolling() {
        const chatContainer = document.querySelector('.chat-container');
        const aiContainer = document.querySelector('.ai-assistant-container');

        if (chatContainer && aiContainer) {
            console.log('=== 滚动调试信息 ===');
            console.log('浏览器:', navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other');
            console.log('聊天容器高度:', chatContainer.offsetHeight);
            console.log('聊天容器滚动高度:', chatContainer.scrollHeight);
            console.log('聊天容器overflow-y:', getComputedStyle(chatContainer).overflowY);
            console.log('AI容器高度:', aiContainer.offsetHeight);
            console.log('AI容器overflow:', getComputedStyle(aiContainer).overflow);
            console.log('===================');
        }
    }

    // 页面加载完成后调试
    setTimeout(debugScrolling, 1000);
    // 验证手机号格式
    function validatePhoneNumber(phone) {
        // 简单的中国大陆手机号验证规则
        const phoneRegex = /^(\+?86)?1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    }
    // 侧边栏菜单项点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    const aiAssistantMenu = document.getElementById('ai-assistant-menu');
    const aiAssistantSubmenu = document.getElementById('ai-assistant-submenu');

    // 初始化AI助手子菜单展开状态
    aiAssistantMenu.classList.add('expanded');

    // 处理主菜单项点击
    menuItems.forEach(item => {
        // 为菜单项内容添加点击事件
        const menuItemContent = item.querySelector('.menu-item-content');
        if (menuItemContent) {
            menuItemContent.addEventListener('click', function(e) {
                // 如果是有子菜单的项目，切换展开/收起状态
                if (item.classList.contains('has-submenu')) {
                    e.stopPropagation(); // 阻止事件冒泡
                    item.classList.toggle('expanded');
                    return;
                }

                // 移除所有菜单项的激活状态
                menuItems.forEach(i => i.classList.remove('active'));
                // 添加当前点击项的激活状态
                item.classList.add('active');

                // 切换页面
                const menuText = this.querySelector('span').textContent;
                document.querySelector('.product-title').textContent = menuText;

                // 根据菜单项显示/隐藏相应内容
                const aiAssistantContainer = document.querySelector('.ai-assistant-container');
                const contentArea = document.querySelector('.content-area');
                const outreachContainer = document.querySelector('.outreach-container');
                const influencerContainer = document.querySelector('.influencer-container');
                const dashboardContainer = document.querySelector('.dashboard-container');
                const analyticsContainer = document.querySelector('.analytics-container');

                // 先隐藏所有内容
                aiAssistantContainer.style.display = 'none';
                contentArea.style.display = 'none';
                if (outreachContainer) outreachContainer.style.display = 'none';
                if (influencerContainer) influencerContainer.style.display = 'none';
                if (dashboardContainer) dashboardContainer.style.display = 'none';
                if (analyticsContainer) analyticsContainer.style.display = 'none';

                // 显示选中的内容
                if (menuText === '产品库') {
                    contentArea.style.display = 'block';
                    // 调试信息
                    console.log('显示产品库，容器高度:', contentArea.offsetHeight, '滚动高度:', contentArea.scrollHeight);
                } else if (menuText === '建联记录') {
                    outreachContainer.style.display = 'flex';
                    // 调试信息
                    console.log('显示建联记录，容器高度:', outreachContainer.offsetHeight, '滚动高度:', outreachContainer.scrollHeight);
                } else if (menuText === 'YouTube博主') {
                    influencerContainer.style.display = 'flex';
                } else if (menuText === '仪表盘') {
                    dashboardContainer.style.display = 'flex';
                } else if (menuText === '数据分析') {
                    analyticsContainer.style.display = 'flex';
                }
            });
        }
    });

    // 处理子菜单项点击
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡

            // 如果是"新建商品分析"按钮
            if (item.classList.contains('new-chat')) {
                // 获取AI助手容器和其他容器
                const aiAssistantContainer = document.querySelector('.ai-assistant-container');
                const chatContainer = document.querySelector('.chat-container');
                const newProductContainer = document.querySelector('.new-product-container');
                const contentArea = document.querySelector('.content-area');
                const outreachContainer = document.querySelector('.outreach-container');
                const influencerContainer = document.querySelector('.influencer-container');
                const dashboardContainer = document.querySelector('.dashboard-container');
                const analyticsContainer = document.querySelector('.analytics-container');

                // 确保父菜单项处于激活状态
                menuItems.forEach(i => i.classList.remove('active'));
                aiAssistantMenu.classList.add('active');

                // 更新页面标题和AI助手顶部信息
                document.querySelector('.product-title').textContent = 'AI助手';
                // 已移除顶部产品信息显示

                // 先隐藏所有内容
                contentArea.style.display = 'none';
                if (outreachContainer) outreachContainer.style.display = 'none';
                if (influencerContainer) influencerContainer.style.display = 'none';
                if (dashboardContainer) dashboardContainer.style.display = 'none';
                if (analyticsContainer) analyticsContainer.style.display = 'none';

                // 显示AI助手容器，隐藏聊天区域，显示新建商品分析界面
                aiAssistantContainer.style.display = 'flex';
                if (chatContainer) chatContainer.style.display = 'none';
                if (newProductContainer) {
                    newProductContainer.style.display = 'flex';
                    console.log('显示新建商品分析界面');
                }

                return;
            }

            // 移除所有子菜单项的激活状态
            submenuItems.forEach(i => i.classList.remove('active'));
            // 添加当前点击项的激活状态
            item.classList.add('active');

            // 确保父菜单项处于激活状态
            menuItems.forEach(i => i.classList.remove('active'));
            aiAssistantMenu.classList.add('active');

            // 获取商品名称
            const productName = item.querySelector('span').textContent;

            // 更新页面标题
            document.querySelector('.product-title').textContent = 'AI助手';
            // 已移除当前产品显示

            // 显示AI助手容器
            const aiAssistantContainer = document.querySelector('.ai-assistant-container');
            const contentArea = document.querySelector('.content-area');
            const outreachContainer = document.querySelector('.outreach-container');
            const influencerContainer = document.querySelector('.influencer-container');
            const dashboardContainer = document.querySelector('.dashboard-container');
            const analyticsContainer = document.querySelector('.analytics-container');

            // 先隐藏所有内容
            contentArea.style.display = 'none';
            if (outreachContainer) outreachContainer.style.display = 'none';
            if (influencerContainer) influencerContainer.style.display = 'none';
            if (dashboardContainer) dashboardContainer.style.display = 'none';
            if (analyticsContainer) analyticsContainer.style.display = 'none';

            // 显示AI助手容器，显示聊天界面，隐藏新建商品分析界面
            aiAssistantContainer.style.display = 'flex';
            const chatContainer = document.querySelector('.chat-container');
            const newProductContainer = document.querySelector('.new-product-container');
            if (chatContainer) chatContainer.style.display = 'block';
            if (newProductContainer) newProductContainer.style.display = 'none';
        });
    });

    // 建联记录相关交互
    if (document.querySelector('.outreach-container')) {
        // 状态标签切换
        const statusTabs = document.querySelectorAll('.status-tab');
        statusTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                statusTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 在实际应用中，这里可以根据状态筛选建联项
                const status = this.textContent;
                console.log('筛选状态:', status);

                // 应用筛选
                applyFilters();
            });
        });

        // 商品筛选下拉菜单
        const productFilterItems = document.querySelectorAll('.dropdown-item[data-product]');
        productFilterItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有项的激活状态
                productFilterItems.forEach(i => i.classList.remove('active'));
                // 添加当前项的激活状态
                this.classList.add('active');

                // 更新按钮文本
                const productFilterBtn = document.querySelector('.filter-dropdown-btn:first-child');
                productFilterBtn.innerHTML = `<i class="ri-filter-3-line"></i> ${this.textContent} <i class="ri-arrow-down-s-line"></i>`;

                // 应用筛选
                applyFilters();

                // 关闭下拉菜单
                this.closest('.dropdown-menu').classList.remove('show');
            });
        });

        // 合作类型筛选下拉菜单
        const intentFilterItems = document.querySelectorAll('.dropdown-item[data-intent]');
        intentFilterItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有项的激活状态
                intentFilterItems.forEach(i => i.classList.remove('active'));
                // 添加当前项的激活状态
                this.classList.add('active');

                // 更新按钮文本
                const intentFilterBtn = document.querySelector('.filter-dropdown-btn:nth-child(1)');
                intentFilterBtn.innerHTML = `<i class="ri-price-tag-3-line"></i> ${this.textContent} <i class="ri-arrow-down-s-line"></i>`;

                // 应用筛选
                applyFilters();

                // 关闭下拉菜单
                this.closest('.dropdown-menu').classList.remove('show');
            });
        });

        // 筛选下拉菜单按钮点击
        const filterDropdownBtns = document.querySelectorAll('.filter-dropdown-btn');
        filterDropdownBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡

                // 关闭其他下拉菜单
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== this.nextElementSibling) {
                        menu.classList.remove('show');
                    }
                });

                // 切换当前下拉菜单
                this.nextElementSibling.classList.toggle('show');
            });
        });

        // 点击页面其他地方关闭下拉菜单
        document.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        });

        // 批量操作模式切换
        const batchModeBtn = document.querySelector('.batch-mode-btn');
        const batchToolbar = document.querySelector('.batch-toolbar');
        const outreachList = document.querySelector('.outreach-list');
        const cancelBatchBtn = document.querySelector('.cancel-batch');

        if (batchModeBtn) {
            batchModeBtn.addEventListener('click', function() {
                // 显示批量操作工具栏
                batchToolbar.style.display = 'flex';
                // 切换列表到批量模式
                outreachList.classList.remove('batch-mode-off');
                outreachList.classList.add('batch-mode');
            });
        }

        if (cancelBatchBtn) {
            cancelBatchBtn.addEventListener('click', function() {
                // 隐藏批量操作工具栏
                batchToolbar.style.display = 'none';
                // 切换列表回普通模式
                outreachList.classList.remove('batch-mode');
                outreachList.classList.add('batch-mode-off');
                // 取消所有选中状态
                document.querySelectorAll('.outreach-checkbox').forEach(checkbox => {
                    checkbox.checked = false;
                });
                // 重置选中计数
                document.querySelector('.selected-count').textContent = '已选择 0 项';
            });
        }

        // 复选框点击事件
        const outreachCheckboxes = document.querySelectorAll('.outreach-checkbox');
        outreachCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // 更新选中计数
                const checkedCount = document.querySelectorAll('.outreach-checkbox:checked').length;
                document.querySelector('.selected-count').textContent = `已选择 ${checkedCount} 项`;
            });
        });

        // 批量操作按钮点击事件
        const batchActionBtns = document.querySelectorAll('.batch-action-btn:not(.cancel-batch)');
        batchActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const checkedItems = document.querySelectorAll('.outreach-checkbox:checked');

                if (checkedItems.length === 0) {
                    alert('请至少选择一项');
                    return;
                }

                // 获取选中的建联项
                const selectedItems = [];
                checkedItems.forEach(checkbox => {
                    const item = checkbox.closest('.outreach-item');
                    const creatorName = item.querySelector('.creator-name').textContent;
                    selectedItems.push(creatorName);
                });

                // 根据操作类型执行不同的操作
                if (action === 'email') {
                    alert(`准备向 ${selectedItems.join(', ')} 发送批量邮件`);
                } else if (action === 'status') {
                    alert(`准备批量更新 ${selectedItems.join(', ')} 的状态`);
                }
            });
        });

        // 应用所有筛选条件的函数
        function applyFilters() {
            const outreachItems = document.querySelectorAll('.outreach-item');
            const activeStatus = document.querySelector('.status-tab.active').textContent;
            const activeProduct = document.querySelector('.dropdown-item[data-product].active').getAttribute('data-product');
            const activeIntent = document.querySelector('.dropdown-item[data-intent].active').getAttribute('data-intent');

            outreachItems.forEach(item => {
                // 获取项目的状态、商品和合作类型
                const itemStatus = item.querySelector('.status-tag').textContent;
                const itemProduct = item.getAttribute('data-product');
                const itemIntent = item.getAttribute('data-intent');

                // 检查是否符合所有筛选条件
                const statusMatch = activeStatus === '全部' || itemStatus === activeStatus;
                const productMatch = activeProduct === 'all' || itemProduct === activeProduct;
                const intentMatch = activeIntent === 'all' || itemIntent === activeIntent;

                // 显示或隐藏项目
                if (statusMatch && productMatch && intentMatch) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // 建联项点击展示详情
        const outreachItems = document.querySelectorAll('.outreach-item');
        outreachItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 避免点击按钮时触发
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }

                // 获取博主信息
                const creatorName = this.querySelector('.creator-name').textContent;

                // 获取当前状态
                const statusTag = this.querySelector('.status-tag');
                const currentStatus = statusTag.textContent;
                const statusClass = statusTag.classList[1]; // 获取状态类名，如 status-in-progress

                // 移除所有项目的激活状态
                outreachItems.forEach(i => i.classList.remove('active'));

                // 添加当前项目的激活状态
                this.classList.add('active');

                // 显示详情侧边栏
                const outreachDetail = document.querySelector('.outreach-detail');
                outreachDetail.style.display = 'flex';

                // 更新侧边栏标题
                document.querySelector('.detail-creator-name').textContent = creatorName;

                // 更新详情页状态
                const detailStatusTag = document.querySelector('.detail-status .status-tag');
                if (detailStatusTag) {
                    // 移除所有状态类
                    detailStatusTag.classList.remove('status-in-progress', 'status-confirmed', 'status-promoting', 'status-completed');

                    // 添加当前状态类
                    detailStatusTag.classList.add(statusClass);

                    // 更新状态文本
                    detailStatusTag.textContent = currentStatus;
                }

                // 在实际应用中，这里应该加载该博主的详细数据
                console.log('加载博主详情:', creatorName, '状态:', currentStatus);
            });
        });

        // 关闭详情侧边栏
        const closeDetailBtn = document.querySelector('.close-detail');
        if (closeDetailBtn) {
            closeDetailBtn.addEventListener('click', function() {
                document.querySelector('.outreach-detail').style.display = 'none';
            });
        }

        // 状态切换功能
        const statusOptions = document.querySelectorAll('.status-option');
        const statusChangeBtn = document.querySelector('.status-change-btn');

        if (statusOptions.length > 0) {
            statusOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡

                    // 获取选中的状态
                    const status = this.getAttribute('data-status');
                    const statusText = this.textContent;

                    // 获取当前激活的建联项
                    const activeOutreachItem = document.querySelector('.outreach-item.active');

                    // 获取详情页状态标签
                    const detailStatusTag = document.querySelector('.detail-status .status-tag');

                    // 更新详情页状态
                    if (detailStatusTag) {
                        // 移除所有状态类
                        detailStatusTag.classList.remove('status-in-progress', 'status-confirmed', 'status-promoting', 'status-completed');

                        // 添加新状态类
                        detailStatusTag.classList.add('status-' + status);

                        // 更新状态文本
                        detailStatusTag.textContent = statusText;

                        // 更新下一步建议
                        updateNextStepSuggestion(status);
                    }

                    // 更新建联列表中的状态
                    if (activeOutreachItem) {
                        // 获取建联列表中的状态标签
                        const listStatusTag = activeOutreachItem.querySelector('.status-tag');

                        if (listStatusTag) {
                            // 移除所有状态类
                            listStatusTag.classList.remove('status-in-progress', 'status-confirmed', 'status-promoting', 'status-completed');

                            // 添加新状态类
                            listStatusTag.classList.add('status-' + status);

                            // 更新状态文本
                            listStatusTag.textContent = statusText;
                        }

                        // 更新建联项的类
                        activeOutreachItem.classList.remove('in-progress', 'confirmed', 'promoting', 'completed');
                        activeOutreachItem.classList.add(status);
                    }

                    // 隐藏下拉菜单
                    document.querySelector('.status-dropdown').style.display = 'none';

                    console.log('状态已更新为:', statusText);
                });
            });

            // 点击状态切换按钮显示/隐藏下拉菜单
            if (statusChangeBtn) {
                statusChangeBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡
                    const dropdown = document.querySelector('.status-dropdown');
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                });

                // 点击其他地方关闭下拉菜单
                document.addEventListener('click', function() {
                    const dropdown = document.querySelector('.status-dropdown');
                    if (dropdown) {
                        dropdown.style.display = 'none';
                    }
                });
            }
        }

        // 下一步建议按钮点击事件
        const nextStepBtn = document.querySelector('.next-step-btn');
        if (nextStepBtn) {
            nextStepBtn.addEventListener('click', function() {
                const action = this.textContent.trim();

                if (action.includes('发送跟进邮件')) {
                    // 显示邮件编辑界面
                    alert('准备发送跟进邮件...');
                    // 这里可以添加打开邮件编辑器的代码
                } else if (action.includes('确认合作')) {
                    // 更新状态为已确认
                    const statusTag = document.querySelector('.detail-status .status-tag');
                    statusTag.classList.remove('status-in-progress', 'status-confirmed', 'status-promoting', 'status-completed');
                    statusTag.classList.add('status-confirmed');
                    statusTag.textContent = '已确认';

                    // 更新下一步建议
                    updateNextStepSuggestion('confirmed');
                } else if (action.includes('开始推广')) {
                    // 更新状态为推广中
                    const statusTag = document.querySelector('.detail-status .status-tag');
                    statusTag.classList.remove('status-in-progress', 'status-confirmed', 'status-promoting', 'status-completed');
                    statusTag.classList.add('status-promoting');
                    statusTag.textContent = '推广中';

                    // 更新下一步建议
                    updateNextStepSuggestion('promoting');
                }
            });
        }

        // 根据状态更新下一步建议
        function updateNextStepSuggestion(status) {
            const suggestionHeader = document.querySelector('.suggestion-header');
            const suggestionContent = document.querySelector('.suggestion-content');
            const nextStepBtn = document.querySelector('.next-step-btn');

            if (!suggestionHeader || !suggestionContent || !nextStepBtn) return;

            switch(status) {
                case 'in-progress':
                    suggestionHeader.innerHTML = '<i class="ri-lightbulb-flash-line"></i> 下一步建议';
                    suggestionContent.textContent = '达人已读未回，建议在3天后发送跟进邮件';
                    nextStepBtn.innerHTML = '<i class="ri-mail-send-line"></i> 发送跟进邮件';
                    break;
                case 'confirmed':
                    suggestionHeader.innerHTML = '<i class="ri-lightbulb-flash-line"></i> 下一步建议';
                    suggestionContent.textContent = '合作已确认，可以开始安排推广计划';
                    nextStepBtn.innerHTML = '<i class="ri-broadcast-line"></i> 开始推广';
                    break;
                case 'promoting':
                    suggestionHeader.innerHTML = '<i class="ri-lightbulb-flash-line"></i> 效果追踪';
                    suggestionContent.textContent = '推广进行中，预计3天后可查看效果数据';
                    nextStepBtn.innerHTML = '<i class="ri-line-chart-line"></i> 查看报告';
                    break;
                default:
                    suggestionHeader.innerHTML = '<i class="ri-lightbulb-flash-line"></i> 建议操作';
                    suggestionContent.textContent = '根据当前状态，建议进行下一步操作';
                    nextStepBtn.innerHTML = '<i class="ri-refresh-line"></i> 刷新状态';
            }
        }

        // 详情页标签切换
        const detailTabs = document.querySelectorAll('.detail-tab');
        detailTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                detailTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 获取标签文本内容
                const tabText = this.textContent.trim();
                console.log('切换到标签:', tabText);

                // 获取所有内容区域
                const tabContents = document.querySelectorAll('.tab-content');

                // 隐藏所有内容区域
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });

                // 根据标签显示对应内容
                if (tabText.includes('沟通记录')) {
                    document.querySelector('.tab-content.communication-content').style.display = 'block';
                } else if (tabText.includes('近期内容')) {
                    document.querySelector('.tab-content.recent-content').style.display = 'block';
                }
            });
        });

        // 查看详情按钮点击
        const detailBtns = document.querySelectorAll('.detail-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止冒泡，避免触发建联项点击
                const outreachItem = this.closest('.outreach-item');
                const creatorName = outreachItem.querySelector('.creator-name').textContent;

                // 触发建联项的点击事件来打开详情侧边栏
                outreachItem.click();
            });
        });

        // 保存记录按钮点击
        const saveRecordBtn = document.querySelector('.save-record-btn');
        if (saveRecordBtn) {
            saveRecordBtn.addEventListener('click', function() {
                const recordInput = document.querySelector('.record-input');
                const recordText = recordInput.value.trim();

                if (recordText) {
                    alert('记录已保存: ' + recordText);
                    recordInput.value = '';

                    // 在实际应用中，这里应该将记录添加到时间线
                    const now = new Date();
                    const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;

                    const newRecord = `
                        <div class="timeline-item">
                            <div class="timeline-date">${dateStr}</div>
                            <div class="timeline-content">
                                <div class="timeline-title">新增备注</div>
                                <div class="timeline-body">
                                    <p>${recordText}</p>
                                </div>
                            </div>
                        </div>
                    `;

                    const timeline = document.querySelector('.communication-timeline');
                    timeline.insertAdjacentHTML('afterbegin', newRecord);
                }
            });
        }

        // 记录类型按钮点击
        const recordTypeBtns = document.querySelectorAll('.record-type-btn');
        recordTypeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 获取按钮类型
                const type = this.textContent.trim();
                const recordInput = document.querySelector('.record-input');

                // 根据类型添加模板文本
                switch (type) {
                    case '邮件':
                        recordInput.value = '邮件主题：\n邮件内容：\n主要讨论点：';
                        break;
                    case '通话':
                        recordInput.value = '通话时间：\n通话时长：\n主要讨论点：\n需要跟进事项：';
                        break;
                    case '聊天':
                        recordInput.value = '聊天平台：\n主要讨论点：\n达成共识：';
                        break;
                    case '备注':
                        recordInput.value = '备注内容：\n提醒事项：';
                        break;
                }

                recordInput.focus();
            });
        });
    }

    // JSON 折叠/展开功能
    document.addEventListener('click', function(e) {
        if (e.target.closest('.json-toggle')) {
            const toggle = e.target.closest('.json-toggle');
            const jsonContent = toggle.nextElementSibling;

            if (jsonContent.style.display === 'none') {
                jsonContent.style.display = 'block';
                toggle.classList.add('active');
                toggle.querySelector('.ri-arrow-down-s-line').style.transform = 'rotate(180deg)';
            } else {
                jsonContent.style.display = 'none';
                toggle.classList.remove('active');
                toggle.querySelector('.ri-arrow-down-s-line').style.transform = 'rotate(0deg)';
            }
        }
    });

    // 产品卡片点击事件
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是"开始AI协作"按钮或菜单按钮，不触发卡片选中
            if (e.target.closest('.chat-btn') || e.target.closest('.product-menu-btn') || e.target.closest('.product-menu')) {
                return;
            }

            // 移除所有卡片的选中状态
            productCards.forEach(c => c.classList.remove('selected-product'));
            // 添加当前卡片的选中状态
            this.classList.add('selected-product');
        });
    });

    // 产品菜单按钮点击事件
    const productMenuBtns = document.querySelectorAll('.product-menu-btn');
    productMenuBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡

            // 获取产品ID
            const productId = this.getAttribute('data-product-id');
            const productMenu = document.getElementById(`product-menu-${productId}`);

            // 关闭所有其他菜单
            document.querySelectorAll('.product-menu').forEach(menu => {
                if (menu.id !== `product-menu-${productId}`) {
                    menu.classList.remove('show');
                }
            });

            // 切换当前菜单的显示状态
            productMenu.classList.toggle('show');
        });
    });

    // 编辑商品按钮点击事件
    const editProductBtns = document.querySelectorAll('.product-menu-item.edit');
    editProductBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡

            // 获取产品ID
            const productId = this.getAttribute('data-product-id');

            // 获取产品信息
            const productCard = document.querySelector(`.product-card:nth-child(${productId})`);
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.price-tag').textContent.replace('$', '');
            const productCategory = productCard.querySelector('.category-tag:not(.price-tag)').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            const productImage = productCard.querySelector('.product-img img').src;

            // 获取产品标签
            const productTags = [];
            productCard.querySelectorAll('.product-tag').forEach(tag => {
                productTags.push(tag.textContent.replace(/^\s*\S+\s+/, '')); // 移除图标文本
            });

            // 获取统计数据
            const connectionsValue = productCard.querySelector('.stat-item:nth-child(1) .stat-value').textContent;
            const communicationsValue = productCard.querySelector('.stat-item:nth-child(2) .stat-value').textContent;
            const collaborationsValue = productCard.querySelector('.stat-item:nth-child(3) .stat-value').textContent;

            // 填充编辑表单
            document.getElementById('edit-product-id').value = productId;
            document.getElementById('edit-product-name').value = productName;
            document.getElementById('edit-product-price').value = productPrice;
            document.getElementById('edit-product-category').value = productCategory;
            document.getElementById('edit-product-description').value = productDescription;
            document.getElementById('product-image-preview').src = productImage;
            document.getElementById('edit-connections').value = connectionsValue;
            document.getElementById('edit-communications').value = communicationsValue;
            document.getElementById('edit-collaborations').value = collaborationsValue;

            // 清空并重新填充标签容器
            const tagsContainer = document.getElementById('product-tags-container');
            tagsContainer.innerHTML = '';

            productTags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag-item';
                tagElement.innerHTML = `${tag} <i class="ri-close-line" onclick="this.parentElement.remove()"></i>`;
                tagsContainer.appendChild(tagElement);
            });

            // 显示编辑弹窗
            const editProductModal = document.getElementById('edit-product-modal');
            editProductModal.style.display = 'flex';

            // 关闭产品菜单
            document.querySelectorAll('.product-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        });
    });

    // 删除商品按钮点击事件
    const deleteProductBtns = document.querySelectorAll('.product-menu-item.delete');
    deleteProductBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡

            // 获取产品ID
            const productId = this.getAttribute('data-product-id');

            // 获取产品名称
            const productCard = document.querySelector(`.product-card:nth-child(${productId})`);
            const productName = productCard.querySelector('.product-name').textContent;

            // 确认删除
            if (confirm(`确定要删除商品 "${productName}" 吗？`)) {
                // 这里可以添加实际的删除逻辑
                productCard.remove();
            }

            // 关闭产品菜单
            document.querySelectorAll('.product-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        });
    });

    // 编辑弹窗关闭按钮点击事件 - 使用ID选择器确保精确定位
    const editModalCloseBtn = document.getElementById('edit-modal-close-btn');
    if (editModalCloseBtn) {
        // 移除所有现有事件监听器
        const newCloseBtn = editModalCloseBtn.cloneNode(true);
        editModalCloseBtn.parentNode.replaceChild(newCloseBtn, editModalCloseBtn);

        // 添加新的事件监听器
        newCloseBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            console.log('关闭按钮被点击');
            document.getElementById('edit-product-modal').style.display = 'none';
        });

        console.log('成功为编辑弹窗关闭按钮添加事件监听器');
    } else {
        console.error('未找到编辑弹窗关闭按钮 (ID: edit-modal-close-btn)');
    }

    // 确保所有关闭按钮都能正常工作
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        // 为每个按钮添加点击事件
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            console.log('关闭按钮被点击', this);

            // 查找最近的modal-overlay父元素
            const modalOverlay = this.closest('.modal-overlay');
            if (modalOverlay) {
                console.log('找到弹窗容器，关闭弹窗', modalOverlay.id);
                modalOverlay.style.display = 'none';
            }
        });
    });

    // 取消编辑按钮点击事件
    const cancelEditBtn = document.getElementById('cancel-edit');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            document.getElementById('edit-product-modal').style.display = 'none';
        });
    }

    // 添加标签按钮点击事件
    const addTagBtn = document.getElementById('add-tag-btn');
    const tagInput = document.getElementById('edit-product-tags');
    if (addTagBtn && tagInput) {
        addTagBtn.addEventListener('click', function() {
            const tagText = tagInput.value.trim();
            if (tagText) {
                const tagsContainer = document.getElementById('product-tags-container');
                const tagElement = document.createElement('div');
                tagElement.className = 'tag-item';
                tagElement.innerHTML = `${tagText} <i class="ri-close-line" onclick="this.parentElement.remove()"></i>`;
                tagsContainer.appendChild(tagElement);
                tagInput.value = '';
            }
        });

        // 按回车键添加标签
        tagInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTagBtn.click();
            }
        });
    }

    // 保存商品按钮点击事件
    const saveProductBtn = document.getElementById('save-product');
    if (saveProductBtn) {
        saveProductBtn.addEventListener('click', function() {
            // 获取表单数据
            const productId = document.getElementById('edit-product-id').value;
            const productName = document.getElementById('edit-product-name').value;
            const productPrice = document.getElementById('edit-product-price').value;
            const productCategory = document.getElementById('edit-product-category').value;
            const productDescription = document.getElementById('edit-product-description').value;
            const connectionsValue = document.getElementById('edit-connections').value;
            const communicationsValue = document.getElementById('edit-communications').value;
            const collaborationsValue = document.getElementById('edit-collaborations').value;

            // 获取标签
            const tags = [];
            document.querySelectorAll('#product-tags-container .tag-item').forEach(tag => {
                tags.push(tag.textContent.trim());
            });

            // 验证表单数据
            if (!productName || !productPrice || !productCategory || !productDescription) {
                alert('请填写所有必填字段');
                return;
            }

            // 更新产品卡片
            const productCard = document.querySelector(`.product-card:nth-child(${productId})`);
            productCard.querySelector('.product-name').textContent = productName;
            productCard.querySelector('.price-tag').textContent = `$${productPrice}`;
            productCard.querySelector('.category-tag:not(.price-tag)').textContent = productCategory;
            productCard.querySelector('.product-description').textContent = productDescription;

            // 更新统计数据
            productCard.querySelector('.stat-item:nth-child(1) .stat-value').textContent = connectionsValue;
            productCard.querySelector('.stat-item:nth-child(2) .stat-value').textContent = communicationsValue;
            productCard.querySelector('.stat-item:nth-child(3) .stat-value').textContent = collaborationsValue;

            // 更新标签
            const tagsContainer = productCard.querySelector('.product-tags');
            tagsContainer.innerHTML = '';

            tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'product-tag';
                tagElement.innerHTML = `<i class="ri-price-tag-3-line"></i> ${tag}`;
                tagsContainer.appendChild(tagElement);
            });

            // 关闭编辑弹窗
            document.getElementById('edit-product-modal').style.display = 'none';
        });
    }

    // 点击其他地方关闭产品菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.product-menu') && !e.target.closest('.product-menu-btn')) {
            document.querySelectorAll('.product-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }

        // 点击弹窗背景关闭弹窗
        if (e.target.classList.contains('modal-overlay')) {
            console.log('点击了弹窗背景，关闭弹窗');
            e.target.style.display = 'none';
        }
    });

    // 上传图片按钮点击事件
    const uploadBtn = document.querySelector('.edit-product-modal .upload-btn');
    const fileInput = document.getElementById('edit-product-image');
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('product-image-preview').src = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // 产品卡片中的"开始AI协作"按钮点击事件
    const chatButtons = document.querySelectorAll('.chat-btn');
    chatButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 获取产品名称
            const productName = this.getAttribute('data-product');

            // 获取AI助手菜单和子菜单
            const aiAssistantMenu = document.getElementById('ai-assistant-menu');
            const aiAssistantSubmenu = document.getElementById('ai-assistant-submenu');

            // 确保AI助手菜单处于激活状态
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(i => i.classList.remove('active'));
            aiAssistantMenu.classList.add('active');
            aiAssistantMenu.classList.add('expanded');

            // 更新页面标题
            document.querySelector('.product-title').textContent = 'AI助手';

            // 显示AI助手容器
            const aiAssistantContainer = document.querySelector('.ai-assistant-container');
            const contentArea = document.querySelector('.content-area');
            const outreachContainer = document.querySelector('.outreach-container');
            const influencerContainer = document.querySelector('.influencer-container');
            const dashboardContainer = document.querySelector('.dashboard-container');
            const analyticsContainer = document.querySelector('.analytics-container');

            // 先隐藏所有内容
            contentArea.style.display = 'none';
            if (outreachContainer) outreachContainer.style.display = 'none';
            if (influencerContainer) influencerContainer.style.display = 'none';
            if (dashboardContainer) dashboardContainer.style.display = 'none';
            if (analyticsContainer) analyticsContainer.style.display = 'none';

            // 显示AI助手容器，显示聊天界面，隐藏新建商品分析界面
            aiAssistantContainer.style.display = 'flex';
            const chatContainer = document.querySelector('.chat-container');
            const newProductContainer = document.querySelector('.new-product-container');
            if (chatContainer) chatContainer.style.display = 'block';
            if (newProductContainer) newProductContainer.style.display = 'none';

            // 模拟自动发送商品分析请求
            setTimeout(() => {
                // 创建用户消息
                addUserMessage(`请分析这个商品: ${productName}`);

                // 模拟分析过程
                setTimeout(() => {
                    analyzeProductLink(`https://example.com/${productName}`);
                }, 1000);
            }, 500);
        });
    });

    // 添加产品按钮点击事件
    const addProductBtn = document.querySelector('.add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function(e) {
            // 阻止事件冒泡，避免触发文档点击事件
            e.stopPropagation();

            console.log('添加产品按钮被点击');

            // 直接导航到新建商品分析页面
            // 隐藏当前内容区域
            const contentArea = document.querySelector('.content-area');
            if (contentArea) contentArea.style.display = 'none';

            // 隐藏其他容器
            const outreachContainer = document.querySelector('.outreach-container');
            const influencerContainer = document.querySelector('.influencer-container');
            const dashboardContainer = document.querySelector('.dashboard-container');
            const analyticsContainer = document.querySelector('.analytics-container');

            if (outreachContainer) outreachContainer.style.display = 'none';
            if (influencerContainer) influencerContainer.style.display = 'none';
            if (dashboardContainer) dashboardContainer.style.display = 'none';
            if (analyticsContainer) analyticsContainer.style.display = 'none';

            // 显示AI助手容器
            const aiAssistantContainer = document.querySelector('.ai-assistant-container');
            if (aiAssistantContainer) {
                aiAssistantContainer.style.display = 'flex';

                // 显示新建商品分析界面，隐藏聊天界面
                const newProductContainer = document.querySelector('.new-product-container');
                const chatContainer = document.querySelector('.chat-container');
                if (newProductContainer) {
                    newProductContainer.style.display = 'flex';
                    console.log('显示新建商品分析界面 - 添加产品按钮');
                }
                if (chatContainer) chatContainer.style.display = 'none';

                // 更新页面标题
                document.querySelector('.product-title').textContent = 'AI助手';

                // 更新侧边栏菜单激活状态
                const menuItems = document.querySelectorAll('.menu-item');
                menuItems.forEach(item => item.classList.remove('active'));

                // 激活AI助手菜单
                const aiAssistantMenu = document.getElementById('ai-assistant-menu');
                if (aiAssistantMenu) {
                    aiAssistantMenu.classList.add('active');
                    aiAssistantMenu.classList.add('expanded');

                    // 激活新建商品分析子菜单项
                    const submenuItems = document.querySelectorAll('.submenu-item');
                    submenuItems.forEach(item => item.classList.remove('active'));

                    const newProductMenuItem = document.querySelector('.submenu-item.new-product');
                    if (newProductMenuItem) {
                        newProductMenuItem.classList.add('active');
                    }
                }
            }
        });
    }

    // 搜索框输入事件
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            console.log('搜索: ', this.value);
            // 这里可以添加搜索逻辑
        });
    });

    // 筛选下拉菜单交互
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    let activeCategory = 'all';
    let activePriceRange = 'all';

    // 初始化筛选下拉菜单
    filterDropdowns.forEach(dropdown => {
        const dropdownBtn = dropdown.querySelector('.filter-dropdown-btn');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');

        // 点击按钮显示/隐藏下拉菜单
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡

            // 关闭其他下拉菜单
            filterDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-menu').classList.remove('show');
                    otherDropdown.querySelector('.filter-dropdown-btn').classList.remove('active');
                }
            });

            // 切换当前下拉菜单
            dropdownMenu.classList.toggle('show');
            dropdownBtn.classList.toggle('active');
        });

        // 点击下拉菜单项
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有项的激活状态
                dropdownItems.forEach(i => i.classList.remove('active'));
                // 添加当前项的激活状态
                this.classList.add('active');

                // 更新按钮文本
                const selectedText = this.textContent;
                const btnText = dropdownBtn.textContent.split(' ')[0]; // 获取原始文本（"分类"或"价格区间"）
                dropdownBtn.innerHTML = `${btnText} <i class="ri-arrow-down-s-line"></i>`;

                // 更新筛选条件
                if (this.hasAttribute('data-category')) {
                    activeCategory = this.getAttribute('data-category');
                } else if (this.hasAttribute('data-price-range')) {
                    activePriceRange = this.getAttribute('data-price-range');
                }

                // 应用筛选
                applyFilters();

                // 关闭下拉菜单
                dropdownMenu.classList.remove('show');
                dropdownBtn.classList.remove('active');
            });
        });
    });

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        filterDropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('show');
            dropdown.querySelector('.filter-dropdown-btn').classList.remove('active');
        });
    });

    // 应用筛选函数
    function applyFilters() {
        const productCards = document.querySelectorAll('.product-card:not(.add-product-card)');
        let visibleCount = 0;

        productCards.forEach(card => {
            // 获取产品分类和价格
            const category = card.querySelector('.category-tag:not(.price-tag)').textContent;
            const priceText = card.querySelector('.price-tag').textContent;
            const price = parseFloat(priceText.replace('$', ''));

            // 检查是否符合分类筛选
            const categoryMatch = activeCategory === 'all' || category === activeCategory;

            // 检查是否符合价格区间筛选
            let priceMatch = false;
            if (activePriceRange === 'all') {
                priceMatch = true;
            } else if (activePriceRange === '0-50') {
                priceMatch = price >= 0 && price <= 50;
            } else if (activePriceRange === '50-100') {
                priceMatch = price > 50 && price <= 100;
            } else if (activePriceRange === '100-150') {
                priceMatch = price > 100 && price <= 150;
            } else if (activePriceRange === '150-200') {
                priceMatch = price > 150 && price <= 200;
            } else if (activePriceRange === '200+') {
                priceMatch = price > 200;
            }

            // 显示或隐藏产品卡片
            if (categoryMatch && priceMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 更新产品计数
        document.querySelector('.product-count strong').textContent = visibleCount;
    }

    // 排序下拉菜单事件
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('排序方式: ', this.value);

            // 获取所有产品卡片（排除添加产品卡片）
            const productCards = Array.from(document.querySelectorAll('.product-card:not(.add-product-card)'));

            // 根据选择的排序方式进行排序
            switch(this.value) {
                case '最新添加':
                    // 默认顺序，不做特殊处理
                    break;

                case '价格从低到高':
                    productCards.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.price-tag').textContent.replace('$', ''));
                        const priceB = parseFloat(b.querySelector('.price-tag').textContent.replace('$', ''));
                        return priceA - priceB;
                    });
                    break;

                case '价格从高到低':
                    productCards.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.price-tag').textContent.replace('$', ''));
                        const priceB = parseFloat(b.querySelector('.price-tag').textContent.replace('$', ''));
                        return priceB - priceA;
                    });
                    break;

                case '建联数量':
                    productCards.sort((a, b) => {
                        const connectionsA = parseInt(a.querySelector('.stat-item:nth-child(1) .stat-value').textContent);
                        const connectionsB = parseInt(b.querySelector('.stat-item:nth-child(1) .stat-value').textContent);
                        return connectionsB - connectionsA; // 从高到低排序
                    });
                    break;

                case '沟通数量':
                    productCards.sort((a, b) => {
                        const communicationsA = parseInt(a.querySelector('.stat-item:nth-child(2) .stat-value').textContent);
                        const communicationsB = parseInt(b.querySelector('.stat-item:nth-child(2) .stat-value').textContent);
                        return communicationsB - communicationsA; // 从高到低排序
                    });
                    break;
            }

            // 获取产品网格容器
            const productGrid = document.querySelector('.product-grid');

            // 清空当前网格
            productGrid.innerHTML = '';

            // 重新添加排序后的产品卡片
            productCards.forEach(card => {
                productGrid.appendChild(card);
            });

            // 添加"添加产品"卡片到最后
            const addProductCard = document.createElement('div');
            addProductCard.className = 'product-card add-product-card';
            addProductCard.innerHTML = `
                <div class="add-product-content">
                    <div class="add-icon">
                        <i class="ri-add-line"></i>
                    </div>
                    <div class="add-text">添加新产品</div>
                </div>
            `;
            productGrid.appendChild(addProductCard);

            // 重新绑定添加产品卡片的点击事件
            addProductCard.addEventListener('click', function(e) {
                // 阻止事件冒泡，避免触发文档点击事件
                e.stopPropagation();

                console.log('添加产品卡片被点击');

                // 直接导航到新建商品分析页面
                // 隐藏当前内容区域
                const contentArea = document.querySelector('.content-area');
                if (contentArea) contentArea.style.display = 'none';

                // 隐藏其他容器
                const outreachContainer = document.querySelector('.outreach-container');
                const influencerContainer = document.querySelector('.influencer-container');
                const dashboardContainer = document.querySelector('.dashboard-container');
                const analyticsContainer = document.querySelector('.analytics-container');

                if (outreachContainer) outreachContainer.style.display = 'none';
                if (influencerContainer) influencerContainer.style.display = 'none';
                if (dashboardContainer) dashboardContainer.style.display = 'none';
                if (analyticsContainer) analyticsContainer.style.display = 'none';

                // 显示AI助手容器
                const aiAssistantContainer = document.querySelector('.ai-assistant-container');
                if (aiAssistantContainer) {
                    aiAssistantContainer.style.display = 'flex';

                    // 显示新建商品分析界面，隐藏聊天界面
                    const newProductContainer = document.querySelector('.new-product-container');
                    const chatContainer = document.querySelector('.chat-container');
                    if (newProductContainer) {
                        newProductContainer.style.display = 'flex';
                        console.log('显示新建商品分析界面 - 添加产品卡片');
                    }
                    if (chatContainer) chatContainer.style.display = 'none';

                    // 更新页面标题
                    document.querySelector('.product-title').textContent = 'AI助手';

                    // 更新侧边栏菜单激活状态
                    const menuItems = document.querySelectorAll('.menu-item');
                    menuItems.forEach(item => item.classList.remove('active'));

                    // 激活AI助手菜单
                    const aiAssistantMenu = document.getElementById('ai-assistant-menu');
                    if (aiAssistantMenu) {
                        aiAssistantMenu.classList.add('active');
                        aiAssistantMenu.classList.add('expanded');

                        // 激活新建商品分析子菜单项
                        const submenuItems = document.querySelectorAll('.submenu-item');
                        submenuItems.forEach(item => item.classList.remove('active'));

                        const newProductMenuItem = document.querySelector('.submenu-item.new-product');
                        if (newProductMenuItem) {
                            newProductMenuItem.classList.add('active');
                        }
                    }
                }
            });
        });
    }

    // 初始化通知角标
    updateNotificationBadge();

    // 用户头像和设置相关交互
    const userAvatar = document.querySelector('#user-avatar-header');
    const userProfileSidebar = document.querySelector('#user-profile-sidebar');
    const userSettingsContainer = document.querySelector('.user-settings-container');
    const closeSettingsBtn = document.querySelector('.close-settings-btn');
    const userDropdownMenu = document.querySelector('#user-dropdown-menu');
    const sidebarDropdownMenu = document.querySelector('#sidebar-dropdown-menu');
    const accountSettingsItem = document.querySelector('#account-settings-item');
    const logoutItem = document.querySelector('#logout-item');
    const sidebarAccountSettingsItem = document.querySelector('#sidebar-account-settings-item');
    const sidebarLogoutItem = document.querySelector('#sidebar-logout-item');
    const notificationButton = document.querySelector('#notification-button');
    const notificationDropdown = document.querySelector('#notification-dropdown');
    const notificationItems = document.querySelectorAll('.notification-item');
    const markAllReadBtn = document.querySelector('.mark-all-read');

    // 点击头部头像打开下拉菜单
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            toggleMenu(userDropdownMenu);
            // 关闭其他菜单
            sidebarDropdownMenu.classList.remove('show');
            notificationDropdown.classList.remove('show');
        });
    }

    // 点击侧边栏用户信息打开下拉菜单
    const sidebarProfileClickable = document.querySelector('#sidebar-profile-clickable');
    const userProfile = document.querySelector('#user-profile-sidebar');

    // 重新实现侧边栏用户信息点击事件
    function setupSidebarProfileClick() {
        if (sidebarProfileClickable) {
            // 移除现有的所有点击事件
            const newElement = sidebarProfileClickable.cloneNode(true);
            sidebarProfileClickable.parentNode.replaceChild(newElement, sidebarProfileClickable);

            // 重新添加点击事件
            newElement.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                console.log('侧边栏用户信息被点击');

                // 直接操作 DOM 显示/隐藏菜单
                const menu = document.querySelector('#sidebar-dropdown-menu');
                if (menu) {
                    // 先将菜单定位到用户信息区域上方
                    console.log('切换侧边栏下拉菜单显示状态');

                    if (menu.classList.contains('show')) {
                        hideSidebarMenu(); // 使用新的方法隐藏菜单
                    } else {
                        showSidebarMenu(); // 使用新的方法显示菜单
                        // 关闭其他菜单
                        userDropdownMenu.classList.remove('show');
                        notificationDropdown.classList.remove('show');
                    }
                } else {
                    console.error('侧边栏下拉菜单不存在');
                }
            });
        } else {
            console.error('未找到侧边栏用户信息元素 #sidebar-profile-clickable');
        }
    }

    // 调用设置函数
    setupSidebarProfileClick();

    // 添加额外的调试代码
    console.log('侧边栏用户信息点击事件已设置');

    // 添加直接操作 DOM 的方法，确保菜单能正确显示
    function showSidebarMenu() {
        const menu = document.querySelector('#sidebar-dropdown-menu');
        if (menu) {
            menu.classList.add('show');
            menu.style.display = 'block';
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            console.log('强制显示侧边栏菜单');
        }
    }

    function hideSidebarMenu() {
        const menu = document.querySelector('#sidebar-dropdown-menu');
        if (menu) {
            menu.classList.remove('show');
            menu.style.display = 'none';
            console.log('强制隐藏侧边栏菜单');
        }
    }

    // 添加直接点击事件到用户信息区域
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            console.log('用户信息区域被点击');
            // 如果点击的不是下拉菜单本身
            if (!e.target.closest('#sidebar-dropdown-menu')) {
                const menu = document.querySelector('#sidebar-dropdown-menu');
                if (menu) {
                    console.log('当前菜单状态：', menu.classList.contains('show') ? '显示中' : '隐藏中');
                    if (menu.classList.contains('show')) {
                        hideSidebarMenu(); // 使用新的方法隐藏菜单
                    } else {
                        showSidebarMenu(); // 使用新的方法显示菜单
                    }
                }
            }
        });
    }

    // 注释掉通知图标点击事件，由notification-update.js处理
    // 点击通知图标打开通知列表事件已移至notification-update.js
    /*
    if (notificationButton) {
        notificationButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            toggleMenu(notificationDropdown);
            // 关闭其他菜单
            userDropdownMenu.classList.remove('show');
            sidebarDropdownMenu.classList.remove('show');
        });
    }
    */

    // 切换菜单显示/隐藏
    function toggleMenu(menu) {
        if (!menu) {
            console.error('菜单元素不存在');
            return;
        }
        console.log('切换菜单显示/隐藏', menu.id);
        menu.classList.toggle('show');
    }

    // 点击其他地方关闭所有菜单
    document.addEventListener('click', function(e) {
        // 如果点击的不是菜单或菜单触发器，则关闭所有菜单
        const isMenuClick = e.target.closest('#user-dropdown-menu') ||
                           e.target.closest('#sidebar-dropdown-menu') ||
                           e.target.closest('#notification-dropdown') ||
                           e.target.closest('#user-avatar-header') ||
                           e.target.closest('#sidebar-profile-clickable') ||
                           e.target.closest('#notification-button') ||
                           e.target.closest('.add-product-btn') ||  // 添加产品按钮
                           e.target.closest('.add-product-card');   // 添加产品卡片

        if (!isMenuClick) {
            console.log('点击了菜单外部，关闭所有菜单');
            // 确保元素存在再操作
            if (userDropdownMenu) userDropdownMenu.classList.remove('show');
            if (sidebarDropdownMenu) sidebarDropdownMenu.classList.remove('show');
            if (notificationDropdown) notificationDropdown.classList.remove('show');
        }
    });

    // 点击账号设置项
    if (accountSettingsItem) {
        accountSettingsItem.addEventListener('click', function() {
            userSettingsContainer.style.display = 'block';
            userDropdownMenu.classList.remove('show');
        });
    }

    // 点击侧边栏账号设置项
    if (sidebarAccountSettingsItem) {
        sidebarAccountSettingsItem.addEventListener('click', function() {
            userSettingsContainer.style.display = 'block';
            sidebarDropdownMenu.classList.remove('show');
        });
    }

    // 点击退出登录项
    if (logoutItem) {
        logoutItem.addEventListener('click', function() {
            showLoginPage();
            userDropdownMenu.classList.remove('show');
        });
    }

    // 点击侧边栏退出登录项
    if (sidebarLogoutItem) {
        sidebarLogoutItem.addEventListener('click', function() {
            showLoginPage();
            sidebarDropdownMenu.classList.remove('show');
        });
    }

    // 点击通知项
    if (notificationItems) {
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                // 获取该通知对应的达人名称
                const creatorName = this.getAttribute('data-creator');

                // 将通知标记为已读
                this.classList.remove('unread');

                // 更新通知角标数量
                updateNotificationBadge();

                // 关闭通知列表
                notificationDropdown.classList.remove('show');

                // 在建联记录中查找并打开对应的达人详情
                const outreachItems = document.querySelectorAll('.outreach-item');
                outreachItems.forEach(outreachItem => {
                    const itemCreatorName = outreachItem.querySelector('.creator-name').textContent;
                    if (itemCreatorName === creatorName) {
                        // 切换到建联记录页面
                        const buildLinkMenuItem = document.querySelector('.menu-item:nth-child(4)');
                        if (buildLinkMenuItem) {
                            const menuItemContent = buildLinkMenuItem.querySelector('.menu-item-content');
                            if (menuItemContent) {
                                menuItemContent.click();

                                // 模拟点击该建联项
                                setTimeout(() => {
                                    outreachItem.click();
                                }, 100);
                            }
                        }
                    }
                });
            });
        });
    }

    // 通知弹窗相关功能
    const notificationsModal = document.getElementById('notifications-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const viewAllNotificationsLinks = document.querySelectorAll('.view-all-notifications');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const notificationItemsFull = document.querySelectorAll('.notification-item-full');
    const markAllReadModalBtn = document.querySelector('.mark-all-read-btn');

    // 点击"查看全部通知"打开通知弹窗
    if (viewAllNotificationsLinks) {
        viewAllNotificationsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                notificationsModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // 防止背景滚动

                // 默认显示近期活动页签
                const activitiesTab = document.querySelector('.modal-tab[data-tab="activities"]');
                if (activitiesTab) {
                    // 模拟点击近期活动页签
                    activitiesTab.click();
                } else {
                    // 如果找不到页签，直接调用过滤函数
                    filterNotifications('activities');
                }

                // 关闭其他菜单
                userDropdownMenu.classList.remove('show');
                sidebarDropdownMenu.classList.remove('show');
                notificationDropdown.classList.remove('show');
            });
        });
    }

    // 点击仪表盘中的"查看全部"打开通知弹窗
    const dashboardViewAllLink = document.querySelector('#dashboard-view-all');
    if (dashboardViewAllLink) {
        dashboardViewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            notificationsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // 默认显示近期活动页签
            const activitiesTab = document.querySelector('.modal-tab[data-tab="activities"]');
            if (activitiesTab) {
                // 模拟点击近期活动页签
                activitiesTab.click();
            } else {
                // 如果找不到页签，直接调用过滤函数
                filterNotifications('activities');
            }
        });
    }

    // 点击仪表盘中的活动项
    const activityItems = document.querySelectorAll('.activity-item');
    if (activityItems) {
        activityItems.forEach(item => {
            item.addEventListener('click', function() {
                // 获取活动标题中的达人名称
                const activityTitle = this.querySelector('.activity-title').textContent;
                const creatorName = activityTitle.split(' ')[0]; // 提取第一个空格前的内容作为达人名称

                // 在建联记录中查找并打开对应的达人详情
                const outreachItems = document.querySelectorAll('.outreach-item');
                outreachItems.forEach(outreachItem => {
                    const itemCreatorName = outreachItem.querySelector('.creator-name').textContent;
                    if (itemCreatorName === creatorName) {
                        // 切换到建联记录页面
                        const buildLinkMenuItem = document.querySelector('.menu-item:nth-child(4)');
                        if (buildLinkMenuItem) {
                            const menuItemContent = buildLinkMenuItem.querySelector('.menu-item-content');
                            if (menuItemContent) {
                                menuItemContent.click();

                                // 模拟点击该建联项
                                setTimeout(() => {
                                    outreachItem.click();
                                }, 100);
                            }
                        }
                    }
                });
            });
        });
    }

    // 关闭通知弹窗
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            notificationsModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        });
    }

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(e) {
        if (e.target === notificationsModal) {
            notificationsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 切换通知标签页
    if (modalTabs) {
        modalTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的活跃状态
                modalTabs.forEach(t => t.classList.remove('active'));

                // 添加当前标签的活跃状态
                this.classList.add('active');

                // 获取标签类型
                const tabType = this.getAttribute('data-tab');

                // 根据标签类型过滤通知项
                filterNotifications(tabType);
            });
        });
    }

    // 过滤通知项的函数
    function filterNotifications(tabType) {
        // 获取通知列表和活动列表容器
        const notificationsListContainer = document.querySelector('.notifications-list');
        const activitiesListContainer = document.querySelector('.activities-list');

        // 根据标签类型显示或隐藏相应的列表
        if (tabType === 'activities') {
            // 显示活动列表，隐藏通知列表
            if (notificationsListContainer) notificationsListContainer.style.display = 'none';
            if (activitiesListContainer) activitiesListContainer.style.display = 'block';
            return;
        } else {
            // 显示通知列表，隐藏活动列表
            if (notificationsListContainer) notificationsListContainer.style.display = 'block';
            if (activitiesListContainer) activitiesListContainer.style.display = 'none';
        }
        if (notificationItemsFull) {
            notificationItemsFull.forEach(item => {
                if (tabType === 'all') {
                    item.style.display = 'flex';
                } else if (tabType === 'unread') {
                    if (item.classList.contains('unread')) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                } else if (tabType === 'important') {
                    // 这里可以根据实际需求定义"重要"通知的条件
                    // 例如，将"合作确认"和"内容发布"类型的通知视为重要
                    const type = item.getAttribute('data-type');
                    if (type === 'confirm' || type === 'publish') {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        }
    }

    // 点击弹窗中的"全部标为已读"按钮
    if (markAllReadModalBtn) {
        markAllReadModalBtn.addEventListener('click', function() {
            if (notificationItemsFull) {
                notificationItemsFull.forEach(item => {
                    item.classList.remove('unread');
                });
            }

            // 同时将小通知列表中的通知也标记为已读
            if (notificationItems) {
                notificationItems.forEach(item => {
                    item.classList.remove('unread');
                });
            }

            // 更新通知角标
            updateNotificationBadge();
        });
    }

    // 点击弹窗中的通知项
    if (notificationItemsFull) {
        notificationItemsFull.forEach(item => {
            item.addEventListener('click', function(e) {
                // 如果点击的是按钮，不做处理，让按钮自己的点击事件处理
                if (e.target.closest('.action-btn')) {
                    return;
                }

                // 将通知标记为已读
                this.classList.remove('unread');

                // 更新通知角标
                updateNotificationBadge();

                // 获取该通知对应的达人名称
                const creatorName = this.getAttribute('data-creator');
                if (creatorName) {
                    // 在建联记录中查找并打开对应的达人详情
                    const outreachItems = document.querySelectorAll('.outreach-item');
                    outreachItems.forEach(outreachItem => {
                        const itemCreatorName = outreachItem.querySelector('.creator-name').textContent;
                        if (itemCreatorName === creatorName) {
                            // 关闭弹窗
                            notificationsModal.style.display = 'none';
                            document.body.style.overflow = 'auto';

                            // 切换到建联记录页面
                            const buildLinkMenuItem = document.querySelector('.menu-item:nth-child(4)');
                            if (buildLinkMenuItem) {
                                const menuItemContent = buildLinkMenuItem.querySelector('.menu-item-content');
                                if (menuItemContent) {
                                    menuItemContent.click();

                                    // 模拟点击该建联项
                                    setTimeout(() => {
                                        outreachItem.click();
                                    }, 100);
                                }
                            }
                        }
                    });
                }
            });
        });
    }

    // 全部标为已读按钮
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡

            // 将所有通知标记为已读
            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });

            // 更新通知角标
            updateNotificationBadge();
        });
    }

    // 更新通知角标数量
    function updateNotificationBadge() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const badge = document.querySelector('.notification-badge');

        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }



    // 关闭设置页面
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function() {
            userSettingsContainer.style.display = 'none';
        });
    }

    // 账号设置页面交互
    if (userSettingsContainer) {
        // 更换头像按钮
        const changeAvatarBtn = document.querySelector('.change-avatar-btn');
        if (changeAvatarBtn) {
            changeAvatarBtn.addEventListener('click', function() {
                alert('头像上传功能将在此实现');
            });
        }



        // 邮箱发件通道管理

        // 检查是否已配置邮箱
        function checkEmailConfiguration() {
            // 这里我们使用localStorage来模拟数据存储
            // 在实际应用中，这应该从服务器获取
            const configuredEmails = JSON.parse(localStorage.getItem('configuredEmails') || '[]');

            const noEmailConfigured = document.getElementById('no-email-configured');
            const emailConfigured = document.getElementById('email-configured');
            const addMoreEmail = document.getElementById('add-more-email');

            if (configuredEmails.length === 0) {
                // 未配置邮箱状态
                noEmailConfigured.style.display = 'flex';
                emailConfigured.style.display = 'none';
                addMoreEmail.style.display = 'none';
            } else {
                // 已配置邮箱状态
                noEmailConfigured.style.display = 'none';
                emailConfigured.style.display = 'flex';
                addMoreEmail.style.display = 'block';

                // 清空现有邮箱列表
                emailConfigured.innerHTML = '';

                // 添加已配置的邮箱
                configuredEmails.forEach((email, index) => {
                    const isPrimary = index === 0; // 第一个邮箱为主要邮箱
                    const emailCard = createEmailCard(email, isPrimary);
                    emailConfigured.appendChild(emailCard);
                });
            }
        }

        // 创建邮箱卡片
        function createEmailCard(emailData, isPrimary) {
            const card = document.createElement('div');
            card.className = 'account-card';

            // 根据邮箱类型设置图标和名称
            let serviceIcon, serviceName, serviceColor;
            switch (emailData.type) {
                case 'qq':
                    serviceIcon = 'ri-qq-fill';
                    serviceName = 'QQ邮箱';
                    serviceColor = '#12B7F5';
                    break;
                case '163':
                    serviceIcon = 'ri-mail-line';
                    serviceName = '163邮箱';
                    serviceColor = '#D32F2F';
                    break;

                case 'other':
                    serviceIcon = 'ri-mail-settings-line';
                    serviceName = '自定义邮箱';
                    serviceColor = '#FF8F00';
                    break;
                default:
                    serviceIcon = 'ri-mail-settings-line';
                    serviceName = '自有SMTP';
                    serviceColor = '#FF8F00';
            }

            card.innerHTML = `
                <div class="account-service smtp">
                    <div class="service-icon"><i class="${serviceIcon}" style="color: ${serviceColor};"></i></div>
                    <div class="service-info">
                        <div class="service-name">${serviceName}</div>
                        <div class="service-email">${emailData.email}</div>
                    </div>
                    <div class="service-status ${isPrimary ? 'primary' : ''}">
                        ${isPrimary ? '<i class="ri-star-fill"></i> 发件邮箱' : ''}
                    </div>
                    <div class="service-actions">
                        ${!isPrimary ? '<button class="service-action-btn set-primary-btn"><i class="ri-star-line"></i></button>' : ''}
                        <button class="service-action-btn"><i class="ri-settings-line"></i></button>
                        <button class="service-action-btn"><i class="ri-delete-bin-line"></i></button>
                    </div>
                </div>
            `;

            return card;
        }

        // 初始化检查邮箱配置状态
        checkEmailConfiguration();

        // 添加第一个邮箱按钮
        const addFirstEmailBtn = document.getElementById('add-first-email-btn');
        if (addFirstEmailBtn) {
            addFirstEmailBtn.addEventListener('click', function() {
                // 显示统一邮箱配置弹窗
                const unifiedModal = document.getElementById('email-config-modal-unified');
                if (unifiedModal) {
                    unifiedModal.style.display = 'flex';
                    // 默认显示QQ邮箱配置
                    const emailTypeSelect = document.getElementById('email-type-select');
                    if (emailTypeSelect) {
                        emailTypeSelect.value = 'qq';
                    }
                    switchEmailConfigSection('qq');
                }
            });
        }

        // 添加更多邮箱按钮
        const addEmailBtn = document.getElementById('add-email-btn');
        if (addEmailBtn) {
            addEmailBtn.addEventListener('click', function() {
                // 显示统一邮箱配置弹窗
                const unifiedModal = document.getElementById('email-config-modal-unified');
                if (unifiedModal) {
                    unifiedModal.style.display = 'flex';
                    // 默认显示QQ邮箱配置
                    const emailTypeSelect = document.getElementById('email-type-select');
                    if (emailTypeSelect) {
                        emailTypeSelect.value = 'qq';
                    }
                    switchEmailConfigSection('qq');
                }
            });
        }

        // 邮箱类型下拉菜单切换事件处理
        const emailTypeSelect = document.getElementById('email-type-select');
        if (emailTypeSelect) {
            emailTypeSelect.addEventListener('change', function() {
                const emailType = this.value;
                switchEmailConfigSection(emailType);
            });
        }

        // 切换邮箱配置区域
        function switchEmailConfigSection(type) {
            // 隐藏所有配置区域
            const allSections = document.querySelectorAll('.email-config-section');
            allSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });

            // 显示对应的配置区域
            const targetSection = document.getElementById(`${type}-config-section`);
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
            }
        }

        // 关闭统一邮箱配置弹窗
        const closeUnifiedModal = document.querySelector('.close-email-config-modal-unified');
        if (closeUnifiedModal) {
            closeUnifiedModal.addEventListener('click', function() {
                const unifiedModal = document.getElementById('email-config-modal-unified');
                if (unifiedModal) {
                    unifiedModal.style.display = 'none';
                    // 清空所有表单
                    clearAllEmailForms();
                }
            });
        }

        // 清空所有邮箱配置表单
        function clearAllEmailForms() {
            // 清空QQ邮箱表单
            document.getElementById('unified-qq-email').value = '';
            document.getElementById('unified-qq-auth-code').value = '';

            // 清空163邮箱表单
            document.getElementById('unified-163-email').value = '';
            document.getElementById('unified-163-auth-code').value = '';

            // 清空其他邮箱表单
            clearUnifiedOtherEmailForm();
        }

        // 统一QQ邮箱配置逻辑
        const unifiedTestQQBtn = document.getElementById('unified-test-qq-btn');
        const unifiedSaveQQBtn = document.getElementById('unified-save-qq-btn');

        if (unifiedTestQQBtn) {
            unifiedTestQQBtn.addEventListener('click', function() {
                const email = document.getElementById('unified-qq-email').value;
                const authCode = document.getElementById('unified-qq-auth-code').value;

                if (!email || !authCode) {
                    alert('请填写完整的QQ邮箱配置信息');
                    return;
                }

                // 模拟测试连接
                console.log('正在测试QQ邮箱连接，请稍候...');
                setTimeout(() => {
                    console.log('QQ邮箱连接测试成功！');
                }, 1500);
            });
        }

        if (unifiedSaveQQBtn) {
            unifiedSaveQQBtn.addEventListener('click', function() {
                const email = document.getElementById('unified-qq-email').value;
                const authCode = document.getElementById('unified-qq-auth-code').value;

                if (!email || !authCode) {
                    console.log('请填写完整的QQ邮箱配置信息');
                    return;
                }

                saveEmailConfig({
                    type: 'qq',
                    email: email,
                    password: authCode,
                    smtpHost: 'smtp.qq.com',
                    smtpPort: 465,
                    smtpSecurity: 'ssl',
                    imapHost: 'imap.qq.com',
                    imapPort: 993,
                    imapSecurity: 'ssl',
                    username: email
                });

                // 关闭弹窗
                document.getElementById('email-config-modal-unified').style.display = 'none';

                // 清空表单
                clearAllEmailForms();
            });
        }

        // 统一163邮箱配置逻辑
        const unifiedTest163Btn = document.getElementById('unified-test-163-btn');
        const unifiedSave163Btn = document.getElementById('unified-save-163-btn');

        if (unifiedTest163Btn) {
            unifiedTest163Btn.addEventListener('click', function() {
                const email = document.getElementById('unified-163-email').value;
                const authCode = document.getElementById('unified-163-auth-code').value;

                if (!email || !authCode) {
                    alert('请填写完整的163邮箱配置信息');
                    return;
                }

                // 模拟测试连接
                alert('正在测试163邮箱连接，请稍候...');
                setTimeout(() => {
                    alert('163邮箱连接测试成功！');
                }, 1500);
            });
        }

        if (unifiedSave163Btn) {
            unifiedSave163Btn.addEventListener('click', function() {
                const email = document.getElementById('unified-163-email').value;
                const authCode = document.getElementById('unified-163-auth-code').value;

                if (!email || !authCode) {
                    alert('请填写完整的163邮箱配置信息');
                    return;
                }

                saveEmailConfig({
                    type: '163',
                    email: email,
                    password: authCode,
                    smtpHost: 'smtp.163.com',
                    smtpPort: 465,
                    smtpSecurity: 'ssl',
                    imapHost: 'imap.163.com',
                    imapPort: 993,
                    imapSecurity: 'ssl',
                    username: email
                });

                // 关闭弹窗
                document.getElementById('email-config-modal-unified').style.display = 'none';

                // 清空表单
                clearAllEmailForms();
            });
        }



        // 统一其他邮箱配置逻辑
        const unifiedTestOtherBtn = document.getElementById('unified-test-other-btn');
        const unifiedSaveOtherBtn = document.getElementById('unified-save-other-btn');

        if (unifiedTestOtherBtn) {
            unifiedTestOtherBtn.addEventListener('click', function() {
                const email = document.getElementById('unified-other-email').value;
                const smtpHost = document.getElementById('unified-other-smtp-host').value;
                const smtpPort = document.getElementById('unified-other-smtp-port').value;
                const password = document.getElementById('unified-other-password').value;

                if (!email || !smtpHost || !smtpPort || !password) {
                    console.log('请填写完整的邮箱配置信息');
                    return;
                }

                // 模拟测试连接
                console.log('正在测试邮箱连接，请稍候...');
                setTimeout(() => {
                    console.log('邮箱连接测试成功！');
                }, 1500);
            });
        }

        if (unifiedSaveOtherBtn) {
            unifiedSaveOtherBtn.addEventListener('click', function() {
                const email = document.getElementById('unified-other-email').value;
                const smtpHost = document.getElementById('unified-other-smtp-host').value;
                const smtpPort = document.getElementById('unified-other-smtp-port').value;
                const smtpSecurity = document.getElementById('unified-other-smtp-security').value;
                const imapHost = document.getElementById('unified-other-imap-host').value;
                const imapPort = document.getElementById('unified-other-imap-port').value;
                const imapSecurity = document.getElementById('unified-other-imap-security').value;
                const password = document.getElementById('unified-other-password').value;

                if (!email || !smtpHost || !smtpPort || !password) {
                    alert('请填写完整的邮箱配置信息');
                    return;
                }

                saveEmailConfig({
                    type: 'other',
                    email: email,
                    password: password,
                    smtpHost: smtpHost,
                    smtpPort: parseInt(smtpPort),
                    smtpSecurity: smtpSecurity,
                    imapHost: imapHost || smtpHost.replace('smtp', 'imap'),
                    imapPort: parseInt(imapPort) || (smtpSecurity === 'ssl' ? 993 : 143),
                    imapSecurity: imapSecurity || smtpSecurity,
                    username: email // 使用邮箱地址作为用户名
                });

                // 关闭弹窗
                document.getElementById('email-config-modal-unified').style.display = 'none';

                // 清空表单
                clearAllEmailForms();
            });
        }



        // 清空统一其他邮箱表单
        function clearUnifiedOtherEmailForm() {
            document.getElementById('unified-other-email').value = '';
            document.getElementById('unified-other-smtp-host').value = '';
            document.getElementById('unified-other-smtp-port').value = '';
            document.getElementById('unified-other-smtp-security').value = 'tls';
            document.getElementById('unified-other-imap-host').value = '';
            document.getElementById('unified-other-imap-port').value = '';
            document.getElementById('unified-other-imap-security').value = 'ssl';
            document.getElementById('unified-other-password').value = '';
        }



        // 保存邮箱配置的通用函数
        function saveEmailConfig(config) {
            const configuredEmails = JSON.parse(localStorage.getItem('configuredEmails') || '[]');

            // 检查是否已存在相同邮箱
            const existingIndex = configuredEmails.findIndex(email => email.email === config.email);

            if (existingIndex !== -1) {
                // 更新现有配置
                configuredEmails[existingIndex] = { ...configuredEmails[existingIndex], ...config };
            } else {
                // 添加新配置
                configuredEmails.push(config);
            }

            localStorage.setItem('configuredEmails', JSON.stringify(configuredEmails));

            alert(`${config.email} 配置已保存`);

            // 更新UI显示
            checkEmailConfiguration();
        }



        // 测试SMTP连接按钮
        const testSmtpBtn = document.getElementById('test-smtp-btn');
        if (testSmtpBtn) {
            testSmtpBtn.addEventListener('click', function() {
                const smtpEmail = document.getElementById('smtp-email').value;
                const smtpHost = document.getElementById('smtp-host').value;
                const smtpPort = document.getElementById('smtp-port').value;
                const smtpUsername = document.getElementById('smtp-username').value;
                const smtpPassword = document.getElementById('smtp-password').value;

                // 简单验证
                if (!smtpEmail || !smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
                    alert('请填写完整的SMTP配置信息');
                    return;
                }

                // 模拟测试连接
                alert('正在测试SMTP连接，请稍候...');

                // 模拟测试成功
                setTimeout(() => {
                    alert('SMTP连接测试成功！');
                }, 1500);
            });
        }

        // 保存SMTP配置按钮
        const saveSmtpBtn = document.getElementById('save-smtp-btn');
        if (saveSmtpBtn) {
            saveSmtpBtn.addEventListener('click', function() {
                const smtpEmail = document.getElementById('smtp-email').value;
                const smtpName = document.getElementById('smtp-name').value;
                const smtpHost = document.getElementById('smtp-host').value;
                const smtpPort = document.getElementById('smtp-port').value;
                const smtpSecurity = document.getElementById('smtp-security').value;
                const smtpUsername = document.getElementById('smtp-username').value;
                const smtpPassword = document.getElementById('smtp-password').value;

                // 简单验证
                if (!smtpEmail || !smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
                    alert('请填写完整的SMTP配置信息');
                    return;
                }

                // 获取现有配置
                const configuredEmails = JSON.parse(localStorage.getItem('configuredEmails') || '[]');

                // 添加新配置
                configuredEmails.push({
                    email: smtpEmail,
                    name: smtpName,
                    host: smtpHost,
                    port: smtpPort,
                    security: smtpSecurity,
                    username: smtpUsername,
                    password: '********' // 实际应用中不应该这样存储密码
                });

                // 保存配置
                localStorage.setItem('configuredEmails', JSON.stringify(configuredEmails));

                // 模拟保存配置
                alert('SMTP邮箱配置已保存');

                // 关闭SMTP配置弹窗
                const smtpModal = document.getElementById('smtp-modal');
                if (smtpModal) {
                    smtpModal.style.display = 'none';
                }

                // 更新UI显示
                checkEmailConfiguration();
            });
        }

        // 为动态添加的邮箱卡片绑定事件
        document.addEventListener('click', function(e) {
            // 检查是否点击了服务操作按钮
            if (e.target.closest('.service-action-btn')) {
                const btn = e.target.closest('.service-action-btn');
                const action = btn.querySelector('i').className;
                const serviceEmail = btn.closest('.account-service').querySelector('.service-email').textContent;
                const serviceName = btn.closest('.account-service').querySelector('.service-name').textContent;

                if (action.includes('star-line')) {
                    // 设置为发件邮箱
                    if (confirm(`确定要将 ${serviceEmail} 设置为发件邮箱吗？`)) {
                        // 获取现有配置
                        const configuredEmails = JSON.parse(localStorage.getItem('configuredEmails') || '[]');

                        // 找到要设为发件邮箱的邮箱
                        const emailIndex = configuredEmails.findIndex(email => email.email === serviceEmail);

                        if (emailIndex !== -1) {
                            // 将该邮箱移到数组第一位（作为发件邮箱）
                            const emailToSetPrimary = configuredEmails.splice(emailIndex, 1)[0];
                            configuredEmails.unshift(emailToSetPrimary);

                            // 保存更新后的配置
                            localStorage.setItem('configuredEmails', JSON.stringify(configuredEmails));

                            alert(`已将 ${serviceEmail} 设置为发件邮箱`);

                            // 更新UI显示
                            checkEmailConfiguration();
                        }
                    }
                } else if (action.includes('settings-line')) {
                    // 显示SMTP配置弹窗，并填充现有数据
                    const smtpModal = document.getElementById('smtp-modal');
                    if (smtpModal) {
                        // 填充现有数据（模拟）
                        document.getElementById('smtp-email').value = serviceEmail;
                        document.getElementById('smtp-name').value = '您的姓名';
                        document.getElementById('smtp-host').value = 'smtp.example.com';
                        document.getElementById('smtp-port').value = '587';
                        document.getElementById('smtp-username').value = serviceEmail;
                        document.getElementById('smtp-password').value = '********';

                        smtpModal.style.display = 'flex';
                    }
                } else if (action.includes('delete-bin-line')) {
                    if (confirm(`确定要移除 ${serviceEmail} 吗？此操作不可撤销。`)) {
                        // 获取现有配置
                        const configuredEmails = JSON.parse(localStorage.getItem('configuredEmails') || '[]');

                        // 找到并移除对应的邮箱
                        const updatedEmails = configuredEmails.filter(email => email.email !== serviceEmail);

                        // 保存更新后的配置
                        localStorage.setItem('configuredEmails', JSON.stringify(updatedEmails));

                        alert(`已移除 ${serviceEmail}`);

                        // 更新UI显示
                        checkEmailConfiguration();
                    }
                }
            }
        });

        // 清除所有邮箱配置按钮（仅用于测试）
        const clearEmailsBtn = document.getElementById('clear-emails-btn');
        if (clearEmailsBtn) {
            clearEmailsBtn.addEventListener('click', function() {
                if (confirm('确定要清除所有邮箱配置吗？此操作不可撤销。')) {
                    // 清除邮箱配置
                    localStorage.removeItem('configuredEmails');

                    alert('已清除所有邮箱配置');

                    // 更新UI显示
                    checkEmailConfiguration();
                }
            });
        }
    }



    // 安全设置按钮
    if (document.querySelectorAll('.security-option .option-btn').length > 0) {
        const securityOptionBtns = document.querySelectorAll('.security-option .option-btn');
        securityOptionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const optionName = this.closest('.security-option').querySelector('.option-name').textContent;
                alert(`${optionName}功能将在此实现`);
            });
        });
    }
});

// 全局函数定义 - 已在上方定义，此处移除重复定义

function maskPhoneNumber(phoneNumber) {
    // 移除所有非数字字符
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    // 确保手机号长度足够
    if (cleanNumber.length < 8) return phoneNumber;

    // 保留前3位和后4位，中间用星号替代
    const prefix = cleanNumber.substring(0, 3);
    const suffix = cleanNumber.substring(cleanNumber.length - 4);
    const masked = prefix + '****' + suffix;

    // 如果原始号码有国家代码前缀，则保留
    if (phoneNumber.startsWith('+')) {
        return '+86 ' + masked;
    }

    return masked;
}



// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 操作菜单点击事件
    const actionMenus = document.querySelectorAll('.action-menu');
    if (actionMenus.length > 0) {
        actionMenus.forEach(menu => {
            menu.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡，避免触发产品卡片点击
                alert('操作菜单将在此展开');
            });
        });
    }

    // 视图切换按钮事件
    const viewBtns = document.querySelectorAll('.btn-outline');
    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                alert('视图切换功能将在此实现: ' + this.textContent.trim());
            });
        });
    }

    // AI聊天功能相关
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');

    // 快速建议标签点击
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-tag') && chatInput) {
            const suggestionText = e.target.textContent;

            switch(suggestionText) {
                case '分析商品':
                    chatInput.value = '请分析这个商品: https://example.com/earbud-product';
                    break;
                case '推荐博主':
                    chatInput.value = '请为我的耳机产品推荐合适的YouTube博主';
                    break;
                case '查看热门合作案例':
                    chatInput.value = '请给我看看近期成功的耳机产品合作案例';
                    break;
                default:
                    chatInput.value = suggestionText;
            }

            // 聚焦输入框
            chatInput.focus();
        }

        // 创作者卡片中的按钮点击
        if (e.target.tagName === 'BUTTON' && e.target.closest('.creator-actions')) {
            const creatorName = e.target.closest('.creator-card').querySelector('.creator-name').textContent;

            if (e.target.textContent.includes('查看详情')) {
                displayCreatorDetail(creatorName);
            } else if (e.target.textContent.includes('添加到建联列表') || e.target.textContent.includes('联系博主')) {
                alert(`已将 ${creatorName} 添加到建联列表，您可以在"建联记录"中查看并联系`);
            }
        }
    });

    // 发送按钮点击事件
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // 输入框按下Enter键发送
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // 发送消息函数
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // 创建用户消息
            addUserMessage(message);

            // 清空输入框
            chatInput.value = '';

            // 如果是商品链接，显示分析流程
            if (message.includes('http') && (message.includes('product') || message.includes('商品'))) {
                analyzeProductLink(message);
            } else {
                // 其他消息的回复
                setTimeout(() => {
                    simulateAIResponse(message);
                }, 1000);
            }
        }
    }

    // 分析商品链接的函数
    function analyzeProductLink(link) {
        // 添加分析消息，带进度条展示
        showAnalyzingProgress();

        // 确保输入框隐藏
        const inputArea = document.querySelector('.input-area');
        if (inputArea) inputArea.style.display = 'none';

        // 第一步：显示链接抓取（独立对话气泡）
        setTimeout(() => {
            showLinkScrapingStepAsMessage();

            // 链接抓取完成后，直接进入特征提取流程
            setTimeout(() => {
                showFeatureExtractionProgress();
            }, 1500); // 链接抓取完成后1.5秒开始特征提取
        }, 3000); // 等待分析进度完成
    }

    // 显示正在抓取商品的进度
    function showAnalyzingProgress() {
        const analyzingContent = `
            <div class="analyzing-progress">
                <div class="step-label">
                    <i class="ri-search-line"></i> 正在抓取商品信息
                </div>
                <div class="analysis-chain">
                    <div class="chain-step" data-step="1">
                        <div class="chain-dot"></div>
                        <span>解析商品链接</span>
                    </div>
                    <div class="chain-step" data-step="2">
                        <div class="chain-dot"></div>
                        <span>抓取商品数据</span>
                    </div>
                    <div class="chain-step" data-step="3">
                        <div class="chain-dot"></div>
                        <span>AI智能分析</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">正在解析商品链接... 0%</span>
                </div>
            </div>
        `;

        addAIMessage(analyzingContent);

        // 启动分析进度动画
        setTimeout(() => {
            startAnalyzingAnimation();
        }, 500);
    }

    // 分析进度动画
    function startAnalyzingAnimation() {
        const progressFill = document.querySelector('.analyzing-progress .progress-fill');
        const progressText = document.querySelector('.analyzing-progress .progress-text');
        const chainSteps = document.querySelectorAll('.analyzing-progress .chain-step');

        if (!progressFill || !progressText) return;

        let progress = 0;
        let currentStep = 0;
        const totalTime = 2500; // 总时间2.5秒
        const interval = 50;
        const increment = (100 / (totalTime / interval));

        const progressTimer = setInterval(() => {
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);
            }

            // 更新进度条
            progressFill.style.width = progress + '%';

            // 更新步骤状态和文案
            if (progress >= 0 && progress < 30) {
                progressText.textContent = `正在解析商品链接... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 0);
            } else if (progress >= 30 && progress < 70) {
                progressText.textContent = `正在抓取商品数据... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 1);
            } else if (progress >= 70 && progress < 100) {
                progressText.textContent = `AI智能分析中... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 2);
            } else if (progress === 100) {
                progressText.textContent = `分析完成! 100%`;
                activateChainStep(chainSteps, 2);
            }
        }, interval);
    }

    // 激活推理链步骤
    function activateChainStep(steps, activeIndex) {
        steps.forEach((step, index) => {
            if (index <= activeIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // 链接抓取步骤（独立对话气泡）
    function showLinkScrapingStepAsMessage() {
        const linkScrapingContent = `
            <div class="step-label"><i class="ri-link-m"></i> 链接抓取</div>
            <div class="product-info-card">
                <div class="product-image-container">
                    <div class="product-image-loader">
                        <div class="image-loading-spinner"></div>
                        <span>正在加载商品图片...</span>
                    </div>
                    <img src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=150&h=150&fit=crop&q=80"
                         alt="Earbud 智能翻译耳机"
                         class="product-image"
                         onload="this.previousElementSibling.style.display='none'; this.style.display='block';"
                         onerror="this.previousElementSibling.innerHTML='<i class=\\"ri-image-line\\"></i><span>图片加载失败</span>'"
                         style="display: none;">
                    </div>
                <div class="product-basic-info">
                    <h4 class="product-title">
                        <i class="ri-check-line success-icon"></i>
                        成功获取商品信息
                    </h4>
                    <div class="product-name">Smartwatch 智能手表</div>
                    <div class="product-simple-stats">
                        <span class="price-info"><i class="ri-price-tag-line"></i> $129.99</span>
                        <span class="rating-info"><i class="ri-star-fill"></i> 4.5</span>
                    </div>
                </div>
            </div>
        `;

        addAIMessage(linkScrapingContent);
    }

    // 显示正在分析商品特征的进度
    function showProductFeatureAnalysisProgress() {
        const featureAnalysisContent = `
            <div class="feature-analysis-progress">
                <div class="step-label">
                    <i class="ri-file-list-line"></i> 正在分析商品特征
                </div>
                <div class="analysis-chain">
                    <div class="chain-step" data-step="1">
                        <div class="chain-dot"></div>
                        <span>分析产品属性</span>
                    </div>
                    <div class="chain-step" data-step="2">
                        <div class="chain-dot"></div>
                        <span>提取核心特征</span>
                    </div>
                    <div class="chain-step" data-step="3">
                        <div class="chain-dot"></div>
                        <span>生成分析报告</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">分析完成! 0%</div>
                </div>
            </div>
        `;

        addAIMessage(featureAnalysisContent);

        // 启动进度条动画
        setTimeout(() => {
            const progressFill = document.querySelector('.feature-analysis-progress .progress-fill');
            const progressText = document.querySelector('.feature-analysis-progress .progress-text');
            const chainSteps = document.querySelectorAll('.feature-analysis-progress .chain-step');

            if (!progressFill || !progressText) return;

            let progress = 0;
            const totalTime = 2500; // 总时间2.5秒
            const interval = 50;
            const increment = (100 / (totalTime / interval));

            const progressInterval = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(progressInterval);
                }

                progressFill.style.width = progress + '%';
                progressText.textContent = `分析完成! ${Math.round(progress)}%`;

                // 激活对应的步骤
                if (progress >= 33 && chainSteps[0]) {
                    chainSteps[0].classList.add('active');
                }
                if (progress >= 66 && chainSteps[1]) {
                    chainSteps[1].classList.add('active');
                }
                if (progress >= 100 && chainSteps[2]) {
                    chainSteps[2].classList.add('active');
                }
            }, interval);
        }, 100);
    }

    // 分步骤显示链接抓取（保留原函数用于其他地方）
    function showLinkScrapingStep() {
        const linkScrapingStep = `
            <div class="analysis-steps">
                <div class="step-item step-animate-in" data-step="1">
                    <div class="step-label"><i class="ri-link-m"></i> 链接抓取</div>
                    <div class="step-content">
                        <div class="product-info-card">
                            <div class="product-image-container">
                                <div class="product-image-loader">
                                    <div class="image-loading-spinner"></div>
                                    <span>正在加载商品图片...</span>
                                </div>
                                <img src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=150&h=150&fit=crop&q=80" 
                                     alt="Earbud 智能翻译耳机" 
                                     class="product-image"
                                     onload="this.previousElementSibling.style.display='none'; this.style.display='block';"
                                     onerror="this.previousElementSibling.innerHTML='<i class=\\"ri-image-line\\"></i><span>图片加载失败</span>'"
                                     style="display: none;">
                                </div>
                            <div class="product-basic-info">
                                <h4 class="product-title">
                                    <i class="ri-check-line success-icon"></i>
                                    成功获取商品信息
                                </h4>
                                <div class="product-name">Earbud 智能翻译耳机</div>
                                <div class="product-simple-stats">
                                    <span class="price-info"><i class="ri-price-tag-line"></i> $89.99</span>
                                    <span class="rating-info"><i class="ri-star-fill"></i> 4.3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        addAIMessage(linkScrapingStep);
    }

    // 特征提取步骤（独立对话气泡）
    function showFeatureExtractionStepAsMessage() {
        const featureExtractionContent = `
            <div class="step-label"><i class="ri-file-list-line"></i> 提取特征</div>
            <div class="feature-analysis">
                <div class="core-features">
                    <div class="feature-tag health-feature">
                        <i class="ri-heart-pulse-line"></i>
                        健康监测功能（心率、血氧、睡眠）
                    </div>
                    <div class="feature-tag fitness-feature">
                        <i class="ri-run-line"></i>
                        运动追踪（多种运动模式）
                    </div>
                    <div class="feature-tag durability-feature">
                        <i class="ri-shield-check-line"></i>
                        防水设计（50米防水）
                    </div>
                    <div class="feature-tag battery-feature">
                        <i class="ri-battery-charge-line"></i>
                        长续航（7天+）
                    </div>
                </div>
                <div class="target-audience">
                    <h5><i class="ri-group-line"></i> 目标受众分析</h5>
                    <div class="audience-tags">
                        <span class="audience-tag">健身爱好者</span>
                        <span class="audience-tag">商务人士</span>
                    </div>
                </div>
            </div>
        `;
        
        addAIMessage(featureExtractionContent);
    }

    // 分步骤显示特征提取（保留原函数用于其他地方）
    function showFeatureExtractionStep() {
        const featureExtractionStep = `
            <div class="analysis-steps">
                <div class="step-item step-animate-in" data-step="2">
                    <div class="step-label"><i class="ri-file-list-line"></i> 提取特征</div>
                    <div class="step-content">
                        <div class="feature-analysis">
                            <div class="core-features">
                                <div class="feature-tag ai-feature">
                                    <i class="ri-robot-line"></i>
                                    多语言实时翻译功能
                                </div>
                                <div class="feature-tag ai-feature">
                                    <i class="ri-mic-line"></i>
                                    AI语音助手集成
                                </div>
                                <div class="feature-tag quality-feature">
                                    <i class="ri-volume-up-line"></i>
                                    高清音质，降噪技术
                                </div>
                                <div class="feature-tag battery-feature">
                                    <i class="ri-battery-charge-line"></i>
                                    长续航（8小时+）
                                </div>
                                <div class="feature-tag durability-feature">
                                    <i class="ri-shield-check-line"></i>
                                    防水设计 IPX5
                                </div>
                            </div>
                            <div class="target-audience">
                                <h5><i class="ri-group-line"></i> 目标受众分析</h5>
                                <div class="audience-tags">
                                    <span class="audience-tag">商务人士</span>
                                    <span class="audience-tag">旅行者</span>
                                    <span class="audience-tag">科技爱好者</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        addAIMessage(featureExtractionStep);
    }

    // 显示商品信息分析卡片
    function showProductAnalysisCard() {
        const productCard = `
            <div class="product-analysis-card-compact">
                <div class="product-analysis-header-compact">
                    <h4><i class="ri-shopping-bag-line"></i> 商品信息分析结果</h4>
                </div>
                <div class="product-analysis-content-compact">
                    <div class="product-info-grid">
                        <div class="product-info-row">
                            <div class="info-item-compact">
                                <label class="info-label-compact">商品名称</label>
                                <div class="editable-tags-container" data-field="product-name">
                                    <span class="editable-tag" data-max-length="5">Earbu</span>
                                    <span class="editable-tag" data-max-length="5">d智能</span>
                                    <span class="editable-tag" data-max-length="5">翻译耳</span>
                                    <span class="editable-tag" data-max-length="5">机</span>
                                </div>
                            </div>
                            <div class="info-item-compact">
                                <label class="info-label-compact">价格区间</label>
                                <div class="editable-tags-container" data-field="price-range">
                                    <span class="editable-tag" data-max-length="5">50-1</span>
                                    <span class="editable-tag" data-max-length="5">00元</span>
                                </div>
                            </div>
                        </div>
                        <div class="product-info-row">
                            <div class="info-item-compact full-width">
                                <label class="info-label-compact">核心特性</label>
                                <div class="editable-tags-container" data-field="core-features">
                                    <span class="editable-tag" data-max-length="5">多语言</span>
                                    <span class="editable-tag" data-max-length="5">实时翻</span>
                                    <span class="editable-tag" data-max-length="5">译</span>
                                    <span class="editable-tag" data-max-length="5">AI语</span>
                                    <span class="editable-tag" data-max-length="5">音助手</span>
                                    <span class="editable-tag" data-max-length="5">高清音</span>
                                    <span class="editable-tag" data-max-length="5">质</span>
                                    <span class="editable-tag" data-max-length="5">降噪技</span>
                                    <span class="editable-tag" data-max-length="5">术</span>
                                    <span class="editable-tag" data-max-length="5">长续航</span>
                                    <span class="editable-tag" data-max-length="5">防水设</span>
                                    <span class="editable-tag" data-max-length="5">计</span>
                                </div>
                            </div>
                        </div>
                        <div class="product-info-row">
                            <div class="info-item-compact">
                                <label class="info-label-compact">目标受众</label>
                                <div class="editable-tags-container" data-field="target-audience">
                                    <span class="editable-tag" data-max-length="5">商务人</span>
                                    <span class="editable-tag" data-max-length="5">士</span>
                                    <span class="editable-tag" data-max-length="5">旅行者</span>
                                    <span class="editable-tag" data-max-length="5">科技爱</span>
                                    <span class="editable-tag" data-max-length="5">好者</span>
                                </div>
                            </div>
                            <div class="info-item-compact">
                                <label class="info-label-compact">特征标签</label>
                                <div class="editable-tags-container" data-field="feature-tags">
                                    <span class="editable-tag" data-max-length="5">智能翻</span>
                                    <span class="editable-tag" data-max-length="5">译</span>
                                    <span class="editable-tag" data-max-length="5">语音识</span>
                                    <span class="editable-tag" data-max-length="5">别</span>
                                    <span class="editable-tag" data-max-length="5">降噪技</span>
                                    <span class="editable-tag" data-max-length="5">术</span>
                                </div>
                            </div>
                        </div>
                        <div class="product-info-row">
                            <div class="info-item-compact">
                                <label class="info-label-compact">受众标签</label>
                                <input type="text" class="editable-field-compact" value="商务精英, 国际旅行者, 科技发烧友">
                            </div>
                            <div class="info-item-compact">
                                <label class="info-label-compact">场景标签</label>
                                <input type="text" class="editable-field-compact" value="商务会议, 国际旅行, 语言学习">
                            </div>
                        </div>
                        <div class="product-info-row">
                            <div class="info-item-compact full-width">
                                <label class="info-label-compact">核心内容方向</label>
                                <input type="text" class="editable-field-compact" value="AI技术应用, 跨语言沟通, 智能穿戴设备, 旅行科技装备">
                            </div>
                        </div>
                        <div class="product-info-row">
                            <div class="info-item-compact">
                                <label class="info-label-compact">综合人设/风格</label>
                                <input type="text" class="editable-field-compact" value="科技前沿, 国际化视野, 高效便捷">
                            </div>
                            <div class="info-item-compact">
                                <label class="info-label-compact">主要受众画像</label>
                                <input type="text" class="editable-field-compact" value="25-45岁职场人士, 年收入10万+">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-analysis-actions-compact">
                    <button class="edit-product-btn-compact"><i class="ri-edit-line"></i> 修改信息</button>
                    <button class="confirm-product-btn-compact primary-btn-compact"><i class="ri-file-list-line"></i> 开始提取特征</button>
                </div>
            </div>
        `;

        addAIMessage(productCard);

        // 添加产品卡片交互
        setTimeout(() => {
            const editBtn = document.querySelector('.edit-product-btn-compact');
            const confirmBtn = document.querySelector('.confirm-product-btn-compact');
            const editableTags = document.querySelectorAll('.editable-tag');

            let isEditMode = false;

            // 初始化可编辑标签功能
            initEditableTags();

            // 编辑按钮点击
            if (editBtn) {
                editBtn.addEventListener('click', function() {
                    isEditMode = !isEditMode;

                    if (isEditMode) {
                        editBtn.innerHTML = '<i class="ri-save-line"></i> 保存修改';
                        enableTagEditing();
                    } else {
                        editBtn.innerHTML = '<i class="ri-edit-line"></i> 修改信息';
                        disableTagEditing();
                    }
                });
            }

            // 确认按钮点击
            if (confirmBtn) {
                confirmBtn.addEventListener('click', function() {
                    // 确保退出编辑模式
                    if (isEditMode) {
                        isEditMode = false;
                        editBtn.innerHTML = '<i class="ri-edit-line"></i> 修改信息';
                        disableTagEditing();
                    }

                    // 显示特征提取进度
                    showFeatureExtractionProgress();
                });
            }
        }, 500);
    }

    // 初始化可编辑标签功能
    function initEditableTags() {
        const editableTags = document.querySelectorAll('.editable-tag');

        editableTags.forEach(tag => {
            tag.addEventListener('click', function() {
                if (this.classList.contains('editing')) return;

                const container = this.closest('.editable-tags-container');
                if (container && container.dataset.editMode === 'true') {
                    startTagEditing(this);
                }
            });
        });
    }

    // 启用标签编辑模式
    function enableTagEditing() {
        const containers = document.querySelectorAll('.editable-tags-container');
        containers.forEach(container => {
            container.dataset.editMode = 'true';
            container.style.borderColor = 'var(--primary-color)';
            container.style.backgroundColor = 'var(--primary-alpha-05)';
        });
    }

    // 禁用标签编辑模式
    function disableTagEditing() {
        const containers = document.querySelectorAll('.editable-tags-container');
        containers.forEach(container => {
            container.dataset.editMode = 'false';
            container.style.borderColor = 'var(--border-color)';
            container.style.backgroundColor = 'var(--surface-color)';
        });

        // 结束所有正在编辑的标签
        const editingTags = document.querySelectorAll('.editable-tag.editing');
        editingTags.forEach(tag => {
            endTagEditing(tag);
        });
    }

    // 开始编辑标签
    function startTagEditing(tag) {
        const originalText = tag.textContent;
        const maxLength = parseInt(tag.dataset.maxLength) || 5;

        tag.classList.add('editing');
        tag.innerHTML = `<input type="text" class="tag-edit-input" value="${originalText}" maxlength="${maxLength}">`;

        const input = tag.querySelector('.tag-edit-input');
        input.focus();
        input.select();

        // 处理输入完成
        const finishEditing = () => {
            const newText = input.value.trim();
            if (newText && newText.length <= maxLength) {
                tag.textContent = newText;
            } else {
                tag.textContent = originalText;
            }
            tag.classList.remove('editing');
        };

        input.addEventListener('blur', finishEditing);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                finishEditing();
            } else if (e.key === 'Escape') {
                tag.textContent = originalText;
                tag.classList.remove('editing');
            }
        });
    }

    // 结束编辑标签
    function endTagEditing(tag) {
        if (tag.classList.contains('editing')) {
            const input = tag.querySelector('.tag-edit-input');
            if (input) {
                const newText = input.value.trim();
                const maxLength = parseInt(tag.dataset.maxLength) || 5;
                if (newText && newText.length <= maxLength) {
                    tag.textContent = newText;
                } else {
                    tag.textContent = tag.dataset.originalText || '标签';
                }
            }
            tag.classList.remove('editing');
        }
    }

    // 显示特征提取进度
    function showFeatureExtractionProgress() {
        const extractionContent = `
            <div class="feature-extraction-progress">
                <div class="step-label">
                    <i class="ri-file-list-line"></i> 正在提取特征
                </div>
                <div class="extraction-chain">
                    <div class="chain-step" data-step="1">
                        <div class="chain-dot"></div>
                        <span>分析产品属性</span>
                    </div>
                    <div class="chain-step" data-step="2">
                        <div class="chain-dot"></div>
                        <span>识别目标受众</span>
                    </div>
                    <div class="chain-step" data-step="3">
                        <div class="chain-dot"></div>
                        <span>提取核心特征</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">正在分析产品属性... 0%</span>
                </div>
            </div>
        `;

        addAIMessage(extractionContent);

        // 启动特征提取进度动画
        setTimeout(() => {
            startFeatureExtractionAnimation();
        }, 500);
    }

    // 特征提取进度动画
    function startFeatureExtractionAnimation() {
        const progressFill = document.querySelector('.feature-extraction-progress .progress-fill');
        const progressText = document.querySelector('.feature-extraction-progress .progress-text');
        const chainSteps = document.querySelectorAll('.feature-extraction-progress .chain-step');

        if (!progressFill || !progressText) return;

        let progress = 0;
        const totalTime = 3000; // 总时间3秒
        const interval = 50;
        const increment = (100 / (totalTime / interval));

        const progressTimer = setInterval(() => {
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);

                // 提取完成后显示特征卡片
                setTimeout(() => {
                    showFeatureExtractionCard();
                }, 500);
            }

            // 更新进度条
            progressFill.style.width = progress + '%';

            // 更新步骤状态和文案
            if (progress >= 0 && progress < 35) {
                progressText.textContent = `正在分析产品属性... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 0);
            } else if (progress >= 35 && progress < 70) {
                progressText.textContent = `正在识别目标受众... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 1);
            } else if (progress >= 70 && progress < 100) {
                progressText.textContent = `正在提取核心特征... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 2);
            } else if (progress === 100) {
                progressText.textContent = `特征提取完成! 100%`;
                activateChainStep(chainSteps, 2);
            }
        }, interval);
    }

    // 产品分析数据管理
    let productAnalysisData = {
        coreFeatures: ["实时翻译功能", "高清音质与降噪技术", "AI智能语音识别", "便携设计与长续航"],
        targetAudience: ["商务人士", "旅行者", "科技爱好者", "语言学习者"]
    };

    // 从localStorage加载数据
    function loadProductAnalysisData() {
        try {
            const savedData = localStorage.getItem('productAnalysisData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (parsedData.coreFeatures && parsedData.targetAudience) {
                    productAnalysisData = parsedData;
                }
            }
        } catch (error) {
            console.warn('无法加载产品分析数据:', error);
        }
    }

    // 保存数据到localStorage
    function saveProductAnalysisData() {
        try {
            localStorage.setItem('productAnalysisData', JSON.stringify(productAnalysisData));
        } catch (error) {
            console.warn('无法保存产品分析数据:', error);
        }
    }

    // 初始化时加载数据
    loadProductAnalysisData();

    // 数组转逗号分隔字符串
    function arrayToString(arr) {
        return arr.filter(item => item.trim()).join(',');
    }

    // 逗号分隔字符串转数组
    function stringToArray(str) {
        return str.split(',').map(item => item.trim()).filter(item => item);
    }

    // 创建可编辑标签组件
    function createEditableTagsSection(fieldName, title, data, iconClass) {
        const tags = data.map((tag, index) => {
            const colorClass = fieldName === 'coreFeatures' ?
                ['health-feature', 'tech-feature', 'smart-feature', 'portable-feature'][index % 4] :
                ['business', 'travel', 'tech', 'student'][index % 4];

            const icon = fieldName === 'coreFeatures' ?
                ['ri-translate-2', 'ri-headphone-line', 'ri-brain-line', 'ri-wireless-charging-line'][index % 4] :
                ['ri-briefcase-line', 'ri-plane-line', 'ri-smartphone-line', 'ri-graduation-cap-line'][index % 4];

            return `
                <div class="${fieldName === 'coreFeatures' ? 'feature-tag' : 'audience-tag'} ${colorClass}">
                    <i class="${icon}"></i>
                    ${tag}
                </div>
            `;
        }).join('');

        return `
            <div class="editable-section" data-field="${fieldName}">
                <div class="section-title-with-edit">
                    <div class="section-title">${title}</div>
                    <button class="edit-section-btn" title="编辑${title}">
                        <i class="ri-edit-line"></i>
                    </button>
                </div>
                <div class="tags-display">
                    <div class="${fieldName === 'coreFeatures' ? 'core-features' : 'audience-tags'}">
                        ${tags}
                    </div>
                </div>
                <div class="tags-editor" style="display: none;">
                    <div class="existing-tags"></div>
                    <div class="input-container">
                        <input type="text" class="tag-input" maxlength="5" placeholder="输入新标签(最多5字符)">
                        <span class="char-counter">0/5</span>
                    </div>
                    <div class="editor-actions">
                        <button class="save-tags-btn primary-btn-small">保存</button>
                        <button class="cancel-tags-btn secondary-btn-small">取消</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 显示特征提取结果卡片
    function showFeatureExtractionCard() {
        const coreFeatureSection = createEditableTagsSection(
            'coreFeatures',
            '核心特征',
            productAnalysisData.coreFeatures,
            'ri-star-line'
        );

        const targetAudienceSection = createEditableTagsSection(
            'targetAudience',
            '目标受众分析',
            productAnalysisData.targetAudience,
            'ri-group-line'
        );

        const featureCard = `
            <div class="feature-extraction-card">
                <div class="feature-card-header">
                    <h4><i class="ri-file-list-line"></i> 特征提取结果</h4>
                </div>
                <div class="feature-card-content">
                    ${coreFeatureSection}
                    ${targetAudienceSection}

                    <div class="marketing-points-section">
                        <div class="section-title">营销要点</div>
                        <div class="marketing-points">
                            <div class="marketing-point">
                                <i class="ri-check-line"></i>
                                突出实时翻译的准确性和速度
                            </div>
                            <div class="marketing-point">
                                <i class="ri-check-line"></i>
                                强调多场景应用（商务、旅行、学习）
                            </div>
                            <div class="marketing-point">
                                <i class="ri-check-line"></i>
                                展示AI技术的先进性和便利性
                            </div>
                        </div>
                    </div>

                    <div class="campaign-settings-section">
                        <div class="section-title">营销活动设置</div>
                        <div class="campaign-inputs">
                            <div class="input-group">
                                <label for="marketing-budget">营销总预算 (单位美金) <span class="required">*</span></label>
                                <input type="number" id="marketing-budget" class="campaign-input" placeholder="请输入预算金额" min="1" max="100000" value="5000">
                                <span class="input-hint">建议预算: 1$ - 100,000$</span>
                            </div>
                            <div class="input-group">
                                <label for="target-contacts">预期建联数量 <span class="required">*</span></label>
                                <input type="number" id="target-contacts" class="campaign-input" placeholder="请输入建联数量" min="1" max="50" value="10">
                                <span class="input-hint">最高数量: 50个</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feature-card-actions">
                    <button class="start-matching-btn primary-btn">
                        <i class="ri-search-line"></i> 开始匹配博主
                    </button>
                </div>
            </div>
        `;

        addAIMessage(featureCard);

        // 添加编辑功能事件监听
        setTimeout(() => {
            initializeEditableSections();

            const startMatchingBtn = document.querySelector('.start-matching-btn');
            if (startMatchingBtn) {
                startMatchingBtn.addEventListener('click', function() {
                    // 验证输入字段
                    const budgetInput = document.getElementById('marketing-budget');
                    const contactsInput = document.getElementById('target-contacts');

                    let isValid = true;
                    let errorMessage = '';

                    // 验证预算
                    if (!budgetInput.value || budgetInput.value < 1 || budgetInput.value > 100000) {
                        isValid = false;
                        errorMessage += '请输入有效的营销预算 (1-100,000美金)\\n';
                        budgetInput.style.borderColor = 'var(--error-color)';
                    } else {
                        budgetInput.style.borderColor = 'var(--border-color)';
                    }

                    // 验证建联数量
                    if (!contactsInput.value || contactsInput.value < 1 || contactsInput.value > 50) {
                        isValid = false;
                        errorMessage += '请输入有效的建联数量 (1-50个)\\n';
                        contactsInput.style.borderColor = 'var(--error-color)';
                    } else {
                        contactsInput.style.borderColor = 'var(--border-color)';
                    }

                    if (!isValid) {
                        alert(errorMessage);
                        return;
                    }

                    // 验证通过，显示博主匹配进度
                    showBloggerMatchingProgress();
                });
            }
        }, 500);
    }

    // 初始化可编辑区域
    function initializeEditableSections() {
        const editableSections = document.querySelectorAll('.editable-section');

        editableSections.forEach(section => {
            const fieldName = section.dataset.field;
            const editBtn = section.querySelector('.edit-section-btn');
            const tagsDisplay = section.querySelector('.tags-display');
            const tagsEditor = section.querySelector('.tags-editor');
            const tagInput = section.querySelector('.tag-input');
            const charCounter = section.querySelector('.char-counter');
            const saveBtn = section.querySelector('.save-tags-btn');
            const cancelBtn = section.querySelector('.cancel-tags-btn');

            let originalData = [...productAnalysisData[fieldName]];
            let currentTags = [...productAnalysisData[fieldName]];

            // 编辑按钮点击事件
            editBtn.addEventListener('click', () => {
                enterEditMode();
            });

            // 输入框事件
            tagInput.addEventListener('input', updateCharCounter);
            tagInput.addEventListener('keydown', handleKeyDown);

            // 保存按钮事件
            saveBtn.addEventListener('click', saveTags);

            // 取消按钮事件
            cancelBtn.addEventListener('click', cancelEdit);

            function enterEditMode() {
                originalData = [...productAnalysisData[fieldName]];
                currentTags = [...productAnalysisData[fieldName]];

                tagsDisplay.style.display = 'none';
                tagsEditor.style.display = 'block';

                updateExistingTags();
                tagInput.focus();
            }

            function exitEditMode() {
                tagsDisplay.style.display = 'block';
                tagsEditor.style.display = 'none';
                tagInput.value = '';
                updateCharCounter();
            }

            function updateCharCounter() {
                const length = tagInput.value.length;
                charCounter.textContent = `${length}/5`;
                charCounter.style.color = length >= 5 ? 'var(--error-color)' : 'var(--text-secondary)';
            }

            function handleKeyDown(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                } else if (e.key === 'Escape') {
                    cancelEdit();
                }
            }

            function addTag() {
                const value = tagInput.value.trim();

                if (!value) return;

                if (value.length > 5) {
                    alert('标签长度不能超过5个字符');
                    return;
                }

                if (currentTags.includes(value)) {
                    alert('标签已存在');
                    return;
                }

                currentTags.push(value);
                tagInput.value = '';
                updateCharCounter();
                updateExistingTags();
            }

            function removeTag(index) {
                currentTags.splice(index, 1);
                updateExistingTags();
            }

            function updateExistingTags() {
                const existingTagsContainer = section.querySelector('.existing-tags');
                existingTagsContainer.innerHTML = currentTags.map((tag, index) => `
                    <span class="tag-item">
                        ${tag}
                        <button class="remove-tag-btn" data-index="${index}" title="删除标签">
                            <i class="ri-close-line"></i>
                        </button>
                    </span>
                `).join('');

                // 添加删除按钮事件
                existingTagsContainer.querySelectorAll('.remove-tag-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const index = parseInt(btn.dataset.index);
                        removeTag(index);
                    });
                });
            }

            function saveTags() {
                if (currentTags.length === 0) {
                    alert('至少需要一个标签');
                    return;
                }

                // 更新全局数据
                productAnalysisData[fieldName] = [...currentTags];

                // 保存到localStorage
                saveProductAnalysisData();

                // 更新显示
                updateTagsDisplay();
                exitEditMode();
            }

            function cancelEdit() {
                currentTags = [...originalData];
                exitEditMode();
            }

            function updateTagsDisplay() {
                const container = section.querySelector(fieldName === 'coreFeatures' ? '.core-features' : '.audience-tags');
                const data = productAnalysisData[fieldName];

                container.innerHTML = data.map((tag, index) => {
                    const colorClass = fieldName === 'coreFeatures' ?
                        ['health-feature', 'tech-feature', 'smart-feature', 'portable-feature'][index % 4] :
                        ['business', 'travel', 'tech', 'student'][index % 4];

                    const icon = fieldName === 'coreFeatures' ?
                        ['ri-translate-2', 'ri-headphone-line', 'ri-brain-line', 'ri-wireless-charging-line'][index % 4] :
                        ['ri-briefcase-line', 'ri-plane-line', 'ri-smartphone-line', 'ri-graduation-cap-line'][index % 4];

                    return `
                        <div class="${fieldName === 'coreFeatures' ? 'feature-tag' : 'audience-tag'} ${colorClass}">
                            <i class="${icon}"></i>
                            ${tag}
                        </div>
                    `;
                }).join('');
            }
        });
    }

    // 显示博主匹配进度
    function showBloggerMatchingProgress() {
        const matchingContent = `
            <div class="blogger-matching-progress">
                <div class="step-label">
                    <i class="ri-search-line"></i> 正在匹配博主
                </div>
                <div class="matching-chain">
                    <div class="chain-step" data-step="1">
                        <div class="chain-dot"></div>
                        <span>分析博主内容</span>
                    </div>
                    <div class="chain-step" data-step="2">
                        <div class="chain-dot"></div>
                        <span>计算匹配度</span>
                    </div>
                    <div class="chain-step" data-step="3">
                        <div class="chain-dot"></div>
                        <span>筛选最佳博主</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">正在分析博主内容... 0%</span>
                </div>
            </div>
        `;

        addAIMessage(matchingContent);

        // 启动博主匹配进度动画
        setTimeout(() => {
            startBloggerMatchingAnimation();
        }, 500);
    }

    // 博主匹配进度动画
    function startBloggerMatchingAnimation() {
        const progressFill = document.querySelector('.blogger-matching-progress .progress-fill');
        const progressText = document.querySelector('.blogger-matching-progress .progress-text');
        const chainSteps = document.querySelectorAll('.blogger-matching-progress .chain-step');

        if (!progressFill || !progressText) return;

        let progress = 0;
        const totalTime = 4000; // 总时间4秒
        const interval = 50;
        const increment = (100 / (totalTime / interval));

        const progressTimer = setInterval(() => {
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);

                // 匹配完成后显示结果
                setTimeout(() => {
                    showMatchingComplete();
                }, 500);
            }

            // 更新进度条
            progressFill.style.width = progress + '%';

            // 更新步骤状态和文案
            if (progress >= 0 && progress < 40) {
                progressText.textContent = `正在分析博主内容... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 0);
            } else if (progress >= 40 && progress < 80) {
                progressText.textContent = `正在计算匹配度... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 1);
            } else if (progress >= 80 && progress < 100) {
                progressText.textContent = `正在筛选最佳博主... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 2);
            } else if (progress === 100) {
                progressText.textContent = `匹配完成! 100%`;
                activateChainStep(chainSteps, 2);
            }
        }, interval);
    }

    // 进度条动画函数
    function startProgressAnimation() {
        // 查找最新的进度条元素（可能有多个，选择最后一个）
        const progressFills = document.querySelectorAll('.progress-fill');
        const progressTexts = document.querySelectorAll('.progress-text');
        
        const progressFill = progressFills[progressFills.length - 1];
        const progressText = progressTexts[progressTexts.length - 1];
        
        if (!progressFill || !progressText) {
            console.log('Progress elements not found');
            return;
        }

        let progress = 0;
        const totalDuration = 5000; // 5秒总时长
        const interval = 50; // 每50ms更新一次
        const increment = (100 / (totalDuration / interval)); // 每次增加的百分比

        const progressTimer = setInterval(() => {
            progress += increment;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);
                
                // 进度完成后的处理
                setTimeout(() => {
                    showMatchingComplete();
                }, 500);
            }

            // 更新进度条
            progressFill.style.width = progress + '%';
            progressText.textContent = `分析中... ${Math.round(progress)}%`;
            
            // 在不同进度阶段显示不同的文案
            if (progress >= 30 && progress < 60) {
                progressText.textContent = `匹配内容特征... ${Math.round(progress)}%`;
            } else if (progress >= 60 && progress < 90) {
                progressText.textContent = `分析受众群体... ${Math.round(progress)}%`;
            } else if (progress >= 90 && progress < 100) {
                progressText.textContent = `计算匹配度... ${Math.round(progress)}%`;
            } else if (progress === 100) {
                progressText.textContent = `匹配完成! 100%`;
            }
        }, interval);
    }

    // 显示匹配完成结果
    function showMatchingComplete() {
        const resultMessage = `
            <div class="analysis-complete">
                <div class="step-item">
                    <div class="step-label"><i class="ri-check-double-line"></i> 匹配完成</div>
                    <div class="step-content">已根据产品特性找到最合适的YouTube博主</div>
                </div>
            </div>

            <h4 style="margin: 20px 0 10px 0;">⭐ 推荐的YouTube博主</h4>
        `;

        addAIMessage(resultMessage);

        // 再延迟一点展示推荐结果
        setTimeout(() => {
            showRecommendedCreators();
        }, 1000);
    }

    // 显示邮件生成进度
    function showEmailGenerationProgress() {
        const emailGenerationContent = `
            <div class="email-generation-progress">
                <div class="step-label">
                    <i class="ri-mail-send-line"></i> 正在生成个性化邮件
                </div>
                <div class="email-generation-chain">
                    <div class="chain-step" data-step="1">
                        <div class="chain-dot"></div>
                        <span>分析博主特性</span>
                    </div>
                    <div class="chain-step" data-step="2">
                        <div class="chain-dot"></div>
                        <span>匹配产品特点</span>
                    </div>
                    <div class="chain-step" data-step="3">
                        <div class="chain-dot"></div>
                        <span>生成个性化内容</span>
                    </div>
                    <div class="chain-step" data-step="4">
                        <div class="chain-dot"></div>
                        <span>优化邮件结构</span>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">正在分析博主特性... 0%</span>
                </div>
            </div>
        `;

        addAIMessage(emailGenerationContent);

        // 启动邮件生成进度动画
        setTimeout(() => {
            startEmailGenerationAnimation();
        }, 500);
    }

    // 邮件生成进度动画
    function startEmailGenerationAnimation() {
        const progressFill = document.querySelector('.email-generation-progress .progress-fill');
        const progressText = document.querySelector('.email-generation-progress .progress-text');
        const chainSteps = document.querySelectorAll('.email-generation-progress .chain-step');

        if (!progressFill || !progressText) return;

        let progress = 0;
        const totalTime = 4500; // 总时间4.5秒，比其他进度条稍长
        const interval = 50;
        const increment = (100 / (totalTime / interval));

        const progressTimer = setInterval(() => {
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);
            }

            // 更新进度条
            progressFill.style.width = progress + '%';

            // 更新步骤状态和文案
            if (progress >= 0 && progress < 25) {
                progressText.textContent = `正在分析博主特性... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 0);
            } else if (progress >= 25 && progress < 50) {
                progressText.textContent = `正在匹配产品特点... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 1);
            } else if (progress >= 50 && progress < 75) {
                progressText.textContent = `正在生成个性化内容... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 2);
            } else if (progress >= 75 && progress < 100) {
                progressText.textContent = `正在优化邮件结构... ${Math.round(progress)}%`;
                activateChainStep(chainSteps, 3);
            } else if (progress === 100) {
                progressText.textContent = `邮件生成完成! 100%`;
                activateChainStep(chainSteps, 3);
            }
        }, interval);
    }

    // 显示推荐的创作者列表 - 扩展到50个达人
    function showRecommendedCreators() {
        // 获取预期建联数量
        const targetContactsInput = document.getElementById('target-contacts');
        const targetContacts = targetContactsInput ? parseInt(targetContactsInput.value) || 10 : 10;

        // 核心推荐博主卡片
        const coreCreators = [
            {
                name: 'MattVidPro AI',
                avatar: 'https://placehold.co/80x80/34a853/ffffff?text=MP',
                subscribers: '28.67万',
                views: '323,000',
                engagement: '中等',
                description: '专注AI技术在视频制作领域的应用，与Earbud的AI功能相匹配',
                channelUrl: '#',
                relevance: 0.92,
                tags: ['AI技术', '视频制作', '科技评测']
            },
            {
                name: 'Two Minute Papers',
                avatar: 'https://placehold.co/80x80/4285f4/ffffff?text=TP',
                subscribers: '1.62M',
                views: '157,000',
                engagement: '较高',
                description: '专注于AI研究，如果产品在AI翻译或结合方面有技术亮点，适合进行展示。',
                channelUrl: '#',
                relevance: 0.89,
                tags: ['AI研究', '科技解析', '前沿技术']
            },
            {
                name: 'Sciencephile the AI',
                avatar: 'https://placehold.co/80x80/ea4335/ffffff?text=SA',
                subscribers: '1.08M',
                views: '872,000',
                engagement: '较高',
                description: '内容涵盖广泛的科学和技术主题，如果产品在AI技术上有创新之处，适合进行科普和推广',
                channelUrl: '#',
                relevance: 0.85,
                tags: ['科学科普', '技术解析', '创新产品']
            },
            {
                name: 'AI TV',
                avatar: 'https://placehold.co/80x80/fbbc05/ffffff?text=AT',
                subscribers: '1.38K',
                views: '12,500',
                engagement: '较高',
                description: 'AI领域的产品评测，受众虽小但精准，性价比较高',
                channelUrl: '#',
                relevance: 0.79,
                tags: ['AI产品评测', '小众精准', '性价比高']
            },
            {
                name: 'Tech Insider',
                avatar: 'https://placehold.co/80x80/673ab7/ffffff?text=TI',
                subscribers: '5.4M',
                views: '450,000',
                engagement: '中等',
                description: '大众科技媒体，关注新兴科技产品和创新技术，受众广泛但竞争激烈',
                channelUrl: '#',
                relevance: 0.75,
                tags: ['科技新闻', '产品展示', '大众媒体']
            }
        ];

        // 生成更多达人数据以达到50个
        const additionalCreators = [];
        const baseNames = ['TechReview', 'GadgetGuru', 'InnovationHub', 'FutureTech', 'SmartDevice', 'DigitalTrends', 'TechExplorer', 'NextGenTech', 'TechVision', 'ModernTech', 'TechWorld', 'GadgetZone', 'TechDaily', 'SmartTech', 'TechLife'];
        const colors = ['34a853', '4285f4', 'ea4335', 'fbbc05', '673ab7', '9c27b0', '2196f3', '00bcd4', '009688', '4caf50', 'ff9800', 'ff5722', '795548', '607d8b', '3f51b5'];

        for (let i = 0; i < 45; i++) {
            const nameIndex = i % baseNames.length;
            const colorIndex = i % colors.length;
            const randomName = baseNames[nameIndex] + (Math.floor(i / baseNames.length) > 0 ? ' ' + (Math.floor(i / baseNames.length) + 1) : '');
            const initials = randomName.split(' ').map(word => word[0]).join('').substring(0, 2);
            const randomAvatar = `https://placehold.co/80x80/${colors[colorIndex]}/ffffff?text=${initials}`;

            const randomSubs = Math.floor(Math.random() * 500000) + 10000;
            const randomViews = Math.floor(Math.random() * 100000) + 5000;
            const randomRelevance = Math.random() * 0.4 + 0.5; // 0.5-0.9
            const engagements = ['较高', '中等', '一般'];
            const tagSets = [
                ['科技评测', '产品测试'],
                ['AI技术', '智能设备'],
                ['消费电子', '数码产品'],
                ['科技新闻', '行业分析'],
                ['创新产品', '前沿技术'],
                ['智能硬件', '物联网'],
                ['移动科技', '应用评测'],
                ['游戏科技', '娱乐设备']
            ];

            additionalCreators.push({
                name: randomName,
                avatar: randomAvatar,
                subscribers: randomSubs > 1000000 ? (randomSubs / 1000000).toFixed(1) + 'M' : (randomSubs / 1000).toFixed(0) + 'K',
                views: randomViews.toLocaleString(),
                engagement: engagements[Math.floor(Math.random() * engagements.length)],
                description: '专注科技产品评测和技术分析',
                channelUrl: '#',
                relevance: randomRelevance,
                tags: tagSets[Math.floor(Math.random() * tagSets.length)]
            });
        }

        const allCreators = [...coreCreators, ...additionalCreators];

        // 按匹配度排序
        allCreators.sort((a, b) => b.relevance - a.relevance);

        // 根据预期建联数量限制显示的网红数量
        const creators = allCreators.slice(0, targetContacts);

        // 创建博主列表HTML
        let creatorsListHTML = '';

        creators.forEach((creator, index) => {
            // 生成标签HTML
            let tagsHTML = '';
            creator.tags.forEach(tag => {
                tagsHTML += `<span class="creator-tag">${tag}</span>`;
            });

            // 生成匹配度样式和文本
            let relevanceClass = '';
            let relevanceText = '';

            if (creator.relevance >= 0.9) {
                relevanceClass = 'high-relevance';
                relevanceText = '高匹配度';
            } else if (creator.relevance >= 0.8) {
                relevanceClass = 'medium-relevance';
                relevanceText = '中高匹配度';
            } else {
                relevanceClass = 'normal-relevance';
                relevanceText = '一般匹配度';
            }

            creatorsListHTML += `
                <div class="creator-row-item">
                    <div class="creator-row-checkbox">
                        <input type="checkbox" id="creator-${index}" class="creator-checkbox" data-creator-name="${creator.name}">
                        <label for="creator-${index}" class="creator-checkbox-label"></label>
                    </div>
                    <div class="creator-row-avatar">
                        <img src="${creator.avatar}" alt="${creator.name}" class="creator-avatar">
                    </div>
                    <div class="creator-row-info">
                        <div class="creator-row-name">${creator.name}</div>
                        <div class="creator-row-stats">
                            <span class="stat-item"><i class="ri-user-line"></i> ${creator.subscribers}</span>
                            <span class="stat-item"><i class="ri-play-circle-line"></i> ${creator.views}/视频</span>
                            <span class="stat-item"><i class="ri-bar-chart-line"></i> 互动: ${creator.engagement}</span>
                        </div>
                        <div class="creator-row-tags">
                            ${tagsHTML}
                        </div>
                    </div>
                    <div class="creator-row-description">
                        <p>${creator.description}</p>
                    </div>
                    <div class="creator-row-relevance ${relevanceClass}">
                        <span class="relevance-score">${Math.round(creator.relevance * 100)}%</span>
                        <span class="relevance-text">${relevanceText}</span>
                    </div>
                </div>
            `;
        });

        // 创建完整的推荐列表HTML
        const recommendationHTML = `
            <div class="creators-recommendation-container">
                <div class="creators-list-header">
                    <div class="list-title">
                        <i class="ri-user-star-line"></i> 推荐网红列表
                        <span class="list-count">(共 ${creators.length} 个，基于预期建联数量 ${targetContacts})</span>
                    </div>
                </div>
                <div class="creators-row-list">
                    ${creatorsListHTML}
                </div>
                <div class="creators-action-buttons">
                    <button class="select-all-btn"><i class="ri-checkbox-multiple-line"></i> 全选</button>
                    <button class="generate-emails-btn primary-btn"><i class="ri-mail-send-line"></i> 生成建联邮件</button>
                </div>
            </div>
        `;

        addAIMessage(recommendationHTML);

        // 添加交互功能
        setTimeout(() => {
            // 全选按钮
            const selectAllBtn = document.querySelector('.select-all-btn');
            const creatorCheckboxes = document.querySelectorAll('.creator-checkbox');

            if (selectAllBtn) {
                selectAllBtn.addEventListener('click', function() {
                    const allChecked = Array.from(creatorCheckboxes).every(cb => cb.checked);

                    creatorCheckboxes.forEach(checkbox => {
                        checkbox.checked = !allChecked;
                    });

                    if (allChecked) {
                        this.innerHTML = '<i class="ri-checkbox-multiple-line"></i> 全选';
                    } else {
                        this.innerHTML = '<i class="ri-checkbox-multiple-fill"></i> 取消全选';
                    }
                });
            }

            // 生成邮件按钮
            const generateEmailsBtn = document.querySelector('.generate-emails-btn');

            if (generateEmailsBtn) {
                generateEmailsBtn.addEventListener('click', function() {
                    const selectedCreators = [];

                    creatorCheckboxes.forEach(checkbox => {
                        if (checkbox.checked) {
                            selectedCreators.push(checkbox.dataset.creatorName);
                        }
                    });

                    if (selectedCreators.length === 0) {
                        alert('请至少选择一个博主');
                        return;
                    }

                    // 生成邮件
                    generateEmails(selectedCreators);
                });
            }
        }, 500);
    }

    // 博主邮件模板数据
    const creatorEmailTemplates = {
        'MattVidPro AI': {
            subject: 'Earbud 智能翻译耳机合作邀请 - AI技术创新产品',
            content: `尊敬的 MattVidPro AI 博主：

您好！我是 Earbud 智能翻译耳机的产品运营经理。作为AI技术领域的专业创作者，您在视频制作和AI应用方面的深度见解让我印象深刻，特别是您对AI语音识别技术的专业分析。

我们的 Earbud 智能翻译耳机正是AI技术在音频设备上的突破性应用，采用先进的神经网络翻译引擎，支持40+种语言的实时翻译，并配备智能降噪和高保真音质技术。这款产品完美契合您频道对前沿AI技术的关注点。

我们希望与您合作，展示这款AI驱动的创新产品：

1. AI翻译技术深度解析和实测
2. 与传统翻译设备的技术对比
3. 在不同场景下的AI性能表现
4. 产品的AI算法优化特性展示

合作条件：
- 免费提供 Earbud 智能翻译耳机产品（市场价值 $99）
- 视频发布后的合作费用：$1,500-$2,500
- 为您的粉丝提供专属20%折扣码
- 优先体验我们后续的AI产品

期待与您这样的AI技术专家合作，共同探索AI在音频领域的无限可能！

如有兴趣，请回复此邮件或联系我：123-4567-8910

祝好，
[您的名字]
Earbud 产品运营经理`
        },
        'Two Minute Papers': {
            subject: 'Earbud AI翻译耳机 - 前沿语音AI技术研究合作',
            content: `尊敬的 Two Minute Papers 团队：

您好！我是 Earbud 智能翻译耳机的产品运营经理。您的频道在AI研究领域的权威性和对前沿技术的深度解析令人敬佩，特别是在语音AI和机器学习方面的专业内容。

我们的 Earbud 智能翻译耳机基于最新的Transformer架构和端到端神经机器翻译技术，实现了低延迟、高精度的实时语音翻译。这项技术突破正是您频道经常探讨的AI研究成果的实际应用。

我们希望邀请您从学术角度分析这款产品：

1. 神经机器翻译技术的实际应用效果
2. 实时语音处理的算法优化分析
3. 多语言模型的性能基准测试
4. 与当前学术研究成果的对比分析

合作方案：
- 免费提供产品及技术文档供研究分析
- 合作费用：$3,000-$5,000
- 提供技术团队深度访谈机会
- 独家技术细节披露权限

我们相信这次合作能为您的观众带来AI技术从研究到产品化的完整视角。

期待您的回复！

最诚挚的问候，
[您的名字]
Earbud 产品运营经理`
        },
        'Sciencephile the AI': {
            subject: 'AI意识与语言：Earbud智能翻译耳机的哲学思考',
            content: `亲爱的 Sciencephile the AI：

您好！我是 Earbud 智能翻译耳机的产品运营经理。您独特的AI视角和对人工智能哲学思考的深度内容让我深受启发，特别是您对AI语言理解和意识的探讨。

我们的 Earbud 智能翻译耳机不仅是一款技术产品，更是AI理解和处理人类语言的具体体现。它能实时翻译40+种语言，这背后涉及深层的语言学习、语义理解和跨文化交流的AI挑战。

从您的独特角度，这款产品可以引发很多有趣的讨论：

1. AI如何真正"理解"不同语言的含义？
2. 机器翻译是否能传达语言背后的文化内涵？
3. 实时翻译技术对人类交流方式的影响
4. AI语言处理的局限性和未来发展

合作提议：
- 免费提供产品进行深度体验和分析
- 合作费用：$2,000-$3,500
- 支持您从AI哲学角度的独特解读
- 提供技术背景资料供深度思考

让我们一起探索AI语言技术的深层意义！

期待您的哲学性分析，
[您的名字]
Earbud 产品运营经理`
        },
        'AI TV': {
            subject: 'Earbud智能翻译耳机 - AI产品评测合作邀请',
            content: `尊敬的 AI TV 团队：

您好！我是 Earbud 智能翻译耳机的产品运营经理。您的频道在AI产品评测和技术分析方面的专业性深受观众信赖，您对AI产品实用性的客观评价特别有价值。

我们的 Earbud 智能翻译耳机是一款专注实用性的AI产品，采用先进的语音识别和机器翻译技术，为用户提供便捷的跨语言交流体验。我们希望通过您的专业评测，让更多用户了解这款产品的真实表现。

建议的评测内容：

1. 全面的产品开箱和外观设计评价
2. 翻译准确性和速度的实际测试
3. 不同使用场景的性能表现
4. 与同类产品的详细对比分析
5. 用户体验和实用性评估

合作条件：
- 免费提供 Earbud 智能翻译耳机产品
- 评测视频合作费用：$2,500-$4,000
- 提供详细的技术规格和测试数据
- 为您的观众提供专属优惠码

我们重视您的客观评价，无论正面还是改进建议都对我们很有价值。

期待与您的合作！

诚挚问候，
[您的名字]
Earbud 产品运营经理`
        },
        'Tech Insider': {
            subject: 'Earbud智能翻译耳机 - 科技媒体独家报道机会',
            content: `尊敬的 Tech Insider 编辑团队：

您好！我是 Earbud 智能翻译耳机的产品运营经理。作为知名的科技媒体平台，Tech Insider在新兴科技产品报道方面的影响力和专业性备受认可。

我们的 Earbud 智能翻译耳机代表了消费级AI翻译技术的最新突破，支持40+种语言实时翻译，是全球化时代的重要科技创新。我们希望通过您的平台，向广大科技爱好者展示这一创新产品。

报道角度建议：

1. 消费级AI翻译技术的发展趋势
2. 产品在全球化背景下的市场意义
3. 技术创新对日常生活的实际影响
4. 与国际同类产品的竞争分析
5. 用户真实使用场景和反馈

合作方案：
- 提供产品样机和完整技术资料
- 媒体合作费用：$4,000-$6,000
- 安排产品团队专访机会
- 提供独家技术细节和发展规划
- 优先获得后续产品信息

我们相信这次合作能为您的观众带来有价值的科技资讯。

期待您的回复！

此致敬礼，
[您的名字]
Earbud 产品运营经理`
        }
    };

    // 生成建联邮件函数 - 支持批量操作
    function generateEmails(selectedCreators) {
        // 显示邮件生成进度
        showEmailGenerationProgress();

        // 模拟延迟生成邮件
        setTimeout(() => {
            // 生成批量邮件界面
            generateBulkEmailInterface(selectedCreators);
        }, 5000); // 等待邮件生成进度完成
    }

    // 生成批量邮件界面
    function generateBulkEmailInterface(selectedCreators) {
        // 创建邮件列表HTML
        let emailListHTML = '';
        selectedCreators.forEach((creatorName, index) => {
            const template = creatorEmailTemplates[creatorName] || {
                subject: 'Earbud 智能翻译耳机合作邀请 - 多语言实时翻译功能',
                content: `尊敬的 ${creatorName} 博主：

您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。

我们的 Earbud 智能翻译耳机采用前沿 AI 技术，支持 40+ 种语言的实时翻译，并配备高清音质和先进的降噪技术。我们相信这款产品非常适合您的频道受众。

期待您的回复！

祝好，
[您的名字]
Earbud 产品运营经理`
            };

            const emailPreview = template.content.substring(0, 100) + '...';

            emailListHTML += `
                <div class="email-item" data-creator="${creatorName}">
                    <div class="email-item-header">
                        <div class="email-item-left">
                            <input type="checkbox" id="email-${creatorName}" class="email-checkbox" data-creator="${creatorName}" checked>
                            <label for="email-${creatorName}" class="email-checkbox-label"></label>
                            <div class="email-recipient">${creatorName}</div>
                        </div>
                        <div class="email-status pending">待发送</div>
                    </div>
                    <div class="email-preview">${emailPreview}</div>
                    <div class="email-actions">
                        <button class="email-action-btn edit-email-btn" data-creator="${creatorName}">
                            <i class="ri-edit-line"></i> 编辑
                        </button>
                        <button class="email-action-btn cancel-email-btn" data-creator="${creatorName}">
                            <i class="ri-close-line"></i> 取消发送
                        </button>
                        <button class="email-action-btn primary send-single-email-btn" data-creator="${creatorName}">
                            <i class="ri-send-plane-line"></i> 发送
                        </button>
                    </div>
                </div>
            `;
        });

        // 创建选中博主列表，每个博主都有复选框
        let selectedCreatorsList = '';
        selectedCreators.forEach(name => {
            selectedCreatorsList += `
                <div class="selected-creator-item">
                    <input type="checkbox" id="quick-${name}" class="quick-creator-checkbox" data-creator="${name}" checked>
                    <label for="quick-${name}" class="quick-creator-label">${name}</label>
                </div>
            `;
        });

        // 生成批量邮件界面HTML
        const bulkEmailHTML = `
            <div class="bulk-email-container">
                <div class="bulk-email-header">
                    <div class="bulk-email-title">
                        <i class="ri-mail-send-line"></i> 批量邮件管理
                    </div>
                    <div class="bulk-email-stats">
                        共 ${selectedCreators.length} 个达人
                    </div>
                </div>
                <div class="bulk-email-content">
                    <div class="selected-creators-section">
                        <div class="section-title">选中的博主 (${selectedCreators.length}):</div>
                        <div class="selected-creators-list">
                            ${selectedCreatorsList}
                        </div>
                    </div>
                    <div class="email-list-container">
                        ${emailListHTML}
                    </div>
                </div>
                <div class="bulk-actions">
                    <div class="bulk-actions-left">
                        <button class="bulk-action-btn secondary select-all-emails-btn">
                            <i class="ri-checkbox-multiple-line"></i> 全选
                        </button>
                        <button class="bulk-action-btn secondary preview-email-btn">
                            <i class="ri-eye-line"></i> 预览邮件
                        </button>
                    </div>
                    <div class="bulk-actions-right">
                        <button class="bulk-action-btn secondary regenerate-all-btn">
                            <i class="ri-refresh-line"></i> 重新生成全部
                        </button>
                        <button class="bulk-action-btn primary send-all-emails-btn">
                            <i class="ri-send-plane-fill"></i> 一键发送全部
                        </button>
                    </div>
                </div>
            </div>
        `;

        addAIMessage(bulkEmailHTML);

        // 添加交互功能
        setTimeout(() => {
            setupBulkEmailInteractions(selectedCreators);
        }, 500);
    }

    // 设置批量邮件交互功能
    function setupBulkEmailInteractions(selectedCreators) {
        // 单独发送按钮
        const sendSingleBtns = document.querySelectorAll('.send-single-email-btn');
        sendSingleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const creatorName = this.dataset.creator;
                sendSingleEmail(creatorName);
            });
        });

        // 编辑邮件按钮
        const editEmailBtns = document.querySelectorAll('.edit-email-btn');
        editEmailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const creatorName = this.dataset.creator;
                showEmailEditModal(creatorName);
            });
        });

        // 取消发送按钮
        const cancelEmailBtns = document.querySelectorAll('.cancel-email-btn');
        cancelEmailBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const creatorName = this.dataset.creator;
                cancelEmailSending(creatorName);
            });
        });

        // 快速复选框变化（选中的博主列表中的复选框）
        const quickCheckboxes = document.querySelectorAll('.quick-creator-checkbox');
        quickCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const creatorName = this.dataset.creator;
                // 同步到对应的邮件项复选框
                const emailCheckbox = document.querySelector(`.email-checkbox[data-creator="${creatorName}"]`);
                if (emailCheckbox) {
                    emailCheckbox.checked = this.checked;
                    emailCheckbox.dispatchEvent(new Event('change'));
                }
            });
        });

        // 邮件复选框变化
        const emailCheckboxes = document.querySelectorAll('.email-checkbox');
        emailCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const creatorName = this.dataset.creator;
                const emailItem = this.closest('.email-item');

                // 同步到快速复选框
                const quickCheckbox = document.querySelector(`.quick-creator-checkbox[data-creator="${creatorName}"]`);
                if (quickCheckbox) {
                    quickCheckbox.checked = this.checked;
                }

                if (this.checked) {
                    emailItem.classList.remove('email-cancelled');
                    emailItem.querySelector('.email-status').textContent = '待发送';
                    emailItem.querySelector('.email-status').className = 'email-status pending';
                } else {
                    emailItem.classList.add('email-cancelled');
                    emailItem.querySelector('.email-status').textContent = '已取消';
                    emailItem.querySelector('.email-status').className = 'email-status cancelled';
                }
            });
        });

        // 一键发送全部按钮
        const sendAllBtn = document.querySelector('.send-all-emails-btn');
        if (sendAllBtn) {
            sendAllBtn.addEventListener('click', function() {
                console.log('一键发送全部按钮被点击');

                // 只发送选中的邮件
                const checkedCreators = [];
                emailCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkedCreators.push(checkbox.dataset.creator);
                    }
                });

                console.log('选中的博主:', checkedCreators);

                if (checkedCreators.length === 0) {
                    alert('请至少选择一个博主');
                    return;
                }

                // 确保函数存在后再调用
                if (typeof sendAllEmails === 'function') {
                    sendAllEmails(checkedCreators);
                } else {
                    console.error('sendAllEmails function not found');
                    // 备用方案：直接显示成功消息
                    setTimeout(() => {
                        showBulkEmailSuccess(checkedCreators);
                    }, 2000);
                }
            });
        }

        // 重新生成全部按钮
        const regenerateAllBtn = document.querySelector('.regenerate-all-btn');
        if (regenerateAllBtn) {
            regenerateAllBtn.addEventListener('click', function() {
                regenerateAllEmails(selectedCreators);
            });
        }

        // 预览邮件按钮
        const previewBtn = document.querySelector('.preview-email-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', function() {
                showEmailPreviewModal(selectedCreators[0]);
            });
        }
    }

    // 取消邮件发送函数
    function cancelEmailSending(creatorName) {
        const emailItem = document.querySelector(`[data-creator="${creatorName}"]`);
        const checkbox = emailItem.querySelector('.email-checkbox');

        if (checkbox) {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        }

        // 显示取消确认
        addAIMessage(`已取消向 ${creatorName} 发送邮件`);
    }

    // 重新生成所有邮件
    function regenerateAllEmails(selectedCreators) {
        addAIMessage('正在重新生成所有邮件...');

        setTimeout(() => {
            generateBulkEmailInterface(selectedCreators);
        }, 2000);
    }

    // 显示邮件编辑模态框
    function showEmailEditModal(creatorName) {
        const template = creatorEmailTemplates[creatorName] || {
            subject: 'Earbud 智能翻译耳机合作邀请 - 多语言实时翻译功能',
            content: `尊敬的 ${creatorName} 博主：

您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。

我们的 Earbud 智能翻译耳机采用前沿 AI 技术，支持 40+ 种语言的实时翻译，并配备高清音质和先进的降噪技术。我们相信这款产品非常适合您的频道受众。

期待您的回复！

祝好，
[您的名字]
Earbud 产品运营经理`
        };

        const modalHTML = `
            <div class="email-edit-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                <div class="email-edit-content" style="background: var(--surface-color); border-radius: 8px; padding: 20px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <div class="email-edit-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3>编辑邮件 - ${creatorName}</h3>
                        <button class="close-modal-btn" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                    </div>
                    <div class="email-edit-form">
                        <div class="email-field" style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 500;">邮件主题:</label>
                            <input type="text" class="edit-subject-input" value="${template.subject}" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;">
                        </div>
                        <div class="email-field">
                            <label style="display: block; margin-bottom: 5px; font-weight: 500;">邮件内容:</label>
                            <textarea class="edit-content-input" rows="15" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical;">${template.content}</textarea>
                        </div>
                    </div>
                    <div class="email-edit-actions" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                        <button class="cancel-edit-btn" style="padding: 8px 16px; border: 1px solid var(--border-color); background: var(--surface-color); border-radius: 4px; cursor: pointer;">取消</button>
                        <button class="save-edit-btn" style="padding: 8px 16px; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">保存</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // 添加模态框交互
        const modal = document.querySelector('.email-edit-modal');
        const closeBtn = modal.querySelector('.close-modal-btn');
        const cancelBtn = modal.querySelector('.cancel-edit-btn');
        const saveBtn = modal.querySelector('.save-edit-btn');

        function closeModal() {
            modal.remove();
        }

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        saveBtn.addEventListener('click', function() {
            const newSubject = modal.querySelector('.edit-subject-input').value;
            const newContent = modal.querySelector('.edit-content-input').value;

            // 更新邮件模板
            creatorEmailTemplates[creatorName] = {
                subject: newSubject,
                content: newContent
            };

            // 更新预览
            const emailItem = document.querySelector(`[data-creator="${creatorName}"]`);
            const preview = emailItem.querySelector('.email-preview');
            preview.textContent = newContent.substring(0, 100) + '...';

            closeModal();
            addAIMessage(`✅ 已更新 ${creatorName} 的邮件内容`);
        });
    }

    // 显示邮件预览模态框
    function showEmailPreviewModal(creatorName) {
        const template = creatorEmailTemplates[creatorName] || {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '邮件内容...'
        };

        const modalHTML = `
            <div class="email-preview-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                <div class="email-preview-content" style="background: var(--surface-color); border-radius: 8px; padding: 20px; max-width: 700px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <div class="email-preview-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3>邮件预览 - ${creatorName}</h3>
                        <button class="close-preview-btn" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                    </div>
                    <div class="email-preview-body">
                        <div style="border: 1px solid var(--border-color); border-radius: 4px; padding: 15px;">
                            <div style="margin-bottom: 10px;"><strong>收件人:</strong> ${creatorName}</div>
                            <div style="margin-bottom: 15px;"><strong>主题:</strong> ${template.subject}</div>
                            <div style="border-top: 1px solid var(--border-color); padding-top: 15px; white-space: pre-wrap; line-height: 1.6;">${template.content}</div>
                        </div>
                    </div>
                    <div class="email-preview-actions" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                        <button class="close-preview-btn" style="padding: 8px 16px; border: 1px solid var(--border-color); background: var(--surface-color); border-radius: 4px; cursor: pointer;">关闭</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // 添加关闭功能
        const modal = document.querySelector('.email-preview-modal');
        const closeBtns = modal.querySelectorAll('.close-preview-btn');

        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modal.remove();
            });
        });
    }

    // 发送单个邮件
    function sendSingleEmail(creatorName) {
        const emailItem = document.querySelector(`[data-creator="${creatorName}"]`);
        const statusElement = emailItem.querySelector('.email-status');
        const sendBtn = emailItem.querySelector('.send-single-email-btn');

        // 更新状态为发送中
        statusElement.textContent = '发送中...';
        statusElement.className = 'email-status sending';
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="ri-loader-line"></i> 发送中';

        // 模拟发送延迟
        setTimeout(() => {
            statusElement.textContent = '已发送';
            statusElement.className = 'email-status sent';
            sendBtn.innerHTML = '<i class="ri-check-line"></i> 已发送';
            sendBtn.disabled = true;

            // 显示成功提示
            showSingleEmailSuccess(creatorName);
        }, 2000);
    }

    // 一键发送全部邮件
    function sendAllEmails(selectedCreators) {
        console.log('sendAllEmails called with:', selectedCreators);

        if (!selectedCreators || selectedCreators.length === 0) {
            console.error('No creators selected for sending emails');
            return;
        }

        const sendAllBtn = document.querySelector('.send-all-emails-btn');
        if (!sendAllBtn) {
            console.error('Send all button not found');
            return;
        }

        sendAllBtn.disabled = true;
        sendAllBtn.innerHTML = '<i class="ri-loader-line"></i> 发送中...';

        // 逐个发送邮件
        let sentCount = 0;
        selectedCreators.forEach((creatorName, index) => {
            setTimeout(() => {
                console.log(`Sending email to ${creatorName}, count: ${sentCount + 1}/${selectedCreators.length}`);

                const emailItem = document.querySelector(`[data-creator="${creatorName}"]`);
                if (emailItem) {
                    const statusElement = emailItem.querySelector('.email-status');
                    const sendBtn = emailItem.querySelector('.send-single-email-btn');

                    if (statusElement) {
                        statusElement.textContent = '已发送';
                        statusElement.className = 'email-status sent';
                    }

                    if (sendBtn) {
                        sendBtn.innerHTML = '<i class="ri-check-line"></i> 已发送';
                        sendBtn.disabled = true;
                    }
                }

                sentCount++;

                // 更新发送按钮文本
                sendAllBtn.innerHTML = `<i class="ri-loader-line"></i> 已发送 ${sentCount}/${selectedCreators.length}`;

                // 全部发送完成
                if (sentCount === selectedCreators.length) {
                    console.log('All emails sent, calling showBulkEmailSuccess');
                    setTimeout(() => {
                        showBulkEmailSuccess(selectedCreators);
                    }, 500);
                }
            }, index * 500); // 每个邮件间隔500ms发送
        });
    }

    // 显示单个邮件发送成功
    function showSingleEmailSuccess(creatorName) {
        addAIMessage(`✅ 已成功向 ${creatorName} 发送建联邮件！`);
    }

    // 显示批量邮件发送成功
    function showBulkEmailSuccess(selectedCreators) {
        console.log('showBulkEmailSuccess called with:', selectedCreators);

        if (!selectedCreators || selectedCreators.length === 0) {
            console.error('No creators provided to showBulkEmailSuccess');
            return;
        }

        const successHTML = `
            <div class="email-sent-success">
                <div class="success-icon">
                    <i class="ri-mail-check-line"></i>
                </div>
                <div class="success-message">
                    <h4>批量邮件发送成功！</h4>
                    <p>已成功向 ${selectedCreators.length} 位达人发送建联邮件。</p>
                </div>
                <div class="success-details">
                    <div class="detail-item">
                        <i class="ri-time-line"></i>
                        <span>发送时间: ${new Date().toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <i class="ri-user-line"></i>
                        <span>收件人: ${selectedCreators.length} 位达人</span>
                    </div>
                </div>
                <div class="next-steps">
                    <h5>后续跟进:</h5>
                    <ul>
                        <li>所有达人信息已添加到建联记录中</li>
                        <li>您可以在「建联记录」中查看详情并跟进进展</li>
                        <li>我们将自动同步邮件往来到建联记录中</li>
                    </ul>
                </div>
                <div class="success-actions">
                    <button class="continue-ai-btn"><i class="ri-robot-line"></i> 继续使用AI助手</button>
                    <button class="view-outreach-btn primary-btn"><i class="ri-eye-line"></i> 查看建联记录</button>
                </div>
            </div>
        `;

        console.log('Adding success message to chat');
        addAIMessage(successHTML);

        // 添加按钮交互
        setTimeout(() => {
            const viewOutreachBtn = document.querySelector('.view-outreach-btn');
            const continueAiBtn = document.querySelector('.continue-ai-btn');

            if (viewOutreachBtn) {
                viewOutreachBtn.addEventListener('click', function() {
                    // 切换到建联记录页面
                    const buildLinkMenuItem = document.querySelector('.menu-item:nth-child(4)');
                    if (buildLinkMenuItem) {
                        const menuItemContent = buildLinkMenuItem.querySelector('.menu-item-content');
                        if (menuItemContent) {
                            menuItemContent.click();
                        }
                    }
                });
            }

            if (continueAiBtn) {
                continueAiBtn.addEventListener('click', function() {
                    // 继续使用AI助手
                    addAIMessage('还有什么我可以帮助您的吗？');
                });
            }
        }, 500);
    }

    // 原有的邮件生成函数（保留用于兼容性）
    function generateEmailsOld(selectedCreators) {
        // 显示邮件生成进度
        showEmailGenerationProgress();

        // 模拟延迟生成邮件
        setTimeout(() => {
            // 创建选中博主列表
            let selectedCreatorsList = '';
            selectedCreators.forEach(name => {
                selectedCreatorsList += `<div class="selected-creator-item">${name}</div>`;
            });

            // 创建博主切换选项
            let creatorSwitchOptions = '';
            selectedCreators.forEach((name, index) => {
                const isActive = index === 0 ? 'active' : '';
                creatorSwitchOptions += `
                    <div class="creator-switch-option ${isActive}" data-creator="${name}">
                        ${name}
                    </div>
                `;
            });

            // 获取第一个博主的邮件模板
            const firstCreator = selectedCreators[0];
            const firstTemplate = creatorEmailTemplates[firstCreator] || {
                subject: 'Earbud 智能翻译耳机合作邀请 - 多语言实时翻译功能',
                content: `尊敬的 ${firstCreator} 博主：

您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。

我们的 Earbud 智能翻译耳机采用前沿 AI 技术，支持 40+ 种语言的实时翻译，并配备高清音质和先进的降噪技术。我们相信这款产品非常适合您的频道受众。

期待您的回复！

祝好，
[您的名字]
Earbud 产品运营经理`
            };

            // 生成邮件预览卡片
            const emailPreviewHTML = `
                <div class="email-generation-container">
                    <div class="email-generation-header">
                        <h4><i class="ri-mail-line"></i> 建联邮件生成结果</h4>
                    </div>
                    <div class="email-generation-content">
                        <div class="selected-creators-section">
                            <div class="section-title">选中的博主 (${selectedCreators.length}):</div>
                            <div class="selected-creators-list">
                                ${selectedCreatorsList}
                            </div>
                        </div>

                        ${selectedCreators.length > 1 ? `
                        <div class="creator-switch-section">
                            <div class="section-title">查看不同博主的邮件:</div>
                            <div class="creator-switch-container">
                                ${creatorSwitchOptions}
                            </div>
                        </div>
                        ` : ''}

                        <div class="email-preview-section">
                            <div class="section-title">邮件预览:</div>
                            <div class="email-preview-container">
                                <div class="email-preview-header">
                                    <div class="email-field">
                                        <div class="email-field-label">收件人:</div>
                                        <div class="email-field-value current-recipient">${firstCreator}</div>
                                    </div>
                                    <div class="email-field">
                                        <div class="email-field-label">主题:</div>
                                        <div class="email-field-value">
                                            <input type="text" class="email-subject-input" value="${firstTemplate.subject}">
                                        </div>
                                    </div>
                                </div>
                                <div class="email-preview-body">
                                    <textarea class="email-body-input" rows="15">${firstTemplate.content}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="email-generation-actions">
                        <button class="regenerate-email-btn"><i class="ri-refresh-line"></i> 重新生成</button>
                        <button class="send-email-btn primary-btn"><i class="ri-send-plane-fill"></i> 发送邮件</button>
                    </div>
                </div>
            `;

            addAIMessage(emailPreviewHTML);

            // 添加邮件交互功能
            setTimeout(() => {
                const regenerateBtn = document.querySelector('.regenerate-email-btn');
                const sendEmailBtn = document.querySelector('.send-email-btn');
                const creatorSwitchOptions = document.querySelectorAll('.creator-switch-option');
                const emailSubjectInput = document.querySelector('.email-subject-input');
                const emailBodyInput = document.querySelector('.email-body-input');
                const currentRecipient = document.querySelector('.current-recipient');

                // 博主切换功能
                creatorSwitchOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        // 移除所有active状态
                        creatorSwitchOptions.forEach(opt => opt.classList.remove('active'));
                        // 添加当前选中的active状态
                        this.classList.add('active');

                        // 获取选中的博主名称
                        const selectedCreator = this.dataset.creator;

                        // 更新收件人显示
                        if (currentRecipient) {
                            currentRecipient.textContent = selectedCreator;
                        }

                        // 获取对应的邮件模板
                        const template = creatorEmailTemplates[selectedCreator] || {
                            subject: 'Earbud 智能翻译耳机合作邀请 - 多语言实时翻译功能',
                            content: `尊敬的 ${selectedCreator} 博主：

您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。

我们的 Earbud 智能翻译耳机采用前沿 AI 技术，支持 40+ 种语言的实时翻译，并配备高清音质和先进的降噪技术。我们相信这款产品非常适合您的频道受众。

期待您的回复！

祝好，
[您的名字]
Earbud 产品运营经理`
                        };

                        // 更新邮件主题和内容
                        if (emailSubjectInput) {
                            emailSubjectInput.value = template.subject;
                        }
                        if (emailBodyInput) {
                            emailBodyInput.value = template.content;
                        }

                        // 添加切换动画效果
                        emailBodyInput.style.opacity = '0.5';
                        setTimeout(() => {
                            emailBodyInput.style.opacity = '1';
                        }, 200);
                    });
                });

                // 重新生成按钮
                if (regenerateBtn) {
                    regenerateBtn.addEventListener('click', function() {
                        // 获取当前选中的博主
                        const activeOption = document.querySelector('.creator-switch-option.active');
                        const currentCreator = activeOption ? activeOption.dataset.creator : selectedCreators[0];

                        // 生成替代邮件内容
                        const alternativeTemplates = {
                            'MattVidPro AI': `尊敬的 MattVidPro AI 博主：

您好！我是 Earbud 智能翻译耳机的产品运营专员。您在AI技术应用和视频制作方面的专业内容深深吸引了我们的关注。

我们的 Earbud 智能翻译耳机代表了AI音频技术的最新突破，集成了深度学习翻译模型和先进的音频处理算法。这款产品的技术创新点正好符合您频道的内容方向。

我们诚邀您体验并评测这款产品，从技术角度为您的观众解析AI翻译的实现原理和应用价值。

合作详情：
- 产品免费试用（价值$99）
- 技术合作费用：$1,800-$2,800
- 提供技术文档和开发团队访谈
- 专属粉丝优惠码

期待与您探讨AI技术的无限可能！

技术致敬，
[您的名字]
Earbud 产品运营专员`,
                            'Two Minute Papers': `尊敬的 Two Minute Papers 研究团队：

您好！我是 Earbud 智能翻译耳机的产品运营专员。您对AI研究前沿的深度报道和学术视角让我们深受启发。

我们的产品基于最新的多模态AI架构，实现了端到端的语音翻译pipeline。从技术角度看，这涉及了语音识别、语义理解、跨语言生成等多个AI子领域的协同工作。

我们希望邀请您从研究角度分析这款产品的技术实现和创新价值，为学术界和工业界搭建桥梁。

研究合作方案：
- 提供完整技术架构文档
- 合作费用：$3,500-$5,500
- 安排技术团队学术交流
- 优先获得技术论文发布权

期待您的学术洞察！

学术敬礼，
[您的名字]
Earbud 产品运营专员`
                        };

                        const alternativeContent = alternativeTemplates[currentCreator] || `尊敬的 ${currentCreator} 博主：

您好！我是 Earbud 智能翻译耳机的产品运营专员。我们对您在相关领域的专业表现印象深刻。

我们的 Earbud 智能翻译耳机是一款创新的AI产品，希望能与您合作，为您的观众带来有价值的内容。

期待您的回复！

诚挚问候，
[您的名字]
Earbud 产品运营专员`;

                        if (emailBodyInput) {
                            emailBodyInput.value = alternativeContent;
                        }
                    });
                }

                // 发送邮件按钮
                if (sendEmailBtn) {
                    sendEmailBtn.addEventListener('click', function() {
                        // 显示发送中的消息
                        addAIMessage('正在发送邮件，请稍候...');

                        // 模拟发送延迟
                        setTimeout(() => {
                            showEmailSentSuccess(selectedCreators);
                        }, 2000);
                    });
                }
            }, 500);
        }, 5000); // 等待邮件生成进度完成（4.5秒 + 0.5秒缓冲）
    }

    // 显示邮件发送成功提示
    function showEmailSentSuccess(selectedCreators) {
        // 生成成功提示消息
        const successHTML = `
            <div class="email-sent-success">
                <div class="success-icon">
                    <i class="ri-mail-check-line"></i>
                </div>
                <div class="success-message">
                    <h4>邮件发送成功！</h4>
                    <p>已成功向 ${selectedCreators.length} 位博主发送建联邮件。</p>
                </div>
                <div class="success-details">
                    <div class="detail-item">
                        <i class="ri-time-line"></i>
                        <span>发送时间: ${new Date().toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <i class="ri-user-line"></i>
                        <span>收件人: ${selectedCreators.join(', ')}</span>
                    </div>
                </div>
                <div class="next-steps">
                    <h5>后续跟进:</h5>
                    <ul>
                        <li>博主信息已添加到建联记录中</li>
                        <li>您可以在「建联记录」中查看详情并跟进进展</li>
                        <li>我们将自动同步邮件往来到建联记录中</li>
                    </ul>
                </div>
                <div class="success-actions">
                    <button class="view-outreach-btn primary-btn"><i class="ri-file-list-3-line"></i> 查看建联记录</button>
                    <button class="continue-ai-btn"><i class="ri-robot-line"></i> 继续使用AI助手</button>
                </div>
            </div>
        `;

        addAIMessage(successHTML);

        // 添加按钮交互
        setTimeout(() => {
            const viewOutreachBtn = document.querySelector('.view-outreach-btn');
            const continueAiBtn = document.querySelector('.continue-ai-btn');

            if (viewOutreachBtn) {
                viewOutreachBtn.addEventListener('click', function() {
                    // 切换到建联记录页面
                    const outreachMenuItem = document.querySelector('.menu-item:nth-child(4)');
                    if (outreachMenuItem) {
                        const menuItemContent = outreachMenuItem.querySelector('.menu-item-content');
                        if (menuItemContent) {
                            menuItemContent.click();
                        }
                    }
                });
            }

            if (continueAiBtn) {
                continueAiBtn.addEventListener('click', function() {
                    // 确保输入框隐藏
                    const inputArea = document.querySelector('.input-area');
                    if (inputArea) inputArea.style.display = 'none';

                    // 添加新的提示消息
                    addAIMessage('建联邮件已发送成功！您还需要分析其他商品或查找更多博主吗？');

                    // 添加快速操作按钮
                    setTimeout(() => {
                        addAIMessage(`
                            <div class="quick-actions">
                                <button class="quick-action-btn" onclick="document.querySelector('.menu-item.has-submenu .submenu-item.new-product').click()">
                                    <i class="ri-add-line"></i> 分析新商品
                                </button>
                                <button class="quick-action-btn view-outreach-records-btn">
                                    <i class="ri-file-list-3-line"></i> 查看建联记录
                                </button>
                            </div>
                        `);

                        // 添加查看建联记录按钮的点击事件
                        setTimeout(() => {
                            const viewOutreachRecordsBtn = document.querySelector('.view-outreach-records-btn');
                            if (viewOutreachRecordsBtn) {
                                viewOutreachRecordsBtn.addEventListener('click', function() {
                                    // 切换到建联记录页面
                                    const outreachMenuItem = document.querySelector('.menu-item:nth-child(4)');
                                    if (outreachMenuItem) {
                                        const menuItemContent = outreachMenuItem.querySelector('.menu-item-content');
                                        if (menuItemContent) {
                                            menuItemContent.click();
                                        }
                                    }
                                });
                            }
                        }, 100);
                    }, 500);
                });
            }
        }, 500);
    }

    // 显示创作者详情
    function displayCreatorDetail(creatorName) {
        // 这里可以实现详情展示，例如弹出一个模态框
        alert(`查看 ${creatorName} 的详细信息将在此实现`);
    }

    // 翻译功能
    window.toggleTranslation = function(button) {
        const emailContent = button.closest('.email-content');
        const translatedText = emailContent.querySelector('.translated-text');
        const icon = button.querySelector('i');

        if (translatedText.style.display === 'none') {
            translatedText.style.display = 'block';
            icon.className = 'ri-translate-2';
            button.style.backgroundColor = 'var(--success-pale)';
            button.style.color = 'var(--success-dark)';
        } else {
            translatedText.style.display = 'none';
            icon.className = 'ri-translate-2';
            button.style.backgroundColor = 'var(--primary-pale)';
            button.style.color = 'var(--primary-color)';
        }
    };

    // 添加用户消息到聊天窗口
    function addUserMessage(text) {
        const chatContainer = document.querySelector('.chat-container');
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        const messageHTML = `
            <div class="message user-message">
                <img src="https://placehold.co/36x36/607d8b/ffffff?text=U" alt="用户头像" class="message-avatar">
                <div>
                    <div class="message-content">
                        ${text}
                    </div>
                    <div class="message-time">${timeStr}</div>
                </div>
            </div>
        `;

        chatContainer.insertAdjacentHTML('beforeend', messageHTML);

        // 滚动到底部
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 添加AI消息到聊天窗口
    function addAIMessage(text) {
        console.log('addAIMessage called with text length:', text.length);

        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) {
            console.error('Chat container not found');
            return;
        }

        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

        // 检查是否包含需要更宽显示的内容
        const needsWideDisplay = text.includes('product-analysis-card') ||
                                text.includes('analysis-steps') ||
                                text.includes('creators-recommendation-container') ||
                                text.includes('email-generation-container') ||
                                text.includes('email-sent-success');

        const wideClass = needsWideDisplay ? ' wide-message' : '';

        const messageHTML = `
            <div class="message ai-message${wideClass}">
                <div class="ai-avatar message-avatar">
                    <i class="ri-robot-line"></i>
                </div>
                <div>
                    <div class="message-content">
                        ${text}
                    </div>
                    <div class="message-time">${timeStr}</div>
                </div>
            </div>
        `;

        try {
            chatContainer.insertAdjacentHTML('beforeend', messageHTML);
            console.log('Message added successfully');
        } catch (error) {
            console.error('Error adding message to chat:', error);
        }

        // 滚动到底部 - 增强Chrome兼容性
        setTimeout(() => {
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
                // Chrome特殊处理
                if (navigator.userAgent.includes('Chrome')) {
                    chatContainer.style.scrollBehavior = 'auto';
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                    setTimeout(() => {
                        chatContainer.style.scrollBehavior = 'smooth';
                    }, 10);
                }
            }
        }, 10);
    }

    // 模拟AI回复
    function simulateAIResponse(userMessage) {
        if (userMessage.includes('推荐') || userMessage.includes('达人') || userMessage.includes('网红') || userMessage.includes('博主')) {
            addAIMessage('请先提供商品链接，让我分析产品特性，以便为您匹配最合适的博主。您可以输入商品URL或者直接描述产品特性。');

            setTimeout(() => {
                const exampleText = `
                    <div style="margin-top: 10px;">
                        <div>例如：</div>
                        <div class="suggestion-tag">https://example.com/earbud-product</div>
                        <div class="suggestion-tag">请分析这个耳机产品</div>
                    </div>
                `;
                addAIMessage(exampleText);
            }, 800);
        } else if (userMessage.toLowerCase().includes('json') || userMessage.toLowerCase().includes('数据')) {
            const jsonData = `
                <div class="ai-json">
\`\`\`json
{
  "productAnalysis": {
    "name": "Earbud 智能翻译耳机",
    "category": "电子产品",
    "price": "50-100元",
    "features": [
      "多语言实时翻译",
      "AI语音助手",
      "高清音质",
      "降噪技术",
      "长续航",
      "防水设计"
    ],
    "targetAudience": [
      "商务人士",
      "旅行者",
      "科技爱好者"
    ],
    "featureTags": [
      "智能翻译",
      "语音识别",
      "降噪技术",
      "便携设计",
      "长续航"
    ],
    "audienceTags": [
      "商务精英",
      "国际旅行者",
      "科技发烧友",
      "语言学习者"
    ],
    "usageScenarioTags": [
      "商务会议",
      "国际旅行",
      "语言学习",
      "日常通勤",
      "健身运动"
    ],
    "coreContentDirection": [
      "AI技术应用",
      "跨语言沟通",
      "智能穿戴设备",
      "旅行科技装备"
    ],
    "overallPersonaAndStyle": [
      "科技前沿",
      "国际化视野",
      "高效便捷",
      "专业可靠"
    ],
    "mainAudience": [
      "25-45岁职场人士",
      "年收入10万+",
      "经常出差或旅行",
      "对新科技敏感"
    ]
  },
  "recommendedCreators": [
    {
      "name": "MattVidPro AI",
      "subscribers": 286700,
      "avgViews": 323000,
      "relevanceScore": 0.92,
      "contentFocus": ["AI技术", "科技评测", "新品体验"],
      "audienceMatch": 0.89,
      "contactCost": "$1500-$2000"
    },
    {
      "name": "Two Minute Papers",
      "subscribers": 1620000,
      "avgViews": 157000,
      "relevanceScore": 0.89,
      "contentFocus": ["AI研究", "科技创新", "技术解析"],
      "audienceMatch": 0.82,
      "contactCost": "$3000-$5000"
    }
  ]
}
\`\`\`
                </div>
            `;
            addAIMessage(jsonData);
        } else if (userMessage.includes('案例') || userMessage.includes('成功')) {
            setTimeout(() => {
                const caseStudyText = `
                    <div>
                        <h4 style="margin: 0 0 10px 0;">近期成功合作案例:</h4>
                        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 10px;">
                            <div style="font-weight: 500;">索尼 WF-1000XM4 降噪耳机 × TechAudio评测</div>
                            <div style="font-size: 13px; margin: 5px 0;">• 58万次观看 | 3.2万点赞 | 投入费用: $2,800</div>
                            <div style="font-size: 14px;">通过专业视听博主的深度评测，强调产品的降噪性能和音质，带来了2.7万访问量和约4,500台的销售。</div>
                        </div>

                        <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 10px;">
                            <div style="font-weight: 500;">小米Buds 4 Pro × 数码生活博主</div>
                            <div style="font-size: 13px; margin: 5px 0;">• 112万次观看 | 8.5万点赞 | 投入费用: $5,500</div>
                            <div style="font-size: 14px;">通过生活方式和使用场景演示，展示产品的便携性和多场景应用，促进了1.3万台销售，投资回报率达到780%。</div>
                        </div>
                    </div>
                `;
                addAIMessage(caseStudyText);
            }, 500);
        } else {
            // 默认回复
            const defaultResponses = [
                '要开始匹配合适的YouTube博主，请先分享商品链接或描述您的产品，我将为您进行分析并推荐最合适的创作者。',
                '您可以输入商品链接，我会自动分析产品特性并匹配最适合的YouTube创作者。',
                '为了给您推荐最合适的合作伙伴，请先告诉我您的产品信息，可以是链接或详细描述。'
            ];

            const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
            addAIMessage(randomResponse);
        }
    }

    // 新建商品分析会话相关交互
    const centralInput = document.querySelector('.central-input');
    const centralSendButton = document.querySelector('.central-send-button');
    const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

    // 快速提示按钮点击事件
    if (quickPromptBtns) {
        quickPromptBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const promptText = this.getAttribute('data-prompt');

                if (promptText === 'demo') {
                    // 直接模拟分析流程，无需输入
                    simulateProductAnalysis();
                } else if (promptText === 'independent-demo') {
                    // 独立站商品演示模式
                    simulateIndependentStoreAnalysis();
                } else {
                    // 填充输入框
                    if (centralInput) {
                        centralInput.value = promptText;
                        centralInput.focus();
                    }
                }
            });
        });
    }

    // 中央输入框发送按钮点击事件
    if (centralSendButton) {
        centralSendButton.addEventListener('click', function() {
            if (centralInput && centralInput.value.trim()) {
                const inputText = centralInput.value.trim();
                simulateProductAnalysis(inputText);
            }
        });
    }

    // 加号按钮点击事件 - 触发添加商品流程
    const addProductBtn = document.getElementById('add-product-btn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            console.log('加号按钮被点击 - 触发添加商品流程');
            // 直接显示添加商品信息卡片，不显示抓取进度
            showAddProductFlow();
        });
    }

    // 中央输入框回车键发送
    if (centralInput) {
        centralInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (this.value.trim()) {
                    simulateProductAnalysis(this.value.trim());
                }
            }
        });
    }

    // 模拟商品分析流程
    function simulateProductAnalysis(inputText = '') {
        // 获取容器
        const newProductContainer = document.querySelector('.new-product-container');
        const chatContainer = document.querySelector('.chat-container');
        const aiAssistantContainer = document.querySelector('.ai-assistant-container');

        // 隐藏新建商品分析界面，显示聊天界面
        if (newProductContainer) newProductContainer.style.display = 'none';
        if (chatContainer) chatContainer.style.display = 'block';

        // 清空聊天内容
        if (chatContainer) {
            chatContainer.innerHTML = '';
        }

        // 添加用户消息（如果有输入）
        if (inputText) {
            addUserMessage(inputText);
        }

        // 显示分析进度，使用新的推理链式展示
        showAnalyzingProgress();

        // 调试滚动状态
        setTimeout(() => {
            debugScrolling();
        }, 1000);

        // 隐藏输入框，因为分析完成后不需要再显示
        const inputArea = document.querySelector('.input-area');
        if (inputArea) inputArea.style.display = 'none';

        // 第一步：显示链接抓取（独立对话气泡）
        setTimeout(() => {
            showLinkScrapingStepAsMessage();

            // 链接抓取完成后，直接进入特征提取流程
            setTimeout(() => {
                showFeatureExtractionProgress();
            }, 1500); // 链接抓取完成后1.5秒开始特征提取
        }, 3000); // 等待分析进度完成
    }

    // 添加商品流程 - 直接显示商品信息卡片
    function showAddProductFlow() {
        // 获取容器
        const newProductContainer = document.querySelector('.new-product-container');
        const chatContainer = document.querySelector('.chat-container');

        // 隐藏新建商品分析界面，显示聊天界面
        if (newProductContainer) newProductContainer.style.display = 'none';
        if (chatContainer) chatContainer.style.display = 'block';

        // 清空聊天内容
        if (chatContainer) {
            chatContainer.innerHTML = '';
        }

        // 隐藏输入框
        const inputArea = document.querySelector('.input-area');
        if (inputArea) inputArea.style.display = 'none';

        // 直接显示添加商品信息卡片
        showAddProductCompletionCard();
    }

    // 独立站商品演示分析流程
    function simulateIndependentStoreAnalysis(inputText = '') {
        // 获取容器
        const newProductContainer = document.querySelector('.new-product-container');
        const chatContainer = document.querySelector('.chat-container');

        // 隐藏新建商品分析界面，显示聊天界面
        if (newProductContainer) newProductContainer.style.display = 'none';
        if (chatContainer) chatContainer.style.display = 'block';

        // 清空聊天内容
        if (chatContainer) {
            chatContainer.innerHTML = '';
        }

        // 独立站演示模式不显示用户输入的链接消息
        // 直接开始分析流程

        // 显示分析进度，使用新的推理链式展示
        showAnalyzingProgress();

        // 隐藏输入框
        const inputArea = document.querySelector('.input-area');
        if (inputArea) inputArea.style.display = 'none';

        // 第一步：直接显示商品信息补全卡片（独立站特有）
        setTimeout(() => {
            showProductCompletionCard();
        }, 3000); // 等待分析进度完成
    }

    // 显示添加商品信息卡片
    function showAddProductCompletionCard() {
        const completionCard = `
            <div class="product-completion-card">
                <div class="completion-card-header">
                    <h4><i class="ri-add-box-line"></i> 添加商品信息</h4>
                </div>
                <div class="completion-form">
                    <div class="form-field">
                        <label>商品标题 <span class="required">*</span></label>
                        <input type="text" id="product_title" placeholder="请输入商品标题" value="">
                    </div>
                    <div class="form-field">
                        <label>商品价格 <span class="required">*</span></label>
                        <input type="text" id="price" placeholder="请输入价格（美元）" value="">
                    </div>
                    <div class="form-field image-upload-field">
                        <label>商品图片 <span class="required">*</span></label>
                        <div class="upload-options">
                            <div class="upload-option">
                                <label>图片链接</label>
                                <input type="url" id="product_image_url" placeholder="请输入图片URL链接">
                            </div>
                            <div class="upload-option">
                                <label>本地上传</label>
                                <div class="file-upload-wrapper">
                                    <input type="file" id="product_image_file" class="file-upload-input" accept="image/jpeg,image/jpg,image/png,image/webp">
                                    <div class="file-upload-button">
                                        <i class="fas fa-upload"></i>
                                        选择图片文件
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="image-preview-container" id="image-preview-container">
                            <img id="image-preview" class="image-preview" alt="图片预览">
                            <div class="preview-actions">
                                <button type="button" class="preview-action-btn remove" onclick="removeImagePreview()">
                                    <i class="fas fa-trash"></i> 移除
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="form-field">
                        <label>商品特点 <span class="required">*</span></label>
                        <textarea id="features" placeholder="请描述商品的主要特点和功能"></textarea>
                    </div>
                    <div class="form-field">
                        <label>详细描述 <span class="required">*</span></label>
                        <textarea id="description" placeholder="请输入商品的详细描述"></textarea>
                    </div>
                    <div class="form-field">
                        <label>商品类别 <span class="required">*</span></label>
                        <input type="text" id="category_source" placeholder="请输入商品类别" value="">
                    </div>
                    <div class="form-field">
                        <label>品牌名称 <span class="required">*</span></label>
                        <input type="text" id="brand_name" placeholder="请输入品牌名称" value="">
                    </div>
                </div>
                <div class="completion-actions">
                    <div class="completion-info">
                        <i class="ri-information-line"></i>
                        完善商品信息有助于提高建联效果
                    </div>
                    <button class="submit-completion-btn" onclick="submitAddProductCompletion()">
                        <i class="ri-check-line"></i>
                        添加商品
                    </button>
                </div>
                <div class="error-message" id="completion-error">
                    只有完善商品信息才能保证建联效果
                </div>
            </div>
        `;

        addAIMessage(completionCard);

        // 添加实时验证
        setTimeout(() => {
            setupCompletionValidation();
            setupImageUpload();
        }, 500);
    }

    // 显示商品信息补全卡片（独立站演示用）
    function showProductCompletionCard() {
        const completionCard = `
            <div class="product-completion-card">
                <div class="completion-card-header">
                    <h4><i class="ri-edit-box-line"></i> 完善商品信息</h4>
                </div>
                <div class="completion-form">
                    <div class="form-field">
                        <label>商品标题 <span class="required">*</span></label>
                        <input type="text" id="product_title" placeholder="请输入商品标题" value="AI 智能即时翻译耳机 Pro">
                    </div>
                    <div class="form-field">
                        <label>商品价格 <span class="required">*</span></label>
                        <input type="text" id="price" placeholder="请输入价格（美元）" value="$89.99">
                    </div>
                    <div class="form-field image-upload-field">
                        <label>商品图片 <span class="required">*</span></label>
                        <div class="upload-options">
                            <div class="upload-option">
                                <label>图片链接</label>
                                <input type="url" id="product_image_url" placeholder="请输入图片URL链接">
                            </div>
                            <div class="upload-option">
                                <label>本地上传</label>
                                <div class="file-upload-wrapper">
                                    <input type="file" id="product_image_file" class="file-upload-input" accept="image/jpeg,image/jpg,image/png,image/webp">
                                    <div class="file-upload-button">
                                        <i class="fas fa-upload"></i>
                                        选择图片文件
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="image-preview-container" id="image-preview-container">
                            <img id="image-preview" class="image-preview" alt="图片预览">
                            <div class="preview-actions">
                                <button type="button" class="preview-action-btn remove" onclick="removeImagePreview()">
                                    <i class="fas fa-trash"></i> 移除
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="form-field">
                        <label>商品特点 <span class="required">*</span></label>
                        <textarea id="features" placeholder="请描述商品的主要特点和功能">实时翻译40+语言，AI语音识别，高清音质，8小时续航，防水设计</textarea>
                    </div>
                    <div class="form-field">
                        <label>详细描述 <span class="required">*</span></label>
                        <textarea id="description" placeholder="请输入商品的详细描述"></textarea>
                    </div>
                    <div class="form-field">
                        <label>商品类别 <span class="required">*</span></label>
                        <input type="text" id="category_source" placeholder="请输入商品类别" value="电子产品/智能设备">
                    </div>
                    <div class="form-field">
                        <label>品牌名称 <span class="required">*</span></label>
                        <input type="text" id="brand_name" placeholder="请输入品牌名称" value="TechPro">
                    </div>
                </div>
                <div class="completion-actions">
                    <div class="completion-info">
                        <i class="ri-information-line"></i>
                        完善商品信息有助于提高建联效果
                    </div>
                    <button class="submit-completion-btn" onclick="submitProductCompletion()">
                        <i class="ri-check-line"></i>
                        提交信息
                    </button>
                </div>
                <div class="error-message" id="completion-error">
                    只有完善商品信息才能保证建联效果
                </div>
            </div>
        `;

        addAIMessage(completionCard);

        // 添加实时验证
        setTimeout(() => {
            setupCompletionValidation();
            setupImageUpload();
        }, 500);
    }

    // 设置图片上传功能
    function setupImageUpload() {
        const imageUrlInput = document.getElementById('product_image_url');
        const imageFileInput = document.getElementById('product_image_file');
        const previewContainer = document.getElementById('image-preview-container');
        const previewImage = document.getElementById('image-preview');

        // URL输入处理
        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', function() {
                const url = this.value.trim();
                if (url && isValidImageUrl(url)) {
                    showImagePreview(url);
                    // 清空文件输入
                    if (imageFileInput) imageFileInput.value = '';
                } else if (!url) {
                    hideImagePreview();
                }
            });
        }

        // 文件上传处理
        if (imageFileInput) {
            imageFileInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file && isValidImageFile(file)) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        showImagePreview(e.target.result);
                        // 清空URL输入
                        if (imageUrlInput) imageUrlInput.value = '';
                    };
                    reader.readAsDataURL(file);
                } else if (!file) {
                    hideImagePreview();
                }
            });
        }
    }

    // 验证图片URL
    function isValidImageUrl(url) {
        const imageExtensions = /\.(jpg|jpeg|png|webp|gif)$/i;
        try {
            const urlObj = new URL(url);
            return imageExtensions.test(urlObj.pathname) || url.includes('unsplash.com') || url.includes('images.');
        } catch {
            return false;
        }
    }

    // 验证图片文件
    function isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            alert('请选择有效的图片格式（JPG、PNG、WebP）');
            return false;
        }

        if (file.size > maxSize) {
            alert('图片文件大小不能超过5MB');
            return false;
        }

        return true;
    }

    // 显示图片预览
    function showImagePreview(src) {
        const previewContainer = document.getElementById('image-preview-container');
        const previewImage = document.getElementById('image-preview');

        if (previewContainer && previewImage) {
            previewImage.src = src;
            previewContainer.style.display = 'block';
        }
    }

    // 隐藏图片预览
    function hideImagePreview() {
        const previewContainer = document.getElementById('image-preview-container');
        if (previewContainer) {
            previewContainer.style.display = 'none';
        }
    }

    // 移除图片预览
    window.removeImagePreview = function() {
        const imageUrlInput = document.getElementById('product_image_url');
        const imageFileInput = document.getElementById('product_image_file');

        if (imageUrlInput) imageUrlInput.value = '';
        if (imageFileInput) imageFileInput.value = '';

        hideImagePreview();

        // 重新验证表单
        validateCompletionForm();
    }

    // 设置补全表单验证
    function setupCompletionValidation() {
        const fields = ['product_title', 'price', 'features', 'description', 'category_source', 'brand_name'];
        const submitBtn = document.querySelector('.submit-completion-btn');
        const errorMessage = document.getElementById('completion-error');

        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function() {
                    validateCompletionForm();
                });
                field.addEventListener('blur', function() {
                    validateField(this);
                });
            }
        });

        // 为图片字段添加验证
        const imageUrlInput = document.getElementById('product_image_url');
        const imageFileInput = document.getElementById('product_image_file');

        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', validateCompletionForm);
        }
        if (imageFileInput) {
            imageFileInput.addEventListener('change', validateCompletionForm);
        }

        function validateField(field) {
            const formField = field.closest('.form-field');
            if (field.value.trim() === '') {
                formField.classList.add('error');
            } else {
                formField.classList.remove('error');
            }
        }

        // 验证图片字段
        function validateImageField() {
            const imageUrlInput = document.getElementById('product_image_url');
            const imageFileInput = document.getElementById('product_image_file');

            const hasUrl = imageUrlInput && imageUrlInput.value.trim() !== '';
            const hasFile = imageFileInput && imageFileInput.files.length > 0;

            return hasUrl || hasFile;
        }

        function validateCompletionForm() {
            let allValid = true;

            // 验证基本字段
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field && field.value.trim() === '') {
                    allValid = false;
                }
            });

            // 验证图片字段
            if (!validateImageField()) {
                allValid = false;
            }

            if (submitBtn) {
                submitBtn.disabled = !allValid;
            }
        }

        // 将validateCompletionForm设为全局函数，供其他地方调用
        window.validateCompletionForm = validateCompletionForm;

        // 初始验证
        validateCompletionForm();
    }

    // 提交添加商品信息
    window.submitAddProductCompletion = function() {
        const fields = ['product_title', 'price', 'features', 'description', 'category_source', 'brand_name'];
        const errorMessage = document.getElementById('completion-error');
        let allValid = true;
        const formData = {};

        // 验证所有字段
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const formField = field.closest('.form-field');

            if (field.value.trim() === '') {
                formField.classList.add('error');
                allValid = false;
            } else {
                formField.classList.remove('error');
                formData[fieldId] = field.value.trim();
            }
        });

        // 验证图片字段
        const imageUrlInput = document.getElementById('product_image_url');
        const imageFileInput = document.getElementById('product_image_file');
        const imageFormField = document.querySelector('.image-upload-field');

        const hasUrl = imageUrlInput && imageUrlInput.value.trim() !== '';
        const hasFile = imageFileInput && imageFileInput.files.length > 0;

        if (!hasUrl && !hasFile) {
            if (imageFormField) imageFormField.classList.add('error');
            allValid = false;
        } else {
            if (imageFormField) imageFormField.classList.remove('error');

            // 保存图片信息
            if (hasUrl) {
                formData.product_image = imageUrlInput.value.trim();
                formData.image_type = 'url';
            } else if (hasFile) {
                formData.product_image = imageFileInput.files[0].name;
                formData.image_type = 'file';
                formData.image_file = imageFileInput.files[0];
            }
        }

        if (!allValid) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        // 禁用提交按钮，显示加载状态
        const submitBtn = document.querySelector('.submit-completion-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> 处理中...';

        // 模拟提交处理
        setTimeout(() => {
            // 更新按钮状态为已提交
            submitBtn.innerHTML = '<i class="ri-check-line"></i> 已添加';
            submitBtn.style.background = '#10b981'; // 绿色背景表示成功

            // 提交成功后，直接进入特征提取流程
            setTimeout(() => {
                showFeatureExtractionProgress();
            }, 1000);
        }, 1500);
    };

    // 提交商品补全信息（独立站演示用）
    window.submitProductCompletion = function() {
        const fields = ['product_title', 'price', 'features', 'description', 'category_source', 'brand_name'];
        const errorMessage = document.getElementById('completion-error');
        let allValid = true;
        const formData = {};

        // 验证所有字段
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const formField = field.closest('.form-field');

            if (field.value.trim() === '') {
                formField.classList.add('error');
                allValid = false;
            } else {
                formField.classList.remove('error');
                formData[fieldId] = field.value.trim();
            }
        });

        // 验证图片字段
        const imageUrlInput = document.getElementById('product_image_url');
        const imageFileInput = document.getElementById('product_image_file');
        const imageFormField = document.querySelector('.image-upload-field');

        const hasUrl = imageUrlInput && imageUrlInput.value.trim() !== '';
        const hasFile = imageFileInput && imageFileInput.files.length > 0;

        if (!hasUrl && !hasFile) {
            if (imageFormField) imageFormField.classList.add('error');
            allValid = false;
        } else {
            if (imageFormField) imageFormField.classList.remove('error');

            // 保存图片信息
            if (hasUrl) {
                formData.product_image = imageUrlInput.value.trim();
                formData.image_type = 'url';
            } else if (hasFile) {
                formData.product_image = imageFileInput.files[0].name;
                formData.image_type = 'file';
                formData.image_file = imageFileInput.files[0];
            }
        }

        if (!allValid) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        // 禁用提交按钮，显示加载状态
        const submitBtn = document.querySelector('.submit-completion-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> 处理中...';

        // 模拟提交处理
        setTimeout(() => {
            // 更新按钮状态为已提交
            submitBtn.innerHTML = '<i class="ri-check-line"></i> 已提交';
            submitBtn.style.background = '#10b981'; // 绿色背景表示成功

            // 提交成功后，显示链接抓取成功
            setTimeout(() => {
                showLinkScrapingStepAsMessage();

                // 链接抓取完成后，直接进入特征提取流程
                setTimeout(() => {
                    showFeatureExtractionProgress();
                }, 1500); // 链接抓取完成后1.5秒开始特征提取
            }, 500);
        }, 1500);
    };

    // 添加"查看更多推荐"按钮事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-more-btn')) {
            alert('将加载更多推荐的创作者');
        }

        if (e.target.classList.contains('contact-creator-btn')) {
            const creatorName = e.target.closest('.creator-card-large').querySelector('h3').textContent;
            alert(`已将 ${creatorName} 添加到建联列表，您可以在"建联记录"中查看并联系`);
        }
    });

    // YouTube博主卡片按钮交互
    if (document.querySelector('.influencer-container')) {
        document.querySelectorAll('.add-outreach-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = this.closest('.influencer-card').querySelector('.influencer-name').textContent;
                alert(`已将 ${name} 添加到建联记录！`);
            });
        });
        document.querySelectorAll('.view-detail-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = this.closest('.influencer-card').querySelector('.influencer-name').textContent;
                alert(`查看 ${name} 的详细信息`);
            });
        });
    }

    // 仪表盘交互
    if (document.querySelector('.dashboard-container')) {


        // 查看全部活动按钮
        const viewAllBtn = document.querySelector('#view-all-activities');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', function() {
                // 打开通知中心弹窗
                const notificationsModal = document.getElementById('notifications-modal');
                if (notificationsModal) {
                    notificationsModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // 防止背景滚动

                    // 切换到近期活动标签页
                    const activitiesTab = document.querySelector('.modal-tab[data-tab="activities"]');
                    if (activitiesTab) {
                        // 移除所有标签页的激活状态
                        document.querySelectorAll('.modal-tab').forEach(tab => {
                            tab.classList.remove('active');
                        });
                        // 激活近期活动标签页
                        activitiesTab.classList.add('active');
                        // 过滤显示近期活动
                        filterNotifications('activities');
                    }
                }
            });
        }

        // 快捷入口点击事件
        document.querySelectorAll('.shortcut-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const label = this.querySelector('.shortcut-label').textContent;
                alert(`点击了"${label}"快捷入口`);
            });
        });
    }

    // 数据分析页面功能
    // 初始化报表类型切换
    const reportTypeItems = document.querySelectorAll('.analytics-sidebar .nav-item');
    if (reportTypeItems.length > 0) {
        reportTypeItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有激活状态
                reportTypeItems.forEach(i => i.classList.remove('active'));
                // 添加当前项的激活状态
                this.classList.add('active');

                // 更新分析标题
                const reportTitle = this.querySelector('span').textContent;
                document.querySelector('.analytics-title').textContent = reportTitle + '分析';

                // 这里可以添加加载相应报表数据的逻辑
                initCharts();
            });
        });

        // 默认选中第一个报表类型
        reportTypeItems[0].click();
    }

    // 初始化时间选择器
    const timeOptions = document.querySelectorAll('.time-option');
    if (timeOptions.length > 0) {
        timeOptions.forEach(option => {
            option.addEventListener('click', function() {
                timeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                // 这里可以添加根据时间范围更新数据的逻辑
                initCharts();
            });
        });

        // 默认选中第一个时间选项
        timeOptions[0].classList.add('active');
    }

    // 初始化通知中心，默认显示近期活动页签
    function initNotificationCenter() {
        // 获取近期活动页签
        const activitiesTab = document.querySelector('.modal-tab[data-tab="activities"]');
        if (activitiesTab) {
            // 模拟点击近期活动页签
            setTimeout(() => {
                activitiesTab.click();
            }, 100);
        } else {
            // 如果找不到页签，直接调用过滤函数
            filterNotifications('activities');
        }
    }

    // 页面加载完成后初始化通知中心
    document.addEventListener('DOMContentLoaded', initNotificationCenter);

    // 为通知项添加图标前缀
    function addNotificationIcons() {
        // 获取所有通知项
        const notificationItemsFull = document.querySelectorAll('.notification-item-full');

        notificationItemsFull.forEach(item => {
            const contentContainer = item.querySelector('.notification-content-full');
            if (!contentContainer) return;

            const headerRow = contentContainer.querySelector('.notification-header-row');
            const titleElement = headerRow?.querySelector('.notification-title-full');
            const actionsElement = contentContainer.querySelector('.notification-actions');

            // 如果已经更新过，则跳过
            if (titleElement && titleElement.getAttribute('data-icon-added') === 'true') return;

            // 添加图标前缀
            if (titleElement) {
                titleElement.setAttribute('data-icon-added', 'true');

                // 更新操作按钮
                if (actionsElement) {
                    const buttons = actionsElement.querySelectorAll('.action-btn');
                    buttons.forEach(button => {
                        const text = button.textContent.trim();
                        button.setAttribute('title', text);
                    });
                }
            }
        });
    }

    // 初始更新通知图标
    setTimeout(addNotificationIcons, 300);

    // 监听标签页切换，确保在切换标签页时更新通知项
    const notificationModalTabs = document.querySelectorAll('.modal-tab');
    if (notificationModalTabs && notificationModalTabs.length > 0) {
        notificationModalTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 延迟执行，确保DOM已更新
                setTimeout(addNotificationIcons, 300);
            });
        });
    }

    // 监听查看全部通知链接点击
    const allNotificationLinks = document.querySelectorAll('.view-all-notifications, #dashboard-view-all');
    if (allNotificationLinks) {
        allNotificationLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 延迟执行，确保DOM已更新
                setTimeout(addNotificationIcons, 300);
            });
        });
    }

    // 初始化图表
    function initCharts() {
        // 清除现有图表
        document.querySelectorAll('.chart-container canvas').forEach(canvas => {
            if (canvas.chart) {
                canvas.chart.destroy();
            }
        });

        // 初始化柱状图 - 博主表现对比
        const barChartCtx = document.getElementById('influencer-comparison-chart');
        if (barChartCtx) {
            const barChart = new Chart(barChartCtx, {
                type: 'bar',
                data: {
                    labels: ['博主A', '博主B', '博主C', '博主D', '博主E'],
                    datasets: [{
                        label: '观看量',
                        data: [12000, 19000, 8000, 15000, 22000],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }, {
                        label: '互动量',
                        data: [5000, 8000, 3000, 6000, 10000],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            barChartCtx.chart = barChart;
        }

        // 初始化折线图 - 趋势分析
        const lineChartCtx = document.getElementById('trend-chart');
        if (lineChartCtx) {
            const lineChart = new Chart(lineChartCtx, {
                type: 'line',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [{
                        label: '观看量趋势',
                        data: [12000, 19000, 15000, 25000, 22000, 30000],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true
                }
            });
            lineChartCtx.chart = lineChart;
        }

        // 初始化饼图 - 受众分布
        const pieChartCtx = document.getElementById('audience-distribution-chart');
        if (pieChartCtx) {
            const pieChart = new Chart(pieChartCtx, {
                type: 'pie',
                data: {
                    labels: ['18-24岁', '25-34岁', '35-44岁', '45-54岁', '55岁以上'],
                    datasets: [{
                        data: [30, 40, 15, 10, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });
            pieChartCtx.chart = pieChart;
        }

        // 更新KPI数据
        updateKPIs();
    }

    // 更新KPI卡片
    function updateKPIs() {
        // 这里可以添加从API获取数据的逻辑
        // 暂时使用模拟数据
        document.querySelector('.kpi-card:nth-child(1) .kpi-value').textContent = '152';
        document.querySelector('.kpi-card:nth-child(2) .kpi-value').textContent = '1.2M';
        document.querySelector('.kpi-card:nth-child(3) .kpi-value').textContent = '86.5K';
        document.querySelector('.kpi-card:nth-child(4) .kpi-value').textContent = '7.2%';
    }

// 全局函数：显示新建商品分析页面
function showNewProductPage() {
    console.log('showNewProductPage 被调用');
    
    // 获取相关容器
    const aiAssistantContainer = document.querySelector('.ai-assistant-container');
    const chatContainer = document.querySelector('.chat-container');
    const newProductContainer = document.querySelector('.new-product-container');
    const contentArea = document.querySelector('.content-area');
    const outreachContainer = document.querySelector('.outreach-container');
    const influencerContainer = document.querySelector('.influencer-container');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const analyticsContainer = document.querySelector('.analytics-container');
    
    console.log('容器元素检查:');
    console.log('aiAssistantContainer:', aiAssistantContainer);
    console.log('newProductContainer:', newProductContainer);
    console.log('chatContainer:', chatContainer);
    
    // 先隐藏所有其他容器
    if (contentArea) contentArea.style.display = 'none';
    if (outreachContainer) outreachContainer.style.display = 'none';
    if (influencerContainer) influencerContainer.style.display = 'none';
    if (dashboardContainer) dashboardContainer.style.display = 'none';
    if (analyticsContainer) analyticsContainer.style.display = 'none';
    
    // 显示AI助手容器
    if (aiAssistantContainer) {
        aiAssistantContainer.style.display = 'flex';
        console.log('AI助手容器已显示');
        
        // 隐藏聊天界面，显示新建商品分析界面（欢迎界面）
        if (chatContainer) {
            chatContainer.style.display = 'none';
            console.log('聊天容器已隐藏');
        }
        if (newProductContainer) {
            newProductContainer.style.display = 'flex';
            console.log('新建商品分析容器已显示');
        }
        
        // 更新页面标题
        const productTitle = document.querySelector('.product-title');
        if (productTitle) {
            productTitle.textContent = 'AI助手';
            console.log('页面标题已更新');
        }
        
        // 更新侧边栏菜单激活状态
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => item.classList.remove('active'));
        
        // 激活AI助手菜单
        const aiAssistantMenu = document.getElementById('ai-assistant-menu');
        if (aiAssistantMenu) {
            aiAssistantMenu.classList.add('active');
            aiAssistantMenu.classList.add('expanded');
            console.log('AI助手菜单已激活');
            
            // 确保AI助手子菜单显示
            const submenu = aiAssistantMenu.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'block';
                console.log('子菜单已显示');
            }
            
            // 激活新建商品分析子菜单项
            const submenuItems = document.querySelectorAll('.submenu-item');
            submenuItems.forEach(item => item.classList.remove('active'));
            
            const newChatItem = document.querySelector('.new-chat');
            if (newChatItem) {
                newChatItem.classList.add('active');
                console.log('新建商品分析菜单项已激活');
            }
        }
    } else {
        console.error('AI助手容器未找到');
    }
}

    // ========== 手动添加商品模态框功能 ==========
    
    // 添加样式按钮点击事件
    const addStyleBtn = document.getElementById('add-style-btn');
    if (addStyleBtn) {
        addStyleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const addProductModal = document.getElementById('add-product-modal');
            if (addProductModal) {
                addProductModal.style.display = 'flex';
                console.log('打开手动添加商品模态框');
            }
        });
    }

    // 关闭模态框功能
    const addModalCloseBtn = document.getElementById('add-modal-close-btn');
    const cancelAddBtn = document.getElementById('cancel-add');
    
    function closeAddProductModal() {
        const addProductModal = document.getElementById('add-product-modal');
        if (addProductModal) {
            addProductModal.style.display = 'none';
            // 清空表单
            document.getElementById('add-product-form').reset();
            document.getElementById('add-product-tags-container').innerHTML = '';
            // 重置图片预览为默认占位图
            const imagePreview = document.getElementById('add-product-image-preview');
            if (imagePreview) {
                imagePreview.src = 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=商品图片';
                imagePreview.style.display = 'block';
            }
            // 重置默认图片选择状态
            document.querySelectorAll('.default-image-option').forEach(img => {
                img.style.border = '2px solid transparent';
            });
        }
    }

    if (addModalCloseBtn) {
        addModalCloseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAddProductModal();
        });
    }

    if (cancelAddBtn) {
        cancelAddBtn.addEventListener('click', function() {
            closeAddProductModal();
        });
    }

    // 点击模态框外部关闭
    document.addEventListener('click', function(e) {
        if (e.target.id === 'add-product-modal') {
            closeAddProductModal();
        }
    });

    // 图片上传功能
    const addProductUploadBtn = document.getElementById('add-product-upload-btn');
    const addProductImageInput = document.getElementById('add-product-image');
    
    if (addProductUploadBtn && addProductImageInput) {
        addProductUploadBtn.addEventListener('click', function() {
            addProductImageInput.click();
        });

        addProductImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imagePreview = document.getElementById('add-product-image-preview');
                    if (imagePreview) {
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = 'block';
                    }
                    // 重置默认图片选择状态
                    document.querySelectorAll('.default-image-option').forEach(img => {
                        img.style.border = '2px solid transparent';
                    });
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // 默认图片选择功能
    document.querySelectorAll('.default-image-option').forEach(img => {
        img.addEventListener('click', function() {
            // 更新主图片预览
            const imagePreview = document.getElementById('add-product-image-preview');
            if (imagePreview) {
                imagePreview.src = this.src.replace('80x60', '300x200');
                imagePreview.style.display = 'block';
            }
            
            // 自动填充对应分类
            const category = this.getAttribute('data-category');
            const categoryInput = document.getElementById('add-product-category');
            if (categoryInput && category) {
                categoryInput.value = category;
            }
            
            // 重置默认图片边框
            document.querySelectorAll('.default-image-option').forEach(otherImg => {
                otherImg.style.border = '2px solid transparent';
            });
            
            // 高亮选中的图片
            this.style.border = '2px solid #3b82f6';
            
            // 清空文件输入
            const fileInput = document.getElementById('add-product-image');
            if (fileInput) {
                fileInput.value = '';
            }
        });
    });

    // 标签功能
    const addNewTagBtn = document.getElementById('add-new-tag-btn');
    const addProductTagsInput = document.getElementById('add-product-tags');
    
    function addTag() {
        const tagText = addProductTagsInput.value.trim();
        if (tagText) {
            const tagsContainer = document.getElementById('add-product-tags-container');
            const tagElement = document.createElement('div');
            tagElement.className = 'tag-item';
            tagElement.innerHTML = `${tagText} <i class="ri-close-line" onclick="this.parentElement.remove()"></i>`;
            tagsContainer.appendChild(tagElement);
            addProductTagsInput.value = '';
        }
    }

    if (addNewTagBtn && addProductTagsInput) {
        addNewTagBtn.addEventListener('click', addTag);
        
        addProductTagsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
            }
        });
    }

    // 确认添加按钮功能
    const confirmAddBtn = document.getElementById('confirm-add');
    if (confirmAddBtn) {
        confirmAddBtn.addEventListener('click', function() {
            // 获取表单数据
            const productName = document.getElementById('add-product-name').value.trim();
            const productPrice = document.getElementById('add-product-price').value.trim();
            const productCategory = document.getElementById('add-product-category').value.trim();
            const productParams = document.getElementById('add-product-params').value.trim();
            const productDescription = document.getElementById('add-product-description').value.trim();
            
            // 验证必填字段
            if (!productName || !productPrice || !productDescription) {
                alert('请填写所有必填字段（商品名称、价格、介绍）');
                return;
            }

            // 验证价格是否为正数
            if (parseFloat(productPrice) <= 0) {
                alert('请输入有效的商品价格');
                return;
            }

            // 收集标签
            const tags = [];
            document.querySelectorAll('#add-product-tags-container .tag-item').forEach(tag => {
                const tagText = tag.textContent.replace('×', '').trim();
                if (tagText) tags.push(tagText);
            });

            // 获取上传的图片
            const imageFile = document.getElementById('add-product-image').files[0];
            let imageSrc = '';
            if (imageFile) {
                imageSrc = URL.createObjectURL(imageFile);
            } else {
                // 使用默认图片
                imageSrc = 'https://via.placeholder.com/300x200?text=Product+Image';
            }

            // 创建新的商品数据对象
            const newProduct = {
                name: productName,
                price: parseFloat(productPrice),
                category: productCategory || '未分类',
                params: productParams,
                description: productDescription,
                tags: tags,
                image: imageSrc,
                connections: 0,
                communications: 0,
                collaborations: 0,
                dateAdded: new Date().toLocaleDateString()
            };

            // 添加到商品列表（模拟添加到现有的商品展示区域）
            addProductToDisplay(newProduct);

            // 显示成功消息
            alert('商品样式添加成功！即将进入建联演示流程...');

            // 关闭模态框
            closeAddProductModal();

            // 延迟后跳转到建联演示流程
            setTimeout(() => {
                redirectToOutreachWorkflow();
            }, 1000);
        });
    }

    // 添加商品到展示区域的函数
    function addProductToDisplay(product) {
        // 这里可以根据实际需求添加商品到相应的显示区域
        // 例如添加到产品列表、仪表盘等
        console.log('添加新商品:', product);
        
        // 示例：向控制台输出商品信息
        console.log('商品名称:', product.name);
        console.log('商品价格:', product.price);
        console.log('商品分类:', product.category);
        console.log('商品参数:', product.params);
        console.log('商品介绍:', product.description);
        console.log('商品标签:', product.tags);
        
        // TODO: 这里可以添加将商品插入到实际页面显示区域的逻辑
        // 例如：向产品卡片容器添加新的产品卡片
    }

    // 跳转到建联演示流程的函数
    function redirectToOutreachWorkflow() {
        console.log('跳转到建联演示流程');

        // 首先切换到AI助手页面
        const aiAssistantMenuItem = document.querySelector('.menu-item:nth-child(2)');
        if (aiAssistantMenuItem) {
            const menuItemContent = aiAssistantMenuItem.querySelector('.menu-item-content');
            if (menuItemContent) {
                menuItemContent.click();
                console.log('已切换到AI助手页面');

                // 延迟后启动演示分析流程
                setTimeout(() => {
                    simulateProductAnalysis();
                    console.log('已启动商品分析演示流程');
                }, 500);
            }
        } else {
            console.error('未找到AI助手菜单项');
        }
    }

}); // 闭合 document.addEventListener('DOMContentLoaded', function() {