import { st } from "../../../src/core";
import { context } from "../../../src/core/context";
import { component } from "../../../src/web/component";
import { ILifecycle, IStateChange } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";

interface LolShared {
  lala: number;

  deep?: boolean;
}

const contextName = "foo";
const initialContextValue = { lala: 123 };

@component
export class E2EContext extends st.component implements ILifecycle {

  @context(contextName)
  lolShared: LolShared = st.context<LolShared>(contextName, initialContextValue);

  @context(contextName)
  lolSharedMirror: LolShared = st.context<LolShared>(contextName, initialContextValue);

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
    return <div>Primary: {JSON.stringify(this.lolShared)} and Share: {JSON.stringify(this.lolSharedMirror)}</div>;
  }
}

st.render(<E2EContext />);
