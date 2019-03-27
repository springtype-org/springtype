import {setTemplateForComponent} from "../function/setTemplateForComponent";
import {TemplateFunction} from "../interface/TemplateFunction";

export function Template(template: TemplateFunction): any {
    return (targetWebComponent: any) => {

        setTemplateForComponent(targetWebComponent, template);

        return targetWebComponent;
    }
}