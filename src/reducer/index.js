import {combineReducers} from 'redux'
import counterReducer from './counter'
import articles from './articles'
import articleSelection from './articleSelection'
import dataSelection from './dataSelection'

export default combineReducers({
    counter: counterReducer,
    articles,
    articleSelection,
    dataSelection
})