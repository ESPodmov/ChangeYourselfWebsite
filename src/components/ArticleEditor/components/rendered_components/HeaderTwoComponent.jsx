import React from "react";

export const HeaderTwoComponent = (props) => {
    return (
        <h2 className="article-reader-block">
            <span>
                {props.text}
            </span>
        </h2>
    )
}