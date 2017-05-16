import { DATA_SELECTION } from '../constants'

const defaultData = {
    from: null,
    to: null
}

export default (selection = defaultData, action) => {
    const {type, payload} = action;
    switch (type) {
        case DATA_SELECTION:
            return payload.selection
    }
    return selection
}