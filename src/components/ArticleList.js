import React, {Component} from 'react'
import Article from './Article'
import PropTypes from 'prop-types'
import accordeon from '../decorators/accordeon'

function ArticleList(props) {
    const {articles, openArticleId, isCurrent, toggleArticle} = props;
    const elements = articles.map(article => <li key={article.id}>
            <Article article={article}
                     isOpen={isCurrent && (article.id == openArticleId)}
                     toggleOpen={toggleArticle(article.id)}/>
        </li>)

    return (
            <ul>
                {elements}
            </ul>
        )
}

ArticleList.propTypes = {
    articles: PropTypes.array
}

export default accordeon(ArticleList)