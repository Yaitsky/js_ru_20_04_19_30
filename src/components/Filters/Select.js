import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {connect} from 'react-redux'
import {articleSelection} from '../../AC/index'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array
    };

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <Select options = {options} value = {this.props.selection}
                    onChange = {this.handleSelectionChange}
                    multi = {true}
            />
        )
    }

    handleSelectionChange = selection => {
        const {articleSelection} = this.props
        articleSelection(selection)
    }
}

function mapStateToProps(storeState) {
    return {
        selection: storeState.articleSelection,
        articles: storeState.articles
    }
}

export default connect(mapStateToProps, {articleSelection})(SelectFilter)