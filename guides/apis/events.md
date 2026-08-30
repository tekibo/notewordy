# Events

The default main-process export exposes the global event emitter. Window,
webview, menu, and tray objects also expose scoped listeners. In the native
SDKs there is no emitter: window and webview events are C callbacks
registered at creation time.

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-24)
- [Bun](#tab-panel-25)
- [Zig](#tab-panel-26)
- [Rust](#tab-panel-27)
- [Go](#tab-panel-28)
- [Odin](#tab-panel-29)
    - ```ts
import Electrobun, { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Events",

  url: "views://mainview/index.html",

});

Electrobun.events.on("will-navigate", (event) => {

  console.log("Any view will navigate", event);

});

win.webview.on("will-navigate", (event: unknown) => {

  console.log("This view will navigate", event);

});
```
  
```ts
import Electrobun, { BrowserWindow } from "electrobun/main";

const win = new BrowserWindow({

  title: "Events",

  url: "views://mainview/index.html",

});

Electrobun.events.on("will-navigate", (event) => {

  console.log("Any view will navigate", event);

});

win.webview.on("will-navigate", (event: unknown) => {

  console.log("This view will navigate", event);

});
```
  
```zig
fn onResize(window_id: u32, x: f64, y: f64, width: f64, height: f64) callconv(.C) void {

    std.debug.print("window {d} resized to {d}x{d} at ({d},{d})\n", .{ window_id, width, height, x, y });

}

fn onWebviewEvent(webview_id: u32, event_name: [*:0]const u8, payload: [*:0]const u8) callconv(.C) void {

    std.debug.print("webview {d}: {s} {s}\n", .{ webview_id, event_name, payload });

}

const window_id = try core.createWindow(.{

    .title = "Events",

    .callbacks = .{ .resize = onResize },

});

_ = try core.createWebview(.{

    .window_id = window_id,

    .url = "views://mainview/index.html",

    .callbacks = .{

        .decide_navigation = electrobun.allowAllNavigation,

        .event = onWebviewEvent,

    },

});
```
  
```rust
extern "C" fn on_resize(window_id: u32, x: f64, y: f64, width: f64, height: f64) {

    println!("window {window_id} resized to {width}x{height} at ({x},{y})");

}

extern "C" fn on_webview_event(webview_id: u32, event_name: *const c_char, detail: *const c_char) {

    let name = electrobun::c_string_to_string(event_name);

    let detail = electrobun::c_string_to_string(detail);

    println!("webview {webview_id}: {name} {detail}");

}

let mut window_options = WindowOptions::new("Events", Rect::new(160.0, 100.0, 960.0, 640.0));

window_options.callbacks = WindowCallbacks {

    resize: Some(on_resize),

    ..WindowCallbacks::default()

};

let window_id = core.create_window(window_options)?;

let mut webview_options = WebviewOptions::new(

    window_id,

    "views://mainview/index.html",

    Rect::new(0.0, 0.0, 960.0, 640.0),

);

webview_options.callbacks = WebviewCallbacks {

    decide_navigation: Some(electrobun::allow_all_navigation),

    event: Some(on_webview_event),

    ..WebviewCallbacks::default()

};

core.create_webview(webview_options)?;
```
  
```go
windowOptions := electrobun.NewWindowOptions(

    "Events",

    electrobun.NewRect(160, 100, 960, 640),

)

windowOptions.Callbacks = electrobun.WindowCallbacks{

    Resize: func(windowID uint32, x, y, width, height float64) {

        fmt.Printf("window %d resized to %.0fx%.0f\n", windowID, width, height)

    },

}

windowID, err := core.CreateWindow(windowOptions)

webviewOptions := electrobun.NewWebviewOptions(

    windowID,

    "views://mainview/index.html",

    electrobun.NewRect(0, 0, 960, 640),

)

webviewOptions.Callbacks = electrobun.WebviewCallbacks{

    DecideNavigation: electrobun.AllowAllNavigation,

    Event: func(webviewID uint32, eventName, detail string) {

        fmt.Printf("webview %d: %s %s\n", webviewID, eventName, detail)

    },

}

webviewID, err := core.CreateWebview(webviewOptions)
```
  
```odin
import "base:runtime"

on_window_resize :: proc "c" (window_id: u32, x: f64, y: f64, width: f64, height: f64) {

  context = runtime.default_context()

  fmt.printfln("window %d resized to %.0fx%.0f", window_id, width, height)

}

on_webview_event :: proc "c" (webview_id: u32, event_name: cstring, detail: cstring) {

  context = runtime.default_context()

  fmt.printfln("webview %d: %s %s", webview_id, event_name, detail)

}

window_options := electrobun.defaultWindowOptions("Events")

window_options.callbacks.resize = on_window_resize

window_id, window_err := electrobun.createWindow(core, window_options)

webview_options := electrobun.defaultWebviewOptions(window_id)

webview_options.url = "views://mainview/index.html"

webview_options.callbacks = {

  decide_navigation = electrobun.allowAllNavigation,

  event             = on_webview_event,

}

webview_id, webview_err := electrobun.createWebview(core, webview_options)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
   Note   The native SDKs have no event emitter. Window events are the
`WindowCallbacks` slots (`close`, `should_close`, `move`, `resize`, `focus`,
`blur`, `key`), and webview events arrive through the `WebviewCallbacks`
slots (`decide_navigation`, `event`, and the bridge callbacks) — all fixed
at creation time. The only app-level hooks are the four handlers set on
`Core`: quit-requested (TypeScript `before-quit`), reopen, URL open
(TypeScript `open-url`), and the global-shortcut callback.  
The rest of this page documents the TypeScript emitter surface used by
Cottontail and Bun.

## Event objects

Electrobun events expose:

`name`: emitted event name.

- `data`: event-specific payload.

- `response`: optional response consumed by a cancellable native action.

- `responseWasSet`: whether a handler assigned a response.

- `clearResponse()`: remove a response set by an earlier handler.

Handlers run synchronously in registration order. A cancellable action reads
the response after emission, so assign `event.response` before returning from
the callback.

## Application events

Current application event names are `application-menu-clicked`,
`context-menu-clicked`, `open-url`, `reopen`, and `before-quit`.

```ts
import Electrobun from "electrobun/main";

Electrobun.events.on("open-url", (event) => {

  const data = event.data as { url: string };

  const url = new URL(data.url);

  console.log(url.protocol, url.pathname);

});

Electrobun.events.on("before-quit", (event) => {

  const shouldCancel = false;

  if (shouldCancel) {

    event.response = { allow: false };

  }

});
```

On macOS, custom schemes and associated files arrive through `open-url`; files
use `file://` URLs. Configure them with `app.urlSchemes` and
`app.fileAssociations`.

## Window events

Current window event names are `close`, `will-close`, `resize`, `move`,
`focus`, `blur`, `keyDown`, and `keyUp`. Per-window close handlers run before
the internal last-window shutdown logic.

## Webview events

Current webview event names are `will-navigate`, `did-navigate`,
`did-navigate-in-page`, `did-commit-navigation`, `dom-ready`,
`new-window-open`, `host-message`, `download-started`, `download-progress`,
`download-completed`, and `download-failed`.

The `BrowserView.on()` typed surface currently includes navigation, readiness,
and download events. `&#x3C;electrobun-webview>` exposes its browser-side event
surface documented on the [webview tag page](/electrobun/apis/browser/electrobun-webview-tag/).

## Shutdown

Use `before-quit` to synchronously save in-memory state, initiate already
prepared cleanup, or cancel shutdown. The current event emitter does **not**
await a returned promise.

```ts
import Electrobun from "electrobun/main";

Electrobun.events.on("before-quit", (event) => {

  const canQuit = true;

  if (!canQuit) {

    event.response = { allow: false };

    return;

  }

  console.log("Application is quitting");

});

process.on("exit", (code) => {

  console.log("Process exited with code", code);

});
```

 
Caution
  
Do not put awaited cleanup after an `await` inside `before-quit` and assume it
will delay shutdown. Complete required asynchronous persistence before allowing
the quit, or cancel and explicitly retry the quit after cleanup finishes.
          [Previous  Updater](/electrobun/apis/updater/) [Next  BuildConfig](/electrobun/apis/build-config/)
