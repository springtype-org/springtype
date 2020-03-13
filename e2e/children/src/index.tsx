import { st } from "../../../src/core";
import { component, state, event, attr } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";
import { AttrType } from "../../../src/web/component/trait/attr";
import "./index.css";
import { ILifecycle } from "../../../src/web/component/interface";
import { context } from "../../../src/core/context/context";
import { ref } from "../../../src/core/ref";

const Duplicate = component(() => {
  const id = Date.now() + Math.random() * 1000;
  return () => {
    return <p>Duplicate-{id}</p>;
  }
});

const DRAG_GROUP = 'DRAG_GROUP';

let DRAG_ELEMENT: Draggable | null;

interface DraggableAttrs {
  ident: string;
}

@component
class Draggable extends st.component<DraggableAttrs> implements ILifecycle {

  @context(DRAG_GROUP)
  dragGroup: Array<Draggable> = st.context<Array<Draggable>>(DRAG_GROUP, []);

  @attr(AttrType.DOM_TRANSPARENT)
  draggable = "true";

  @attr(AttrType.DOM_TRANSPARENT)
  ident!: string;

  @state
  displayText!: string;

  style: Partial<JSX.CSSStyleDeclaration> = {
    cursor: 'move',
    display: 'inline-flex',
    borderRadius: '10px',
    margin: '10px',
    border: '2px solid transparent',
    backgroundColor: '#eee',
    width: 100,
    height: 100,
    padding: 20
  };

  constructor() {
    super();
    this.dragGroup.push(this);
  }

  onBeforeInitialRender() {
    this.displayText = this.ident;
  }

  @event
  onDragStart = (evt: DragEvent) => {
    DRAG_ELEMENT = this;
    evt.dataTransfer!.setData('text/plain', 'Foo!');
    for (let draggable of this.dragGroup) {
      draggable.handleDragStart();
    }
  };

  handleDragStart() {
    this.style = { ...this.style, opacity: 0.4 };
  }

  @event
  onDragOver = (evt: DragEvent) => {
    if (evt.preventDefault) {
      evt.preventDefault();
    }
    evt.dataTransfer!.dropEffect = 'move';
    return false;
  }

  @event
  onDragEnter = () => {
    this.style = { ...this.style, border: '2px dotted #000' };
  };

  @event
  onDragLeave = () => {
    this.handleDragLeave();
  };

  handleDragLeave() {
    this.style = { ...this.style, border: '2px solid transparent', opacity: 1 };
  }

  @event
  onDragEnd = () => {
    for (let draggable of this.dragGroup) {
      draggable.handleDragLeave();
    }
  };

  @event
  onDrop = (evt: DragEvent) => {

    if (evt.stopPropagation) {
      evt.stopPropagation(); // stops the browser from redirecting.
    }

    // See the section on the DataTransfer object.

    //this.dragElement.el.innerText = 'DRAGGED FROM';
    this.displayText = DRAG_ELEMENT!.ident + '->' + this.ident;

    console.log('drop data', evt.dataTransfer!.getData('text/plain'));

    DRAG_ELEMENT = null;
    return false;
  };

  render() {
    return this.displayText;
  }
}

@component
export class E2eChildren extends st.component {

  @state
  mapofnames = ["Rene", 2];

  @ref
  h4Ref!: HTMLElement;

  onAfterInitialRender() {
    setTimeout(() => {
      this.mapofnames = ["Michael", "Aron", "Daniel", "Bernd", "Holger", 0, 4];
    }, 500);

    this.h4Ref.setAttribute('foobar', "12323");
  }

  rerender = () => {
    this.doRender();
  }

  render() {
    return (
      <fragment>
        <h4 ref={{h4Ref: this}}>DragDrop</h4>
        <Draggable ident="1" />
        <Draggable ident="2" />
        <Draggable ident="3" />
        <div>
          <Duplicate />
          <Duplicate />
          {/* forced re-render on next render call */}
          <Duplicate doRender />
          <Duplicate />
          <Duplicate />
          <Duplicate />
          <Duplicate />
        </div>
        <div id="e2e-children">
          {this.mapofnames.map(value => (
            <p class="name">{value}</p>
          ))}
          Waiting...
        </div>

        <button onClick={this.rerender}>Re-render</button>
      </fragment>
    );
  }
}

st.renderer.setIgnoredAttributes(['foobar']);

st.render(<E2eChildren />);
