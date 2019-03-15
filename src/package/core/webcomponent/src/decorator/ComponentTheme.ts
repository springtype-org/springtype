import {WebComponentImpl} from "../interface/WebComponentImpl";
import {StyleFunction} from "../../../tss";
import {setStyleForComponent} from "../function/setStyleForComponent";
import {setTemplateForComponent} from "../function/setTemplateForComponent";
import {TemplateFunction} from "../interface/TemplateFunction";
import {setThemeForComponent} from "../function/setThemeForComponent";

export function ComponentTheme(componentTheme: any): any {
    return (targetWebComponent: any) => {

        setThemeForComponent(targetWebComponent, componentTheme);

        return targetWebComponent;
    }
}