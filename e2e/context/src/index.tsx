import { st } from "../../../src/core";
import { inject } from "../../../src/core/di";
import { context } from "../../../src/core/context";
import { component } from "../../../src/web/component";
import { onContextChange } from "../../../src/core/context/decorator/on-context-change";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { service } from "../../../src/core/service/decorator/service";

interface LolShared {
  lala: number;

  deep?: boolean;
}

const contextName = "foo";
const initialContextValue = { lala: 123 };

@service
export class ServiceDemo extends st.service {

  @context
  iterativeContext = ['asd'];

  addToIterativeContext() {
    this.iterativeContext.push('foo');
  }

  @onContextChange('iterativeContext')
  handleInteractiveChange(newValue: any, prevValue: any) {

    console.log('interactive change in ServiceDemo. new Value:', newValue, 'prevValue', prevValue)
  }
}

@component
export class E2EContext extends st.component implements ILifecycle {

  @inject(ServiceDemo)
  serviceDemo: ServiceDemo;

  @context(contextName)
  lolShared: LolShared = initialContextValue;

  @context(contextName)
  lolSharedMirror: LolShared = initialContextValue;

  @context
  iterativeContext = ['asd'];

  onAfterRender() {

    console.log('onAfterRender');

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
