import React, {Component} from 'react'
import CommentsList from './CommentsList'

export default class Article extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
            //лучше внести этот стейт в CommentList, иначе компонент выходит очень прегруженным
            isCommentsOpen: false
        }
    }

    render() {
        const {article} = this.props
        return (
            <section>
                <h2 onClick={this.toggleOpen}>
                    {article.title}
                </h2>
                {this.getBody()}
            </section>
        )
    }

    getBody() {
        const commentsItem = this.state.isCommentsOpen && <CommentsList comments={this.props.article.comments} />
        const articleItem = this.state.isOpen && 
            <div>
                {this.props.article.text}
                <h3 onClick={this.toggleOpenComments}>{this.state.isCommentsOpen ? 'Закрыть комментарии' : 'Открыть комментарии'}</h3>
                {commentsItem}
            </div>

        return articleItem;
    }

    toggleOpen = ev => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleOpenComments = () => {
        this.setState({
            isCommentsOpen: !this.state.isCommentsOpen
        })
    }
}
