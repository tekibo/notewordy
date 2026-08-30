# Tray

Create trays in the main process. Images may be absolute paths or bundled
`views://` URLs.

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-42)
- [Bun](#tab-panel-43)
- [Zig](#tab-panel-44)
- [Rust](#tab-panel-45)
- [Go](#tab-panel-46)
- [Odin](#tab-panel-47)
    
```ts
import { Tray } from "electrobun/main";

const tray = new Tray({

  title: "My app",

  image: "views://assets/tray-icon.png",

  template: true,

  width: 32,

  height: 32,

});

const menuState: Record&#x3C;string, boolean> = {

  notifications: true,

};

function updateTrayMenu() {

  tray.setMenu([

    {

      type: "normal",

      label: "Notifications",

      action: "notifications",

      checked: menuState.notifications,

    },

    { type: "separator" },

    {

      type: "normal",

      label: "Quit",

      action: "quit",

    },

  ]);

}

// Install the menu before listening for interaction. This is required for the

// supported Linux AppIndicator interaction path and works on every platform.

updateTrayMenu();

type TrayClickEvent = {

  data: { id: number; action: string; data?: unknown };

};

tray.on("tray-clicked", (event: unknown) => {

  const { action } = (event as TrayClickEvent).data;

  if (action === "notifications") {

    menuState.notifications = !menuState.notifications;

    updateTrayMenu();

  }

});
```
  
```ts
import { Tray } from "electrobun/main";

const tray = new Tray({

  title: "My app",

  image: "views://assets/tray-icon.png",

  template: true,

  width: 32,

  height: 32,

});

const menuState: Record&#x3C;string, boolean> = {

  notifications: true,

};

function updateTrayMenu() {

  tray.setMenu([

    {

      type: "normal",

      label: "Notifications",

      action: "notifications",

      checked: menuState.notifications,

    },

    { type: "separator" },

    {

      type: "normal",

      label: "Quit",

      action: "quit",

    },

  ]);

}

// Install the menu before listening for interaction. This is required for the

// supported Linux AppIndicator interaction path and works on every platform.

updateTrayMenu();

type TrayClickEvent = {

  data: { id: number; action: string; data?: unknown };

};

tray.on("tray-clicked", (event: unknown) => {

  const { action } = (event as TrayClickEvent).data;

  if (action === "notifications") {

    menuState.notifications = !menuState.notifications;

    updateTrayMenu();

  }

});
```
  
```zig
const tray_id = try core.createTray(.{

    .title = "My app",

    .image = "", // absolute path to an icon file, or empty for text-only

    .is_template = true,

    .width = 32,

    .height = 32,

});

try core.setTrayTitle(tray_id, "Ready");

const bounds = try core.getTrayBounds(tray_id);

_ = bounds;

try core.hideTray(tray_id);

try core.showTray(tray_id);

try core.removeTray(tray_id);
```
  
```rust
let tray_id = core.create_tray(TrayOptions {

    title: "My app",

    image: "", // absolute path to an icon file, or empty for text-only

    is_template: true,

    width: 32,

    height: 32,

})?;

core.set_tray_title(tray_id, "Ready")?;

let bounds = core.get_tray_bounds(tray_id)?;

core.hide_tray(tray_id)?;

core.show_tray(tray_id)?;

core.remove_tray(tray_id)?;
```
  
```go
trayID, err := core.CreateTray(electrobun.TrayOptions{

    Title:      "My app",

    Image:      "", // absolute path to an icon file, or empty for text-only

    IsTemplate: true,

    Width:      32,

    Height:     32,

    Handler: func(id uint32, action string) {

        fmt.Printf("tray %d activated: %s\n", id, action)

    },

})

err = core.SetTrayTitle(trayID, "Ready")

bounds, err := core.GetTrayBounds(trayID)

err = core.HideTray(trayID)

err = core.ShowTray(trayID)

err = core.RemoveTray(trayID)
```
  
```odin
tray_options := electrobun.defaultTrayOptions("") // image path, or empty for text-only

tray_options.title = "My app"

tray_options.is_template = true

tray_options.width = 32

tray_options.height = 32

tray_id, tray_err := electrobun.createTray(core, tray_options)

_ = electrobun.setTrayTitle(core, tray_id, "Ready")

bounds, bounds_err := electrobun.getTrayBounds(core, tray_id)

_ = electrobun.hideTray(core, tray_id)

_ = electrobun.showTray(core, tray_id)

_ = electrobun.removeTray(core, tray_id)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
 
Note
  
The native SDKs create and manage tray items — show/hide (`showTray` /
`hideTray`), title (`setTrayTitle`), bounds (`getTrayBounds`), and removal
(`removeTray`) — but tray click events are not yet surfaced to native
handlers in Zig, Rust, or Odin: those `createTray` wrappers currently pass a
null click handler. The Go SDK’s `TrayOptions` does accept a `Handler`
(`StatusItemHandler`) for tray activation. Tray menus (`setMenu()`) and the
`tray-clicked` event flow shown above are TypeScript-SDK features and remain
Cottontail/Bun-only.
  

## Constructor options

OptionTypeDefaultPurpose`title``string``""`Text shown by the tray backend.`image``string``""``views://` URL or absolute image path.`template``boolean``true`Treat the image as a macOS template image.`width``number``16`Requested image width.`height``number``16`Requested image height.

## Methods and lookup

```ts
import { Tray } from "electrobun/main";

const tray = new Tray({

  title: "Status",

  image: "views://assets/tray-icon.png",

});

tray.setTitle("Ready");

tray.setImage("views://assets/tray-ready.png");

tray.setVisible(false);

tray.setVisible(true);

const bounds = tray.getBounds();

const sameTray = Tray.getById(tray.id);

const allTrays = Tray.getAll();

void bounds;

void sameTray;

void allTrays;

tray.remove();
```

Use `Tray.removeById(id)` instead when only a stored tray ID is available.

`setMenu()` replaces the current menu. Tray menu normal items require `type: "normal"` and `label`; they also support `action`, `data`, `submenu`, `enabled`,
`checked`, `hidden`, and `tooltip`.

## Platform behavior

Ayatana AppIndicator backend supports tray menus and their actions but does not
expose raw primary icon activation. Linux apps should use `setMenu()` and handle
menu actions; do not wait for an icon-only click to install the menu. A backend
that exposes raw activation may emit
`tray-clicked` with an empty action; portable apps should use explicit menu
actions.
        [Previous  Paths](/electrobun/apis/paths/) [Next  Updater](/electrobun/apis/updater/)
