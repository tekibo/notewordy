# Main Process API

Electrobun exposes the same native core to **six main-process runtimes**:
Cottontail (the default), Bun, Zig, Rust, Go, and Odin. The TypeScript SDK
(`electrobun/main`) serves Cottontail and Bun; each native language has its
own SDK that loads `ElectrobunCore` directly. Pick your runtime once — code
snippets across these docs follow your selection.

Cottontail and Bun share the TypeScript SDK today, but they are separate
runtime choices (`build.mainProcess: "cottontail"` vs `"bun"`) and will
diverge over time — treat the tabs as distinct even where the code currently
matches. See [Main Process Runtimes](/electrobun/guides/native-main-process/)
for choosing, and the per-runtime
[Hello World walkthroughs](/electrobun/guides/hello-world/) for complete
setup.

## Your first window

(() => {
	class StarlightTabsRestore extends HTMLElement {
		connectedCallback() {
			const starlightTabs = this.closest('starlight-tabs');
			if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return;
			const syncKey = starlightTabs.dataset.syncKey;
			if (!syncKey) return;
			const label = localStorage.getItem(`starlight-synced-tabs__${syncKey}`);
			if (!label) return;
			const tabs = [...starlightTabs?.querySelectorAll('[role="tab"]')];
			const tabIndexToRestore = tabs.findIndex(
				(tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label
			);
			const panels = starlightTabs?.querySelectorAll(':scope > [role="tabpanel"]');
			const newTab = tabs[tabIndexToRestore];
			const newPanel = panels[tabIndexToRestore];
			if (tabIndexToRestore    - [Cottontail](#tab-panel-30)
- [Bun](#tab-panel-31)
- [Zig](#tab-panel-32)
- [Rust](#tab-panel-33)
- [Go](#tab-panel-34)
- [Odin](#tab-panel-35)
    
```ts
// src/bun/index.ts — Cottontail executes TypeScript directly.

import { BrowserWindow, ApplicationMenu, Utils } from "electrobun/main";

const win = new BrowserWindow({

  title: "My app",

  url: "views://mainview/index.html",

});

ApplicationMenu.setApplicationMenu([

  { label: "File", submenu: [{ role: "quit" }] },

]);

Utils.showNotification({ title: "Application started" });

void win;
```
  
```ts
// src/bun/index.ts — same TypeScript SDK, running on the actual Bun runtime.

import { BrowserWindow, ApplicationMenu, Utils } from "electrobun/main";

const win = new BrowserWindow({

  title: "My app",

  url: "views://mainview/index.html",

});

ApplicationMenu.setApplicationMenu([

  { label: "File", submenu: [{ role: "quit" }] },

]);

Utils.showNotification({ title: "Application started" });

void win;
```
  
```zig
// src/zig/main.zig — the core is a dynamic library; windows are created

// from a worker thread while runMainThread blocks. Full setup in the

// Zig hello world.

const electrobun = @import("electrobun");

// ...inside the UI thread, after configureWebviewRuntimeFromExecutableDir:

const window_id = try core.createWindow(.{

    .title = "My app",

    .frame = .{ .x = 160, .y = 100, .width = 800, .height = 600 },

});

_ = try core.createWebview(.{

    .window_id = window_id,

    .url = "views://mainview/index.html",

    .frame = .{ .x = 0, .y = 0, .width = 800, .height = 600 },

    .callbacks = .{ .decide_navigation = electrobun.allowAllNavigation },

});
```
  
```rust
// src/main.rs — the project Cargo.toml points `electrobun` at the Rust crate

// projected under .hutch/devkit. Full setup is in the Rust hello world.

use electrobun::{Core, Rect, WebviewOptions, WindowOptions};

// ...inside the UI thread, after configure_webview_runtime_from_executable_dir:

let window_options =

    WindowOptions::new("My app", Rect::new(160.0, 100.0, 800.0, 600.0));

let window_id = core.create_window(window_options)?;

let webview_options = WebviewOptions::new(

    window_id,

    "views://mainview/index.html",

    Rect::new(0.0, 0.0, 800.0, 600.0),

);

core.create_webview(webview_options)?;
```
  
```go
// src/go/main.go — import "electrobun" through the project go.mod replacement

// to .hutch/devkit/go-sdk. Windows are created from a goroutine while

// RunMainThread blocks. Full setup in the Go hello world.

import "electrobun"

// ...inside the UI goroutine, after ConfigureWebviewRuntimeFromExecutableDir:

windowOptions := electrobun.NewWindowOptions(

    "My app",

    electrobun.NewRect(160, 100, 800, 600),

)

windowID, err := core.CreateWindow(windowOptions)

webviewOptions := electrobun.NewWebviewOptions(

    windowID,

    "views://mainview/index.html",

    electrobun.NewRect(0, 0, 800, 600),

)

_, err = core.CreateWebview(webviewOptions)
```
  
```odin
// src/odin/main.odin — windows are created from a worker thread while

// runMainThread blocks. Full setup in the Odin hello world.

import electrobun "electrobun_sdk:electrobun"

// ...inside the UI thread, after configureWebviewRuntimeFromExecutableDir:

window_options := electrobun.defaultWindowOptions("My app")

window_options.frame = {x = 160, y = 100, width = 800, height = 600}

window_id, _ := electrobun.createWindow(core, window_options)

webview_options := electrobun.defaultWebviewOptions(window_id)

webview_options.url = "views://mainview/index.html"

webview_options.frame = {x = 0, y = 0, width = 800, height = 600}

electrobun.createWebview(core, webview_options)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
 
Note
  
Exact native option and callback shapes vary slightly per language — each
native snippet in these docs is verbatim-compatible with its SDK, and the
generated templates are the canonical, complete references.
  

## The TypeScript SDK (Cottontail and Bun)

Named imports are recommended:

```ts
import { BrowserWindow, ApplicationMenu, Utils } from "electrobun/main";
```

A default namespace export is also available (`import Electrobun from "electrobun/main"`). The package root, `electrobun`, currently resolves to
the same main-process SDK; use `electrobun/view` inside browser bundles. The
former `electrobun/bun` namespace remains a deprecated alias for
`electrobun/main` so imports can migrate incrementally.

## Runtime coverage

The TypeScript SDK has the broadest high-level surface. The native SDKs
mirror the core contract procedurally (ids + callbacks instead of classes).
What exists where:

API areaCottontailBunZigRustGoOdinWindows &#x26; webviews✓✓✓✓✓✓WGPU views (native GPU surfaces)✓✓✓✓✓✓Application &#x26; context menus✓ typed✓ typedJSONJSONJSONJSONTray (create/show/title)✓ + events✓ + events✓ ¹✓ ¹✓ + clicks✓ ¹Dialogs, message box, notifications✓✓✓✓✓✓Clipboard, displays, shell open/reveal/trash✓✓✓✓✓✓Sessions &#x26; cookies✓✓✓✓✓✓Global shortcuts✓✓✓✓✓✓[Paths](/electrobun/apis/paths/)✓✓✓✓✓✓Typed RPC (`createRPC`)✓✓raw bridge ²raw bridge ²raw bridge ²raw bridge ²[Updater](/electrobun/apis/updater/)✓✓————[Warren UI](/electrobun/apis/ui/overview/) (`main/ui`)✓✓————three.js / Babylon WebGPU adapters✓✓————

¹ Zig, Rust, and Odin create and manage tray items, but their wrappers do
not yet surface tray click events; Go’s `TrayOptions.Handler` does receive
them. Tray menus remain TypeScript-only everywhere.
² Native SDKs exchange raw JSON messages with `Electroview` in the webview
(the request/response envelope is implemented by hand; the templates show
the full pattern). The webview-side SDK is identical for every runtime.

Pages for TypeScript-only features say so at the top; everything else shows
a tab per supported runtime.
        [Previous  Updates](/electrobun/guides/updates/) [Next  BrowserWindow](/electrobun/apis/browser-window/)
