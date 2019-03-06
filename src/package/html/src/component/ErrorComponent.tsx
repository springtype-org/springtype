import {WebComponent, WebComponentLifecycle} from "../..";

export interface ErrorComponentProps {
    errorMessage: string;
}

@WebComponent({
    tag: 'springtype-error',
    style: view => ({
        'p': {
            color: '#ff0000'
        }
    })
})
export class ErrorComponent extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: ErrorComponentProps
    ) {
       super();
    }

    render() {
        return <p>{ this.props.errorMessage }</p>
    }
}