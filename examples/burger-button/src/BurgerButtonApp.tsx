import {BurgerButton} from "./burger-button/BurgerButton";
import {WebApp} from "../../../src/package/html/src/decorator/WebApp";

@WebApp({
    routes: {
        '': BurgerButton
    }
})
export class BurgerButtonApp  {

}