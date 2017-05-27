import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import CommentList from '../components/CommentList';

class CommentsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>All Comments</h1>
                <CommentList flag={true} />
            </div>
        );
    }
}

export default CommentsPage;