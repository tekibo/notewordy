# Context Menu

Call `ContextMenu.showContextMenu()` from the main process. The menu opens at
the current global pointer position.

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-18)
- [Bun](#tab-panel-19)
- [Zig](#tab-panel-20)
- [Rust](#tab-panel-21)
- [Go](#tab-panel-22)
- [Odin](#tab-panel-23)
    
```ts
import { ContextMenu } from "electrobun/main";

ContextMenu.showContextMenu([

  {

    label: "Open",

    action: "open",

    accelerator: "o",

    data: { source: "context-menu" },

  },

  {

    label: "More",

    submenu: [

      { label: "Rename", action: "rename" },

      { label: "Delete", action: "delete", enabled: false },

    ],

  },

  { type: "separator" },

  { role: "copy" },

  { role: "paste" },

]);

ContextMenu.on("context-menu-clicked", (event: unknown) => {

  console.log("Context menu action", event);

});
```
  
```ts
import { ContextMenu } from "electrobun/main";

ContextMenu.showContextMenu([

  {

    label: "Open",

    action: "open",

    accelerator: "o",

    data: { source: "context-menu" },

  },

  {

    label: "More",

    submenu: [

      { label: "Rename", action: "rename" },

      { label: "Delete", action: "delete", enabled: false },

    ],

  },

  { type: "separator" },

  { role: "copy" },

  { role: "paste" },

]);

ContextMenu.on("context-menu-clicked", (event: unknown) => {

  console.log("Context menu action", event);

});
```
  
```zig
fn onContextMenuAction(item_id: u32, action: [*:0]const u8) callconv(.C) void {

    std.debug.print("context menu action: {d} {s}\n", .{ item_id, action });

}

const menu_json =

    \\[{"label": "Open", "action": "open"},

    \\ {"label": "Rename", "action": "rename"},

    \\ {"type": "separator"},

    \\ {"role": "copy"},

    \\ {"role": "paste"}]

;

try core.showContextMenuJson(menu_json, onContextMenuAction);
```
  
```rust
extern "C" fn on_context_menu_action(item_id: u32, action: *const c_char) {

    let action = electrobun::c_string_to_string(action);

    println!("context menu action: {item_id} {action}");

}

let menu_json = r#"[

  {"label": "Open", "action": "open"},

  {"label": "Rename", "action": "rename"},

  {"type": "separator"},

  {"role": "copy"},

  {"role": "paste"}

]"#;

core.show_context_menu_json(menu_json, Some(on_context_menu_action))?;
```
  
```go
menuJSON := `[

  {"label": "Open", "action": "open"},

  {"label": "Rename", "action": "rename"},

  {"type": "separator"},

  {"role": "copy"},

  {"role": "paste"}

]`

err := core.ShowContextMenuJSON(menuJSON, func(itemID uint32, action string) {

    fmt.Printf("context menu action: %d %s\n", itemID, action)

})
```
  
```odin
on_context_menu_action :: proc "c" (item_id: u32, action: cstring) {

    context = runtime.default_context()

    fmt.printfln("context menu action: %d %s", item_id, action)

}

MENU_JSON :: `[

  {"label": "Open", "action": "open"},

  {"label": "Rename", "action": "rename"},

  {"type": "separator"},

  {"role": "copy"},

  {"role": "paste"}

]`

_ = electrobun.showContextMenuJson(core, MENU_JSON, on_context_menu_action)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);
 
Note
  
The native SDKs have no typed menu builder: `showContextMenuJson` (Rust
`show_context_menu_json`, Go `ShowContextMenuJSON`) takes a raw JSON string
using the same menu schema the TypeScript SDK serializes, so the item fields
below apply unchanged. Item `action` values arrive in the
`StatusItemHandler` callback instead of an event emitter.
  

Normal items support `label`, `action` or `role`, `data`, `submenu`, `enabled`,
`checked`, `hidden`, `tooltip`, and `accelerator`. Separators accept either
`separator` or `divider` as their type.

In a webview, prevent the browser’s default `contextmenu` event and make an RPC
request to the main process, which owns the native menu API.

Context menus are currently implemented on macOS and Windows. Linux support is
not yet available.
        [Previous  Utils](/electrobun/apis/utils/) [Next  Application Menu](/electrobun/apis/application-menu/)
