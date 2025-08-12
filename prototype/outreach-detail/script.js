// 建联详情主页面原型 JS（独立外链）
(function(){
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const chips = $$('.chip');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  }));
})();

