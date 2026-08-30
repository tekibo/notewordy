# Project Ownership and the Devkit

Electrobun keeps workspace orchestration separate from application
configuration. The split is intentional: `hutch.config.ts` owns optional
release pins, tasks, and package-manager policy, while `electrobun.config.ts`
describes the application and build that Hutch produces.

## Responsibility map

ConcernOwnerElectrobun releaseExact `hutch.config.ts` → `electrobun.version` in published templates; optional in hand-written projects, which may use an npm or channel defaultBuild-time Hutch and Cottontail versionsOptional first-line `// @hutch` pragma; otherwise the invoking launcher’s pairProject tasks`hutch.config.ts` → `scripts`JavaScript package-manager policyHutch built-in resolver by default; optional external `hutch.config.ts` → `packageManager`Native toolchain resolution and shared installationsHutchNative compiler version overrides`electrobun.config.ts` → `build.&#x3C;language>.version`App identity and app version`electrobun.config.ts` → `app`Main-process choice and build inputs`electrobun.config.ts` → `build`Views, copied assets, signing, updates, and distribution`electrobun.config.ts`JavaScript dependency graph and lockfileHutch (`hutch.lock`) by default, or the explicitly selected external managerRust and Go dependenciesCargo and Go modulesElectrobun runtime and language SDKsCore assets on the selected Electrobun GitHub Release, installed and projected by Hutch

A minimal project makes the boundary visible:

```ts
export default {

  electrobun: { version: "2.0.0" },

  scripts: {

    install: ["hutch", "install"],

    "build:view": ["hutch", "pm", "exec", "--", "vite", "build"],

    dev: ["hutch", "electrobun", "dev", "--watch"],

    build: ["hutch", "electrobun", "build", "--env=stable"],

  },

};
```

```ts
import type { ElectrobunConfig } from "electrobun";

export default {

  app: {

    name: "My App",

    identifier: "dev.example.my-app",

    version: "0.1.0",

  },

  build: {

    mainProcess: "cottontail",

    cottontail: {

      entrypoint: "src/bun/index.ts",

    },

  },

} satisfies ElectrobunConfig;
```

Published templates include an exact `electrobun.version`, making the selected
runtime and SDK durable in source control. A hand-written project may omit it:
npm-launched commands then use the exact Electrobun version paired with the
installed `electrobun` dependency, while direct Hutch commands float on the
active release channel and reuse the projected version between explicit syncs.
When present, the exact release pin overrides either default.

## Where the SDK comes from

Each platform-specific `electrobun-core-*.tar.gz` archive on the selected
Electrobun GitHub Release contains that platform’s runtime, devkit manifest,
JavaScript API, and Zig, Rust, Go, and Odin SDKs. There is no separate SDK npm
package. The single dependency-free `electrobun` package on npm is only a thin
command: it reads `hutch-artifacts.json`, downloads and verifies the host’s
paired Hutch archive from that same GitHub Release when needed, and caches the
extracted launcher and engine under
`~/.hutch/npm/electrobun/&#x3C;electrobun-version>/&#x3C;platform>/` before invoking it.
That paired-Hutch asset is separate from the core archive and never owns or
supplies the SDK.

When Hutch prepares a project, it verifies and stores the selected platform
archive under `~/.hutch/releases/electrobun`. It then **copies**
the SDK trees into the project as a generated sysroot:

```text
.hutch/devkit/

|-- api/                  # JavaScript/TypeScript SDK source and config types

|-- zig-sdk/

|-- rust-sdk/

|-- go-sdk/

|-- odin-sdk/

|-- package.json          # electrobun/* export map for this release

|-- tsconfig.json         # TypeScript paths into api/

`-- projection.json       # version, platform, and manifest identity
```

All Electrobun SDK imports resolve to this project copy. TypeScript projects
normally extend `.hutch/devkit/tsconfig.json`; native builds point Cargo, Go,
Zig, or Odin at their matching directory under `.hutch/devkit`.

Templates ignore `.hutch/` by default. Hutch owns this generated projection and
may replace it during synchronization. Directly editing SDK files or committing
the projection is not a supported customization or dependency-management
workflow. Do not edit the shared installed release either.

 
Installed releases can be reused
  
Each Electrobun GitHub Release keeps its published core archives plus the four
paired Hutch mirrors. `electrobun-artifacts.json` indexes the core assets and
`hutch-artifacts.json` indexes the Hutch assets; both bind each archive’s
immutable release URL, byte size, and SHA-256 digest. Canonical Hutch and
Cottontail channel artifacts remain on their independent release hosts. Hutch
can reuse an exact release and managed toolchains that are already installed,
including for an offline build, and regenerates the project devkit from that
installation when needed. Anything missing requires a fresh network lookup and
download. Remote manifests and indexes are never persisted, and template
initialization always requires the network. Projects do not need to vendor
`.hutch/devkit`.
  

## External bundlers

Hutch injects exact aliases for the project devkit into its Electrobun bundles.
An external bundler such as Vite has its own resolver, so use the helper shipped
inside the projected SDK instead of installing `electrobun` as an application
dependency.

Run `hutch electrobun prepare` before Vite loads its config, then install every
project-SDK alias with `electrobunViteAliases()`:

```ts
import { resolve } from "node:path";

import { defineConfig } from "vite";

import { electrobunViteAliases } from "./.hutch/devkit/api/config/electrobun-vite";

export default defineConfig({

  resolve: {

    alias: electrobunViteAliases(resolve(__dirname, ".hutch/devkit")),

  },

});
```

An explicit Hutch task keeps non-advancing preparation and the compatibility
build together:

```ts
// hutch.config.ts (excerpt)

export default {

  scripts: {

    "build:view":

      "hutch electrobun prepare &#x26;&#x26; hutch pm exec -- vite build",

  },

};
```

The helper reads the selected devkit’s export map, creates exact aliases for
every `electrobun/*` entry, and rejects targets outside the projected `api`
tree. `node_modules` remains outside the SDK path.

## Default path and compatibility edge

The architectural center of Electrobun is Cottontail-native: Hutch runs project
TypeScript and shell tasks with Cottontail, and Cottontail is the default
JavaScript main process. Bun remains a first-class `build.mainProcess` option
and a separate, explicit `packageManager` choice; neither is a legacy mode.
Node-compatible packages, npm, and Vite are supported integration edges, but
none of them becomes the owner or source of Electrobun’s SDK.
        [Previous  Hot Reloading](/electrobun/guides/hot-reloading/) [Next  What is Electrobun?](/electrobun/guides/what-is-electrobun/)
