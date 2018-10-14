import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {RenderStrategy} from "../../../../../src/package/html";
import template from './ImprintPage.tpl';
import {Router} from "../../../../../src/package/html/src/router/Router";

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

    constructor(
        public state: ImprintPageState,
        protected router: Router
    ) {

        super();

        this.state.header = 'nix';

        let c = 0;

        setInterval(() => {

            console.log('asdasd33!!!');

            ++c;
            this.state.header = `reloads ${c}`;

        }, 1000);
    }

    onFooterContentHeaderClick = () => {

        // 2nd state change
        this.state.header = 'Footer Content mutated';
    };
}