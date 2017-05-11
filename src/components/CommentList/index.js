import React, {Component} from 'react'
import Comment from '../Comment'
import toggleOpen from '../../decorators/toggleOpen'
import PropTypes from 'prop-types'
import './style.css';

class CommentList extends Component {
    state = {
        userName: '',
        comment: ''
    }

    getBody(props) {
        const {comments = [], isOpen} = props
        if (!isOpen) return null
        if (!comments.length) return <p>No comments yet</p>
        return (
            <div>
                <ul>
                    {comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>)}
                </ul>
                <div>
                    User:
                    <input type="text" value={this.state.userName} onChange={this.handleChangeUser} ref = {this.setRefUser}/>
                    Comment: 
                    <input type="text" value={this.state.comment} onChange={this.handleChangeComment} ref = {this.setRefComment}/>
                    <button>Add comment!</button>
                </div>
            </div>
        )
    }

    setRefUser = ref => {
        this.userInput = ref;
    }

    setRefComment = ref => {
        this.commentInput = ref;
    }

    handleChangeUser = ev => {
        const valueLength = ev.target.value.length;

        if (valueLength > 10) return;

        if (valueLength <= 3 && valueLength > 0) {
            this.userInput.classList.add('valid-error');
        } else {
            this.userInput.classList.remove('valid-error');
        }

        this.setState({
            userName: ev.target.value
        })
    }

    handleChangeComment = ev => {
        const valueLength = ev.target.value.length;

        if (valueLength > 20) return;

        if (valueLength <= 5 && valueLength > 0) {
            this.commentInput.classList.add('valid-error');
        } else {
            this.commentInput.classList.remove('valid-error');
        }

        this.setState({
            comment: ev.target.value
        })
    }

    render() {
        const {isOpen, toggleOpen} = this.props;
        const linkText = isOpen ? 'hide comments' : 'show comments'

        return (
            <div>
                <a href="#" onClick={toggleOpen}>{linkText}</a>
                {this.getBody(this.props)}
            </div>
    )
    }
}

CommentList.propTypes = {
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    comments: PropTypes.array
}

export default toggleOpen(CommentList)