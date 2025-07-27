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
                            
                            <!-- 推广平台选择 -->
                            <div class="input-group">
                                <label class="campaign-label">推广平台</label>
                                <div class="platform-filter-tags">
                                    <div class="platform-tag selected" data-platform="youtube">
                                        <i class="ri-youtube-line"></i>
                                        <span>YouTube</span>
                                        <i class="ri-check-line check-icon"></i>
                                    </div>
                                    <div class="platform-tag selected" data-platform="tiktok">
                                        <i class="ri-tiktok-line"></i>
                                        <span>TikTok</span>
                                        <i class="ri-check-line check-icon"></i>
                                    </div>
                                    <div class="platform-tag selected" data-platform="instagram">
                                        <i class="ri-instagram-line"></i>
                                        <span>Instagram</span>
                                        <i class="ri-check-line check-icon"></i>
                                    </div>
                                </div>
                            </div>

                            <!-- 粉丝数范围选择 -->
                            <div class="input-group">
                                <label class="campaign-label">粉丝数范围</label>
                                <div class="followers-range-tags">
                                    <div class="range-tag selected" data-range="unlimited">
                                        <span>不限</span>
                                    </div>
                                    <div class="range-tag" data-range="1k-10k">
                                        <span>1K-10K</span>
                                    </div>
                                    <div class="range-tag" data-range="10k-100k">
                                        <span>10K-100K</span>
                                    </div>
                                    <div class="range-tag" data-range="100k-1m">
                                        <span>100K-1M</span>
                                    </div>
                                    <div class="range-tag" data-range="1m+">
                                        <span>1M+</span>
                                    </div>
                                    <div class="range-tag custom-toggle" data-range="custom">
                                        <span>自定义</span>
                                        <i class="ri-arrow-down-s-line toggle-icon"></i>
                                    </div>
                                </div>
                                
                                <!-- 自定义输入区域（默认隐藏） -->
                                <div class="custom-range-container" style="display: none;">
                                    <div class="custom-range-inputs">
                                        <input type="number" id="custom-min" class="custom-range-input" placeholder="最小值" value="">
                                        <span class="range-separator">-</span>
                                        <input type="number" id="custom-max" class="custom-range-input" placeholder="最大值" value="">
                                        <button class="apply-custom-btn">
                                            <i class="ri-check-line"></i>
                                        </button>
                                    </div>
                                    <div class="custom-range-hint">
                                        支持输入具体数值，如：1000, 50000
                                    </div>
                                </div>
                            </div>
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
    initializeAdvancedFilters();
});

// 初始化高级筛选功能
function initializeAdvancedFilters() {
    // 平台筛选逻辑
    const platformTags = document.querySelectorAll('.platform-tag');
    
    platformTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const selectedTags = document.querySelectorAll('.platform-tag.selected');
            
            if (tag.classList.contains('selected')) {
                // 如果是最后一个选中的，则不允许取消
                if (selectedTags.length > 1) {
                    tag.classList.remove('selected');
                }
            } else {
                tag.classList.add('selected');
            }
            
            updatePlatformSelection();
        });
    });
    
    // 粉丝数范围标签筛选逻辑
    const rangeTags = document.querySelectorAll('.range-tag');
    const customContainer = document.querySelector('.custom-range-container');
    const customMinInput = document.getElementById('custom-min');
    const customMaxInput = document.getElementById('custom-max');
    const applyCustomBtn = document.querySelector('.apply-custom-btn');
    
    // 预设范围映射
    const rangeMapping = {
        'unlimited': { min: 0, max: 0, label: '不限' },
        '1k-10k': { min: 1000, max: 10000, label: '1K-10K' },
        '10k-100k': { min: 10000, max: 100000, label: '10K-100K' },
        '100k-1m': { min: 100000, max: 1000000, label: '100K-1M' },
        '1m+': { min: 1000000, max: 0, label: '1M+' },
        'custom': { min: 0, max: 0, label: '自定义' }
    };
    
    let currentRange = 'unlimited';
    
    function selectRangeTag(selectedTag) {
        // 移除所有选中状态
        rangeTags.forEach(tag => {
            tag.classList.remove('selected', 'active');
        });
        
        // 选中当前标签
        selectedTag.classList.add('selected');
        currentRange = selectedTag.dataset.range;
        
        // 处理自定义选项
        if (currentRange === 'custom') {
            selectedTag.classList.add('active');
            customContainer.style.display = 'block';
            // 聚焦到第一个输入框
            setTimeout(() => customMinInput.focus(), 100);
        } else {
            customContainer.style.display = 'none';
            updateRangeSelection();
        }
    }
    
    function updateRangeSelection() {
        const range = rangeMapping[currentRange];
        console.log('已选择粉丝数范围:', range.label, range);
        // 这里可以添加额外的逻辑，比如更新匹配参数等
    }
    
    function formatCustomValue(value) {
        const num = parseInt(value);
        if (isNaN(num) || num <= 0) return '';
        
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace('.0', '') + 'K';
        }
        return num.toString();
    }
    
    function applyCustomRange() {
        const minVal = parseInt(customMinInput.value) || 0;
        const maxVal = parseInt(customMaxInput.value) || 0;
        
        if (minVal <= 0 && maxVal <= 0) {
            alert('请输入有效的粉丝数范围');
            return;
        }
        
        if (minVal > 0 && maxVal > 0 && minVal >= maxVal) {
            alert('最小值必须小于最大值');
            return;
        }
        
        // 更新自定义标签显示
        const customTag = document.querySelector('[data-range="custom"]');
        const minText = minVal > 0 ? formatCustomValue(minVal) : '0';
        const maxText = maxVal > 0 ? formatCustomValue(maxVal) : '∞';
        
        if (minVal > 0 && maxVal > 0) {
            customTag.querySelector('span').textContent = `${minText}-${maxText}`;
        } else if (minVal > 0) {
            customTag.querySelector('span').textContent = `${minText}+`;
        } else if (maxVal > 0) {
            customTag.querySelector('span').textContent = `<${maxText}`;
        }
        
        // 隐藏自定义输入区域
        customContainer.style.display = 'none';
        customTag.classList.remove('active');
        
        // 更新当前范围数据
        rangeMapping.custom = { min: minVal, max: maxVal, label: customTag.querySelector('span').textContent };
        updateRangeSelection();
    }
    
    // 范围标签点击事件
    rangeTags.forEach(tag => {
        tag.addEventListener('click', () => {
            selectRangeTag(tag);
        });
    });
    
    // 自定义输入框回车事件
    [customMinInput, customMaxInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                applyCustomRange();
            }
        });
    });
    
    // 应用自定义范围按钮
    applyCustomBtn.addEventListener('click', applyCustomRange);
    
    // 初始化
    updateRangeSelection();
}

function updatePlatformSelection() {
    const selectedPlatforms = Array.from(document.querySelectorAll('.platform-tag.selected'))
        .map(tag => tag.dataset.platform);
    
    console.log('已选中的平台:', selectedPlatforms);
    // 这里可以添加额外的逻辑，比如更新匹配参数等
} 