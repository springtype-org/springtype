import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { E2eTemplated, ImplTestCase } from "./components/templated";

@component
export class E2eSlotsIndex extends st.component implements ILifecycle {

  random: number =  Math.random();

  onReRenderClick = () => {
    //console.log('Re-render');
    this.random = Math.random();
    this.doRender();
  };

  onReRenderNoMutationClick = () => {
    //onsole.log('Re-render (no mutation)');
    this.doRender();
  };

  render() {
    return [
      <button onClick={this.onReRenderClick}>Re-render</button>,
      <button onClick={this.onReRenderNoMutationClick}>Re-render (no mutation)</button>,
      this.random,
      <E2eTemplated title="All slots defined" testCase={ImplTestCase.ALL_SLOTS_DEFINED} random={this.random}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="Header with default value" testCase={ImplTestCase.HEADER_WITH_DEFAULT_VALUES} random={this.random}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="No <template>'s provided but default content" testCase={ImplTestCase.NO_TEMPLATES_PROVIDED_BUT_DEFAULT_CONTENT} random={this.random}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="No content provided at all, all default" testCase={ImplTestCase.NO_CONTENT_PROVIDED_AT_ALL} random={this.random}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="Mismatching <template>'s" testCase={ImplTestCase.MISMATCHING_TEMPLATE} random={this.random}></E2eTemplated>,
      <hr />,
      <E2eTemplated title="Non-slotted behaviour" testCase={ImplTestCase.NON_SLOTTED} random={this.random}></E2eTemplated>,
    ];
  }
}

// Tells SpringType to render the component now
st.render(<E2eSlotsIndex />);
