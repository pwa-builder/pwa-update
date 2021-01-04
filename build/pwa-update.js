var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, css, property, eventOptions } from 'lit-element';
import 'pwa-helper-components/pwa-update-available.js';
let pwaupdate = class pwaupdate extends LitElement {
    constructor() {
        super(...arguments);
        this.updatemessage = "An update for this app is available";
        this.show = false;
    }
    static get properties() {
        return {
            show: { type: Boolean, reflect: true }
        };
    }
    static get styles() {
        return css `
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
    _updateShow(event) {
        const detailEvent = event;
        this.show = detailEvent.detail;
    }
    render() {
        return html `
    <div id="updateToast" part="updateToast" show=${this.show}>
      <span part="updateToastMessage">${this.updatemessage}</span>
      <pwa-update-available @pwa-update-available=${this._updateShow}>
        <button part="updateToastButton">Update</button>
      </pwa-update-available>
    </div>
    `;
    }
};
__decorate([
    property({ type: String })
], pwaupdate.prototype, "updatemessage", void 0);
__decorate([
    property({ type: Boolean })
], pwaupdate.prototype, "show", void 0);
__decorate([
    eventOptions({ passive: true })
], pwaupdate.prototype, "_updateShow", null);
pwaupdate = __decorate([
    customElement("pwa-update")
], pwaupdate);
export { pwaupdate };
//# sourceMappingURL=pwa-update.js.map