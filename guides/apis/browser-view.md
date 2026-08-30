# BrowserView

`BrowserView` is Electrobun’s main-process wrapper around a native or CEF
webview. Every `BrowserWindow` creates one initial view, available as
`window.webview`. Create additional views when a window needs independently
positioned web content. In the native SDKs there is no view class:
`createWebview` returns a `u32` id and every operation is a `Core` call keyed
by that id.

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-6)
- [Bun](#tab-panel-7)
- [Zig](#tab-panel-8)
- [Rust](#tab-panel-9)
- [Go](#tab-panel-10)
- [Odin](#tab-panel-11)
    - ```ts
import { BrowserView, BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Multiple views",

  url: "views://shell/index.html",

  frame: { width: 1000, height: 700 },

});

const view = new BrowserView({

  windowId: win.id,

  url: "views://details/index.html",

  frame: { x: 320, y: 0, width: 680, height: 700 },

  autoResize: false,

});

void view;
```
  
```ts
import { BrowserView, BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Multiple views",

  url: "views://shell/index.html",

  frame: { width: 1000, height: 700 },

});

const view = new BrowserView({

  windowId: win.id,

  url: "views://details/index.html",

  frame: { x: 320, y: 0, width: 680, height: 700 },

  autoResize: false,

});

void view;
```
  
```zig
const webview_id = try core.createWebview(.{

    .window_id = window_id,

    .url = "views://details/index.html",

    .frame = .{ .x = 320, .y = 0, .width = 680, .height = 700 },

    .auto_resize = false,

    .callbacks = .{ .decide_navigation = electrobun.allowAllNavigation },

});

// Navigation and content:

try core.loadURLInWebview(webview_id, "https://electrobun.dev");

try core.loadHTMLInWebview(webview_id, "&#x3C;h1>Inline content&#x3C;/h1>");

if (core.canWebviewGoBack(webview_id)) try core.webviewGoBack(webview_id);

if (core.canWebviewGoForward(webview_id)) try core.webviewGoForward(webview_id);

try core.reloadWebview(webview_id);

try core.openWebviewDevTools(webview_id);
```
  
```rust
let mut webview_options = WebviewOptions::new(

    window_id,

    "views://details/index.html",

    Rect::new(320.0, 0.0, 680.0, 700.0),

);

webview_options.auto_resize = false;

webview_options.callbacks = WebviewCallbacks {

    decide_navigation: Some(electrobun::allow_all_navigation),

    ..WebviewCallbacks::default()

};

let webview_id = core.create_webview(webview_options)?;

// Navigation and content:

core.load_url_in_webview(webview_id, "https://electrobun.dev")?;

core.load_html_in_webview(webview_id, "&#x3C;h1>Inline content&#x3C;/h1>")?;

if core.can_webview_go_back(webview_id) {

    core.webview_go_back(webview_id)?;

}

if core.can_webview_go_forward(webview_id) {

    core.webview_go_forward(webview_id)?;

}

core.reload_webview(webview_id)?;

core.open_webview_devtools(webview_id)?;
```
  
```go
webviewOptions := electrobun.NewWebviewOptions(

    windowID,

    "views://details/index.html",

    electrobun.NewRect(320, 0, 680, 700),

)

webviewOptions.AutoResize = false

webviewID, err := core.CreateWebview(webviewOptions)

// Navigation and content:

_ = core.LoadURLInWebview(webviewID, "https://electrobun.dev")

_ = core.LoadHTMLInWebview(webviewID, "&#x3C;h1>Inline content&#x3C;/h1>")

if core.CanWebviewGoBack(webviewID) {

    _ = core.WebviewGoBack(webviewID)

}

if core.CanWebviewGoForward(webviewID) {

    _ = core.WebviewGoForward(webviewID)

}

_ = core.ReloadWebview(webviewID)

_ = core.OpenWebviewDevtools(webviewID)
```
  
```odin
webview_options := electrobun.defaultWebviewOptions(window_id)

webview_options.url = "views://details/index.html"

webview_options.frame = {x = 320, y = 0, width = 680, height = 700}

webview_options.auto_resize = false

webview_id, webview_err := electrobun.createWebview(core, webview_options)

// Navigation and content:

_ = electrobun.loadURLInWebview(core, webview_id, "https://electrobun.dev")

_ = electrobun.loadHTMLInWebview(core, webview_id, "&#x3C;h1>Inline content&#x3C;/h1>")

if electrobun.canWebviewGoBack(core, webview_id) {

    _ = electrobun.webviewGoBack(core, webview_id)

}

if electrobun.canWebviewGoForward(core, webview_id) {

    _ = electrobun.webviewGoForward(core, webview_id)

}

_ = electrobun.reloadWebview(core, webview_id)

_ = electrobun.openWebviewDevTools(core, webview_id)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
The rest of this page documents the TypeScript class. The native SDKs expose
the same webview verb set as `Core` calls — see
[the mapping](#native-sdks) at the end of the page.

## Constructor options

The constructor accepts `Partial&#x3C;BrowserViewOptions>`.

OptionTypeDefaultPurpose`windowId``number``0`Native parent window ID.`hostWebviewId``number`noneHost view for an `&#x3C;electrobun-webview>` child.`url``string | null``null`URL to load.`html``string | null``null`HTML string to load instead of `url`.`preload``string | null``null`Inline JavaScript or a bundled `views://` script URL.`viewsRoot``string | null``null`Override for the bundled views root.`renderer``"native" | "cef"`Platform build defaultWebview renderer.`partition``string | null``null`Persistent storage/session partition.`frame``{ x: number; y: number; width: number; height: number }``{ x: 0, y: 0, width: 800, height: 600 }`Position inside the parent window.`autoResize``boolean``true`Resize with the parent window.`rpc`RPC instancegenerated empty RPCTyped main-process transport.`navigationRules``string | null``null`Serialized navigation policy.`sandbox``boolean``false`Disable RPC for untrusted content.`startTransparent``boolean``false`Create the native layer transparent.`startPassthrough``boolean``false`Create with input passthrough enabled.`spellCheck``boolean``false`Enable native spell checking where supported.
   Note   Use the DOM `&#x3C;electrobun-webview>` element when the view’s bounds should follow
an element in another webview. Construct `BrowserView` directly when the main
process owns its geometry.  

## Loading and scripting

```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "View controls",

  url: "views://mainview/index.html",

});

const view = win.webview;

view.loadURL("views://details/index.html");

view.loadHTML("&#x3C;!doctype html>&#x3C;title>Inline content&#x3C;/title>&#x3C;h1>Hello&#x3C;/h1>");

view.executeJavascript("document.documentElement.dataset.host = 'electrobun'");

view.setNavigationRules(["views://details/*"]);

view.openDevTools();

view.closeDevTools();

view.toggleDevTools();

view.setPageZoom(1.25);

const zoom = view.getPageZoom();

const spellCheckChanged = view.setSpellCheck(true);

void zoom;

void spellCheckChanged;
```

`executeJavascript()` does not return the evaluated value. Use typed RPC when
the browser must return data to the main process.

## Find in page

```ts
import { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Find",

  url: "views://mainview/index.html",

});

win.webview.findInPage("Electrobun", {

  forward: true,

  matchCase: false,

});

win.webview.stopFindInPage();
```

## Events

Instance events cover navigation, readiness, and downloads. Event payloads are
currently typed as `unknown`.

```ts
import { BrowserView, BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Events",

  url: "views://mainview/index.html",

});

win.webview.on("dom-ready", (event: unknown) => {

  console.log("DOM ready", event);

});

win.webview.on("did-navigate", (event: unknown) => {

  console.log("Navigation finished", event);

});

win.webview.on("download-completed", (event: unknown) => {

  console.log("Download complete", event);

});

const stopWatchingCreatedViews = BrowserView.on("created", (createdView) => {

  console.log("BrowserView created", createdView.id);

});

stopWatchingCreatedViews();
```

Supported instance event names are `will-navigate`, `did-navigate`,
`did-navigate-in-page`, `did-commit-navigation`, `dom-ready`,
`download-started`, `download-progress`, `download-completed`, and
`download-failed`.

## Typed RPC

Define the shared schema in a module imported by both contexts. The main process
uses `BrowserView.defineRPC`; the browser uses `Electroview.defineRPC`.

```ts
import {

  BrowserView,

  BrowserWindow,

  type RPCSchema,

} from "electrobun/main";

export type AppRPC = {

  bun: RPCSchema&#x3C;{

    requests: {

      greet: {

        params: { name: string };

        response: { message: string };

      };

    };

    messages: {};

  }>;

  webview: RPCSchema&#x3C;{

    requests: {};

    messages: {

      statusChanged: { online: boolean };

    };

  }>;

};

const rpc = BrowserView.defineRPC&#x3C;AppRPC>({

  handlers: {

    requests: {

      greet: ({ name }) => ({ message: `Hello, ${name}` }),

    },

    messages: {},

  },

});

const win = new BrowserWindow({

  title: "Typed RPC",

  url: "views://mainview/index.html",

  rpc,

});

rpc.send.statusChanged({ online: true });

void win;
```

The browser-side half is documented under
[Electroview](/electrobun/apis/browser/electroview-class/).

## Lookup, adoption, and removal

```ts
import { BrowserView, BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "View ownership",

  url: "views://mainview/index.html",

});

const existing = BrowserView.getById(win.webview.id);

const allViews = BrowserView.getAll();

if (existing) {

  const wrapped = BrowserView.ensureWrapped(existing.id, {

    windowId: win.id,

  });

  const adopted = BrowserView.adoptExisting(existing.id, {

    windowId: win.id,

  });

  void wrapped;

  void adopted;

}

void allViews;
```

`ensureWrapped()` and `adoptExisting()` are advanced APIs for native views that
already exist. Calling `remove()` destroys a view and disconnects its RPC
transport; repeated calls are safe.

## Public methods

Content: `loadURL`, `loadHTML`, `executeJavascript`, `setNavigationRules`,
`setSpellCheck`.

- Developer tools and find: `openDevTools`, `closeDevTools`, `toggleDevTools`,
`findInPage`, `stopFindInPage`.

- Display: `setPageZoom`, `getPageZoom`.

- Lifecycle and events: `on`, `remove`, `ptr`.

- Static ownership: `getById`, `getAll`, `ensureWrapped`, `adoptExisting`, `on`,
`off`, and `defineRPC`.

## Native SDKs

Zig, Rust, Go, and Odin expose the webview verb set procedurally on `Core`,
keyed by the `u32` webview id `createWebview` returns. Only naming style
differs per language:

TypeScriptZig / OdinRustGo`view.loadURL(url)``loadURLInWebview(id, url)``load_url_in_webview(id, url)``LoadURLInWebview(id, url)``view.loadHTML(html)``loadHTMLInWebview(id, html)``load_html_in_webview(id, html)``LoadHTMLInWebview(id, html)``frame` / `autoResize` option`resizeWebview(id, frame, masks_json)``resize_webview(id, frame, masks_json)``ResizeWebview(id, frame, masksJSON)``startTransparent` / `startPassthrough` options`setWebviewTransparent` / `setWebviewPassthrough` / `setWebviewHidden``set_webview_transparent` / `set_webview_passthrough` / `set_webview_hidden``SetWebviewTransparent` / `SetWebviewPassthrough` / `SetWebviewHidden``view.setSpellCheck(b)``setWebviewSpellCheck(id, b)``set_webview_spell_check(id, b)``SetWebviewSpellCheck(id, b)``view.setNavigationRules(rules)``setWebviewNavigationRules(id, rules_json)``set_webview_navigation_rules(id, rules_json)``SetWebviewNavigationRules(id, rulesJSON)``view.findInPage` / `stopFindInPage``webviewFindInPage` / `webviewStopFind``webview_find_in_page` / `webview_stop_find``WebviewFindInPage` / `WebviewStopFind``view.openDevTools` / `closeDevTools` / `toggleDevTools``openWebviewDevTools` / `closeWebviewDevTools` / `toggleWebviewDevTools``open_webview_devtools` / `close_webview_devtools` / `toggle_webview_devtools``OpenWebviewDevtools` / `CloseWebviewDevtools` / `ToggleWebviewDevtools``view.setPageZoom` / `getPageZoom``setWebviewPageZoom` / `getWebviewPageZoom``set_webview_page_zoom` / `get_webview_page_zoom``SetWebviewPageZoom` / `GetWebviewPageZoom``view.executeJavascript(js)``evaluateJavaScriptWithNoCompletion(id, js)``evaluate_javascript_with_no_completion(id, js)``EvaluateJavaScriptWithNoCompletion(id, js)``view.remove()``removeWebview(id)``remove_webview(id)``RemoveWebview(id)`— (no TS history methods)`canWebviewGoBack` / `canWebviewGoForward`, `webviewGoBack` / `webviewGoForward`, `reloadWebview``can_webview_go_back` / `can_webview_go_forward`, `webview_go_back` / `webview_go_forward`, `reload_webview``CanWebviewGoBack` / `CanWebviewGoForward`, `WebviewGoBack` / `WebviewGoForward`, `ReloadWebview`

Not available natively: the typed RPC layer (`defineRPC`) — the native SDKs
provide only the raw JSON bridge primitives, and apps implement the
request/response envelope themselves; the `.on()` event emitter — native
webview events arrive through the C callbacks fixed at creation
(`decide_navigation`, `event`, and the bridge handlers); JavaScript
evaluation with a returned result — only the fire-and-forget
`evaluateJavaScriptWithNoCompletion` exists; and the download event stream
(`download-started` through `download-failed`), which has no native
equivalent.
        [Previous  BrowserWindow](/electrobun/apis/browser-window/) [Next  WebGPU](/electrobun/apis/webgpu/)
