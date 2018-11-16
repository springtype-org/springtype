import {FeatureExampleApp} from "./FeatureExampleApp";
import {BurgerType} from "../../burger-button/src/burger-button/BurgerButton";

export default (view: FeatureExampleApp) =>

    <div>
        <h2>Feature Example</h2>
        <feature-example props={ { menuItems: ['One', 'Two'] } } />
        <h2>Burger Button Example</h2>

        <burger-button props={{type: BurgerType.SWORD, width: 100}} />
        <burger-button props={{type: BurgerType.ROUND_CONNER, width: 100}} />
        <burger-button props={{type: BurgerType.CLOSE, width: 100}} />
        <burger-button props={{type: BurgerType.SWORD_CROSS, width: 100}} />
        <burger-button props={{type: BurgerType.ARROW_LEFT_TURN, width: 100}} />
        <burger-button props={{type: BurgerType.ARROW_LEFT, width: 100}} />
        <burger-button props={{type: BurgerType.AWESOME, width: 100}} />
        <burger-button props={{type: BurgerType.SWORD, width: 100}} />

    </div>