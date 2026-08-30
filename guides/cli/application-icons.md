# Application Icons

Set platform icon sources in `electrobun.config.ts`:

```ts
import type { ElectrobunConfig } from "electrobun";

export default {

  app: {

    name: "Icon Example",

    identifier: "dev.example.icons",

    version: "1.0.0",

  },

  build: {

    mac: {

      icons: "icon.iconset",

    },

    win: {

      icon: "assets/icon.ico",

    },

    linux: {

      icon: "assets/icon.png",

    },

  },

} satisfies ElectrobunConfig;
```

## macOS

`build.mac.icons` accepts either a traditional `.iconset` directory or a
modern `.icon` file created by Apple’s Icon Composer.

An iconset normally contains:

```text
icon_16x16.png

[email&#160;protected]

icon_32x32.png

[email&#160;protected]

icon_128x128.png

[email&#160;protected]

icon_256x256.png

[email&#160;protected]

icon_512x512.png

[email&#160;protected]
```

Electrobun converts `.iconset` directories with `iconutil`. Compiling `.icon`
files uses `actool` and therefore requires a full Xcode installation, not only
Command Line Tools. See [Apple’s app icon
documentation](https://developer.apple.com/documentation/xcode/configuring-your-app-icon).

## Windows

`build.win.icon` accepts `.ico` or `.png`. Hutch converts PNG input to ICO and
embeds the icon into packaged executables and the installer. Use a 256 x 256 or
larger PNG, or a multi-resolution ICO containing 16, 32, 48, and 256 pixel
variants.

## Linux

`build.linux.icon` accepts PNG. Hutch includes it in the app bundle and generated
desktop entry. A 256 x 256 or larger source is recommended.

 
Tip
  
A high-resolution PNG from the macOS iconset can also be the Windows and Linux
source when a platform-specific design is not required.
          [Previous  Bundling CEF](/electrobun/apis/bundling-cef/) [Next  All releases](/electrobun/guides/changelog/)
