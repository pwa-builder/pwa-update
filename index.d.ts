/// <reference lib="dom" />

declare global {
  interface HTMLElementTagNameMap {
    "pwa-update": PWAUpdateComponent;
  }

  export interface PWAUpdateComponent extends HTMLElement {
    updatemessage: string;
  }
}

export { };
