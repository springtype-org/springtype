import {FeatureExample} from "./FeatureExample";
import yoda from "./../assets/yoda-rtfm.png";
import  "./FeatureExample.scss";
import {BurgerType} from "../../../burger-button/src/burger-button/BurgerButton";
import {LoaderType} from "../../../svg-loader/src/svg-loader/SVGLoader";

import "./../components/burger/BurgerExample"
export default (view: FeatureExample) =>

    <div>

        <div>Burger Example</div>
        <burger-example/>
        <button class="burger-button" onclick={view.onButtonClick} bind={{btn: view}}>
            {
                view.props.menuItems.map((text) => (<b>{text}, </b>))
            }
        </button>

        <br/>
        <br/>

        <burger-button props={{type: BurgerType.CLOSE}}/>
        <burger-button props={{type: BurgerType.CLOSE, width: 50}}/>
        <burger-button props={{type: BurgerType.TURN, width: 50}}/>
        <div style="background: black">
        <svg-loader props={{type: LoaderType.BOX_LOAD, width: 50}}/>
        <svg-loader props={{type: LoaderType.CIRCLE, width: 50}}/>
        <svg-loader props={{type: LoaderType.CIRCLES, width: 50}}/>
        <svg-loader props={{type: LoaderType.CLOCK, width: 50}}/>
        <svg-loader props={{type: LoaderType.DOT_BOUNCE, width: 50}}/>
        <svg-loader props={{type: LoaderType.DOTS, width: 50}}/>
        <svg-loader props={{type: LoaderType.RING, width: 50}}/>
        <svg-loader props={{type: LoaderType.SOUND, width: 50}}/>
        <svg-loader props={{type: LoaderType.SOUND_SMALL, width: 50}}/>
        <svg-loader props={{type: LoaderType.STRANGE, width: 50}}/>
        </div>
        <img src={yoda} width="200"/>

        <div style="font-weight: bold; cursor: pointer;" onclick="alert('yes');">click me</div>
        <br/>
        <br/>

        <svg width="100%"
             height="100%"
             xmlns$$xlink="http://www.w3.org/1999/xlink"
             xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                {`.classA { fill:${view.props.fill} }`}
            </style>
            <defs>
                <g id="Port">
                    <circle style="fill:inherit" r="10"/>
                </g>
            </defs>

            <text y="15">black</text>
            <use x="70" y="10" xlink$$href="#Port"/>
            <text y="35">{view.props.fill}</text>
            <use x="70" y="30" xlink$$href="#Port" className="classA"/>
            <text y="55">blue</text>
            <use x="70" y="50" xlink$$href="#Port" style="fill:blue"/>
        </svg>
    </div>