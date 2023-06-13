import React from "react";

export const HeaderThreeComponent = (props) => {
    return (
        <h3 className="article-reader-block">
            <span>
                {props.text}
            </span>
        </h3>
    )
}