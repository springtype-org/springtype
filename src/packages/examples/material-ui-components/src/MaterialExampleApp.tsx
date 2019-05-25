import {MWCButton, MWCCheckbox} from "@springtype/material-ui";
import {setTheme, Theme, UseElement} from "@springtype/core";

@UseElement(MWCCheckbox, MWCButton)
@Theme({
    backgroundColor: 'red'
})
export class MaterialExampleApp {


    constructor() {

    }
}