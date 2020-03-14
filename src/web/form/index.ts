import {st} from "../../core/st";

export {Form} from './component/form-component'
export {Input} from './component/input-component'
export {Select} from './component/select-component'

export {getUniqueId} from './function/get-unique-id'

if (!st.form) {
    st.form = {
        debounceTimeInMs: 250,
        validationStrategies: ['keyup', 'change'],
        labelActiveClasses: [],
        invalidClasses: [],
        validClasses: []
    }
}
