import { st, ST_KEY } from '../..';

describe('$st', () => {
  it('globalThis["$st"] is an object', () => {
    expect(window.$st).toBeDefined();
    expect(window.$st).toBeInstanceOf(Object);
    expect(window[ST_KEY]).toBeDefined();
    expect(window[ST_KEY]).toBeInstanceOf(Object);
  });

  it('st is defined', () => {
    expect(st).toBeDefined();
    expect(st).toBeInstanceOf(Object);
  });

  it('st equals window["$st"]', () => {
    expect(st).toEqual(window.$st);
  });

  it('st can store an arbitrary state', () => {
    expect(st.state).toEqual({});
    st.state.foo = 'bar';
    expect(st.state.foo).toEqual('bar');
  });
});
