import {WebComponent, WebComponentLifecycle} from "../../../../../../src/package/html";


@WebComponent({
    tag: 'sw-menu',
})

export class FieldComponent extends HTMLElement implements WebComponentLifecycle {

    constructor() {
        super()
    }


    init(): void {

    }

    render = () => {

        return (
            <div>menu</div>
        );
    }

}
