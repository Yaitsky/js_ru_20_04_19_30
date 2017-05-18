import { DATA_SELECTION } from '../constants'

const defaultData = {
    from: null,
    to: null
}

//не дроби редюсеры слишком сильно: объедини селект и календарь в один
export default (selection = defaultData, action) => {
    const {type, payload} = action;
    switch (type) {
        case DATA_SELECTION:
            return payload.selection
    }
    return selection
}
