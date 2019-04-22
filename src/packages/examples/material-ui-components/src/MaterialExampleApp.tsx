import {MWCButton, MWCCheckbox} from "@springtype/springtype-incubator-material-ui";
import {setTheme, Theme, UseElement} from "@springtype/springtype-incubator-core";

@UseElement(MWCCheckbox, MWCButton)
@Theme({
    backgroundColor: 'red'
})
export class MaterialExampleApp {


    constructor() {

    }
}