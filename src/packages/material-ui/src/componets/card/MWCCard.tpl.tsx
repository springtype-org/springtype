import {MWCCard} from "./MWCCard";
import {ActiveRenderer} from "@springtype/core";
import "@material/card/dist/mdc.card.min.css"

export default (view: MWCCard) => {

    return <div class="mdc-card">
        <div class="mdc-card__primary-action demo-card__primary-action" tabindex="0">
            <div class="mdc-card__media mdc-card__media--16-9 demo-card__media"
                 style="background-image: url(&quot;https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg&quot;);"></div>
            <div class="demo-card__primary">
                <h2 class="demo-card__title mdc-typography mdc-typography--headline6">Our Changing Planet</h2>
                <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">by Kurt Wagner</h3>
            </div>
            <div class="demo-card__secondary mdc-typography mdc-typography--body2">Visit ten places on our planet that
                are undergoing the biggest changes today.
            </div>
        </div>
        <div class="mdc-card__actions">
            <st-slot/>
        </div>
    </div>

}