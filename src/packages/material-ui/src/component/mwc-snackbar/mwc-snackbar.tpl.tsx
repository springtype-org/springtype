import {MwcSnackbar} from "./mwc-snackbar";
import {ActiveRenderer} from '../../../../core';

import "@material/snackbar/dist/mdc.snackbar.css";


export default (component: MwcSnackbar) => <div class="mdc-snackbar mdc-snackbar--stacked">
    <div class="mdc-snackbar__surface">
        <div class="mdc-snackbar__label"
             role="status"
             aria-live="polite">
            Can't send photo. Retry in 5 seconds.
        </div>
        <div class="mdc-snackbar__actions">
            <button type="button" class="mdc-button mdc-snackbar__action">Retry</button>
        </div>
    </div>
</div>


