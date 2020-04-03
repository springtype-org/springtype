import "./st-hide.css";
import { st } from "../../../src/core";
import { component, attr, staticComponent, StaticComponent } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import { ref } from "../../../src/core/ref/decorator";

export interface E2EClockStaticRefs {
    timeDisplayRef: HTMLElement;
}

export interface E2EClockStaticAttrs {
    format: string;
}

const E2EClockStatic = staticComponent((scope: StaticComponent & E2EClockStaticRefs & E2EClockStaticAttrs) => {

    // defined at construction time
    const updateUnixTime = () => scope.renderPartial('format: ' + scope.getAttribute('format') + ':' + Date.now().toString(), scope.timeDisplayRef);

    // render fn returned, auto-called on doRender() when attribute changes (setAttribute)
    return () => (
        <fragment>
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

@staticComponent
class Bar extends st.staticComponent<BarProps> {

    @attr
    testAttr: boolean;

    @attr
    secondTestAttr: boolean;

    render() {
        console.log('this.testAttr', this.testAttr, this.secondTestAttr);
        return "Bar! testAttr? " + this.testAttr + ' and ' + this.secondTestAttr
    }
}

@staticComponent
class Fuu<ATTR> extends st.staticComponent<ATTR> {
}

@staticComponent({ tag: 'Faa' })
export class Foo extends Fuu<IFooAttrs> {

    @ref
    displayTextRef: HTMLElement;

    @ref
    displayStrongElRef: HTMLElement;

    @ref
    displayArrayOfStringsRef: HTMLElement;

    @ref
    displayFragmentRef: HTMLElement;

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

    render() {
        return <div style="color: green">
            <E2EClockStatic format="YYYY-mm-dd" />
            <div ref={{ displayTextRef: this }}>!text!</div>
            <div ref={{ displayStrongElRef: this }}>!strong text!</div>
            <div ref={{ displayArrayOfStringsRef: this }}>!Array of strings!</div>
            <div ref={{ displayFragmentRef: this }}>!fragment A B!</div>
            <button onClick={this.onRenderPartialClick}>Render Partial</button>
            <button onClick={this.onHideFragmentsClick}>Hide fragments</button>
            <button onClick={this.onShowFragmentsClick}>Show fragments</button>

            {/* attrs map attribute passing for components */}
            <Bar attrs={{ testAttr: true, secondTestAttr: false }} />
            <Bar testAttr={true} secondTestAttr={true} />

            {/* attrs map attribute passing for standard DOM elements */}
            <input attrs={{ hidden: undefined, value: 'test' }} />
            <input disabled value='test' />
        </div>;
    }
}

st.render(<Foo />);
