import { st } from "../../../src/core";
import { customElement } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { tsx } from "../../../src/web/vdom";
import { E2ETemplated, ImplTestCase } from "./components/templated";

@customElement()
export class E2ESlotsIndex extends st.element implements ILifecycle {

  onReRenderClick = () => {
    console.log('Re-render');
    this.doRender();
  };

  render() {
    return [
      <button onClick={this.onReRenderClick}>Re-render</button>,
      Math.random(),
      <E2ETemplated title="All slots defined" testCase={ImplTestCase.ALL_SLOTS_DEFINED}></E2ETemplated>,
      <hr />,
      <E2ETemplated title="Header with default value" testCase={ImplTestCase.HEADER_WITH_DEFAULT_VALUES}></E2ETemplated>,
      <hr />,
      <E2ETemplated title="No <template>'s provided but default content" testCase={ImplTestCase.NO_TEMPLATES_PROVIDED_BUT_DEFAULT_CONTENT}></E2ETemplated>,
      <hr />,
      <E2ETemplated title="No content provided at all, all default" testCase={ImplTestCase.NO_CONTENT_PROVIDED_AT_ALL}></E2ETemplated>,
      <hr />,
      <E2ETemplated title="Mismatching <template>'s" testCase={ImplTestCase.MISMATCHING_TEMPLATE}></E2ETemplated>,
      <hr />,
      <E2ETemplated title="Non-slotted behaviour" testCase={ImplTestCase.NON_SLOTTED}></E2ETemplated>,
    ];
  }
}

// Tells SpringType to render the component now
st.render(<E2ESlotsIndex />);
