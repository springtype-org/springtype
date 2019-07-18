import {ActiveRenderer} from '@springtype/core';
import {TemplatenameApp} from "./templatename-app";

export default (view: TemplatenameApp) =>
<st-fragment>
    <ion-app>

        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>My Navigation Bar</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-tabs>

                <ion-tab tab="account">

                    <ion-card>
                        <ion-card-header>
                            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
                            <ion-card-title>Card Title</ion-card-title>
                        </ion-card-header>

                        <ion-card-content>
                            Keep close to Nature's heart... and break clear away, once in awhile,
                            and climb a mountain or spend a week in the woods. Wash your spirit clean.

                            <ion-button onClick={view.onOpenModalClick}>Show authors</ion-button>
                        </ion-card-content>
                    </ion-card>

                    <ion-card>
                        <ion-item>
                            <ion-icon name="pin" slot="start"></ion-icon>
                            <ion-label>ion-item in a card, icon left, button right</ion-label>
                            <ion-button fill="outline" slot="end">View</ion-button>
                        </ion-item>

                        <ion-card-content>
                            This is content, without any paragraph or header tags,
                            within an ion-card-content element.
                        </ion-card-content>
                    </ion-card>

                </ion-tab>
                <ion-tab tab="contact"></ion-tab>
                <ion-tab tab="settings"></ion-tab>


                <ion-tab-bar slot="bottom">
                    <ion-tab-button tab="account">
                        <ion-icon name="person"></ion-icon>
                    </ion-tab-button>
                    <ion-tab-button tab="contact">
                        <ion-icon name="call"></ion-icon>
                    </ion-tab-button>
                    <ion-tab-button tab="settings">
                        <ion-icon name="settings"></ion-icon>
                    </ion-tab-button>
                </ion-tab-bar>
            </ion-tabs>
        </ion-content>
    </ion-app>
    <ion-modal-controller st-inject={{modalController: view}}></ion-modal-controller>
</st-fragment>;

