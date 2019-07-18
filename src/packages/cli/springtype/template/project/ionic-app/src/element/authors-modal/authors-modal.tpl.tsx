import {ActiveRenderer} from '@springtype/core';
import {AuthorsModal} from "./authors-modal";

export default (element: AuthorsModal) => <st-fragment><ion-header>
        <ion-toolbar>
            <ion-title>SpringType Authors</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>

        <ul>
            <li>
                Aron Homberg
            </li>
            <li>
                Michael Mannseicher
            </li>
        </ul>

        <ion-button onClick={element.onCloseClick}>Close</ion-button>
    </ion-content>
</st-fragment>;

