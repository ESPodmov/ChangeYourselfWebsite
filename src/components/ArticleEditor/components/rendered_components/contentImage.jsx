import React from "react";

export const ContentImage = (props) => {
    const url = props.url
    const caption = props.caption
    return (
        <figure className="article-reader__image-block">
            <div className="image-block_container" aria-readonly={true}>
                <img className="article-image" src={url} alt={url} itemProp="image" draggable={false}/>
            </div>
            <div className="article-reader__image-caption-block">
                <p>{caption}</p>
            </div>
        </figure>
    );
}