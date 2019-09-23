# `@customElement` end-to-end test and usage example

This example demonstrates how to use custom elements as the building blocks
to design a user interface.

`@customElement` is a lightweight abstraction for the web component technology set.
`@customElement` defines a standard class as a custom element to use with a tag name in HTML:

    import { st } from "springtype";
    import { customElement, attr } from "springtype/web/customelement";
    import { ILifecycle } from "springtype/web/customelement/interface";

    @customElement('my-tag')
    export class MyElement extends st.customElement implements ILifecycle {

      @attr()
      'my-attribute': string;

      constructor() {
        super();
        // e.g. initialize attributes here, call init methods etc.
        this['my-attribute'] = 'has_a_value';
      }

      onBeforeConnect() {} // before `parent.appendChild()`
      onConnect() {} // after `parent.appendChild()`

      shouldAttributeChange(name: string, value: any, prevValue: any): boolean {
        // attribute changes are circuit breakabe and can be rejected here
        // e.g. to prevent invalid parametrization
        return true;
      }

      onAttributeChange(name: string, value: any, prevValue: any) {
        console.log('');
      }

      onBeforeDisconnect() {} // before `parent.removeChild()`
      onDisconnect() {} // after `parent.removeChild()`

      // --- userland impl.

      async yourOwnMethod() {

        // sometimes you want to wait until the element
        // is mounted to a DOM and UI interactive
        await this.whenConnected();
      }


    }

    //
    st.dom.start('my-tag');
