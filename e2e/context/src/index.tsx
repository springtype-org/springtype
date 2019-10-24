import { st } from "../../../src/core";
import { context } from "../../../src/core/context";
import { customElement } from "../../../src/web/customelement";
import { ILifecycle, IStateChange } from "../../../src/web/customelement/interface";
import { tsx } from "../../../src/web/vdom";
interface LolShared {
  lala: number;

  deep?: boolean;
}

const contextName = "foo";

@customElement()
export class E2EContext extends st.element implements ILifecycle {


  @context(contextName)
  lolShared: LolShared = st.initContext<LolShared>(contextName, { lala: 123 });

  @context(contextName)
  lolSharedMirror: LolShared = st.getContext<LolShared>(contextName);

  onAfterInitialRender() {

    st.addContextChangeHandler(contextName, (change: IStateChange) => {

      st.info('context change per additional handler, change:');
      st.info(change);

      // manually re-render on context change (not activated by default)
      this.doRender();
    })

    this.lolShared = {
      lala: 200
    }

    this.lolShared.deep = true;

    setTimeout(() => {

      this.lolShared.lala = 456;
      this.lolShared.lala = 456;


      setTimeout(() => {

        this.lolSharedMirror.lala = 666;

      }, 1000);

    }, 1000);
  }

  render() {
    return <div>Primary: {JSON.stringify(this.lolSharedMirror)} and Share: {JSON.stringify(this.lolSharedMirror)}</div>;
  }
}

st.render(<E2EContext />);
