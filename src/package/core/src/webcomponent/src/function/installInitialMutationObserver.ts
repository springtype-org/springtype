import {transformElementToVirtualElement} from "../../../virtualdom";
import {FlowIdReflector} from "../reflector/cross-instance/FlowIdReflector";
import {isWebComponent} from "./isWebComponent";

export const installInitialMutationObserver = (instance: any, tagName: string) => {

    // initial DOM children processing -> transform <web-component>$childNodes</web-component>
    // into an Array<VirtualElement> to be further transformed and re-rendered
    const observer = new MutationObserver((mutationsList) => {

        const webComponentNode: Node = instance;
        let initialChildren: Array<Element> = [];

        const addedNodes = mutationsList
            .filter(mutation => mutation.type === 'childList')
            .filter(mutation => mutation.addedNodes && mutation.addedNodes.length)
            .map(mutation => mutation.addedNodes);

        addedNodes.forEach((mutationNodeList: NodeList) => {

            initialChildren = [...initialChildren, ...mutationNodeList as unknown as Array<Element>];

            // prevent mutation from firing re-flows by self-change
            initialChildren = initialChildren.filter((child) =>
                !FlowIdReflector.has(child) && !isWebComponent(child.tagName)
            );
        });

        // ECMAScript spec. whitespace-only check
        // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM
        initialChildren = initialChildren.filter(node => (/[^\t\n\r ]/.test(node.textContent || '')));

        // must be a direct child of this component
        initialChildren = initialChildren.filter(node => node.parentNode === webComponentNode);

        if (initialChildren && initialChildren.length > 0) {

            instance.cacheSlotChildren({
                name: tagName,
                children: initialChildren.map(element => transformElementToVirtualElement(element))
            }, instance);

            // evict all children
            instance.innerHTML = '';

            // queue re-flows
            instance.flow(!instance.isConnected);
        }
        observer.disconnect();
    });

    observer.observe(instance, { childList: true });
};