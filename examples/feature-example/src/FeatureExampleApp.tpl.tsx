import {FeatureExampleApp} from "./FeatureExampleApp";
import {BurgerType} from "../../burger-button/src/burger-button/BurgerButton";

export default (view: FeatureExampleApp) =>

    <div>
        <h2>Feature Example</h2>
        <feature-example props={ { menuItems: ['One', 'Two'] } } />
        <h2>Burger Button Example</h2>

        <burger-button props={{type: BurgerType.TURN}} />
        <burger-button props={{type: BurgerType.ROUND_CONNER}} />
        <burger-button props={{type: BurgerType.CLOSE}} />
        <burger-button props={{type: BurgerType.SWORD_CROSS}} />
        <burger-button props={{type: BurgerType.ARROW_LEFT_TURN}} />
        <burger-button props={{type: BurgerType.ARROW_LEFT}} />
        <burger-button props={{type: BurgerType.AWESOME}} />
        <burger-button props={{type: BurgerType.SWORD}} />

    </div>