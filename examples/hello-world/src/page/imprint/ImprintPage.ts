import {WebComponent, WebComponentLifecycle} from "../../../../../src/package/html";
import {RenderStrategy} from "../../../../../src/package/html";
import template from './ImprintPage.tpl';
import {Router} from "../../../../../src/package/html/src/router/Router";

interface ImprintPageProps {
    header: string;
}

@WebComponent({
    tag: 'imprint-page',
    renderStrategy: RenderStrategy.onPropsChanged,
    props: ['header'],
    template // re-rendered on props change
})
export class ImprintPage extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: ImprintPageProps,
        protected router: Router,
        private updateInterval: number,
    ) {

        super();

        this.props.header = 'nix';

    }

    mount(): void {

        let c = 0;
        this.updateInterval = window.setInterval(() => {

            console.log('asdasd33!!!');

            ++c;
            this.props.header = `reloads ${c}`;

        }, 1000);
    }

    unmount(): void {

        clearInterval(this.updateInterval);
    }

    onFooterContentHeaderClick = () => {

        // 2nd props change
        this.props.header = 'Footer Content mutated';
    };
}