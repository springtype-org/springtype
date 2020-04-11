import { st } from "../../../core";
import { attr, component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { AttrType } from "../../component/trait/attr";
import { equalObjects, mergeArrays } from "../../../core/lang";
import { tsx } from "../../vdom";

export interface ILinkAttrs {
    path: string;
    params?: any;
    href?: string;
    target?: string;
    activeClass?: string;
}

@component({ tag: 'a' })
export class Link extends st.component<ILinkAttrs> implements ILifecycle {

    static ACTIVE_LINK_SLOT = 'ACTIVE_LINK_SLOT';
    static INACTIVE_LINK_SLOT = 'INACTIVE_LINK_SLOT';

    @attr
    path: string = '';

    @attr
    params?: any;

    @attr(AttrType.DOM_TRANSPARENT)
    target?: string = '';

    @attr(AttrType.DOM_TRANSPARENT)
    href?: string = 'javascript:';

    @attr
    activeClass?: string;

    match: boolean = false;

    onClick = () => {

        st.route = {
            path: this.path,
            params: this.params
        }
    };

    onConnect = () => {

        this.match = this.isMatch();

        // register callback for future route changes
        st.router.addOnAfterMatchHandler(this.onAfterMatchHandler);
    };

    onAfterMatchHandler = async () => {

        const matchBefore = this.match;

        this.match = this.isMatch();

        // if state of match differs, rerender
        if (matchBefore != this.match) {
            await this.rerender();
        }
    };

    updateActiveClass = () => {
        if (!Array.isArray(this.class)) {
            this.class = [this.class];
        }

        let activeClassNames = this.activeClass || st.router.activeLinkClass;

        if (!Array.isArray(activeClassNames)) {
            activeClassNames = [activeClassNames];
        }
        let filteredClasses = this.class.filter((className: string) => activeClassNames.indexOf(className) === -1);

        if (this.match) {
            filteredClasses = mergeArrays(filteredClasses, activeClassNames)
        }
        this.class = filteredClasses;
    };

    isMatch = (): boolean => {
        if (st.route) {
            const matcher = st.router.match[this.path];
            if (matcher && equalObjects(matcher.params, this.params || {})) {
                if (matcher.isExact || matcher.isPartial) {
                    return true;
                }
            }
        }
        return false;
    };

    render = () => {

        this.updateActiveClass();

        return <fragment>
            {this.renderChildren()}
            {this.match
                ? this.renderSlot(Link.ACTIVE_LINK_SLOT)
                : this.renderSlot(Link.INACTIVE_LINK_SLOT)
            }
        </fragment>
    }

    onDisconnect = () => {
        st.router.removeOnAfterMatchHandler(this.onAfterMatchHandler);
    }
}
