# Compatibility

## Supported targets

Operating systemArchitectureSystem webviewBundled webviewmacOSarm64WKWebViewCEFWindowsx64WebView2CEFLinuxx64WebKitGTK 4.1CEFLinuxarm64WebKitGTK 4.1CEF

Windows on ARM runs Electrobun’s x64 build through Windows emulation. Windows
ARM64 is not a separate build target.

Hutch builds for the current host operating system and architecture. Produce a
cross-platform release with native CI runners; native main-process compilers do
not currently cross-compile Electrobun apps.

## Main process runtimes

RuntimeStatusNotesCottontailDefaultNode.js and Bun-compatible TypeScript runtimeBunOptionalActual Bun runtime, built and packaged by HutchZigSupportedPinned Zig 0.16.0 toolchainRustSupportedPinned Rust 1.88.0 toolchainGoSupportedPinned Go 1.26.4 toolchainOdinSupportedPinned pre-1.0 Odin dev-2026-07a toolchain

Hutch accepts an exact matching system compiler. Otherwise it downloads the
pinned compiler into its shared global toolchain store.

## Webview engines

System webviews produce the smallest bundles and receive browser updates from
the operating system. Set `bundleCEF: true` and select the CEF renderer when an
application needs a pinned Chromium implementation.

Electrobun pins and tests one CEF release with each framework release. Hutch
does not currently expose a per-project CEF version override.

Linux requires GTK 3, WebKitGTK 4.1, Ayatana AppIndicator, and librsvg runtime
packages even when CEF is bundled. See
[Cross-Platform Development](/electrobun/guides/cross-platform-development/)
for package names.

## JavaScript compatibility

Cottontail targets practical Node.js and Bun compatibility and is exercised
against copied upstream conformance tests on macOS, Windows, and Linux. Runtime
compatibility is separate from package management. Hutch’s built-in resolver
owns the JavaScript dependency graph and `hutch.lock` by default; a project may
explicitly select npm, pnpm, Yarn, or Bun to own them instead. Hutch also owns
Electrobun builds, versioned devkits, and compiler toolchains.

Native addons and code that depends on undocumented runtime internals can still
be platform- or runtime-specific. Test the application on every target before a
production release.
        [Previous  Cross-Platform Development](/electrobun/guides/cross-platform-development/) [Next  Code Signing](/electrobun/guides/code-signing/)
