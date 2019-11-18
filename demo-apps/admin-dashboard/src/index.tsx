
import { st} from "../../../src/core"
import { component} from "../../../src/web/component"
import { context } from "../../../src/core/context";
import { Store } from "./model/Store";
import { LoginGuard } from "./guard/login-guard";
import { LoginPage } from "./page/login/login";
import { tsx } from "../../../src/web/vdom";
import { UploadPage } from "./page/upload";
import { DashboardPage } from "./page/dashboard/dashboard";
import { inject } from "../../../src/core/di";
import { RouteList, Route } from "../../../src/web/router";
import { videoContext, VIDEO_UPLOAD_CONTEXT } from "./config/context";

@component
export class App extends st.component {

  @context(VIDEO_UPLOAD_CONTEXT)
  store: Store = st.context<Store>(VIDEO_UPLOAD_CONTEXT, videoContext);

  @inject(LoginGuard)
  loginGuard: LoginGuard;

  render() {
    return (
      <RouteList>
        <Route
          path={["", "*", LoginPage.ROUTE]}
          component={
            <LoginPage>
              <template slot="abc">Test</template>
            </LoginPage>
          }
        />
        <Route path={UploadPage.ROUTE} guard={() => this.loginGuard.guard(<UploadPage />)} />
        <Route path={DashboardPage.ROUTE} guard={() => this.loginGuard.guard(<DashboardPage />)} />
      </RouteList>
    );
  }
}

st.render(<App />);
