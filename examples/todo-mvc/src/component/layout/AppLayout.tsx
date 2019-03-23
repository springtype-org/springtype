import {
    UseElement,
    Element,
    WebComponentLifecycle, ShadowDOM
} from "@springtype/springtype-incubator-core";
import {Logo} from "../logo/Logo";

@Element('app-layout')
@UseElement(Logo)
export class AppLayout extends HTMLElement implements WebComponentLifecycle {

    onLogoClick(logo: Logo) {

        console.log('onLogoClick', logo);
    }

    render() {

        return <st-fragment>
            <div style="text-align: center;">
                <app-logo onclick={this.onLogoClick} />
            </div>
            <st-slot name="children">
                Did you forget to provide some CDATA content in the component that uses {"<app-layout>"}?
            </st-slot>
        </st-fragment>;
    }
}