// content.js
(function() {
  'use strict';

  console.log('Pinterest Distraction-Free Extension Loaded');

  // localStorage から状態取得
  let hideRelated = localStorage.getItem('pinterestHideRelated') === 'true';

  // DOM 監視してボタン追加＆状態反映
  const observer = new MutationObserver(() => {
    if (!document.getElementById('toggleRelatedPinsButton')) addButton();
    applyToggle(hideRelated);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function addButton() {
    const btn = document.createElement('button');
    btn.id = 'toggleRelatedPinsButton';
    btn.innerText = hideRelated ? '🔄 関連ピンを表示' : '❌ 関連ピンを非表示';
    Object.assign(btn.style, {
      position: 'fixed',
      top: '10px',
      right: '80px',
      zIndex: 10000,
      padding: '8px 12px',
      backgroundColor: '#e60023',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '13px',
    });
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      hideRelated = !hideRelated;
      localStorage.setItem('pinterestHideRelated', hideRelated);
      btn.innerText = hideRelated ? '🔄 関連ピンを表示' : '❌ 関連ピンを非表示';
      applyToggle(hideRelated);
    });
  }

  function applyToggle(hide) {
    const gridItems = document.querySelectorAll('div[data-grid-item="true"]');
    gridItems.forEach((el, idx) => {
      el.style.display = hide && idx !== 0 ? 'none' : '';
    });
  }

  // 他タブ同期
  window.addEventListener('storage', e => {
    if (e.key === 'pinterestHideRelated') {
      hideRelated = e.newValue === 'true';
      const btn = document.getElementById('toggleRelatedPinsButton');
      if (btn) btn.innerText = hideRelated ? '🔄 関連ピンを表示' : '❌ 関連ピンを非表示';
      applyToggle(hideRelated);
    }
  });

})();
