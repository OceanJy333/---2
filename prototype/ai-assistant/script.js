// AI 助手主界面原型 JS（ChatGPT 风格）
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const input = $('#productInput');
  const analyzeBtn = $('#analyzeBtn');
  const result = $('#result');
  const modeSwitch = $('#modeSwitch');
  const emailModeText = $('[data-mode="email"]');
  const tkModeText = $('[data-mode="tk"]');
  const tkPluginSection = $('#tkPluginSection');
  const pluginInstallBtn = $('#pluginInstallBtn');
  
  // 当前模式状态
  let currentMode = 'email'; // 默认邮箱建联模式

  function showMessage(html){
    result.innerHTML = `<div class="msg">${html}</div>`;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 输入框监听 - 控制发送按钮状态
  input?.addEventListener('input', (e) => {
    const hasContent = e.target.value.trim().length > 0;
    if(analyzeBtn) {
      analyzeBtn.disabled = !hasContent;
    }
  });

  // 模式切换事件
  modeSwitch?.addEventListener('change', (e) => {
    currentMode = e.target.checked ? 'tk' : 'email';
    updateModeDisplay();
    
    // 更新输入框占位符
    if(input) {
      input.placeholder = currentMode === 'email' 
        ? '粘贴您的商品链接……' 
        : '粘贴您的商品链接……';
    }
  });

  // 更新模式显示状态
  function updateModeDisplay() {
    if(currentMode === 'email') {
      emailModeText?.style.setProperty('color', 'var(--primary)');
      tkModeText?.style.setProperty('color', 'var(--muted)');
      tkPluginSection?.style.setProperty('display', 'none');
      updateFeatureList('email');
    } else {
      emailModeText?.style.setProperty('color', 'var(--muted)');
      tkModeText?.style.setProperty('color', 'var(--primary)');
      tkPluginSection?.style.setProperty('display', 'block');
      updateFeatureList('tk');
    }
  }

  // 更新功能列表内容
  function updateFeatureList(mode) {
    const featureList = $('.feature-list');
    if(!featureList) return;
    
    if(mode === 'email') {
      featureList.innerHTML = `
        <li>
          <span class="feature-icon blue"><i class="fas fa-magnifying-glass"></i></span>
          <span>分析商品信息并推荐适合的 YouTube 博主</span>
        </li>
        <li>
          <span class="feature-icon green"><i class="fas fa-user-check"></i></span>
          <span>为商品特性匹配最适合的合作人选</span>
        </li>
        <li>
          <span class="feature-icon purple"><i class="fas fa-envelope-open-text"></i></span>
          <span>生成高质量的初步建联邮件</span>
        </li>
      `;
    } else {
      featureList.innerHTML = `
        <li>
          <span class="feature-icon blue"><i class="fas fa-magnifying-glass"></i></span>
          <span>分析商品并推荐适合的 TikTok 创作者</span>
        </li>
        <li>
          <span class="feature-icon green"><i class="fas fa-user-check"></i></span>
          <span>精准匹配垂直领域的 KOL 和 KOC</span>
        </li>
        <li>
          <span class="feature-icon purple"><i class="fas fa-comments"></i></span>
          <span>生成个性化的 TikTok 私信模板</span>
        </li>
      `;
    }
  }

  // 发送按钮点击事件
  analyzeBtn?.addEventListener('click', ()=>{
    const val = (input?.value || '').trim();
    if(!val){
      return;
    }
    // 根据不同模式显示不同消息
    const modeMessage = currentMode === 'email'
      ? '正在为您分析并匹配合适的 YouTube 博主、生成初始建联邮件…'
      : '正在为您分析并匹配合适的 TikTok 创作者、生成私信模板…';
    showMessage(`<strong>您的输入：</strong>${escapeHtml(val)}<br/><br/>${modeMessage}`);
    
    // 清空输入框
    input.value = '';
    analyzeBtn.disabled = true;
  });

  // 回车发送
  input?.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if(!analyzeBtn.disabled) {
        analyzeBtn.click();
      }
    }
  });



  // 插件安装按钮点击事件
  pluginInstallBtn?.addEventListener('click', () => {
    // 这里可以跳转到插件下载页面
    window.open('https://example.com/tk-plugin-install', '_blank');
    showMessage('正在跳转到插件安装页面...');
  });

  function escapeHtml(str){
    return str
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#39;');
  }

  // 初始化页面状态
  updateModeDisplay();
  // 初始化发送按钮状态
  if(analyzeBtn) {
    analyzeBtn.disabled = true;
  }
})();