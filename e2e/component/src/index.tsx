import { st } from "../../../src/core";
import { attr, component, Component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import { ref } from "../../../src/core/ref/decorator";

import springTypeLogo from "../static/springtype-logo.png";

export interface E2EClockStaticRefs {
    timeDisplayRef: HTMLElement;
}

export interface E2EClockStaticAttrs {
    format: string;
}

const E2EClockStatic = component((scope: Component & E2EClockStaticRefs & E2EClockStaticAttrs) => {

    // defined at construction time
    const updateUnixTime = () => scope.renderPartial('format: ' + scope.getAttribute('format') + ':' + Date.now().toString(), scope.timeDisplayRef);

    // render fn returned, auto-called on doRender() when attribute changes (setAttribute)
    return () => (
        <fragment>
            THRU {scope.disabled} {scope.id} {scope.tabIndex}
            <button onClick={updateUnixTime}>Show time</button>
            <br />
            Time display: <br />
            <div ref={{ timeDisplayRef: scope }}></div>
        </fragment>
    );
}, 'e2e-clock');

export interface IFooAttrs {
}

export interface BarProps {
    testAttr: boolean;
    secondTestAttr: boolean;
}
@component
class Bar extends st.component<BarProps> {

    @attr
    testAttr: boolean = false;

    @attr
    secondTestAttr: boolean = false;

    render() {
        console.log('this.testAttr', this.testAttr, this.secondTestAttr);
        return "Bar! testAttr? " + this.testAttr + ' and ' + this.secondTestAttr
    }
}

@component
class Fuu<ATTR> extends st.component<ATTR> {
}

@component({ tag: 'Faa' })
export class Foo extends Fuu<IFooAttrs> {

    @ref
    displayTextRef!: HTMLElement;

    @ref
    displayStrongElRef!: HTMLElement;

    @ref
    displayArrayOfStringsRef!: HTMLElement;

    @ref
    displayFragmentRef!: HTMLElement;

    @ref
    displayFooRef!: HTMLElement;

    onRenderPartialClick = async () => {
        await this.renderPartial('Something else', this.displayTextRef);
        await this.renderPartial(<strong>Something else</strong>, this.displayStrongElRef);
        await this.renderPartial(['A', ' ', 'B'], this.displayArrayOfStringsRef);
        await this.renderPartial(<fragment>A B</fragment>, this.displayFragmentRef);
    }

    onHideFragmentsClick = () => {
        st.dom.hide(this.displayFragmentRef);
    }

    onShowFragmentsClick = () => {
        st.dom.show(this.displayFragmentRef);
    }

    // demonstrates how to update asynchronously
    renderFooDeferred() {
        setTimeout(() => this.renderPartial(<p>Foo!</p>, this.displayFooRef), 1000);
    }

    render() {

        console.log(require('../static/springtype-logo.png'))

        return <div style="color: green">
            <E2EClockStatic tabIndex={1} id="test" format="YYYY-mm-dd" disabled />
            <div ref={{ displayTextRef: this }}>!text!</div>
            <div ref={{ displayStrongElRef: this }}>!strong text!</div>
            <div ref={{ displayArrayOfStringsRef: this }}>!Array of strings!</div>
            <div ref={{ displayFragmentRef: this }}>!fragment A B!</div>
            <div>Foo promised: <p ref={{ displayFooRef: this }}>{this.renderFooDeferred()}</p></div>
            <button onClick={this.onRenderPartialClick}>Render Partial</button>
            <button onClick={this.onHideFragmentsClick}>Hide fragments</button>
            <button onClick={this.onShowFragmentsClick}>Show fragments</button>

            {/* attrs map attribute passing for components */}
            <Bar {...{ testAttr: true, secondTestAttr: false }} />
            <Bar testAttr={true} secondTestAttr={true} />

            {/* attrs map attribute passing for standard DOM elements */}
            <input {...{ hidden: undefined, value: 'test' }} />
            <input disabled value='test' />

            <img src={springTypeLogo} />
        </div>;
    }
}

st.render(<Foo />);
