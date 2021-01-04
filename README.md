# pwa-update

_Built with [lit-element](https://lit-element.polymer-project.org/)_

### What does it look like?

![An image of what the component looks like](assets/update.png?raw=true "pwa-update")

## Supported Browsers

- Edge
- Chrome
- Firefox
- Safari

## Using this component

## Install

There are two ways to use this component. For simple projects or just to get started fast, we recommend using the component by script tag. If your project is using [npm](https://www.npmjs.com/) then we recommend using the npm package.

### Script tag

- Put this bit of code in your index.html

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/pwaupdate"></script>

<pwa-update></pwa-update>
```

### NPM

- Run `npm install pwaupdate`
- import with `import 'pwaupdate'`

Then you can use the element `<pwa-update></pwa-update>` anywhere in your template, JSX, html etc. An example of using this component can be found here: https://pwa-update.glitch.me

## API

### Properties

| Property        | Attribute       | Description                                                   | Type     | Default                               |
| --------------- | --------------- | ------------------------------------------------------------- | -------- | ------------------------------------- |
| `updatemessage` | `updatemessage` | Message that will be show to the user when there is an update | `string` | `An update for this app is available` |

### Shadow Parts

If you need to style this component more comprehensively, you can use [Shadow Parts](https://dev.to/webpadawan/css-shadow-parts-are-coming-mi5) to style both the update toast and the "ready to use offline" toast. To target these two elements you can use `pwa-update::part(updateToast)` and `pwa-update::part(offlineToast)` respectively.
For more customizations in toast part, you can also target `pwa-update::part(updateToastMessage)` and `pwa-update::part(updateToastButton)` for message and button elements.
For example, to make the background of the install button grey, I would need this CSS:

```css
pwa-update::part(updateToast) {
  backround: grey;
}
```

## Advanced Examples

#### Usage with typescript

```typescript

// Types to be found in DefinitelyTyped sometime soon.
import "pwaupdate";

class YourClass extends RenderLib {
  ...

  get updateComponent(): PWAUpdate {
    return this.shadowRoot?.querySelector("pwa-update");
  }

  ...
}

```

#### Example with Component Reference (Web Components)

```html
<template id="example">
  <style></style>
  ...
  <pwa-update></pwa-update>
</template>
```

```javascript
customElements.define(
  "example",
  class Example extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("example");
      let templateContent = template.content;
      this.shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        templateContent.cloneNode(true)
      );
      this.updateComponent = document
        .getElementsByTagName("el-example")[0]
        .shadowRoot.querySelector("pwa-update");
    }
  }
);
```

#### Example with Component Reference (Lit-Element)

```javascript
// Using module import
import { LitElement, html, property, query } from "lit-element";
import "pwaupdate";

class Example extends LitElement {
  @query("installId") componentRef: HTMLElement;

  render() {
    return html`
      <body>
        <pwa-update id="installId"></pwa-update>
      </body>
    `;
  }

  interactionWithComponent() {
    // See the methods section
    this.componentRef.getInstalledStatus();
  }
}
```

#### Example with Component Reference (Fast-Element)

```javascript
const template = html`
  <pwa-update ref('updateComponent')></pwa-update>
`

@customElement({ ... })
class Example extends FASTElement {
  @observable updateComponent: PWAUpdate | undefined;

  @volatile
  get updateComponent() {
    return this.shadowRoot.querySelector("pwa-update");
  }
}

```

### Example of grabbing from the dom

```html
<head>
  <script type="module" src="https://cdn.jsdelivr.net/npm/pwaupdate"></script>
</head>
<body>
  <pwa-update id="updateComponent"></pwa-update>
  <script async defer>
    const ref = document.getElementById("updateComponent);
  </script>
</body>
```

### Example of programmatically creating the element

```html
<head>
  <script type="module" src="https://cdn.jsdelivr.net/npm/pwaupdate"></script>
</head>
<body>
  <script async defer>
    var updateComponent = document.createElement("pwa-update");
    document.body.appendChild(updateComponent);
  </script>
</body>
```
