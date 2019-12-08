import { st } from "../../../core";
import "../../vdom";

describe('ignored-attributes', () => {

  it('sets ignored attributes', () => {
    st.renderer.setIgnoredAttributes(['mansi', 'aron']);
    expect(st.renderer.IGNORED_ATTRIBUTES.length).toEqual(2);
  });
});
