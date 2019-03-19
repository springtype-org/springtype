import {Element, WebComponentLifecycle} from "@springtype/springtype-incubator-core";

@Element('gantt-chart')
export class GanttChart extends HTMLElement implements WebComponentLifecycle {

    render() {
        return <div>Test</div>
    }
}