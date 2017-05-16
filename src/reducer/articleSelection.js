import {ARTICLE_SELECTION} from '../constants'

export default (selection = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case ARTICLE_SELECTION:
            return payload.selection
    }
    return selection
}