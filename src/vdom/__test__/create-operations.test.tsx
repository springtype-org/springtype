import { tsx, render, IElement } from '../..';

describe('Renderer create operation', () => {
  let parentDOMElement: IElement;

  beforeEach(() => {
    parentDOMElement = (document.createElement('div') as unknown) as IElement;
  });

  it('renders a <ul> list (JSX.Element extends IVirtualNode) as a child of a DOM element', () => {
    const list = (
      <ul id="123">
        <li>Foo</li>
      </ul>
    );

    render(list, parentDOMElement);

    expect((parentDOMElement.childNodes[0] as HTMLLIElement).id).toEqual('123');
    expect((parentDOMElement.childNodes[0] as HTMLLIElement).childNodes[0].nodeName).toEqual('LI');
  });
});
