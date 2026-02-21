document.addEventListener('DOMContentLoaded', () => {
  const targetLangSelect = document.getElementById('targetLang');
  const enableToggle = document.getElementById('enableToggle');
  const status = document.getElementById('status');

  // Load saved settings
  chrome.storage.sync.get({ targetLang: 'en', enabled: true }, (data) => {
    targetLangSelect.value = data.targetLang;
    enableToggle.checked = data.enabled;
  });

  function showStatus(msg) {
    status.textContent = msg;
    setTimeout(() => { status.textContent = ''; }, 1500);
  }

  targetLangSelect.addEventListener('change', () => {
    const val = targetLangSelect.value;
    chrome.storage.sync.set({ targetLang: val }, () => {
      showStatus('✓ Language saved');
    });
  });

  enableToggle.addEventListener('change', () => {
    const val = enableToggle.checked;
    chrome.storage.sync.set({ enabled: val }, () => {
      showStatus(val ? '✓ Enabled' : '✓ Disabled');
    });
  });
});