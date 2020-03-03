# pwa-update

`pwa-update` is a [web component](https://meowni.ca/posts/web-components-with-otters/) from the [PWABuilder](https://pwabuilder.com) team that brings an awesome "update" experience to your Progressive Web App! It will automatically register your service worker and notify the user of when a new update to your PWA is available.

_Built with [lit-element](https://lit-element.polymer-project.org/)_

### What does it look like?

![An image of what the component looks like](assets/installsnip.png?raw=true "pwa-update")

## Using this component

## Install

There are two ways to use this component. For simple projects or just to get started fast, we recommend using the component by script tag. If your project is using [npm](https://www.npmjs.com/) then we recommend using the npm package.

### Script tag

- Put this script tag in the head of your index.html:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate"
></script>
```

### NPM

- Run `npm install @pwabuilder/pwaupdate`
- import with `import '@pwabuilder/pwaupdate'`

Then you can use the element `<pwa-update></pwa-update>` anywhere in your template, JSX, html etc. An example of using this component can be found here: https://glitch.com/~pwainstall

## API

### Properties

| Property             | Attribute            | Description                                                                     | Type      | Default                                             |
| -------------------- | -------------------- | ------------------------------------------------------------------------------- | --------- | --------------------------------------------------- |
| `updateMessage`           | `updateMessage`       | Will always show the install button                                       | `string` | `An update for this app is available`                                             |
| `updateevent`          | `updateevent`          | name of event sent to service worker to start udpate                        | `string` | `false`                                             |
 `string`  | `forceUpdate`                                     |
| `swpath`          | `swpath`          | The path to the service worker to be registered | `string`  | `service-worker.js`                      |

### Methods


### CSS Variables

We recommend using our [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to easliy tweak the style of this component to fit your project. Here are our current
supported CSS variables.

