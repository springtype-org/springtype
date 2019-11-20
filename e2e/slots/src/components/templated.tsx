import { st } from "../../../../src/core";
import { attr, component } from "../../../../src/web/component";
import { ILifecycle } from "../../../../src/web/component/interface";
import { tsx } from "../../../../src/web/vdom";
import { E2eNonSlotted } from "./nonslotted";
import { E2eSlotted } from "./slotted";

export enum ImplTestCase {
  ALL_SLOTS_DEFINED,
  HEADER_WITH_DEFAULT_VALUES,
  NO_TEMPLATES_PROVIDED_BUT_DEFAULT_CONTENT,
  NO_CONTENT_PROVIDED_AT_ALL,
  MISMATCHING_TEMPLATE,
  NON_SLOTTED,
}

export interface IE2eTemplatesAttrs {
  title?: string;
  testCase?: ImplTestCase;
  random?: number;
}

/**
 * A simple example of using <template slot="foo">...</template> and <slot name="foo">Default content</slot>
 * to render elements given by a parent component at the right places in a child component.
 */
@component
export class E2eTemplated extends st.component<IE2eTemplatesAttrs> implements ILifecycle {

  @attr
  title: string = "";

  @attr
  testCase: ImplTestCase = ImplTestCase.ALL_SLOTS_DEFINED;

  @attr
  random!: number;

  render() {

    switch (this.testCase) {
      case ImplTestCase.ALL_SLOTS_DEFINED:
        return this.renderAllSoltsDefined();

      case ImplTestCase.HEADER_WITH_DEFAULT_VALUES:
        return this.renderHeaderWithDefaultValues();

      case ImplTestCase.NO_TEMPLATES_PROVIDED_BUT_DEFAULT_CONTENT:
        return this.renderNoTemplateProvidedButDefaultContent();

      case ImplTestCase.NO_CONTENT_PROVIDED_AT_ALL:
          return this.renderNoContentProvidedAtAll();

      case ImplTestCase.MISMATCHING_TEMPLATE:
          return this.renderMismatchingTemplate();

      case ImplTestCase.NON_SLOTTED:
          return this.renderNonSlotted();
    }
  }

  renderNonSlotted() {
    return (
      <fragment>
        <h2>Slot test: {this.title}</h2>
        <table>
          <thead>
            <td>
              <strong>Result</strong>
            </td>
            <td>
              <strong>Expected Result</strong>
            </td>
          </thead>
          <tr>
            <td>
              Before E2ENonSlotted
              <E2eNonSlotted>
                {/* This content shouldn't bleed-in because there is no default slot in <E2ENonSlotted /> */}
                <template slot="heeeader">
                  Foo
                </template>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
              </E2eNonSlotted>
              After E2ENonSlotted
            </td>
            <td>
              Before E2ENonSlotted
              <e2e-non-slotted>
                <p>Custom element without any slot tag. No content should leak here.</p>
              </e2e-non-slotted>
              After E2ENonSlotted
            </td>
          </tr>
        </table>
      </fragment>
    );
  }

  renderMismatchingTemplate() {

    return (
      <fragment>
        <h2>Slot test: {this.title}</h2>
        <table>
          <thead>
            <td>
              <strong>Result</strong>
            </td>
            <td>
              <strong>Expected Result</strong>
            </td>
          </thead>
          <tr>
            <td>
              Before e2e-slotted
              <E2eSlotted some="some more">
                <template slot="heeeader">
                  Foo
                </template>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
              </E2eSlotted>
              After E2ESlotted
            </td>
            <td>
              Before E2ESlotted
              <e2e-slotted>
                <div>
                  Begin
                  <div>
                    Header
                    Default header content
                  </div>
                  <p>A paragraph for the main content.</p>
                  <p>And another one.</p>
                  <div>
                    <div>
                      Footer
                      Default footer content
                    </div>
                  </div>
                  End
                </div>
              </e2e-slotted>
              After E2ESlotted
            </td>
          </tr>
        </table>
      </fragment>
    );
  }

  renderNoContentProvidedAtAll() {
    return (
      <fragment>
        <h2>Slot test: {this.title}</h2>
        <table>
          <thead>
            <td>
              <strong>Result</strong>
            </td>
            <td>
              <strong>Expected Result</strong>
            </td>
          </thead>
          <tr>
            <td>
              Before E2ESlotted
              <E2eSlotted some="some more">
              </E2eSlotted>
              After E2ESlotted
            </td>
            <td>
              Before E2ESlotted
              <e2e-slotted>
                <div>
                  Begin
                  <div>
                    Header
                    Default header content
                  </div>
                  Default slot some more default content
                  <div>
                    <div>
                      Footer
                      Default footer content
                    </div>
                  </div>
                  End
                </div>
              </e2e-slotted>
              After E2ESlotted
            </td>
          </tr>
        </table>
      </fragment>
    );
  }

  renderNoTemplateProvidedButDefaultContent() {
    return (
      <fragment>
        <h2>Slot test: {this.title}</h2>
        <table>
          <thead>
            <td>
              <strong>Result</strong>
            </td>
            <td>
              <strong>Expected Result</strong>
            </td>
          </thead>
          <tr>
            <td>
              Before E2ESlotted
              <E2eSlotted some="some more">
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
              </E2eSlotted>
              After E2ESlotted
            </td>
            <td>
              Before E2ESlotted
              <e2e-slotted>
                <div>
                  Begin
                  <div>
                    Header
                    Default header content
                  </div>
                  <p>A paragraph for the main content.</p>
                  <p>And another one.</p>
                  <div>
                    <div>
                      Footer
                      Default footer content
                    </div>
                  </div>
                  End
                </div>
              </e2e-slotted>
              After E2ESlotted
            </td>
          </tr>
        </table>
      </fragment>
    );
  }

  renderAllSoltsDefined() {
    return (
      <fragment>
        <h2>Slot test: {this.title}</h2>
        <table>
          <thead>
            <td>
              <strong>Result</strong>
            </td>
            <td>
              <strong>Expected Result</strong>
            </td>
          </thead>
          <tr>
            <td>
              Before E2ESlotted
              <E2eSlotted some="some more">
                <template slot="header">
                  <h3>Here might be a page title {this.random}</h3>
                </template>

                <p>A paragraph for the main content.</p>
                <p>And another one.</p>

                <template slot="footer">
                  <p>Here's some contact info</p>
                </template>
              </E2eSlotted>
              After E2ESlotted
            </td>

            <td>
              Before E2ESlotted
              <e2e-slotted>
                <div>
                  Begin
                  <div>
                    Header
                    <h3>Here might be a page title {this.random}</h3>
                  </div>
                  <p>A paragraph for the main content.</p>
                  <p>And another one.</p>
                  <div>
                    <div>
                      Footer
                      <p>Here's some contact info</p>
                    </div>
                  </div>
                  End
                </div>
              </e2e-slotted>
              After E2ESlotted
            </td>

          </tr>
        </table>
      </fragment>
    );
  }

  renderHeaderWithDefaultValues() {

    return (
      <fragment>
        <h2>Slot test: {this.title}</h2>
        <table>
          <thead>
            <td>
              <strong>Result</strong>
            </td>
            <td>
              <strong>Expected Result</strong>
            </td>
          </thead>
          <tr>
            <td>
              Before E2ESlotted
              <E2eSlotted some="some more">

                <p>A paragraph for the main content.</p>
                <p>And another one.</p>

                <template slot="footer">
                  <p>Here's some contact info {this.random}</p>
                </template>
              </E2eSlotted>
              After E2ESlotted
            </td>
            <td>
              Before E2ESlotted
              <e2e-slotted>
                <div>
                  Begin
                  <div>
                    Header
                    Default header content
                  </div>
                  <p>A paragraph for the main content.</p>
                  <p>And another one.</p>
                  <div>
                    <div>
                      Footer
                      <p>Here's some contact info {this.random}</p>
                    </div>
                  </div>
                  End
                </div>
              </e2e-slotted>
              After E2ESlotted
            </td>
          </tr>
        </table>
      </fragment>
    );
  }
}
