import React, {Component} from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm/index'
import toggleOpen from '../decorators/toggleOpen'
import PropTypes from 'prop-types'
import Loader from './Loader'
import {loadArticlesComments, loadAllComments} from '../AC'
import {connect} from 'react-redux'

class CommentList extends Component {
    componentWillReceiveProps({ article, isOpen, loadArticlesComments, loadAllComments, flag, isLoaded, isLoading}) {
        if (article) {
            if (isOpen && !article.loadedComments && !article.loadingComments) loadArticlesComments(article.id)
        }
    }

    componentDidMount() {
        const {flag, isLoaded, isLoading, loadAllComments} = this.props
        if (flag) {
           if (!isLoading && !isLoaded) loadAllComments()
        }
    }    

    render() {
        const {isOpen, toggleOpen, flag} = this.props
        const linkText = isOpen ? 'hide comments' : 'show comments'

        if (flag) {
            return (
                <div>
                    {this.getBody()}
                </div>
            )
        } else {
            return (
                <div>
                    <a href="#" onClick={toggleOpen}>{linkText}</a>
                    {this.getBody()}
                </div>
            )
        }
    }

    getBody() {
        const {flag} = this.props
        if (flag) {
            const {isLoaded, isLoading, allCommentsId} = this.props
            if (isLoading) return <Loader />
            if (!isLoaded) return null

            return (
                <div>
                    <ul>
                        {allCommentsId.map(id => <li key={id}><Comment id={id}/></li>)}
                    </ul>
                </div>
            )
        } else {
            const {article: { loadedComments, loadingComments, id, comments = [] }, isOpen} = this.props
            if (!isOpen) return null
            if (loadingComments) return <Loader/>
            if (!loadedComments) return null

            if (!comments.length) return <div><p>No comments yet</p><CommentForm articleId = {id}/></div>
            return (
                <div>
                    <ul>
                        {comments.map(id => <li key={id}><Comment id={id}/></li>)}
                    </ul>
                    <CommentForm articleId = {id} />
                </div>
            )
        }       
    }
}

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.object
}

export default connect((state) => ({
    allCommentsId: state.comments.allCommentsId,
    isLoaded: state.comments.loaded,
    isLoading: state.comments.loading
}), { loadArticlesComments, loadAllComments })(toggleOpen(CommentList))