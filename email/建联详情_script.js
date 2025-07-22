document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化主题管理器，确保样式正确
    if (window.ThemeManager) {
        new window.ThemeManager(window.ThemeConfig, { createUI: false });
    }

    // 2. 为关闭按钮绑定事件
    const outreachDetailElement = document.querySelector('.outreach-detail');
    const closeButton = document.querySelector('.close-detail');

    if (closeButton && outreachDetailElement) {
        closeButton.addEventListener('click', () => {
            outreachDetailElement.classList.remove('active');
            // 为了可以再次打开进行测试，可以设置一个延时再加回来
            // setTimeout(() => outreachDetailElement.classList.add('active'), 1000);
        });
    }

    // 3. 为进度条添加交互
    const progressSteps = document.querySelectorAll('.progress-step.clickable-step');
    const editBtn = document.querySelector('.edit-progress-btn');
    const saveBtn = document.querySelector('.save-progress-btn');
    const cancelBtn = document.querySelector('.cancel-progress-btn');
    const timeline = document.querySelector('.progress-timeline');
    
    // 存储进入编辑模式前的状态
    let stateBeforeEdit = [];

    function saveCurrentState() {
        stateBeforeEdit = [];
        progressSteps.forEach(step => {
            stateBeforeEdit.push(step.className);
        });
    }

    function restoreState() {
        progressSteps.forEach((step, index) => {
            step.className = stateBeforeEdit[index];
        });
    }
    
    function selectProgressStep(clickedStep) {
        // 只在编辑模式下允许点击
        if (!timeline || !timeline.classList.contains('editing')) {
            return;
        }

        let clickedIndex = -1;
        progressSteps.forEach((step, index) => {
            if (step === clickedStep) clickedIndex = index;
        });

        if (clickedIndex === -1) return;

        progressSteps.forEach((step, index) => {
            step.classList.remove('current', 'completed', 'pending');
            if (index < clickedIndex) {
                step.classList.add('completed', 'clickable-step');
            } else if (index === clickedIndex) {
                step.classList.add('current', 'clickable-step');
            } else {
                step.classList.add('pending', 'clickable-step');
            }
        });
    }

    progressSteps.forEach(step => {
        step.addEventListener('click', () => selectProgressStep(step));
    });

    if (editBtn && saveBtn && cancelBtn && timeline) {
        editBtn.addEventListener('click', () => {
            saveCurrentState();
            timeline.classList.add('editing');
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-flex';
            cancelBtn.style.display = 'inline-flex';
        });

        function endEditMode() {
            timeline.classList.remove('editing');
            editBtn.style.display = 'inline-flex';
            saveBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
        }

        saveBtn.addEventListener('click', () => {
            // 在这里可以添加保存逻辑
            endEditMode();
        });

        cancelBtn.addEventListener('click', () => {
            restoreState();
            endEditMode();
        });
    }
}); 