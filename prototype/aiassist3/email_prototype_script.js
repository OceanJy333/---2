document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题管理器，但不创建UI
    if (window.ThemeManager) {
        new window.ThemeManager(window.ThemeConfig, { createUI: false });
    }

    // 静态数据模拟
    const creators = [
        "MattVidPro AI", "TechExplorer 3", "InnovationHub 3", "Two Minute Papers", 
        "FutureTech", "SmartTech", "TechExplorer", "TechDaily", "TechWorld 2", "TechLife",
        "AI Explained", "CodeMaster", "DevTips", "TechReview", "GadgetGuru",
        "FutureBytes", "InnovateTech", "DigitalTrends", "ByteSize", "TechVision",
        "MachineLearning", "DeepDive", "CloudNative", "DataScience", "AIRevolution",
        "CyberSec", "WebDev", "MobileTech", "IoTWorld", "BlockchainPro",
        "QuantumTech", "RoboticsHub", "ARVRWorld", "GameDev", "OpenSource"
    ];
    
    // 发送状态追踪
    let sentEmails = new Set();

    const creatorEmailTemplates = {
        'MattVidPro AI': {
            subject: 'Earbud 智能翻译耳机合作邀请 - AI技术创新产品',
            content: '尊敬的 MattVidPro AI 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。作为AI技术领域的专业创作者，您在视频制作和AI应用方面的深度见解让我印象深刻，特别是您对AI语音识...'
        },
        'TechExplorer 3': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 TechExplorer 3 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用...'
        },
        'InnovationHub 3': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 InnovationHub 3 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采...'
        },
        'Two Minute Papers': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 Two Minute Papers 团队： 您好！我是 Earbud 智能翻译耳机的产品运营经理。您的频道在AI研究领域的权威性和对前沿技术的深度解析令人敬佩，特别是在语音AI和机器学习方面...'
        },
        'FutureTech': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 FutureTech 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用前沿 A...'
        },
        'SmartTech': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 SmartTech 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用前沿 AI...'
        },
        'TechExplorer': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 TechExplorer 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用前沿...'
        },
        'TechDaily': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 TechDaily 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用前沿 AI...'
        },
        'TechWorld 2': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 TechWorld 2 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用前沿 ...'
        },
        'TechLife': {
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: '尊敬的 TechLife 博主： 您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。 我们的 Earbud 智能翻译耳机采用前沿 AI ...'
        }
    };

    // 生成达人头像（随机颜色背景的首字母头像）
    function generateAvatar(name) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FFB74D'];
        const initial = name.charAt(0).toUpperCase();
        const color = colors[name.length % colors.length];
        return `<div class="creator-avatar" style="background-color: ${color}">${initial}</div>`;
    }

    // 生成一级界面：简洁的达人列表
    function generateSimplifiedCreatorList(selectedCreators) {
        let creatorListHTML = '';
        selectedCreators.forEach(creatorName => {
            const isSent = sentEmails.has(creatorName);
            const statusBadge = isSent ? 'sent' : 'pending';
            const statusText = isSent ? '已发送' : '待发送';
            const cardClass = isSent ? 'creator-item sent' : 'creator-item';
            
            creatorListHTML += `
                <div class="${cardClass}" data-creator="${creatorName}">
                    <div class="creator-checkbox-wrapper" data-creator="${creatorName}">
                        <div class="creator-checkbox-icon checked">
                            <i class="ri-check-line"></i>
                        </div>
                        <input type="checkbox" class="creator-checkbox-hidden" data-creator="${creatorName}" checked style="display: none;" />
                    </div>
                    <div class="creator-info">
                        ${generateAvatar(creatorName)}
                        <div class="creator-details">
                            <div class="creator-name">${creatorName}</div>
                            <div class="creator-status-badge ${statusBadge}">${statusText}</div>
                        </div>
                    </div>
                    <div class="creator-actions">
                        <button class="creator-action-btn email-detail-btn" data-creator="${creatorName}">
                            <i class="ri-mail-open-line"></i> 查看邮件
                        </button>
                    </div>
                </div>
            `;
        });

        const simplifiedHTML = `
            <div class="interface-container">
                <div class="creators-management-container">
                    <div class="creators-header">
                        <h4 class="creators-title"><i class="ri-team-line"></i> 达人邮件管理</h4>
                        <div class="creators-stats">共 ${selectedCreators.length} 个达人</div>
                    </div>
                    <div class="creators-list">
                        ${creatorListHTML}
                    </div>
                    <div class="creators-bulk-actions">
                        <button class="bulk-action-btn secondary" id="select-all-btn"><i class="ri-checkbox-indeterminate-line"></i> 取消全选</button>
                        <button class="bulk-action-btn primary" id="send-all-btn"><i class="ri-send-plane-fill"></i> 一键发送</button>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('prototype-container');
        if (container) {
            container.innerHTML = simplifiedHTML;
            
            // 绑定邮件详情按钮事件 - 过滤掉已发送的
            const emailDetailBtns = container.querySelectorAll('.email-detail-btn');
            emailDetailBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const creatorName = e.currentTarget.dataset.creator;
                    // 如果已发送则不允许点击
                    if (!sentEmails.has(creatorName)) {
                        showEmailDetailInterface(creatorName);
                    }
                });
            });

            // 全选/取消全选功能
            const selectAllBtn = document.getElementById('select-all-btn');
            const checkboxWrappers = container.querySelectorAll('.creator-checkbox-wrapper');
            const hiddenCheckboxes = container.querySelectorAll('.creator-checkbox-hidden');
            let allSelected = true; // 默认全选

            // 单个复选框点击功能
            checkboxWrappers.forEach((wrapper, index) => {
                wrapper.addEventListener('click', () => {
                    const creatorName = wrapper.dataset.creator;
                    // 如果已发送，不允许点击
                    if (sentEmails.has(creatorName)) {
                        return;
                    }
                    
                    const icon = wrapper.querySelector('.creator-checkbox-icon');
                    const hiddenCheckbox = hiddenCheckboxes[index];
                    
                    if (icon.classList.contains('checked')) {
                        icon.classList.remove('checked');
                        hiddenCheckbox.checked = false;
                    } else {
                        icon.classList.add('checked');
                        hiddenCheckbox.checked = true;
                    }
                    
                    // 更新全选按钮状态
                    updateSelectAllButton();
                    // 更新发送按钮状态
                    updateSendAllButton();
                });
            });

            function updateSelectAllButton() {
                // 只计算未发送邮件的复选框状态
                const pendingCheckboxes = Array.from(hiddenCheckboxes).filter((cb, index) => {
                    const creatorName = checkboxWrappers[index].dataset.creator;
                    return !sentEmails.has(creatorName);
                });
                const checkedPendingCount = pendingCheckboxes.filter(cb => cb.checked).length;
                
                if (pendingCheckboxes.length === 0) {
                    // 如果没有待发送的邮件，隐藏全选按钮
                    allSelected = true;
                    selectAllBtn.innerHTML = '<i class="ri-check-line"></i> 全部已发送';
                    selectAllBtn.disabled = true;
                } else if (checkedPendingCount === pendingCheckboxes.length) {
                    allSelected = true;
                    selectAllBtn.innerHTML = '<i class="ri-checkbox-indeterminate-line"></i> 取消全选';
                    selectAllBtn.disabled = false;
                } else {
                    allSelected = false;
                    selectAllBtn.innerHTML = '<i class="ri-checkbox-multiple-line"></i> 全选';
                    selectAllBtn.disabled = false;
                }
            }

            selectAllBtn.addEventListener('click', () => {
                if (selectAllBtn.disabled) return;
                
                allSelected = !allSelected;
                checkboxWrappers.forEach((wrapper, index) => {
                    const creatorName = wrapper.dataset.creator;
                    // 只对未发送的邮件进行操作
                    if (sentEmails.has(creatorName)) {
                        return;
                    }
                    
                    const icon = wrapper.querySelector('.creator-checkbox-icon');
                    const hiddenCheckbox = hiddenCheckboxes[index];
                    
                    if (allSelected) {
                        icon.classList.add('checked');
                        hiddenCheckbox.checked = true;
                    } else {
                        icon.classList.remove('checked');
                        hiddenCheckbox.checked = false;
                    }
                });
                
                updateSelectAllButton();
                updateSendAllButton();
            });

            // 一键发送功能
            const sendAllBtn = document.getElementById('send-all-btn');
            function updateSendAllButton() {
                // 获取选中且未发送的邮件
                const selectedPendingCreators = [];
                checkboxWrappers.forEach((wrapper, index) => {
                    const creatorName = wrapper.dataset.creator;
                    const hiddenCheckbox = hiddenCheckboxes[index];
                    if (hiddenCheckbox.checked && !sentEmails.has(creatorName)) {
                        selectedPendingCreators.push(creatorName);
                    }
                });
                
                if (selectedPendingCreators.length === 0) {
                    sendAllBtn.innerHTML = '<i class="ri-send-plane-fill"></i> 一键发送';
                    sendAllBtn.disabled = true;
                    sendAllBtn.classList.remove('primary');
                    sendAllBtn.classList.add('disabled');
                    sendAllBtn.style.backgroundColor = '#f3f4f6';
                    sendAllBtn.style.color = '#9ca3af';
                    sendAllBtn.style.borderColor = '#d1d5db';
                    sendAllBtn.style.cursor = 'not-allowed';
                } else {
                    sendAllBtn.innerHTML = `<i class="ri-send-plane-fill"></i> 一键发送 (${selectedPendingCreators.length})`;
                    sendAllBtn.disabled = false;
                    sendAllBtn.classList.add('primary');
                    sendAllBtn.classList.remove('disabled');
                    sendAllBtn.style.backgroundColor = '';
                    sendAllBtn.style.color = '';
                    sendAllBtn.style.borderColor = '';
                    sendAllBtn.style.cursor = '';
                }
            }

            sendAllBtn.addEventListener('click', async () => {
                if (sendAllBtn.disabled) return;
                
                // 获取点击时选中且未发送的邮件（快照，不受后续全选操作影响）
                const selectedPendingCreators = [];
                checkboxWrappers.forEach((wrapper, index) => {
                    const creatorName = wrapper.dataset.creator;
                    const hiddenCheckbox = hiddenCheckboxes[index];
                    if (hiddenCheckbox.checked && !sentEmails.has(creatorName)) {
                        selectedPendingCreators.push(creatorName);
                    }
                });
                
                if (selectedPendingCreators.length === 0) return;
                
                sendAllBtn.innerHTML = '<i class="ri-loader-line"></i> 发送中...';
                sendAllBtn.disabled = true;
                
                // 按顺序逐个发送选中的邮件
                for (let i = 0; i < selectedPendingCreators.length; i++) {
                    const creator = selectedPendingCreators[i];
                    
                    // 模拟发送延迟
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    // 标记为已发送
                    sentEmails.add(creator);
                    
                    // 实时更新界面
                    const creatorCard = container.querySelector(`[data-creator="${creator}"]`);
                    if (creatorCard) {
                        creatorCard.classList.add('sent');
                        const statusBadge = creatorCard.querySelector('.creator-status-badge');
                        if (statusBadge) {
                            statusBadge.textContent = '已发送';
                            statusBadge.className = 'creator-status-badge sent';
                        }
                        const actionBtn = creatorCard.querySelector('.creator-action-btn');
                        if (actionBtn) {
                            actionBtn.style.backgroundColor = '#f3f4f6';
                            actionBtn.style.borderColor = '#d1d5db';
                            actionBtn.style.color = '#9ca3af';
                            actionBtn.style.cursor = 'not-allowed';
                        }
                    }
                    
                    // 更新按钮显示剩余数量
                    const remaining = selectedPendingCreators.length - i - 1;
                    if (remaining > 0) {
                        sendAllBtn.innerHTML = `<i class="ri-loader-line"></i> 发送中... (剩余${remaining})`;
                    }
                }
                
                updateSendAllButton();
                updateSelectAllButton();
            });

            // 初始更新按钮状态
            updateSendAllButton();
        }
    }

    // 生成二级界面：邮件详情页面
    function showEmailDetailInterface(creatorName) {
        const template = creatorEmailTemplates[creatorName] || { 
            subject: 'Earbud 智能翻译耳机合作邀请',
            content: `尊敬的 ${creatorName} 博主：\n\n您好！我是 Earbud 智能翻译耳机的产品运营经理。在观看了您的频道后，我对您在相关领域的专业见解印象深刻。\n\n我们的 Earbud 智能翻译耳机采用前沿 AI 技术，支持实时多语言翻译，音质清晰，续航持久。相信这款产品能够为您的观众带来全新的科技体验。\n\n如果您对我们的产品感兴趣，欢迎与我们联系，我们将为您提供产品样品和详细的合作方案。\n\n期待您的回复！\n\n最诚挚的问候\n产品运营团队` 
        };

        const emailDetailHTML = `
            <div class="interface-container">
                <div class="email-detail-container">
                    <div class="email-detail-header">
                        <button class="back-btn" id="back-to-list-btn">
                            <i class="ri-arrow-left-line"></i> 返回列表
                        </button>
                        <h4 class="email-detail-title">
                            ${generateAvatar(creatorName)}
                            ${creatorName} - 邮件详情
                        </h4>
                    </div>
                    
                    <div class="email-detail-content">
                        <div class="email-field">
                            <label for="email-subject">邮件主题</label>
                            <input type="text" id="email-subject" class="email-input" value="${template.subject}">
                        </div>
                        
                        <div class="email-field">
                            <label for="email-content">邮件内容</label>
                            <textarea id="email-content" class="email-textarea" rows="16">${template.content}</textarea>
                        </div>
                    </div>
                    
                    <div class="email-detail-actions">
                        <button class="email-action-btn secondary" id="save-draft-btn">
                            <i class="ri-save-line"></i> 保存草稿
                        </button>
                        <button class="email-action-btn primary" id="send-email-btn">
                            <i class="ri-send-plane-line"></i> 发送邮件
                        </button>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('prototype-container');
        if (container) {
            container.innerHTML = emailDetailHTML;
            
            // 绑定返回按钮事件
            const backBtn = document.getElementById('back-to-list-btn');
            backBtn.addEventListener('click', () => {
                generateSimplifiedCreatorList(creators);
            });
            
            // 绑定保存草稿按钮事件
            const saveDraftBtn = document.getElementById('save-draft-btn');
            saveDraftBtn.addEventListener('click', () => {
                // 保存草稿并返回一级界面
                generateSimplifiedCreatorList(creators);
            });
            
            // 绑定发送邮件按钮事件
            const sendEmailBtn = document.getElementById('send-email-btn');
            sendEmailBtn.addEventListener('click', () => {
                // 标记为已发送
                sentEmails.add(creatorName);
                // 返回一级界面并刷新状态
                generateSimplifiedCreatorList(creators);
            });
        }
    }
    
    // 初始化界面
    generateSimplifiedCreatorList(creators);
});