export interface SpringTypeFragmentElementAttributes {}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-fragment': SpringTypeFragmentElementAttributes;
        }
    }
}