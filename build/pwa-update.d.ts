import { LitElement } from 'lit-element';
export declare class pwaupdate extends LitElement implements PWAUpdateComponent {
    swpath: string;
    updateevent: string;
    updatemessage: string;
    readyToAsk: boolean;
    showStorageEstimate: boolean;
    showOfflineToast: boolean;
    offlineToastDuration: number;
    storageUsed: string | null;
    swreg: ServiceWorkerRegistration | undefined;
    static get styles(): import("lit-element").CSSResult;
    firstUpdated(): Promise<void>;
    setupEvents(): void;
    doUpdate(): void;
    formatBytes(bytes: number, decimals?: number): string;
    render(): import("lit-element").TemplateResult;
}
