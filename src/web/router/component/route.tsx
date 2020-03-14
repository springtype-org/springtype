import {st} from "../../../core";
import {attr, component} from "../../component";
import {ILifecycle} from "../../component/interface";
import {tsx} from "../../vdom";
import {IElement, IVirtualNode} from "../../vdom/interface";
import {IRouteMatch, RouteGuard} from "../interface";
import {RouteList} from "./route-list";
import {TYPE_FUNCTION, TYPE_OBJECT, TYPE_STRING} from "../../../core/lang";
import {AttrType} from "../../component/trait/attr";
import {DEFAULT_ROUTE_CACHE_GROUP} from "../router";

const defaultLoadingComponent = <div>Loading...</div>;

export interface IRouteAttrs {
    path: string | Array<string>;
    exact?: boolean;
    cacheGroup?: string;
    guard?: RouteGuard;
}

@component
export class Route extends st.component<IRouteAttrs> implements ILifecycle {

    static SLOT_NAME_LOADING_COMPONENT = 'loading-component';

    @attr
    guard?: RouteGuard;

    // if array is passed, the "one-of" strategy is used; first match wins
    @attr(AttrType.DOM_TRANSPARENT)
    path: string | Array<string> = "";

    @attr
    exact: boolean = false;

    @attr
    cacheGroup: string = DEFAULT_ROUTE_CACHE_GROUP;

    @attr
    displayStyle: string = 'block';

    loadingComponentEl!: IElement | Array<IElement>;

    componentEl!: IElement | Array<IElement>;

    guardComponent!: IElement;

    match!: Function;

    cacheGroupFn!: Function;

    runningMatch!: (reason?: any) => void;

    activePath!: string;

    shouldRender() {
        return false;
    }

    async onBeforeConnect() {
        this.match = () => {
            this.stopRunningMatch();
            st.router.createMatcher(this.path, this.onMatch, this.onMismatch)();
        };
        this.cacheGroupFn = () =>{
            this.onAfterCacheGroupChange()
        };
        if (!(this.parent instanceof RouteList)) {
            st.router.addOnLocationChangeHandler(this.match);
            st.router.addOnAfterCacheGroupChangeHandler(this.cacheGroupFn);
        }
    }

    onAfterCacheGroupChange = () => {
        if (this.cacheGroup !== st.router.activeRouteCacheGroup) {
            this.deleteGuardComponent();
            this.deleteLoadingComponent();
            this.deleteComponent()
        }
    };

    onMatch = async (path: string, match: IRouteMatch) => {
        try {
            await this.enter(match, path);
        } catch (e) {
            st.debug(e.message);
        }
    };

    onMismatch = async (path: string) => {
        this.leave(path);
    };

    onDisconnect() {
        if (!(this.parent instanceof RouteList)) {
            st.router.removeOnLocationChangeHandler(this.match);
            st.router.removeOnAfterCacheGroupChangeHandler(this.cacheGroupFn);
        }
    }

    leave = async (path: string) => {
        if (path === this.activePath) {

            this.style = {
                display: 'none'
            };

            const lifecycle = (component: IElement | undefined) => {
                if (component && component.$stComponent && typeof component.$stComponent.onRouteLeave == TYPE_FUNCTION) {
                    //component.$stComponent.onRouteLeave(path);
                }
            };

            if (Array.isArray(this.componentEl)) {
                if (this.componentEl.length > -1) {
                    this.componentEl.forEach(cmp => lifecycle(cmp));
                }
            } else {
                lifecycle(this.componentEl);
            }

            this.deleteGuardComponent();
            this.deleteLoadingComponent();
            delete this.activePath;
        }


    };

    prepareLoadingComponent() {
        if (this.loadingComponentEl) return;
        const componentSlot = this.renderSlot(Route.SLOT_NAME_LOADING_COMPONENT, defaultLoadingComponent) as Array<IVirtualNode>;
        this.loadingComponentEl = (st.dom.createElementOrElements(componentSlot, this.el) as Array<IElement>);
    };

    renderFunctionalComponent = async (component: IVirtualNode) => {
        // allows for <Route>{() => import('foo/bar')}</Route>
        if (typeof component === TYPE_FUNCTION) {
            // call closure
            component = await (component as unknown as Function)();
            // dynamic import case: <Route>{() => import('./page/b') }</Route>
            if ((component! as any).default) {
                // must be exported as: export default class Foo extends st.component {} to work well
                const Component = (component! as any).default;
                return <Component/>;
            }
        }
        return component;
    };

    async prepareComponent() {
        if (this.componentEl) return;
        // support <Route path="about"><AboutPage /></Route> syntax
        const childComponents = (this.renderChildren() as Array<IVirtualNode>);
        const components: Array<IVirtualNode> = [];
        for (const component of childComponents) {
            components.push(await this.renderFunctionalComponent(component));
        }
        this.componentEl = st.dom.createElementOrElements(components, this.el, true) as Array<IElement>;
    };

    removeElement(elements: IElement | Array<IElement> | undefined) {
        if (elements) {
            if (Array.isArray(elements)) {
                for (const element of elements) {
                    if (this.el.contains(element)) {
                        this.el.removeChild(element as IElement);
                    }
                }
            } else {
                if (this.el.contains(elements as IElement)) {
                    this.el.removeChild(elements as IElement);
                }
            }
        }
    }

    showElement(elements: IElement | Array<IElement> | undefined, show: boolean = true) {
        if (elements) {
            if (Array.isArray(elements)) {
                for (const element of elements) {
                    (element as IElement).style.display = show ? this.displayStyle : 'none';
                }
            } else {
                (elements as IElement).style.display = show ? this.displayStyle : 'none';
            }
        }
    }

    deleteGuardComponent() {
        this.removeElement(this.guardComponent);
        delete this.guardComponent;
    }

    deleteLoadingComponent() {
        this.removeElement(this.loadingComponentEl);
        delete this.loadingComponentEl;
    }

    deleteComponent() {
        this.removeElement(this.componentEl);
        delete this.componentEl;
    }

    stopRunningMatch() {
        if (this.runningMatch) {
            this.runningMatch({
                reason: 'matcher triggered',
                message: `Stopped matching (${this.path})`
            });
        }
    }

    // is called by the router whenever one of this.paths match partially or exactly
    enter = async (match: IRouteMatch, path: string) => {
        if (this.guardComponent || this.cacheGroup !== st.router.activeRouteCacheGroup) {
            this.deleteGuardComponent();
            this.deleteLoadingComponent();
            this.deleteComponent()
        }

        // false-positive match when explicit matching is asked for
        if (this.exact && !match.isExact) {
            //also leave old path
            this.leave(path);
            return;
        }

        this.activePath = path;
        st.router.activeRouteCacheGroup = this.cacheGroup;

        this.style = {
            display: this.displayStyle
        };

        if (typeof this.guard === TYPE_FUNCTION) {
            this.prepareLoadingComponent();
            // run guard function
            let result;

            result = await new Promise(async (resolve, reject) => {
                this.runningMatch = reject;
                const guardResponse = await this.guard!(match);
                resolve(guardResponse);
            });

            if (typeof result === TYPE_STRING) {
                st.router.navigate(result as string);
                this.deleteLoadingComponent();
                this.deleteComponent();
                return;

            } else if (typeof result === TYPE_OBJECT) {
                this.guardComponent = (st.dom.createElementOrElements(result as IVirtualNode, this.el) as IElement);
            }
        }

        this.showElement(this.loadingComponentEl, false);

        if (!this.guardComponent) {
            await this.prepareComponent();
        }

        const lifecycle = (component: IElement) => {
            if (!this.el.contains(component)) {
                this.el.appendChild(component);
            }
            const stComponent = component.$stComponent;
            // first render
            if (stComponent && !stComponent.INTERNAL.isConnected) {
                stComponent.connectedCallback();

                // call to this for all links
                st.router.callOnAfterMatchHandlers();
            } else if (stComponent) {

                if (stComponent.shouldRender()) {
                    // re-render on route change
                    stComponent.doRender();
                }
            }

            if (stComponent && typeof stComponent.onRouteEnter == TYPE_FUNCTION) {
                stComponent.onRouteEnter(path);
            }
        };

        if (!this.guardComponent) {
            if (Array.isArray(this.componentEl)) {
                for (const component of this.componentEl) {
                    lifecycle(component);
                }
            } else {
                lifecycle(this.componentEl);
            }
        } else {
            lifecycle(this.guardComponent);
        }


    };

    render() {
        return <fragment/>
    }
}
