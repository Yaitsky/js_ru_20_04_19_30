import React, {Component} from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm/index'
import toggleOpen from '../decorators/toggleOpen'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { loadComments } from '../AC'
import Loader from './Loader'

class CommentList extends Component {
    state = {
        isOpen: false
    }

    toggleOpen = ev => {
        ev && ev.preventDefault && ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
        const {isLoaded, isLoading, loadComments} = this.props
        //можно просто article.id
        if (!isLoading && !isLoaded) loadComments(this.props.article.get('id'))
    }
    
    render() {
        const isOpen = this.state.isOpen
        const linkText = isOpen ? 'hide comments' : 'show comments'
        const {isLoading} = this.props
        return (
            <div>
                <a href="#" onClick={this.toggleOpen}>{linkText}</a>
                {isLoading ? <Loader /> : this.getBody()}
            </div>
        )
    }

    getBody() {
        const {article: { id, comments = [] }} = this.props
        const isOpen = this.state.isOpen
        if (!isOpen) return null
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

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    article: PropTypes.object
}

export default connect((state) => ({
    isLoaded: state.comments.loaded,
    isLoading: state.comments.loading
}), {loadComments})(CommentList)
