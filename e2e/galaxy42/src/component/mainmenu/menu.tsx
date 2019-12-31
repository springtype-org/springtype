import { component } from "../../../../../src/web/component";
import * as mainmenuStyles from "./menu.tss.scss";
import { tsx } from "../../../../../src/web/vdom";
import { st } from "../../../../../src/core";
import { Link } from "../../../../../src/web/router";
import { InGame } from "../ingame/ingame";
import { inject } from "../../../../../src/core/di";
import KeyboardService from "../../service/keyboard";

@component
export class Menu extends st.component {

  class = mainmenuStyles.menu;


  render() {
    return <div>
      <p class={mainmenuStyles.title}>Galaxy 42</p>
      <Link path={InGame.PATH}>Start</Link>
    </div>
  }
}
