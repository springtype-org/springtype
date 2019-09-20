import {PopupPage} from "./popup-page";
import {tsx} from '../../../../../src/web/vdom';

export default (component: PopupPage) =>
    <div>
        <p>Component: PopupPage</p>
        <button onClick={component.onButtonClick}/>
    </div>

;

