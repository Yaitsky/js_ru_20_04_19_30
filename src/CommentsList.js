import React from 'react'

export default function CommentsList({ comments }) {
    var elements;
    if (comments) {
        elements = comments.map((comment) => {
        //в идеале Comment тоже в отдельный компонент вынести
        return (
            <li key={comment.id}>
                <h3>{comment.user}</h3>
                <p>{comment.text}</p>
            </li>
        )
    })
    } else {
        elements = <div>Комментарии отсутвуют</div>
    }

    return (
        <ul>
            {elements}
        </ul>
    )
}
