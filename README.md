# iStein

**Your Discord Translator** — A lightweight Chrome extension that automatically detects and translates foreign-language messages on Discord.

---

## ✨ Features

- 🌍 **Auto-detect** foreign languages in Discord messages
- 🔄 **Instant translation** — translated text appears right below the original message
- 🎛️ **20 supported languages** to translate into
- 🎨 **Clean, minimal UI** with a sleek dark popup
- ⚡ **Lightweight** — no account needed, no bloat
- 🔒 **Privacy focused** — No data is stored by us, messages are sent directly to Google Translate API for instant processing
---

## 📦 Installation

### Step 1: Download the extension

- Download or clone this repository to your computer
- Unzip the folder if needed — you should have a folder called `discord-translator-extension` containing files like `manifest.json`, `popup.html`, etc.

### Step 2: Open Chrome Extensions page

- Open Google Chrome
- Type `chrome://extensions/` in the address bar and press **Enter**

### Step 3: Enable Developer Mode

- In the top-right corner of the Extensions page, toggle **Developer mode** to **ON**

### Step 4: Load the extension

- Click the **"Load unpacked"** button (top-left area)
- Navigate to and select the `discord-translator-extension` folder
- Click **"Select Folder"**

### Step 5: Pin the extension (recommended)

- Click the **puzzle piece icon** 🧩 in Chrome's toolbar (top-right)
- Find **iStein** in the list
- Click the **pin icon** 📌 next to it so it's always visible

### Step 6: You're ready!

- Go to [Discord](https://discord.com) in your browser
- Foreign-language messages will be automatically translated
- Click the **iStein icon** in the toolbar to change your target language or toggle the extension on/off

---

## 🌐 Supported Languages

iStein can translate messages into any of the following **20 languages**:

| Language | Code |
|---|---|
| 🇬🇧 English | `en` |
| 🇪🇸 Spanish | `es` |
| 🇫🇷 French | `fr` |
| 🇩🇪 German | `de` |
| 🇮🇹 Italian | `it` |
| 🇵🇹 Portuguese | `pt` |
| 🇷🇺 Russian | `ru` |
| 🇯🇵 Japanese | `ja` |
| 🇰🇷 Korean | `ko` |
| 🇨🇳 Chinese (Simplified) | `zh-CN` |
| 🇹🇼 Chinese (Traditional) | `zh-TW` |
| 🇸🇦 Arabic | `ar` |
| 🇮🇳 Hindi | `hi` |
| 🇹🇷 Turkish | `tr` |
| 🇵🇱 Polish | `pl` |
| 🇳🇱 Dutch | `nl` |
| 🇸🇪 Swedish | `sv` |
| 🇻🇳 Vietnamese | `vi` |
| 🇹🇭 Thai | `th` |
| 🇺🇦 Ukrainian | `uk` |

> **Default:** English. You can change this anytime from the popup.

---

## 🛠️ How It Works

1. iStein runs as a content script on `discord.com`
2. It monitors new messages appearing in chat
3. When a message contains non-target-language text, it sends it to Google Translate's API
4. The translated text is injected below the original message in a subtle, non-intrusive style

---

## ⚙️ Settings

Click the iStein icon in your toolbar to access:

- **Target Language** — Choose which language to translate messages into
- **Enable/Disable Toggle** — Turn translation on or off without removing the extension

---

## 📋 Requirements

- Google Chrome (or any Chromium-based browser like Brave, Edge, Vivaldi)
- Developer mode enabled for loading unpacked extensions

---

## 🐛 Troubleshooting

| Issue | Solution |
|---|---|
| Extension not appearing | Make sure Developer mode is ON and you loaded the correct folder |
| Translations not showing | Check that the extension is enabled in the popup. Refresh the Discord tab |
| "Load unpacked" button missing | Enable Developer mode toggle in the top-right of `chrome://extensions/` |
| Icons not loading | Make sure `icon16.png`, `icon48.png`, and `icon128.png` are in the folder |
