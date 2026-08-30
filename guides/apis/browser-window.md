# BrowserWindow

Every runtime creates native windows through the same core. In TypeScript
(Cottontail/Bun), `BrowserWindow` creates a window and its initial
[BrowserView](/electrobun/apis/browser-view/); the native SDKs create
windows and webviews as two explicit calls.

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-12)
- [Bun](#tab-panel-13)
- [Zig](#tab-panel-14)
- [Rust](#tab-panel-15)
- [Go](#tab-panel-16)
- [Odin](#tab-panel-17)
    - ```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "My app",

  url: "views://mainview/index.html",

  frame: {

    width: 960,

    height: 640,

  },

});
```
  
```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "My app",

  url: "views://mainview/index.html",

  frame: {

    width: 960,

    height: 640,

  },

});
```
  
```zig
const window_id = try core.createWindow(.{

    .title = "My app",

    .frame = .{ .x = 160, .y = 100, .width = 960, .height = 640 },

    .callbacks = .{ .resize = onResize, .should_close = onShouldClose },

});

const webview_id = try core.createWebview(.{

    .window_id = window_id,

    .url = "views://mainview/index.html",

    .frame = .{ .x = 0, .y = 0, .width = 960, .height = 640 },

    .callbacks = .{ .decide_navigation = electrobun.allowAllNavigation },

});
```
  
```rust
let mut window_options =

    WindowOptions::new("My app", Rect::new(160.0, 100.0, 960.0, 640.0));

window_options.callbacks = WindowCallbacks {

    close: Some(main_window_closed),

    ..WindowCallbacks::default()

};

let window_id = core.create_window(window_options)?;

let webview_options = WebviewOptions::new(

    window_id,

    "views://mainview/index.html",

    Rect::new(0.0, 0.0, 960.0, 640.0),

);

let webview_id = core.create_webview(webview_options)?;
```
  
```go
windowOptions := electrobun.NewWindowOptions(

    "My app",

    electrobun.NewRect(160, 100, 960, 640),

)

windowOptions.Callbacks = electrobun.WindowCallbacks{

    Close: func(uint32) { _ = core.StopEventLoop() },

}

windowID, err := core.CreateWindow(windowOptions)

webviewOptions := electrobun.NewWebviewOptions(

    windowID,

    "views://mainview/index.html",

    electrobun.NewRect(0, 0, 960, 640),

)

webviewID, err := core.CreateWebview(webviewOptions)
```
  
```odin
window_options := electrobun.defaultWindowOptions("My app")

window_options.frame = {x = 160, y = 100, width = 960, height = 640}

window_id, window_err := electrobun.createWindow(core, window_options)

webview_options := electrobun.defaultWebviewOptions(window_id)

webview_options.url = "views://mainview/index.html"

webview_options.frame = {x = 0, y = 0, width = 960, height = 640}

webview_id, webview_err := electrobun.createWebview(core, webview_options)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
In TypeScript, omitting `frame.x` or `frame.y` centers the window, the
instance is available immediately, and `win.webview` is the `BrowserView`
created for its content. Native window/webview creation and its required
lifecycle setup (core loading, the blocking main thread, the webview
runtime) are covered end to end in the per-runtime
[Hello World walkthroughs](/electrobun/guides/hello-world/).
The rest of this page documents the TypeScript class. Every window
operation below also exists in the native SDKs as a `Core` call keyed by
window id — see [the mapping](#native-sdks) at the end of the page.

## Constructor options

All options are optional because the constructor accepts
`Partial&#x3C;WindowOptionsType>`. The table describes the defaults used when an
options object is supplied. For compatibility, calling `new BrowserWindow()`
with no argument uses the legacy starter window: title `"Electrobun"`, size
800 by 600, and URL `https://electrobun.dev`.

OptionTypeDefaultPurpose`title``string``"New Window"`Native window title.`frame``{ x?: number; y?: number; width: number; height: number }``800 x 600`, centeredInitial position and size.`url``string | null``null`URL loaded by the initial webview. Use `views://` for bundled content.`html``string | null``null`HTML string loaded instead of `url`.`preload``string | null``null`Inline JavaScript or a bundled `views://` script URL.`viewsRoot``string | null``null`Override for the bundled views root.`renderer``"native" | "cef"`Platform build defaultRenderer for the initial webview.`rpc`RPC instancenoneMain-process side of the webview RPC transport.`titleBarStyle``"default" | "hidden" | "hiddenInset"``"default"`Native title-bar treatment.`styleMask`objectplatform defaultsAdvanced native style-mask overrides.`transparent``boolean``false`Make the native window background transparent.`passthrough``boolean``false`Pass pointer input through transparent regions.`spellCheck``boolean``false`Enable native spell checking where supported.`hidden``boolean``false`Create without showing the window.`activate``boolean``true`Activate the window when it is created.`trafficLightOffset``{ x: number; y: number }``{ x: 0, y: 0 }`macOS traffic-light offset.`navigationRules``string | null``null`Serialized navigation policy for the initial webview.`sandbox``boolean``false`Disable RPC for untrusted content; event emission remains available.
Only bundle and select CEF when the app needs it. See
[Bundling CEF](/electrobun/apis/bundling-cef/) for the build configuration.

```ts
import { BrowserWindow } from "electrobun/main";

const cefWindow = new BrowserWindow({

  title: "CEF content",

  url: "views://mainview/index.html",

  renderer: "cef",

});

const sandboxedWindow = new BrowserWindow({

  title: "Untrusted content",

  url: "https://example.com",

  sandbox: true,

});

void cefWindow;

void sandboxedWindow;
```

   Caution   Do not attach privileged RPC handlers to a view that can navigate to untrusted
content. Use `sandbox: true` and restrictive navigation rules for remote pages.  

## Window lifecycle

```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Lifecycle",

  url: "views://mainview/index.html",

});

win.show();

win.showInactive();

win.hide();

const visible = win.isVisible();

win.activate();

win.minimize();

win.unminimize();

const minimized = win.isMinimized();

win.maximize();

win.unmaximize();

const maximized = win.isMaximized();

win.setFullScreen(true);

const fullScreen = win.isFullScreen();

win.setAlwaysOnTop(true);

const alwaysOnTop = win.isAlwaysOnTop();

win.setVisibleOnAllWorkspaces(true);

const onAllWorkspaces = win.isVisibleOnAllWorkspaces();

win.requestClose(); // Runs the normal close-request path.

win.close();        // Closes the window directly.

void visible;

void minimized;

void maximized;

void fullScreen;

void alwaysOnTop;

void onAllWorkspaces;
```

`focus()` remains as a deprecated alias for `activate()`.

## Title, position, and size

```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Geometry",

  url: "views://mainview/index.html",

  frame: { width: 800, height: 600 },

});

win.setTitle("Updated title");

win.setPosition(120, 80);

win.setSize(1024, 720);

win.setFrame(120, 80, 1024, 720);

win.center();

const frame = win.getFrame();

const position = win.getPosition();

const size = win.getSize();

win.setWindowButtonPosition(14, 14);

const buttonPosition = win.getWindowButtonPosition();

void frame;

void position;

void size;

void buttonPosition;
```

## Webview access

The initial view is exposed as `win.webview`. Content, developer tools, find,
zoom, and navigation operations belong to `BrowserView`:

```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Webview access",

  url: "views://mainview/index.html",

});

win.webview.loadURL("views://details/index.html");

win.webview.executeJavascript("document.body.dataset.ready = 'true'");

win.webview.openDevTools();

win.webview.findInPage("example", { forward: true, matchCase: false });

win.webview.stopFindInPage();

win.setPageZoom(1.25);

const zoom = win.getPageZoom();

const spellCheckChanged = win.setSpellCheck(true);

void zoom;

void spellCheckChanged;
```

See [BrowserView](/electrobun/apis/browser-view/) for the complete view API.

## Events and lookup

`on()` scopes an Electrobun window event to this instance. Event payloads are
currently typed as `unknown`, so narrow them before reading application data.

```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Events",

  url: "views://mainview/index.html",

});

win.on("resize", (event: unknown) => {

  console.log("Window resized", event);

});

const sameWindow = BrowserWindow.getById(win.id);

sameWindow?.activate();

const nativePointer = win.ptr;

void nativePointer;
```

The native pointer is an advanced FFI escape hatch. Application code should use
the class methods unless it is integrating directly with a platform API.

## Public methods

The current public control surface is:

Lifecycle: `close`, `requestClose`, `activate`, `show`, `showInactive`,
`hide`, `isVisible`.

- Window state: `minimize`, `unminimize`, `isMinimized`, `maximize`,
`unmaximize`, `isMaximized`, `setFullScreen`, `isFullScreen`,
`setAlwaysOnTop`, `isAlwaysOnTop`, `setVisibleOnAllWorkspaces`,
`isVisibleOnAllWorkspaces`.

- Geometry: `setPosition`, `center`, `setSize`, `setFrame`, `getFrame`,
`getPosition`, `getSize`, `setWindowButtonPosition`,
`getWindowButtonPosition`.

- Content: `setPageZoom`, `getPageZoom`, `setSpellCheck`, and the `webview`
property.

- Metadata and events: `setTitle`, `on`, `ptr`, and static `getById`.

## Native SDKs

Zig, Rust, Go, and Odin expose the same window operations procedurally on
`Core`, keyed by the `u32` window id `createWindow` returns. The verb set
matches the class methods one-to-one; only naming style differs per
language:

TypeScriptZig / OdinRustGo`win.setTitle(t)``setWindowTitle(id, t)``set_window_title(id, t)``SetWindowTitle(id, t)``win.show()` / `hide()` / `isVisible()``showWindow(id, activate)` / `hideWindow` / `isWindowVisible``show_window` / `hide_window` / `is_window_visible``ShowWindow` / `HideWindow` / `IsWindowVisible``win.minimize()` … `isMaximized()``minimizeWindow` / `restoreWindow` / `maximizeWindow` / `unmaximizeWindow` + `is...`snake_case equivalentsCamelCase equivalents`win.setFullScreen(b)` / `setAlwaysOnTop(b)` / `setVisibleOnAllWorkspaces(b)``setWindowFullScreen` etc.`set_window_full_screen` etc.`SetWindowFullScreen` etc.`win.setPosition` / `setSize` / `setFrame` / `getFrame` / `center``setWindowPosition` / `setWindowSize` / `setWindowFrame` / `getWindowFrame` / `centerWindow`snake_caseCamelCase`win.setWindowButtonPosition` / `get...`same names (`core`-level)snake_caseCamelCase`win.close()` / `requestClose()``closeWindow` / `requestWindowClose``close_window` / `request_window_close``CloseWindow` / `RequestWindowClose``win.on("resize", ...)``WindowCallbacks` passed to `createWindow` (`close`, `should_close`, `move`, `resize`, `focus`, `blur`, `key`)`WindowCallbacks` (same slots)`WindowCallbacks` (same slots)

Zig and Odin additionally ship an optional `WindowRegistry` /
`BrowserWindowRef` layer covering `getById`, close/request-close, frame,
center, and button position. Not available natively: `setPageZoom` /
`setSpellCheck` live on the webview id instead
(`setWebviewPageZoom`, `setWebviewSpellCheck`), and there is no event
emitter — events are the C callbacks registered at creation.
        [Previous  Main Process API](/electrobun/apis/main/) [Next  BrowserView](/electrobun/apis/browser-view/)
