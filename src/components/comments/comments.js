import React, { Component } from 'react';
import PropTypes from 'proptypes';
import './comments.css';

class Comments extends Component {
    state = { comments: [] };

    async componentDidMount() {
        // Load database
        const firebase = await import('../../firebase');
        const db = firebase.app.firestore();
        db.settings({ timestampsInSnapshots: true });
        
        db.collection("comments")
            .where("productId", "==", this.props.productId)
            .onSnapshot(querySnapshot => {
                const comments = [];
                querySnapshot.forEach(doc => comments.push(doc.data()));
                this.setState({ comments });
            });
    }

    render() {
        if (this.state.comments.length === 0) return null;

        return (
            <div className="comments">
                <h2 className="comments__title">Comentários</h2>
                {this.state.comments.map((comment, index) => {
                    return (
                        <div key={index} className="comment">
                            <div>
                                <img src={comment.user.photoURL}
                                    alt={`Foto de ${comment.user.displayName}`}
                                    className="comment__pic" />
                                <div className="comment__name">
                                    {comment.user.displayName}
                                </div>
                            </div>
                            <div className="comment__message">
                                {comment.message}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

Comments.propTypes = {
    productId: PropTypes.string.isRequired
}

export default Comments;