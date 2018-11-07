import {BurgerButtonExample} from "./BurgerButtonExample";

export default (view: BurgerButtonExample) =>

    <div>
        <h2>Burger Button Example</h2>

        <burger-button props={ { menuItems: ['One', 'Two'] } } />
    </div>