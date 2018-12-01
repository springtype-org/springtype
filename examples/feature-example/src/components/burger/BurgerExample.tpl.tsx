import {BurgerType} from "../../../../burger-button/src/burger-button/BurgerButton";


export default () =>

    <div>
        <burger-button props={{type: BurgerType.CLOSE, width: 50}}/>
        <burger-button props={{type: BurgerType.ROUND_CONNER, width: 50}}/>
        <burger-button props={{type: BurgerType.SWORD, width: 50}}/>
        <burger-button props={{type: BurgerType.SWORD_CROSS, width: 50}}/>
        <burger-button props={{type: BurgerType.ARROW_LEFT, width: 50}}/>
        <burger-button props={{type: BurgerType.ARROW_LEFT_TURN, width: 50}}/>
        <burger-button props={{type: BurgerType.AWESOME, width: 50}}/>
        <burger-button props={{type: BurgerType.TURN, width: 50}}/>
    </div>