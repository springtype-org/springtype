import { st } from "../../../../../src/core";
import { ref } from "../../../../../src/core/ref";
import { inject } from "../../../../../src/core/di";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../../../src/web/vdom";
import { FirebaseService } from "../../service/firebase";
import {
  MwcButton,
  MwcLayoutGrid,
  MwcLayoutGridCell,
  MwcCard,
  MwcOverlineText,
  MwcTextField,
  MwcIcon,
} from "st-material";
import * as loginPageStyle from "./login.tss.scss";
import { LoadingIndicator } from "../../component/loading-indicator/loading-indicator";
import { ErrorMessage } from "../../component/error-message/error-message";
import { MwcButtonVariant } from "st-material/component/mwc-button/mwc-button-variant-type";
import { DashboardPage } from "../dashboard/dashboard";
import { MwcTextFieldVariant } from "st-material/component/mwc-text-field/mwc-text-field-variant";

@component
export class LoginPage extends st.component implements ILifecycle {
  static ROUTE = "#/login";

  @inject(FirebaseService)
  firebaseService: FirebaseService;

  @ref
  username: MwcTextField;

  @ref
  password: MwcTextField;

  @ref
  loadingIndicator: LoadingIndicator;

  @ref
  errorMessage: ErrorMessage;

  onLoginClick = async () => {
    this.loadingIndicator.open = true;

    try {
      await this.firebaseService.login(this.username.value, this.password.value);
      st.router.navigate(DashboardPage.ROUTE);
    } catch (e) {
      this.errorMessage.message = e.message;
    }
    this.loadingIndicator.open = false;
  };

  onPasswordFieldKeyUp = (evt: KeyboardEvent) => {
    if (evt.keyCode === 13) {
      this.onLoginClick();
    }
  };

  render() {
    return (
      <div class={loginPageStyle.loginContainer}>

        <LoadingIndicator ref={{ loadingIndicator: this }} />

        <video autoplay muted loop class={loginPageStyle.video}>
          <source src="https://www.vimp.com/files/videos/mtz_elevator_v3_1920.mp4" type="video/mp4" />
        </video>
        <MwcLayoutGrid>
          <MwcLayoutGridCell columns={4}></MwcLayoutGridCell>
          <MwcLayoutGridCell columns={4} class={[loginPageStyle.loginMask, loginPageStyle.layout]}>

            <MwcCard
              primaryCardMedia={true}
              primaryMediaClass={loginPageStyle.loginLogo}
              actionsClass={loginPageStyle.loginActions}
            >
              <template slot={MwcCard.SLOT_NAME_PRIMARY}>
                <a href="https://www.vimp.com" target="_blank">
                  <img src="https://www.vimp.com/files/vimp_layout/logo/vimp_logo.png" />
                </a>
                <MwcOverlineText>Backend / SpringType / 2019</MwcOverlineText>
              </template>

              <template slot={MwcCard.SLOT_NAME_ACTION}>

                <MwcTextField
                  onKeyUp={this.onPasswordFieldKeyUp}
                  variant={MwcTextFieldVariant.OUTLINED}
                  class={loginPageStyle.input}
                  value="info@aron-homberg.de"
                  ref={{ username: this }}
                  label="Benutzername"
                >
                  <template slot={MwcTextField.SLOT_NAME_LEADING_ICON}>
                    <MwcIcon type="account_circle" class={"mdc-text-field__icon"} />
                  </template>
                </MwcTextField>
                <MwcTextField
                  onKeyUp={this.onPasswordFieldKeyUp}
                  variant={MwcTextFieldVariant.OUTLINED}
                  class={loginPageStyle.input}
                  ref={{ password: this }}
                  value="aroninc"
                  type="password"
                  label="Passwort"
                >
                  <template slot={MwcTextField.SLOT_NAME_LEADING_ICON}>
                    <MwcIcon type="lock" class={"mdc-text-field__icon"} />
                  </template>
                </MwcTextField>

                <ErrorMessage ref={{ errorMessage: this }} />

                <MwcButton
                  variant={MwcButtonVariant.OUTLINED}
                  label="Login!"
                  onClick={this.onLoginClick}
                  class={loginPageStyle.loginButton}
                />
              </template>
            </MwcCard>
          </MwcLayoutGridCell>
          <MwcLayoutGridCell columns={4}></MwcLayoutGridCell>
        </MwcLayoutGrid>
      </div>
    );
  }
}
