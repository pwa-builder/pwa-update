import {
  LitElement, html, customElement, css, property, eventOptions
} from 'lit-element';
import 'pwa-helper-components/pwa-update-available.js';

interface DetailEvent {
  detail: boolean;
}

@customElement("pwa-update")
export class pwaupdate extends LitElement implements PWAUpdateComponent {
  @property({ type: String }) updatemessage = "An update for this app is available";

  @property({ type: Boolean }) show = false;

  static get properties() {
    return {
      show: { type: Boolean, reflect: true }
    }
  }

  static get styles() {
    return css`
      :host {
        font-family: sans-serif;

        --toast-background: #3c3c3c;
        --button-background: #0b0b0b;
      }

      #updateToast {
        position: fixed;
        bottom: 16px;
        right: 16px;
        background: var(--toast-background);
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
        display: none;
      }

      #updateToast[show='true'] {
        display: block;
      }

      #storageToast {
        position: fixed;
        bottom: 16px;
        right: 16px;
        background: var(--toast-background);
        color: white;
        padding: 1em;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        font-weight: 600;
      }

      #storageEstimate {
        font-size: 10px;
        margin-top: 8px;
      }

      #updateToast button {
        color: white;
        border: none;
        background: var(--button-background);
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

  @eventOptions({ passive: true })
  private _updateShow(event: Event) {
    const detailEvent = event as unknown as DetailEvent;
    this.show = detailEvent.detail;
  }

  render() {
    return html`
    <div id="updateToast" part="updateToast" show=${this.show}>
      <span part="updateToastMessage">${this.updatemessage}</span>
      <pwa-update-available @pwa-update-available=${this._updateShow}>
        <button part="updateToastButton">Update</button>
      </pwa-update-available>
    </div>
    `
  }
}
