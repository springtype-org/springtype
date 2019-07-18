export interface VirtualElementAttributes {

    // tells the renderer and virtual DOM algorithm about the uniqueness of an element in a list
    // otherwise the algorithm cannot see the difference of whether elements changed or just the sorting
    key: string|number|boolean;

    'st-inject': {

        // tells the renderer: inject this element (state: rendered and attached to DOM)
        // with name $injectionArgumentName in constructor of the assigned class instance referenced (typed as any)
        //
        // somewhere in the elements TSX (template):

        // (view: MyElementClass) => {
        //    return <...>...<button st-inject={{ myButton: view }} ... />...</...>
        // }
        //
        // ...or in a render method:
        // render() {
        //     return <...>...<button st-inject={{ myButton: this }} ... />...</...>
        // }
        //
        // ---
        //
        // constructor(protected myButton: HTMLButtonElement) {
        //     super();
        // }
        //
        // onFlow() {
        //     log(this.myButton);
        // }
        [injectionArgumentName: string]: any;
    }
}