import {  tsx, renderOnReady } from "../../../dist/index";
import { TodoList } from "./component/TodoList";

import "./index.scss";

renderOnReady(<TodoList />);