import {FeatureExampleApp} from "./FeatureExampleApp";
import {BurgerType} from "../../burger-button/src/burger-button/BurgerButton";
import "./clock.scss"
import "./clockScript.js"
export default (view: FeatureExampleApp) =>

    <div>
        <h2>Feature Example</h2>
        <feature-example props={{menuItems: ['One', 'Two']}}/>
        <h2>Burger Button Example</h2>

        <burger-button props={{type: BurgerType.SWORD, width: 100}}/>
        <burger-button props={{type: BurgerType.ROUND_CONNER, width: 100}}/>
        <burger-button props={{type: BurgerType.CLOSE, width: 100}}/>
        <burger-button props={{type: BurgerType.SWORD_CROSS, width: 100}}/>
        <burger-button props={{type: BurgerType.ARROW_LEFT_TURN, width: 100}}/>
        <burger-button props={{type: BurgerType.ARROW_LEFT, width: 100}}/>
        <burger-button props={{type: BurgerType.AWESOME, width: 100}}/>
        <burger-button props={{type: BurgerType.SWORD, width: 100}}/>

        <svg id="SvgjsSvg1006" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" version="1.1"
             xmlns$$xlink="http://www.w3.org/1999/xlink" xmlns$$svgjs="http://svgjs.com/svgjs">
            <defs id="SvgjsDefs1007"></defs>
            <text id="SvgjsText1008" font-family="Inconsolata" x="0" y="-5.125" font-size="16" family="Inconsolata"
                  size="16" fill="#ff0066">
                <tspan id="SvgjsTspan1009" dy="20.8" x="0">SVG.js</tspan>
            </text>
            <rect id="SvgjsRect1010" width="37.027027%" height="15" y="20" fill="#ff0066"></rect>
            <text id="SvgjsText1011" font-family="Inconsolata" x="38.027027%" y="33.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1012">137k</tspan>
                <tspan id="SvgjsTspan1013" dx="5" fill="#999999" font-size="12">source</tspan>
            </text>
            <rect id="SvgjsRect1014" width="16.972972%" height="15" y="40" fill="#ff0066"></rect>
            <text id="SvgjsText1015" font-family="Inconsolata" x="17.972972%" y="53.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1016">62.8k</tspan>
                <tspan id="SvgjsTspan1017" dx="5" fill="#999999" font-size="12">minified</tspan>
            </text>
            <rect id="SvgjsRect1018" width="4.405405%" height="15" y="60" fill="#ff0066"></rect>
            <text id="SvgjsText1019" font-family="Inconsolata" x="5.405405%" y="73.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1020">16.3k</tspan>
                <tspan id="SvgjsTspan1021" dx="5" fill="#999999" font-size="12">gzipped</tspan>
            </text>
            <text id="SvgjsText1022" font-family="Inconsolata" x="0" y="74.875" font-size="16" family="Inconsolata"
                  size="16" fill="#05bba6">
                <tspan id="SvgjsTspan1023" dy="20.8" x="0">Snap.svg</tspan>
            </text>
            <rect id="SvgjsRect1024" width="74.594594%" height="15" y="100" fill="#05bba6"></rect>
            <text id="SvgjsText1025" font-family="Inconsolata" x="75.594594%" y="113.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1026">276k</tspan>
                <tspan id="SvgjsTspan1027" dx="5" fill="#999999" font-size="12">source</tspan>
            </text>
            <rect id="SvgjsRect1028" width="21.756756%" height="15" y="120" fill="#05bba6"></rect>
            <text id="SvgjsText1029" font-family="Inconsolata" x="22.756756%" y="133.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1030">80.5k</tspan>
                <tspan id="SvgjsTspan1031" dx="5" fill="#999999" font-size="12">minified</tspan>
            </text>
            <rect id="SvgjsRect1032" width="7.729729%" height="15" y="140" fill="#05bba6"></rect>
            <text id="SvgjsText1033" font-family="Inconsolata" x="8.729729%" y="153.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1034">28.6k</tspan>
                <tspan id="SvgjsTspan1035" dx="5" fill="#999999" font-size="12">gzipped</tspan>
            </text>
            <text id="SvgjsText1036" font-family="Inconsolata" x="0" y="154.875" font-size="16" family="Inconsolata"
                  size="16" fill="#999999">
                <tspan id="SvgjsTspan1037" dy="20.8" x="0">Raphael</tspan>
            </text>
            <rect id="SvgjsRect1038" width="83.243243%" height="15" y="180" fill="#999999"></rect>
            <text id="SvgjsText1039" font-family="Inconsolata" x="84.243243%" y="193.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1040">308k</tspan>
                <tspan id="SvgjsTspan1041" dx="5" fill="#999999" font-size="12">source</tspan>
            </text>
            <rect id="SvgjsRect1042" width="24.621621%" height="15" y="200" fill="#999999"></rect>
            <text id="SvgjsText1043" font-family="Inconsolata" x="25.621621%" y="213.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1044">91.1k</tspan>
                <tspan id="SvgjsTspan1045" dx="5" fill="#999999" font-size="12">minified</tspan>
            </text>
            <rect id="SvgjsRect1046" width="8.594594%" height="15" y="220" fill="#999999"></rect>
            <text id="SvgjsText1047" font-family="Inconsolata" x="9.594594%" y="233.65625" font-size="14"
                  family="Inconsolata" size="14" fill="#666666">
                <tspan id="SvgjsTspan1048">31.8k</tspan>
                <tspan id="SvgjsTspan1049" dx="5" fill="#999999" font-size="12">gzipped</tspan>
            </text>
        </svg>
        <svg class="clock" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g>
                <circle r="126"/>
                <g id="numbers"/>
                <g id="ticks"/>
                <g id="hands">
                    <g id="hour">
                        <line x1="-6" y1="0" x2="60" y2="0"/>
                    </g>
                    <g id="minute">
                        <line x1="-9" y1="0" x2="90" y2="0"/>
                    </g>
                    <g id="second">
                        <line x1="-12" y1="0" x2="120" y2="0"/>
                    </g>
                </g>
                <circle r="4"/>
            </g>
        </svg>
    </div>