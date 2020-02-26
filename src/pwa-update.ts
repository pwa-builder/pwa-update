import {
  LitElement, html, customElement, css, property
} from 'lit-element';

@customElement('pwa-update')
export class pwaupdate extends LitElement {

  @property({ type: String }) swpath: string;
  @property({ type: String }) updateevent: string = 'forceUpdate';

  static get styles() {
    return css`


    `;
  }

  constructor() {
    super();

    if (this.swpath) {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
          const reg = await navigator.serviceWorker.register(this.swpath);

          reg.onupdatefound = () => {
            let newWorker = reg.installing;

            newWorker.onstatechange = () => {
              if (newWorker.state === 'installed') {
                this.dispatchEvent(new Event('pwaUpdate'));
              }
            }
          }
        });
      }
    }

    this.setupEvents();
  }

  setupEvents() {
    this.addEventListener('pwaUpdate', async () => {
      const reg = await navigator.serviceWorker.getRegistration();

      if (reg) {
        reg.waiting.postMessage(this.updateevent);
        window.location.reload();
      }
    })
  }

  render() {
    return html`
      <div>
       <h1>Hello world</h1>
      </div>
    `
  }
}
