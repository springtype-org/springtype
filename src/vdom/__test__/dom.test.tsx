import { tsx, render, Ref, st } from '../..';

describe('VirtualDOM', () => {
  it('defines st.dom', () => {
    expect(st.dom).toBeDefined();
  });

  it('transforms a <ul> list into JSX.Element which extends IVirtualNode', () => {
    const list = (
      <ul>
        <li id="123" />
      </ul>
    );

    expect(list).toBeDefined();
    expect(list.children).toBeDefined();
    expect(list.children.length).toBe(1);
  });

  it('can render an array of elements', () => {
    const list = [
      <ul>
        <li id="123" />
      </ul>,
      <div />,
    ];

    expect(list).toBeDefined();
    expect(list.length).toBe(2);
  });

  it('can render to document.body', () => {
    const divRef: Ref = {};

    expect(render(<div ref={divRef} />, document.body)).toBeInstanceOf(HTMLDivElement);
    expect(divRef.current).toBeInstanceOf(HTMLDivElement);
    expect(document.body.childNodes[0]).toEqual(divRef.current);
  });

  it('can render text to document.body', () => {
    expect(render('Mesg', document.body)).toBeInstanceOf(Text);
    expect(document.body.textContent).toEqual('Mesg');
  });

  it('can render Text', () => {
    expect(render('Foo')).toBeDefined();
    expect(render('Foo')).toBeInstanceOf(Text);
  });

  it('can render an Array of elements', () => {
    expect(render([<div>A</div>, <div>B</div>])).toBeDefined();
    expect(render([<div>A</div>, <div>B</div>])).toBeInstanceOf(Array);
    expect(((render([<div>A</div>, <div>B</div>]) as unknown) as Array<any>).length).toBe(2);
  });

  it('can render SVG elements', () => {
    expect(
      render(
        <svg
          className="star__svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
        >
          <path className="star__svg__path" />
          <rect fill="none" width="32" height="32" />
          <use xlinkHref="//wiki.selfhtml.org/wiki/SVG/Elemente/Verweise" xlinkTitle="zurück zum Wiki-Artikel">
            <text x="140" y="60">
              zurück zum Wiki-Artikel (mit XLink:href)
            </text>
          </use>
        </svg>,
      ),
    ).toBeInstanceOf(SVGSVGElement);
  });

  it('can render undefined values', () => {
    expect(render(undefined)).toBeInstanceOf(Text);
  });

  it('can render null values', () => {
    expect(render(<div>{null}</div>)).toBeTruthy();
  });

  it('can render refs', () => {
    const divRef: Ref = {};

    expect(render(<div ref={divRef} />)).toBeInstanceOf(HTMLDivElement);
    expect(divRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('can attach to events implicitly and handlers get called', () => {
    const buttonRef: Ref = {};
    const onClick = jest.fn(() => {});

    expect(render(<button label="button" type="button" ref={buttonRef} onClick={onClick} />)).toBeInstanceOf(
      HTMLButtonElement,
    );
    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);

    buttonRef.current?.click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('can attach to events implicitly with capture and handlers get called', () => {
    const buttonRef: Ref = {};
    const onClick = jest.fn(() => {});

    expect(render(<button label="button" type="button" ref={buttonRef} onClickCapture={onClick} />)).toBeInstanceOf(
      HTMLButtonElement,
    );
    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);

    buttonRef.current?.click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('can apply many classes at once', () => {
    const el: Element = (render(
      <button label="button" type="button" class={['a', 'b']} />,
    ) as unknown) as HTMLButtonElement;

    expect(el).toBeInstanceOf(HTMLButtonElement);
    expect(el.classList.contains('a')).toBe(true);
    expect(el.classList.contains('b')).toBe(true);
  });

  it('can apply many classes at once - with React syntax', () => {
    const el: Element = (render(
      <button label="button" type="button" className={['a', 'b']} />,
    ) as unknown) as HTMLButtonElement;

    expect(el).toBeInstanceOf(HTMLButtonElement);
    expect(el.classList.contains('a')).toBe(true);
    expect(el.classList.contains('b')).toBe(true);
  });

  it('can render undefined attributes', () => {
    const el: Element = (render(
      <button value={undefined as any} label="foo" type="button" />,
    ) as unknown) as HTMLButtonElement;

    expect(el).toBeInstanceOf(HTMLButtonElement);
  });

  it('can render style props', () => {
    const el: HTMLButtonElement = (render(
      <button
        label="button"
        type="button"
        style={{
          border: '1px solid #ccc',
          fontSize: '10px',
        }}
      />,
    ) as unknown) as HTMLButtonElement;

    expect(el).toBeInstanceOf(HTMLButtonElement);
    expect(el.style.border).toBe('1px solid #ccc');
    expect(el.style.fontSize).toBe('10px');
  });

  it('can render boolean attributes', () => {
    const el: HTMLButtonElement = (render(
      <button label="button" type="button" disabled={false} />,
    ) as unknown) as HTMLButtonElement;

    expect(el).toBeInstanceOf(HTMLButtonElement);
    expect(el.disabled).toBe(false);
  });

  it('can render boolean attributes positively', () => {
    const el: HTMLButtonElement = (render(
      <button label="button" type="button" disabled />,
    ) as unknown) as HTMLButtonElement;
    expect(el).toBeInstanceOf(HTMLButtonElement);
    expect(el.disabled).toBe(true);
  });

  it('can render boolean attributes implicitly', () => {
    const el: HTMLButtonElement = (render(
      <button label="button" type="button" disabled />,
    ) as unknown) as HTMLButtonElement;
    expect(el).toBeInstanceOf(HTMLButtonElement);
    expect(el.disabled).toBe(true);
  });
});
