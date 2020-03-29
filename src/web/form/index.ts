import {st} from "../../core/st";

export * from './component/form-component'
export * from './component/input-component'

export * from './function/get-unique-html-id'

if (!st.form) {
    st.form = {
        debounceTimeInMs: 250,
        validationStrategies: ['keyup', 'change'],
        labelActiveClasses: [],
        invalidClasses: [],
        validClasses: []
    }
}
