# Paths

In TypeScript, `PATHS` exposes the packaged resource and view directories.
The native SDKs resolve the same bundle locations with `resolveBundlePaths`
and expose the writable per-user directories through their `Paths` type
(the `app_info` argument comes from `resolveAppInfoFromBundle`).

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
			if (tabIndexToRestore    - [Cottontail](#tab-panel-36)
- [Bun](#tab-panel-37)
- [Zig](#tab-panel-38)
- [Rust](#tab-panel-39)
- [Go](#tab-panel-40)
- [Odin](#tab-panel-41)
    - ```ts
import { PATHS } from "electrobun/main";

console.log(PATHS.RESOURCES_FOLDER);

console.log(PATHS.VIEWS_FOLDER);
```
  
```ts
import { PATHS } from "electrobun/main";

console.log(PATHS.RESOURCES_FOLDER);

console.log(PATHS.VIEWS_FOLDER);
```
  
```zig
// Packaged, read-only bundle locations (backs views://):

var bundle_paths = try electrobun.resolveBundlePaths(allocator);

defer bundle_paths.deinit(allocator);

std.debug.print("{s}\n", .{bundle_paths.resources_dir});

// Writable per-user directories, scoped by app identifier + channel:

var paths = try electrobun.Paths.resolve(allocator, app_info);

defer paths.deinit(allocator);

std.debug.print("{s}\n", .{paths.userData});
```
  
```rust
// Packaged, read-only bundle locations (backs views://):

let bundle_paths = electrobun::resolve_bundle_paths()?;

println!("{}", bundle_paths.resources_dir.display());

// Writable per-user directories, scoped by app identifier + channel:

let paths = Paths::resolve(&#x26;app_info)?;

println!("{}", paths.user_data);
```
  
```go
// Packaged, read-only bundle locations (backs views://):

bundlePaths, err := electrobun.ResolveBundlePaths()

fmt.Println(bundlePaths.ResourcesDir)

// Writable per-user directories, scoped by app identifier + channel:

paths, err := electrobun.ResolvePaths(appInfo)

fmt.Println(paths.UserData)
```
  
```odin
// Packaged, read-only bundle locations (backs views://):

bundle_paths, bundle_err := electrobun.resolveBundlePaths()

defer electrobun.deinit(&#x26;bundle_paths, context.allocator)

fmt.println(bundle_paths.resources_dir)

// Writable per-user directories, scoped by app identifier + channel:

paths, paths_err := electrobun.resolvePaths(context.allocator, app_info)

defer electrobun.deinit(&#x26;paths, context.allocator)

fmt.println(paths.userData)
```
     class r extends HTMLElement{static#e=new Map;#t;#n="starlight-synced-tabs__";constructor(){super();const t=this.querySelector('[role="tablist"]');if(this.tabs=[...t.querySelectorAll('[role="tab"]')],this.panels=[...this.querySelectorAll(':scope > [role="tabpanel"]')],this.#t=this.dataset.syncKey,this.#t){const i=r.#e.get(this.#t)??[];i.push(this),r.#e.set(this.#t,i)}this.tabs.forEach((i,c)=>{i.addEventListener("click",e=>{e.preventDefault();const n=t.querySelector('[aria-selected="true"]');e.currentTarget!==n&&this.switchTab(e.currentTarget,c)}),i.addEventListener("keydown",e=>{const n=this.tabs.indexOf(e.currentTarget),s=e.key==="ArrowLeft"?n-1:e.key==="ArrowRight"?n+1:e.key==="Home"?0:e.key==="End"?this.tabs.length-1:null;s!==null&&this.tabs[s]&&(e.preventDefault(),this.switchTab(this.tabs[s],s))})})}switchTab(t,i,c=!0){if(!t)return;const e=c?this.getBoundingClientRect().top:0;this.tabs.forEach(s=>{s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),this.panels.forEach(s=>{s.hidden=!0});const n=this.panels[i];n&&(n.hidden=!1),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),c&&(t.focus(),r.#r(this,t),window.scrollTo({top:window.scrollY+(this.getBoundingClientRect().top-e),behavior:"instant"}))}#i(t){!this.#t||typeof localStorage>"u"||localStorage.setItem(this.#n+this.#t,t)}static#r(t,i){const c=t.#t,e=r.#s(i);if(!c||!e)return;const n=r.#e.get(c);if(n){for(const s of n){if(s===t)continue;const a=s.tabs.findIndex(o=>r.#s(o)===e);a!==-1&&s.switchTab(s.tabs[a],a,!1)}t.#i(e)}}static#s(t){return t.textContent?.trim()}}customElements.define("starlight-tabs",r);

`RESOURCES_FOLDER` is the app bundle’s `Resources` directory. The native
equivalent is the `resources_dir` / `ResourcesDir` field of the bundle
paths.

- `VIEWS_FOLDER` is `Resources/app/views`, which backs the `views://` protocol.

The native `Paths` type carries the same fields as `Utils.paths` in
TypeScript: `home`, `appData`, `config`, `cache`, `temp`, `logs`,
`documents`, `downloads`, `desktop`, `pictures`, `music`, `videos`,
`userData`, `userCache`, and `userLogs` (snake_case in Rust, CamelCase in
Go). On every runtime, `userData`, `userCache`, and `userLogs` resolve to
`&#x3C;base>/&#x3C;identifier>/&#x3C;install-root>` using the packaged app identifier and
physical install-root name. That root normally matches the packaged release
channel. Supported Electrobun v1 updates keep their existing physical root,
including `stable` and older app-name roots, so app data stays in place.

Packaged resources are read-only application content. Modifying a macOS app
bundle invalidates its code signature. Use `Utils.paths.userData`,
`Utils.paths.userCache`, or another writable system directory for mutable data.

For installer builds, Electrobun’s `App and Data` uninstall action removes the
three app-scoped paths (`userData`, `userCache`, and `userLogs`) for only the
current identifier and recorded physical install root. See
[Uninstalling](/electrobun/guides/uninstalling/) for the exact behavior and
platform availability.
        [Previous  Application Menu](/electrobun/apis/application-menu/) [Next  Tray](/electrobun/apis/tray/)
