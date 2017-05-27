import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, START, SUCCESS, LOAD_ALL_COMMENTS} from '../constants'
import {arrayToMap} from '../utils'
import {OrderedMap, Record} from 'immutable'

const CommentModel = Record({
    id: null,
    text: '',
    user: ''
})

const DefaultReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false,
    allCommentsId: []
})

export default (comments = new DefaultReducerState(), action) => {
    const {type, payload, randomId, response} = action
    switch (type) {
        case LOAD_ALL_COMMENTS + START:
            return comments.set('loading', true)

        case LOAD_ALL_COMMENTS + SUCCESS:
            const commentsIdArray = []
            for (let i = 0; i < response.records.length; i++) {
                commentsIdArray.push(response.records[i].id);
            }

            return comments
                .set('entities', arrayToMap(response.records, CommentModel))
                .set('allCommentsId', commentsIdArray)
                .set('loading', false)
                .set('loaded', true)

        case ADD_COMMENT:
            return comments.setIn(['entities', randomId], new CommentModel({
                ...payload.comment,
                id: randomId
            }))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments.mergeIn(['entities'], arrayToMap(response, CommentModel))
    }

    return comments
}
