import React, {Component} from 'react';

//DecoratedComponent я называл чтоб легче понять было. Лучше выбирай более значущее название
export default (OriginalComponent) => class DecoratedComponent extends Component {
    state = {
        //Не привязывайся к названиям сущностей, вся суть декораторов в универсальности. Сделай openItemId
        openArticleId: null,
        //это лишнее, держи минимальный стейт
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
