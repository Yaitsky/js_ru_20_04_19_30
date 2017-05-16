import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import Article from './Article/index'
import PropTypes from 'prop-types'
import accordion from '../decorators/accordion'
import {connect} from 'react-redux'

class ArticleList extends Component {
    componentDidMount() {
        const ref = this.refs[this.props.articles[0].id]
        console.log('---', ref, findDOMNode(ref))
    }

    render() {
        const {toggleOpenItem, isItemOpened} = this.props
        const elements = this.getFilteredArticles().map(article => <li key={article.id}>
            <Article article = {article}
                     isOpen = {isItemOpened(article.id)}
                     toggleOpen = {toggleOpenItem(article.id)}
                     ref = {article.id}
            />
        </li>)
        return (
            <ul ref={this.getContainerRef}>
                {elements}
            </ul>
        )
    }

    getContainerRef = ref => {
        this.list = ref
    }

    getFilteredArticles() {
        const {articles, articleSelection, dataSelection} = this.props
        const {from, to} = dataSelection

        if ((articleSelection.length == 0) && (from == null && to == null)) {
            return articles;
        } else if ((articleSelection.length != 0) && (from == null && to == null)) {
            return articles.filter(article => {
                for (let i = 0; i < articleSelection.length; i++) {
                    if (article.id === articleSelection[i].value) {
                        return true;
                    }
                }
            });
        } else if ((articleSelection.length == 0) && (from != null || to != null)) {
            return articles.filter(article => {
                const fromDate = new Date(from).getTime();
                const articleDate = new Date(article.date).getTime();
                const toDate = new Date(to).getTime();

                if (articleDate >= fromDate && articleDate <= toDate) {
                    return true;
                }
            });
        } else {
           return articles.filter(article => {
                const fromDate = new Date(from).getTime();
                const articleDate = new Date(article.date).getTime();
                const toDate = new Date(to).getTime();

                for (let i = 0; i < articleSelection.length; i++) {
                    if ((article.id === articleSelection[i].value) && 
                    (articleDate >= fromDate && articleDate <= toDate)) {
                        return true;
                    }
                }
            }); 
        }
    }
}

ArticleList.propTypes = {
    articles: PropTypes.array,
    //from accordion decorator
    toggleOpenItem: PropTypes.func.isRequired,
    isItemOpened: PropTypes.func.isRequired
}

export default connect((state) => ({
   articles: state.articles,
   dataSelection: state.dataSelection,
   articleSelection: state.articleSelection
}))(accordion(ArticleList))