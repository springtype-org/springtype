import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { route, RouterOutlet } from "../../../src/web/router";
import { tsx } from "../../../src/web/vdom";
import { E2eTemplated, ImplTestCase } from "./components/templated";

@component()
export class E2eSlotsIndex extends st.component implements ILifecycle {

  onReRenderClick = () => {
    console.log('Re-render');
    this.doRender();
  };

  render() {
    return [
      <button onClick={this.onReRenderClick}>Re-render</button>,
      Math.random(),
      <E2eTemplated title="All slots defined" testCase={ImplTestCase.ALL_SLOTS_DEFINED}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="Header with default value" testCase={ImplTestCase.HEADER_WITH_DEFAULT_VALUES}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="No <template>'s provided but default content" testCase={ImplTestCase.NO_TEMPLATES_PROVIDED_BUT_DEFAULT_CONTENT}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="No content provided at all, all default" testCase={ImplTestCase.NO_CONTENT_PROVIDED_AT_ALL}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="Mismatching <template>'s" testCase={ImplTestCase.MISMATCHING_TEMPLATE}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="Non-slotted behaviour" testCase={ImplTestCase.NON_SLOTTED}></E2eTemplated>,
    ];
  }
}


@route(null, E2eSlotsIndex)
class IndexModule {

}

// Tells SpringType to render the component now
st.render(<RouterOutlet />);
