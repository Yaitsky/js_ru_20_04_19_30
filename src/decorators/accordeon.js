import React, {Component} from 'react';

export default (OriginalComponent) => class DecoratedComponent extends Component {
    state = {
        openArticleId: null,
        isCurrent: true
    }

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleArticle={this.toggleArticle}/>
    }

    toggleArticle = id => ev => {
        if (id != this.state.openArticleId) {
            this.setState({
                openArticleId: id,
                isCurrent: true
            })
        } else {
            this.setState({
                isCurrent: !this.state.isCurrent
            })
        }
       
    }
}