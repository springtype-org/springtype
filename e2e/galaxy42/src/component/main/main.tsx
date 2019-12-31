import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import "./main.scss";
import { MainMenu } from "../mainmenu/mainmenu";
import { tsx } from "../../../../../src/web/vdom";
import { inject } from "../../../../../src/core/di";
import { ResizeService } from "../../service/resize";
import { RouteList, Route, PATH_START, PATH_WILDCARD } from "../../../../../src/web/router";
import { InGame } from "../ingame/ingame";

@component
export class Main extends st.component implements ILifecycle {
  class = "Main";

  @inject(ResizeService)
  resizeService: ResizeService;

  render() {
    return <RouteList>
      <Route path={[MainMenu.PATH, PATH_START, PATH_WILDCARD]}>
        <MainMenu />
      </Route>

      <Route path={[InGame.PATH]}>
        <InGame />
      </Route>
    </RouteList>
  }
}
