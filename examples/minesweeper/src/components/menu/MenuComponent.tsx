import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";


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
