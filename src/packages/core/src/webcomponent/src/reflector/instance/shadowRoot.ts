export const SHADOW_ROOT = 'SHADOW_ROOT';

export const getShadowRootForComponent = (webComponent: any): ShadowRoot => {
    return Reflect.get(webComponent, SHADOW_ROOT);
};

export const setShadowRootForComponent = (webComponent: any, shadowRoot: ShadowRoot) => {
    return Reflect.set(webComponent, SHADOW_ROOT, shadowRoot);
};