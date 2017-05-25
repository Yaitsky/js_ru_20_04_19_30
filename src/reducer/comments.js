import {ADD_COMMENT, LOAD_COMMENTS, SUCCESS, FAIL, START} from '../constants'
import {arrayToMap} from '../utils'
import {Map, OrderedMap, Record} from 'immutable'

const CommentModel = Record({
    id: null,
    user: null,
    text: null
})

const DefaultReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})

export default (comments = new DefaultReducerState(), action) => {
    const {type, payload, response, randomId} = action
    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', randomId], {
                ...payload.comment,
                id: randomId
            })
        
        case LOAD_COMMENTS + START:
            return comments.set('loading', true)

        case LOAD_COMMENTS + SUCCESS:
            //каждый раз перезатираешь комменты, используй merge
            return comments.set('entities', arrayToMap(payload.response, CommentModel))
                //здесь так просто уже не выйдет, ведь ты загружаешь не все комменты сразу, а отдельно для каждой статьи
                .set('loading', false)
                .set('loaded', true)
    }

    return comments
}
