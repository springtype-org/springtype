import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html/src/decorator/WebComponent";
import {Router} from "../../../../../src/package/html/src/router/Router";
import {RenderStrategy} from "../../../../../src/package/html";
import template from './ImprintPage.tpl';

interface ImprintPageState {
    header: string;
}

@WebComponent({
    tag: 'imprint-page',
    renderStrategy: RenderStrategy.OnStateChange,
    attributes: ['header'],
    template // re-rendered on state change
})
export class ImprintPage extends HTMLElement implements WebComponentLifecycle {

    constructor(public state: ImprintPageState, protected router: Router) {

        super();

        this.state.header = 'asdasd22';

        setTimeout(() => {

            console.log('asdasd33!!!');

            this.state.header = 'asdasd33';

        }, 3000);
    }

    onFooterContentHeaderClick = () => {

        // 2nd state change
        this.state.header = 'Footer Content mutated';
    };
}