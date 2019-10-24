import "../../../ionic/dist";
import { st } from "../../../src/core";
import { customElement } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { css } from "../../../src/web/tss";
import { domRef, tsx } from "../../../src/web/vdom";
import "./theme";
import { AppTheme } from "./theme";

@customElement()
export class IonicApp extends st.element implements ILifecycle {
  // DOM ref binding for controllers and such
  @domRef("actionSheetController")
  actionSheetController!: HTMLIonActionSheetControllerElement;

  onIonButtonClick = async () => {
    // async await for controllers
    await this.actionSheetController.componentOnReady();

    // then trigger actions
    const actionSheet = await this.actionSheetController.create({
      header: "Albums",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => {
            console.log("Delete clicked");
          },
        },
        {
          text: "Share",
          icon: "share",
          handler: () => {
            console.log("Share clicked");
          },
        },
        {
          text: "Play (open modal)",
          icon: "arrow-dropright-circle",
          handler: () => {
            console.log("Play clicked");
          },
        },
        {
          text: "Favorite",
          icon: "heart",
          handler: () => {
            console.log("Favorite clicked");
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });

    await actionSheet.present();
  };

  render() {
    return (
      <ion-app>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title>SpringType / Ionic 4 Integration</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-tabs>
            <ion-tab tab="tab-schedule">
              {/* https://ionicframework.com/docs/api/button */}
              <ion-button onClick={this.onIonButtonClick}>
                <ion-icon slot="start" name="star"></ion-icon>
                Welcome to Ionic 4
              </ion-button>

              {/* https://ionicframework.com/docs/api/action-sheet-controller */}
              <ion-action-sheet-controller ref={{ actionSheetController: this }}></ion-action-sheet-controller>
            </ion-tab>

            <ion-tab tab="tab-speaker">
              <ion-nav></ion-nav>
            </ion-tab>

            <ion-tab tab="tab-map" component="page-map">
              <ion-nav></ion-nav>
            </ion-tab>

            <ion-tab tab="tab-about" component="page-about">
              <ion-nav></ion-nav>
            </ion-tab>

            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="tab-schedule">
                <ion-icon name="calendar"></ion-icon>
                <ion-label>Schedule</ion-label>
                <ion-badge>6</ion-badge>
              </ion-tab-button>

              <ion-tab-button tab="tab-speaker">
                <ion-icon name="contacts"></ion-icon>
                <ion-label>Speakers</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab-map">
                <ion-icon name="map"></ion-icon>
                <ion-label>Map</ion-label>
              </ion-tab-button>

              <ion-tab-button tab="tab-about">
                <ion-icon name="information-circle"></ion-icon>
                <ion-label>About</ion-label>
              </ion-tab-button>
            </ion-tab-bar>
          </ion-tabs>
        </ion-content>
      </ion-app>
    );
  }

  // Theming and styling
  // https://ionicframework.com/docs/theming/css-variables
  renderStyle = (theme: AppTheme) => css`
    :root {

      /* set SpringType color */
      --ion-color-primary: ${theme.primary.base};
      --ion-color-primary-shade: ${theme.primary.shade};
      --ion-color-primary-tint: ${theme.primary.tint};

      /* Set the background of the entire app */
      --ion-background-color: #fff;

      /* Set the font family of the entire app */
      --ion-font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif;
    }

    // specific Ionic component styles
    ion-button {
      --color: #fff;
    }
  `;
}

// render the app
st.render(<IonicApp />);
