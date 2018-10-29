import {BurgerButton} from "./BurgerButton";

import yoda from "./assets/yoda-rtfm.png";
import stylesheet from "./burger-button.scss";
import svgButton from "./assets/button.svg";

export default (view: BurgerButton) =>

    <div>
        <link rel="stylesheet" href={stylesheet}/>

        <button class="burger-button" onclick={view.onButtonClick} bind={{btn: view}}>
            {
                view.props.menuItems.map((text) => (<b>{text}, </b>))
            }
        </button>

        <br/>
        <br/>

        <img src={svgButton} onclick={view.onSVGButtonClick}/>
        <img src={yoda} width="200"/>

        <div style="font-weight: bold; cursor: pointer;" onclick="alert('yes');">click me</div>
        <br/>
        <br/>

        <svg width="100%"
             height="100%"
             xmlnsXlink="http://www.w3.org/1999/xlink"
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
            <use x="70" y="10" xlinkHref="#Port"/>
            <text y="35">{view.props.fill}</text>
            <use x="70" y="30" xlinkHref="#Port" className="classA"/>
            <text y="55">blue</text>
            <use x="70" y="50" xlinkHref="#Port" style="fill:blue"/>
        </svg>
    </div>