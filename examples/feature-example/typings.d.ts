// allow for all custom elements
declare namespace JSX {
    interface IntrinsicElements {
        [tagName: string]: any
    }
}