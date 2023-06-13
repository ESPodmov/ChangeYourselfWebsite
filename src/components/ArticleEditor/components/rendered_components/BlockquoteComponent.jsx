import React from "react";

export const BlockquoteComponent = (props) => {
    return (
        <blockquote className="article-reader-block article-reader-block-blockquote">
            <span>
                {props.text}
            </span>
        </blockquote>
    )
}
