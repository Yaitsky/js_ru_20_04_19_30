import { INCREMENT, DELETE_ARTICLE, ARTICLE_SELECTION, DATA_SELECTION} from '../constants'

export function increment() {
    const action = {
        type: INCREMENT
    }
    return action
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload : { id }
    }
}

export function articleSelection(selection) {
    return {
        type: ARTICLE_SELECTION,
        payload: { selection }
    }
}

export function dataSelection(selection) {
    return {
        type: DATA_SELECTION,
        payload: { selection }
    }
}