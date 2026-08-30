# Application Menu

Use `ApplicationMenu.setApplicationMenu()` in the main process. A role invokes
native operating-system behavior; an action emits an event for application
code.

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-0)
- [Bun](#tab-panel-1)
- [Zig](#tab-panel-2)
- [Rust](#tab-panel-3)
- [Go](#tab-panel-4)
- [Odin](#tab-panel-5)
    
```ts
import { ApplicationMenu } from "electrobun/main";

ApplicationMenu.setApplicationMenu([

  {

    label: "File",

    submenu: [

      {

        label: "New project",

        action: "new-project",

        accelerator: "n",

      },

      { type: "separator" },

      { role: "close" },

      { role: "quit" },

    ],

  },

  {

    label: "Edit",

    submenu: [

      { role: "undo" },

      { role: "redo" },

      { type: "separator" },

      { role: "cut" },

      { role: "copy" },

      { role: "paste" },

      { role: "selectAll" },

    ],

  },

]);

ApplicationMenu.on("application-menu-clicked", (event: unknown) => {

  console.log("Application menu action", event);

});
```
  
```ts
import { ApplicationMenu } from "electrobun/main";

ApplicationMenu.setApplicationMenu([

  {

    label: "File",

    submenu: [

      {

        label: "New project",

        action: "new-project",

        accelerator: "n",

      },

      { type: "separator" },

      { role: "close" },

      { role: "quit" },

    ],

  },

  {

    label: "Edit",

    submenu: [

      { role: "undo" },

      { role: "redo" },

      { type: "separator" },

      { role: "cut" },

      { role: "copy" },

      { role: "paste" },

      { role: "selectAll" },

    ],

  },

]);

ApplicationMenu.on("application-menu-clicked", (event: unknown) => {

  console.log("Application menu action", event);

});
```
  
```zig
fn onMenuAction(item_id: u32, action: [*:0]const u8) callconv(.C) void {

    std.debug.print("application menu action: {d} {s}\n", .{ item_id, action });

}

const menu_json =

    \\[{"label": "File", "submenu": [

    \\  {"label": "New project", "action": "new-project", "accelerator": "n"},

    \\  {"type": "separator"},

    \\  {"role": "close"},

    \\  {"role": "quit"}

    \\]}]

;

try core.setApplicationMenuJson(menu_json, onMenuAction);
```
  
```rust
extern "C" fn on_menu_action(item_id: u32, action: *const c_char) {

    let action = electrobun::c_string_to_string(action);

    println!("application menu action: {item_id} {action}");

}

let menu_json = r#"[

  {"label": "File", "submenu": [

    {"label": "New project", "action": "new-project", "accelerator": "n"},

    {"type": "separator"},

    {"role": "close"},

    {"role": "quit"}

  ]}

]"#;

core.set_application_menu_json(menu_json, Some(on_menu_action))?;
```
  
```go
menuJSON := `[

  {"label": "File", "submenu": [

    {"label": "New project", "action": "new-project", "accelerator": "n"},

    {"type": "separator"},

    {"role": "close"},

    {"role": "quit"}

  ]}

]`

err := core.SetApplicationMenuJSON(menuJSON, func(itemID uint32, action string) {

    fmt.Printf("application menu action: %d %s\n", itemID, action)

})
```
  
```odin
on_menu_action :: proc "c" (item_id: u32, action: cstring) {

    context = runtime.default_context()

    fmt.printfln("application menu action: %d %s", item_id, action)

}

MENU_JSON :: `[

  {"label": "File", "submenu": [

    {"label": "New project", "action": "new-project", "accelerator": "n"},

    {"type": "separator"},

    {"role": "close"},

    {"role": "quit"}

  ]}

]`

_ = electrobun.setApplicationMenuJson(core, MENU_JSON, on_menu_action)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
 
Note
  
The native SDKs have no typed menu builder: `setApplicationMenuJson` (Rust
`set_application_menu_json`, Go `SetApplicationMenuJSON`) takes a raw JSON
string using the same menu schema the TypeScript SDK serializes, so the item
fields and roles documented below apply unchanged. Custom `action` values
arrive in the `StatusItemHandler` callback instead of an event emitter.
  

## Menu items

A normal item supports these fields:

FieldTypePurpose`label``string`Visible item text. Optional when a role supplies its standard label.`action``string`Custom action emitted when selected.`role``string`Native menu command. Do not combine it with `action`.`submenu``ApplicationMenuItemConfig[]`Nested items.`enabled``boolean`Disable interaction when `false`.`checked``boolean`Show the checked state.`hidden``boolean`Hide the item.`tooltip``string`Native tooltip where supported.`accelerator``string`Single-key custom shortcut; Command on macOS and Control on Windows.`data``unknown`Serializable application data attached to the action.

Use `{ type: "separator" }` or `{ type: "divider" }` for a divider.

## Roles

Common roles include `about`, `quit`, `hide`, `hideOthers`, `showAll`,
`minimize`, `zoom`, `close`, `toggleFullScreen`, `undo`, `redo`, `cut`,
`copy`, `paste`, `pasteAndMatchStyle`, `delete`, and `selectAll`.

Electrobun also accepts native text movement, selection, deletion, insertion,
speech, and scrolling roles. Roles are forwarded to the platform menu system;
unsupported roles have no native action on that platform.

## Stateful items

Rebuild the menu when application state changes:

```ts
import { ApplicationMenu } from "electrobun/main";

let sidebarVisible = true;

function updateMenu() {

  ApplicationMenu.setApplicationMenu([

    {

      label: "View",

      submenu: [

        {

          label: "Show sidebar",

          action: "toggle-sidebar",

          checked: sidebarVisible,

        },

      ],

    },

  ]);

}

ApplicationMenu.on("application-menu-clicked", (event: unknown) => {

  console.log(event);

  sidebarVisible = !sidebarVisible;

  updateMenu();

});

updateMenu();
```

Application menus are currently implemented on macOS and Windows. Linux apps
should expose essential actions in application UI or a supported tray menu.
        [Previous  Context Menu](/electrobun/apis/context-menu/) [Next  Paths](/electrobun/apis/paths/)
