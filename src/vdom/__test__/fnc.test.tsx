import { render, tsx, st, ST_KEY, IElement } from '../..';

describe('Functional component', () => {
  let parentDOMElement: IElement;

  beforeEach(() => {
    parentDOMElement = (document.createElement('div') as unknown) as IElement;
  });

  it('renders a functional component', () => {
    const FC = () => (
      <fragment>
        <div id="123">Foo</div>
        {/* huhuhu */}
        <div id="abc">Foo2</div>
      </fragment>
    );

    const someFc = <FC />;
    render(someFc, parentDOMElement);

    expect((parentDOMElement.childNodes[0] as HTMLDivElement).id).toEqual('123');
    expect((parentDOMElement.childNodes[0] as HTMLDivElement).textContent).toEqual('Foo');
    expect((parentDOMElement.childNodes[1] as HTMLDivElement).id).toEqual('abc');
    expect((parentDOMElement.childNodes[1] as HTMLDivElement).textContent).toEqual('Foo2');
  });

  it('exposes __$st on each element created', () => {
    const FC = () => (
      <fragment>
        <div id="123">Foo</div>
        {/* huhuhu */}
        <div id="abc">Foo2</div>
      </fragment>
    );

    const someFc = <FC />;
    render(someFc, parentDOMElement);

    expect((parentDOMElement.childNodes[0] as any)[ST_KEY]).toEqual(st);
  });
});
