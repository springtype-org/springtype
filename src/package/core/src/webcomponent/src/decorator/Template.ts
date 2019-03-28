import {TemplateFunction} from "../interface/TemplateFunction";
import {setTemplateForComponent} from "../reflector/protoype/template";

export function Template(template: TemplateFunction): any {
    return (targetWebComponent: any) => {

        setTemplateForComponent(targetWebComponent, template);

        return targetWebComponent;
    }
}