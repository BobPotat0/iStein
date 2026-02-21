(function () {
  'use strict';

  const PROCESSED_ATTR = 'data-dt-translated';
  const TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';

  let targetLang = 'en';
  let enabled = true;

  // Load settings
  chrome.storage.sync.get({ targetLang: 'en', enabled: true }, (data) => {
    targetLang = data.targetLang;
    enabled = data.enabled;
  });

  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.targetLang) targetLang = changes.targetLang.newValue;
    if (changes.enabled) enabled = changes.enabled.newValue;
  });

  /**
   * Detect if text is likely in a different language than the target.
   * Simple heuristic: if text contains characters outside basic ASCII/Latin
   * for English target, or we just always try to translate and compare.
   * For MVP, we send everything to the API with sl=auto and check the detected lang.
   */
  async function translateText(text) {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: 'auto',
      tl: targetLang,
      dt: 't',
      q: text,
    });

    const url = `${TRANSLATE_ENDPOINT}?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();

    // data[0] contains translation segments, data[2] is detected source language
    const detectedLang = data[2];
    const translatedParts = data[0];

    if (!translatedParts) return null;

    const translatedText = translatedParts
      .filter((part) => part && part[0])
      .map((part) => part[0])
      .join('');

    // Normalize language codes for comparison
    const normalizedTarget = targetLang.split('-')[0].toLowerCase();
    const normalizedDetected = (detectedLang || '').split('-')[0].toLowerCase();

    // If detected language matches target, no need to show translation
    if (normalizedDetected === normalizedTarget) return null;

    return translatedText;
  }

  function createTranslationElement(translatedText) {
    const el = document.createElement('span');
    el.className = 'dt-translation';
    el.textContent = translatedText;
    el.style.cssText =
      'display:block;font-size:0.85em;color:#949ba4;margin-top:2px;padding:2px 4px;' +
      'border-left:2px solid #5865f2;font-style:italic;opacity:0.9;';
    return el;
  }

  async function processMessage(messageEl) {
    if (!enabled) return;
    if (messageEl.hasAttribute(PROCESSED_ATTR)) return;

    // Mark immediately to prevent duplicate processing
    messageEl.setAttribute(PROCESSED_ATTR, 'true');

    const text = messageEl.textContent.trim();
    if (!text || text.length < 2) return;

    // Skip if text is just emojis, links, or very short
    if (/^[\s\p{Emoji}\p{P}]+$/u.test(text)) return;

    try {
      const translated = await translateText(text);
      if (translated && translated !== text) {
        const translationEl = createTranslationElement(translated);
        messageEl.appendChild(translationEl);
      }
    } catch (e) {
      // Silently fail for individual messages
      console.debug('[Discord Translator] Translation failed:', e.message);
    }
  }

  // Discord message content selector
  // Discord uses [id^="message-content-"] for message text
  const MESSAGE_SELECTORS = [
    '[id^="message-content-"]',
    '[class*="messageContent-"]',
  ];

  function getMessageSelector() {
    return MESSAGE_SELECTORS.join(', ');
  }

  function processAllVisible() {
    if (!enabled) return;
    const messages = document.querySelectorAll(getMessageSelector());
    messages.forEach((msg) => {
      if (!msg.hasAttribute(PROCESSED_ATTR)) {
        processMessage(msg);
      }
    });
  }

  // Observe DOM for new messages
  const observer = new MutationObserver((mutations) => {
    if (!enabled) return;

    let hasNewNodes = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        hasNewNodes = true;
        break;
      }
    }

    if (hasNewNodes) {
      // Debounce slightly to batch rapid message loads
      clearTimeout(observer._debounceTimer);
      observer._debounceTimer = setTimeout(processAllVisible, 300);
    }
  });

  // Start observing once Discord's app loads
  function init() {
    const appEl = document.querySelector('[class*="app-"]') || document.body;
    observer.observe(appEl, { childList: true, subtree: true });

    // Process any already-visible messages
    setTimeout(processAllVisible, 1000);
  }

  // Discord is a SPA, wait for it to be ready
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();