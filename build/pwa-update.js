var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, css, property } from 'lit-element';
let pwaupdate = class pwaupdate extends LitElement {
    constructor() {
        super(...arguments);
        this.swpath = "pwabuilder-sw.js";
        this.updateevent = "SKIP_WAITING";
        this.updatemessage = "An update for this app is available";
        this.readyToAsk = false;
        this.showStorageEstimate = false;
        this.showOfflineToast = false;
        this.offlineToastDuration = 2400;
        this.storageUsed = null;
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
    async firstUpdated() {
        var _a, _b;
        if (this.swpath) {
            if ('serviceWorker' in navigator) {
                const reg = await navigator.serviceWorker.register(this.swpath);
                let worker = reg.installing;
                if (worker) {
                    if (navigator.storage) {
                        const storageData = await navigator.storage.estimate();
                        if (storageData) {
                            this.storageUsed = this.formatBytes(storageData.usage);
                            this.showOfflineToast = true;
                            await this.updateComplete;
                            const ani = (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#storageToast')) === null || _b === void 0 ? void 0 : _b.animate([
                                {
                                    opacity: 0
                                },
                                {
                                    opacity: 1
                                }
                            ], {
                                fill: 'forwards',
                                duration: 280
                            });
                            if (ani) {
                                setTimeout(async () => {
                                    ani.onfinish = () => {
                                        this.showOfflineToast = false;
                                    };
                                    await ani.reverse();
                                }, this.offlineToastDuration);
                            }
                        }
                    }
                }
                reg.onupdatefound = async () => {
                    let newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.onstatechange = () => {
                            if ((newWorker === null || newWorker === void 0 ? void 0 : newWorker.state) === "installed") {
                                this.dispatchEvent(new Event("pwaUpdate"));
                            }
                        };
                    }
                };
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
        });
    }
    doUpdate() {
        var _a, _b;
        (_b = (_a = this.swreg) === null || _a === void 0 ? void 0 : _a.waiting) === null || _b === void 0 ? void 0 : _b.postMessage({ type: this.updateevent });
        window.location.reload();
    }
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    render() {
        return html `
      <div>
       ${this.readyToAsk ? html `
           <div id="updateToast" part="updateToast">
             <span part="updateToastMessage">${this.updatemessage}</span>

             <button part="updateToastButton" @click="${() => this.doUpdate()}">Update</button>
           </div>
         ` : null}

      ${this.showOfflineToast ? html `
          <div id="storageToast" part="offlineToast">
            Ready to use Offline

            ${this.showStorageEstimate ? html `<span id="storageEstimate">Cached ${this.storageUsed}</span>` : null}
          </div>
        ` : null}
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], pwaupdate.prototype, "swpath", void 0);
__decorate([
    property({ type: String })
], pwaupdate.prototype, "updateevent", void 0);
__decorate([
    property({ type: String })
], pwaupdate.prototype, "updatemessage", void 0);
__decorate([
    property({ type: Boolean })
], pwaupdate.prototype, "readyToAsk", void 0);
__decorate([
    property({ type: Boolean })
], pwaupdate.prototype, "showStorageEstimate", void 0);
__decorate([
    property({ type: Boolean })
], pwaupdate.prototype, "showOfflineToast", void 0);
__decorate([
    property({ type: Number })
], pwaupdate.prototype, "offlineToastDuration", void 0);
__decorate([
    property({ type: String })
], pwaupdate.prototype, "storageUsed", void 0);
pwaupdate = __decorate([
    customElement("pwa-update")
], pwaupdate);
export { pwaupdate };
//# sourceMappingURL=pwa-update.js.map