import { st } from "../../../src/core";
import { injectable, inject } from "../../../src/core/di";
import { context } from "../../../src/core/context";
import { component, contextState } from "../../../src/web/component";
import { ILifecycle, IStateChange } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";

interface LolShared {
  lala: number;

  deep?: boolean;
}

const contextName = "foo";
const initialContextValue = { lala: 123 };

@injectable
export class ServiceDemo {

  @context('iterative')
  iterativeContext = st.context('iterative', ['asd']);

  addToIterativeContext() {
    this.iterativeContext.push('foo');
  }
}

@component
export class E2EContext extends st.component implements ILifecycle {

  @inject(ServiceDemo)
  serviceDemo: ServiceDemo;

  @contextState(contextName)
  lolShared: LolShared = st.context<LolShared>(contextName, initialContextValue);

  @contextState(contextName)
  lolSharedMirror: LolShared = st.context<LolShared>(contextName, initialContextValue);

  @context('iterative')
  iterativeContext = st.context('iterative', ['asd']);

  onAfterRender() {

    console.log('onAfterRender');

    st.addContextChangeHandler('iterative', (change: IStateChange) => {

      st.info('iterative context, change:');
      st.info(change);
    });

    this.lolShared = {
      lala: 200
    }

    this.lolShared.deep = true;

    setTimeout(() => {

      this.serviceDemo.addToIterativeContext();

      this.lolShared.lala = 456;
      this.lolShared.lala = 456;


      setTimeout(() => {

        this.lolSharedMirror.lala = 666;

      }, 1000);

    }, 1000);
  }

  render() {

    for (let itemOfIterativeContext of this.iterativeContext) {
      // only reading, shall not trigger change detection here
    }

    return <div>Primary: {JSON.stringify(this.lolShared)} and Share: {JSON.stringify(this.lolSharedMirror)}</div>;
  }
}

st.render(<E2EContext />);
