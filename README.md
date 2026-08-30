# NoteWordy

A fast, lightweight, distraction-free desktop note-taking app and Assamese text processing workspace built with [Nuxt](https://nuxt.com/) and [Electrobun](https://electrobun.dev/).

---

## ⚡ Quick Install

### Linux (Ubuntu, CachyOS, Arch, Fedora, Debian)
Run the 1-line installer in your terminal:
```bash
curl -fsSL https://raw.githubusercontent.com/tekibo/notewordy/main/scripts/install.sh | bash
```

### Windows (10/11 x64)
Run the 1-line installer in PowerShell:
```powershell
irm https://raw.githubusercontent.com/tekibo/notewordy/main/scripts/install.ps1 | iex
```

---

## 📦 Manual Installation

### Linux
1. Download `linux-x64-NoteWordy-Setup.tar.gz` from [Releases](https://github.com/tekibo/notewordy/releases/latest).
2. Extract the archive:
   ```bash
   tar -xzf linux-x64-NoteWordy-Setup.tar.gz
   ```
3. Run the installer:
   ```bash
   ./installer
   ```

### Windows
1. Download `win-x64-NoteWordy-Setup.zip` from [Releases](https://github.com/tekibo/notewordy/releases/latest).
2. Extract the archive and double-click `NoteWordy Setup.exe`.

---

## 🔄 Updates

- **Automatic In-App Updates**: Open **Settings** $\rightarrow$ **Software Updates** $\rightarrow$ click **Check for Updates** to download and apply delta patches with one click.

---

## 🗑️ Clean Uninstallation

### From the UI (Cross-Platform)
1. Open NoteWordy $\rightarrow$ **Settings**.
2. Scroll to the **Uninstall NoteWordy** section.
3. Click **Uninstall**, choose whether to keep or delete your notes, and confirm.

### From the Command Line
- **Linux**:
  ```bash
  ~/.local/share/com.tekibo.notewordy/stable/uninstall --uninstall
  ```
- **Windows**:
  Use **Windows Settings $\rightarrow$ Apps $\rightarrow$ Installed Apps $\rightarrow$ NoteWordy $\rightarrow$ Uninstall**, or run:
  ```powershell
  & "$env:LOCALAPPDATA\com.tekibo.notewordy\stable\uninstall.exe" --uninstall
  ```

---

## 🛠️ Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v24+)
- [pnpm](https://pnpm.io/) (v11+)
- Linux only: `sudo apt-get install libgtk-3-dev libwebkit2gtk-4.1-dev libappindicator3-dev` (or `pacman -S webkit2gtk-4.1 gtk3` on Arch/CachyOS)

### Getting Started
```bash
# 1. Install dependencies
pnpm install

# 2. Run local development mode
pnpm dev

# 3. Typecheck
pnpm --filter @notewordy/desktop exec tsc --noEmit

# 4. Build production distribution
pnpm build
```

---

## 📜 License
[MIT](LICENSE)
