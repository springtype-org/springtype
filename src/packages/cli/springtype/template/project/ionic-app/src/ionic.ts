import "@ionic/core";
import {injectScript, injectStyleSheet} from "@springtype/core";

injectStyleSheet('ionic.css', 'ionic');
injectScript('ionic.js', 'ionic');

// declare all ionic web components as known in TS
declare global {
    namespace JSX {

        // @ts-ignore
        interface IntrinsicElements extends StencilIntrinsicElements {}
    }
}
