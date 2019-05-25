import {Element, Lifecycle, ActiveRenderer, Renderer} from "@springtype/core";

@Element('gantt-chart')
export class GanttChart extends HTMLElement implements Lifecycle {

    render() {
        return <div>Test</div>
    }
}