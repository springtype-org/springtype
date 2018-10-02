import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator/src/html";

@WebComponent({
    tag: 'hello-world',
    props: ['name']
})
class HelloWorld extends HTMLElement implements WebComponentLifecycle {

    init() {
        console.log('init', this);
    }

    onPropertyChange(prop: string, newValue: string): void {

        console.log('prop changed', prop, newValue);
    }

    mount() {

        console.log('mount');

        this.innerHTML = 'lala';
    }

    unmount() {

        console.log('unmont');
    }
}