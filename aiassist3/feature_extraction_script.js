document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题管理器，但不创建UI
    if (window.ThemeManager) {
        new window.ThemeManager(window.ThemeConfig, { createUI: false });
    }

    const productAnalysisData = {
        coreFeatures: ["实时翻译功能", "高清音质与降噪技术", "AI智能语音识别", "便携设计与长续航"],
        targetAudience: ["商务人士", "旅行者", "科技爱好者", "语言学习者"]
    };
    
    // --- 完整重构 ---

    function createEditableTagsSection(fieldName, title, data, iconClass) {
        return `
            <div class="editable-section" data-field="${fieldName}">
                <div class="section-title-with-edit">
                    <div class="section-title">
                        <i class="${iconClass}"></i>
                        <span>${title}</span>
                    </div>
                    <button class="edit-section-btn" title="编辑${title}"><i class="ri-edit-line"></i></button>
                </div>
                <div class="tags-display"></div>
                <div class="tags-editor" style="display: none;">
                    <div class="integrated-input-container">
                        <div class="tag-input-wrapper">
                            <!-- 内联标签和输入框将在这里动态生成 -->
                        </div>
                    </div>
                    <div class="editor-actions">
                        <button class="save-tags-btn primary-btn-small">保存</button>
                    </div>
                </div>
            </div>
        `;
    }

    function initializeEditableSections() {
        const sections = document.querySelectorAll('.editable-section');
        sections.forEach(section => {
            const fieldName = section.dataset.field;
            const editBtn = section.querySelector('.edit-section-btn');
            const tagsDisplay = section.querySelector('.tags-display');
            const tagsEditor = section.querySelector('.tags-editor');
            const tagInputWrapper = section.querySelector('.tag-input-wrapper');
            const saveBtn = section.querySelector('.save-tags-btn');
            
            let originalData = [...productAnalysisData[fieldName]];
            let currentEditingIndex = -1; // 用于跟踪当前编辑的标签索引

            const enterEditMode = () => {
                originalData = [...productAnalysisData[fieldName]];
                tagsDisplay.style.display = 'none';
                tagsEditor.style.display = 'block';
                updateIntegratedInput();
                focusInput();
            };

            const exitEditMode = () => {
                currentEditingIndex = -1;
                tagsDisplay.style.display = 'block';
                tagsEditor.style.display = 'none';
                updateDisplayTags();
            };
            
            const addTag = (inputElement = null) => {
                const input = inputElement || tagInputWrapper.querySelector('.inline-input');
                const value = input.value.trim();
                if (!value) return;

                if (input.classList.contains('editing') || input.dataset.editing) {
                    // 编辑现有标签
                    const editIndex = parseInt(input.dataset.editing) || currentEditingIndex;
                    const existingIndex = productAnalysisData[fieldName].indexOf(value);
                    if (existingIndex === -1 || existingIndex === editIndex) {
                        productAnalysisData[fieldName][editIndex] = value;
                        currentEditingIndex = -1;
                        updateIntegratedInput();
                        focusInput();
                    }
                } else {
                    // 新增标签
                    if (!productAnalysisData[fieldName].includes(value)) {
                        productAnalysisData[fieldName].push(value);
                        updateIntegratedInput();
                        focusInput();
                    }
                }
            };
            
            const removeTag = (index) => {
                productAnalysisData[fieldName].splice(index, 1);
                currentEditingIndex = -1;
                updateIntegratedInput();
                focusInput();
            };

            const editTag = (index) => {
                currentEditingIndex = index;
                updateIntegratedInput();
                const input = tagInputWrapper.querySelector('.inline-input');
                input.value = productAnalysisData[fieldName][index];
                input.focus();
                input.select();
            };
            
            const updateIntegratedInput = () => {
                const tags = productAnalysisData[fieldName];
                const elements = [];

                tags.forEach((tag, index) => {
                    if (index === currentEditingIndex) {
                        // 在原位置显示编辑输入框
                        elements.push(`
                            <input type="text" class="inline-input editing" maxlength="20" 
                                   placeholder="编辑标签内容..." value="${tag}" data-editing="${index}">
                        `);
                    } else {
                        // 显示普通标签
                        elements.push(`
                            <span class="inline-tag" data-index="${index}">
                                ${tag}
                                <button class="remove-inline-tag" data-index="${index}" title="删除标签">×</button>
                            </span>
                        `);
                    }
                });

                // 如果不是编辑模式，在最后添加新增输入框
                if (currentEditingIndex < 0) {
                    elements.push(`
                        <input type="text" class="inline-input" maxlength="20" 
                               placeholder="输入新标签..." value="">
                        <button class="submit-inline-btn" title="提交" disabled>+</button>
                    `);
                }

                tagInputWrapper.innerHTML = elements.join('');
            };

            const focusInput = () => {
                let input = tagInputWrapper.querySelector('.inline-input.editing');
                if (!input) {
                    input = tagInputWrapper.querySelector('.inline-input');
                }
                if (input) {
                    input.focus();
                    if (input.classList.contains('editing')) {
                        // 编辑模式，选中所有文本
                        input.select();
                    } else {
                        // 新增模式，光标移到最后
                        input.setSelectionRange(input.value.length, input.value.length);
                    }
                }
            };

            const updateDisplayTags = () => {
                const data = productAnalysisData[fieldName];
                const wrapperClass = fieldName === 'coreFeatures' ? 'core-features' : 'audience-tags';
                
                const tagsHTML = data.map((tag, index) => {
                     let colorClass, icon, tagClassName;
                     if (fieldName === 'coreFeatures') {
                         tagClassName = 'feature-tag';
                         const colorClasses = ['tech-feature', 'quality-feature', 'smart-feature', 'portable-feature'];
                         const icons = ['ri-translate-2', 'ri-headphone-line', 'ri-brain-line', 'ri-wireless-charging-line'];
                         colorClass = colorClasses[index % colorClasses.length];
                         icon = icons[index % icons.length];
                     } else { // targetAudience
                         tagClassName = 'audience-tag';
                         const colorClasses = ['business', 'travel', 'tech', 'student'];
                         const icons = ['ri-briefcase-line', 'ri-plane-line', 'ri-smartphone-line', 'ri-graduation-cap-line'];
                         colorClass = colorClasses[index % colorClasses.length];
                         icon = icons[index % icons.length];
                     }
                     return `<div class="${tagClassName} ${colorClass}"><i class="${icon}"></i>${tag}</div>`;
                }).join('');

                tagsDisplay.innerHTML = `<div class="${wrapperClass}">${tagsHTML}</div>`;
            };

            const updateSubmitButtonState = () => {
                const input = tagInputWrapper.querySelector('.inline-input');
                const submitBtn = tagInputWrapper.querySelector('.submit-inline-btn');
                if (input && submitBtn) {
                    const hasValue = input.value.trim().length > 0;
                    submitBtn.disabled = !hasValue;
                    submitBtn.style.opacity = hasValue ? '1' : '0.5';
                }
            };

            // 事件监听器
            editBtn.addEventListener('click', enterEditMode);
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止保存按钮点击冒泡
                exitEditMode();
            });

            // 阻止整个编辑区域的点击事件冒泡
            tagsEditor.addEventListener('click', e => {
                e.stopPropagation();
            });

            // 使用事件委托处理动态生成的元素
            tagInputWrapper.addEventListener('click', e => {
                // 阻止所有输入框内的点击事件冒泡
                e.stopPropagation();
                
                if (e.target.classList.contains('remove-inline-tag')) {
                    const index = parseInt(e.target.dataset.index);
                    removeTag(index);
                } else if (e.target.classList.contains('inline-tag')) {
                    const index = parseInt(e.target.dataset.index);
                    editTag(index);
                } else if (e.target.classList.contains('submit-inline-btn') && !e.target.disabled) {
                    addTag();
                }
            });

            tagInputWrapper.addEventListener('input', e => {
                if (e.target.classList.contains('inline-input')) {
                    if (e.target.classList.contains('editing')) {
                        // 编辑模式不需要更新提交按钮状态
                        return;
                    }
                    updateSubmitButtonState();
                }
            });

            tagInputWrapper.addEventListener('keydown', e => {
                if (e.target.classList.contains('inline-input') && e.key === 'Enter') {
                    e.preventDefault();
                    if (e.target.classList.contains('editing')) {
                        // 编辑模式直接保存
                        addTag(e.target);
                    } else {
                        // 新增模式检查按钮状态
                        const submitBtn = tagInputWrapper.querySelector('.submit-inline-btn');
                        if (!submitBtn.disabled) {
                            addTag(e.target);
                        }
                    }
                }
            });

            // 处理编辑输入框失去焦点时的保存
            tagInputWrapper.addEventListener('blur', e => {
                if (e.target.classList.contains('inline-input') && e.target.classList.contains('editing')) {
                    // 延迟一点执行，避免与点击事件冲突
                    setTimeout(() => {
                        if (currentEditingIndex >= 0) {
                            addTag(e.target);
                        }
                    }, 100);
                }
            }, true);

            // 添加全局点击事件监听器，点击编辑区域外自动保存
            const handleOutsideClick = (e) => {
                // 检查是否点击的是编辑按钮，如果是则不退出编辑模式
                if (editBtn.contains(e.target)) {
                    return;
                }
                
                if (tagsEditor.style.display === 'block' && !tagsEditor.contains(e.target)) {
                    exitEditMode();
                }
            };

            // 将事件监听器存储在section元素上，便于后续清理
            section._outsideClickHandler = handleOutsideClick;
            document.addEventListener('click', handleOutsideClick);
            
            updateDisplayTags();
        });
    }

    function showFeatureExtractionCard() {
        const coreFeatureSection = createEditableTagsSection('coreFeatures', '核心特征', [], 'ri-star-line');
        const targetAudienceSection = createEditableTagsSection('targetAudience', '目标受众分析', [], 'ri-group-line');

        const featureCardHTML = `
            <div class="feature-extraction-card">
                <div class="feature-card-header"><h4><i class="ri-file-list-line"></i> 特征提取结果</h4></div>
                <div class="feature-card-content">
                    ${coreFeatureSection}
                    ${targetAudienceSection}
                    <div class="marketing-points-section">
                        <div class="section-title">营销要点</div>
                        <div class="marketing-points">
                            <div class="marketing-point"><i class="ri-check-line"></i> 突出实时翻译的准确性和速度</div>
                            <div class="marketing-point"><i class="ri-check-line"></i> 强调多场景应用（商务、旅行、学习）</div>
                            <div class="marketing-point"><i class="ri-check-line"></i> 展示AI技术的先进性和便利性</div>
                        </div>
                    </div>
                    <div class="campaign-settings-section">
                        <div class="section-title">营销活动设置</div>
                        <div class="campaign-inputs">
                            <div class="input-group">
                                <label for="marketing-budget">营销总预算 (单位美金) <span class="required">*</span></label>
                                <input type="number" id="marketing-budget" class="campaign-input" value="5000">
                                <span class="input-hint">建议预算: 1$ - 100,000$</span>
                            </div>
                            <div class="input-group">
                                <label for="target-contacts">预期建联数量 <span class="required">*</span></label>
                                <input type="number" id="target-contacts" class="campaign-input" value="10">
                                <span class="input-hint">最高数量: 50个</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feature-card-actions">
                    <button class="start-matching-btn primary-btn"><i class="ri-search-line"></i> 开始匹配博主</button>
                </div>
            </div>`;
        
        document.getElementById('prototype-container').innerHTML = featureCardHTML;
    }

    showFeatureExtractionCard();
    initializeEditableSections();
}); 