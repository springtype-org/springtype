import { st } from "../../../../../src/core";
import { ref } from "../../../../../src/core/ref";
import { inject } from "../../../../../src/core/di";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../../../src/web/vdom";
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
import { DashboardPage } from "../dashboard/dashboard";
import { MwcTextFieldVariant } from "st-material/component/mwc-text-field/mwc-text-field-variant";

@component
export class LoginPage extends st.component implements ILifecycle {
  static ROUTE = "#/login";

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
    st.router.navigate(DashboardPage.ROUTE);
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

        <MwcLayoutGrid>
          <MwcLayoutGridCell columns={4}></MwcLayoutGridCell>
          <MwcLayoutGridCell columns={4} class={[loginPageStyle.loginMask, loginPageStyle.layout]}>

            <MwcCard
              primaryCardMedia={true}
              primaryMediaClass={loginPageStyle.loginLogo}
              actionsClass={loginPageStyle.loginActions}
            >
              <template slot={MwcCard.SLOT_NAME_PRIMARY}>
                COMPANY<br />
                <MwcOverlineText>Backend / SpringType / 2019</MwcOverlineText>
              </template>

              <template slot={MwcCard.SLOT_NAME_ACTION}>

                <MwcTextField
                  onKeyUp={this.onPasswordFieldKeyUp}
                  variant={MwcTextFieldVariant.OUTLINED}
                  class={loginPageStyle.input}
                  value=""
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
                  value=""
                  type="password"
                  label="Passwort"
                >
                  <template slot={MwcTextField.SLOT_NAME_LEADING_ICON}>
                    <MwcIcon type="lock" class={"mdc-text-field__icon"} />
                  </template>
                </MwcTextField>

                <ErrorMessage ref={{ errorMessage: this }} />

                <MwcButton
                  variant="outlined"
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
