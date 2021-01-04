import { LitElement } from 'lit-element';
import 'pwa-helper-components/pwa-update-available.js';
export declare class pwaupdate extends LitElement implements PWAUpdateComponent {
    updatemessage: string;
    show: boolean;
    static get properties(): {
        show: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    static get styles(): import("lit-element").CSSResult;
    private _updateShow;
    render(): import("lit-element").TemplateResult;
}
