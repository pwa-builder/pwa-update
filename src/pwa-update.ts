import {
  LitElement, html, customElement, css, property
} from 'lit-element';

@customElement('pwa-update')
export class pwaupdate extends LitElement {

  @property({ type: String }) swpath: string = "service-worker.js";
  @property({ type: String }) updateevent: string = 'forceUpdate';
  @property({ type: String }) updatemessage = "An update for this app is available";

  @property({ type: Boolean }) readyToAsk: boolean = false;

  swreg: ServiceWorkerRegistration;

  static get styles() {
    return css`
      :host {
        font-family: sans-serif;
      }

      #updateToast {
        position: absolute;
        bottom: 16px;
        right: 16px;
        background: #3c3c3c;
        color: white;
        padding: 1em;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 22em;
        font-weight: 600;

        animation-name: fadein;
        animation-duration: 300ms;
      }

      #updateToast button {
        color: white;
        border: none;
        background: #0b0b0b;
        padding: 8px;
        border-radius: 24px;
        text-transform: lowercase;
        padding-left: 14px;
        padding-right: 14px;
        font-weight: bold;
      }

      @keyframes fadein {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    `;
  }

  async firstUpdated() {
    if (this.swpath) {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.register(this.swpath);

        reg.onupdatefound = () => {
          let newWorker = reg.installing;

          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              this.dispatchEvent(new Event('pwaUpdate'));
            }
          }
        }
      }
    }

    this.setupEvents();
  }

  setupEvents() {
    this.addEventListener('pwaUpdate', async () => {
      if (navigator.serviceWorker) {
        this.swreg = await navigator.serviceWorker.getRegistration();

        if (this.swreg && this.swreg.waiting) {
          this.readyToAsk = true;
        }
      }
    })
  }

  doUpdate() {
    this.swreg.waiting.postMessage(this.updateevent);
    window.location.reload();
  }

  render() {
    return html`
      <div>
       ${
      this.readyToAsk ? html`
           <div id="updateToast">
             <span>${this.updatemessage}</span>

             <button @click="${() => this.doUpdate()}">Update</button>
           </div>
         ` : null
      }
      </div>
    `
  }
}
