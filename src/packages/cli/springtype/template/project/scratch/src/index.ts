import {applyPolyfill, ReflowStrategy} from "custom-elements-hmr-polyfill";

applyPolyfill(ReflowStrategy.RERENDER_INNER_HTML);

import "./component/templatename-main/templatename-main";