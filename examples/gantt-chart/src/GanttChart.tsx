import {Element, Lifecycle, ActiveRenderer, Renderer} from "@springtype/springtype-incubator-core";

@Element('gantt-chart')
export class GanttChart extends HTMLElement implements Lifecycle {

    render() {
        return <div>Test</div>
    }
}