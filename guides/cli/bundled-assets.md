# Bundled Assets

Electrobun maps files under the packaged `Resources/app/views` directory to the
`views://` protocol. Use these URLs anywhere a webview accepts a normal URL.

## Configure a view

`build.views` bundles JavaScript or TypeScript entrypoints. `build.copy` copies
HTML, CSS, images, and other static files without transforming them.

```ts
import type { ElectrobunConfig } from "electrobun";

export default {

  app: {

    name: "Assets Example",

    identifier: "dev.example.assets",

    version: "1.0.0",

  },

  build: {

    views: {

      mainview: {

        entrypoint: "src/mainview/index.ts",

      },

    },

    copy: {

      "src/mainview/index.html": "views/mainview/index.html",

      "src/mainview/style.css": "views/mainview/style.css",

      "src/mainview/logo.png": "views/mainview/logo.png",

    },

  },

} satisfies ElectrobunConfig;
```

The destination `views/mainview/index.html` becomes
`views://mainview/index.html` at runtime. View names are application-defined;
you can add as many entries as needed.

## Load bundled content

```ts
import { BrowserWindow } from "electrobun/main";

const mainWindow = new BrowserWindow({

  title: "Bundled content",

  url: "views://mainview/index.html",

  frame: { width: 800, height: 600 },

});

void mainWindow;
```

`BrowserWindow` takes the URL in its constructor. Loading a new URL later is a
`BrowserView` operation: `mainWindow.webview.loadURL(url)`.

## Reference assets from HTML and CSS

```html
&#x3C;!doctype html>

&#x3C;html lang="en">

  &#x3C;head>

    &#x3C;meta charset="UTF-8" />

    &#x3C;title>Bundled content&#x3C;/title>

    &#x3C;link rel="stylesheet" href="views://mainview/style.css" />

    &#x3C;script type="module" src="views://mainview/index.js">&#x3C;/script>

  &#x3C;/head>

  &#x3C;body>

    &#x3C;img src="views://mainview/logo.png" alt="Application logo" />

  &#x3C;/body>

&#x3C;/html>
```

```css
body {

  background-image: url("views://mainview/logo.png");

}
```

Each configured view is emitted as `views/&#x3C;view-name>/index.js`, independent of
the entrypoint’s filename. In this example, the `mainview` entry becomes
`views/mainview/index.js`.

 
Note
  
`views://` is read-only packaged content. Store mutable application data under
`Utils.paths.userData`, `Utils.paths.userCache`, or another writable system
directory.
          [Previous  CLI Arguments](/electrobun/apis/cli/cli-args/) [Next  Bundling CEF](/electrobun/apis/bundling-cef/)
