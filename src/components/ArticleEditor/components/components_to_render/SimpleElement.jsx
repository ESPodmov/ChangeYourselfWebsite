import React from "react";

export const SimpleElement = (props) => {
    const { children } = props;
    const blockType = children.props.block.type
    switch (blockType) {
        case "header-three": {
            return (
                <>
                    <h3 className='main-editor-block'>
                        {children}
                    </h3>
                </>
            )
        }
        case "header-two": {
            return (
                <>
                    <h2 className='main-editor-block'>
                        {children}
                    </h2>
                </>
            )
        }
        case "header-one": {
            return (
                <>
                    <h1 className='main-editor-block'>
                        {children}
                    </h1>
                </>
            )
        }
        case "blockquote": {
            return (
                <>
                <blockquote className="main-editor-block main-editor-block-blockquote">
                    {children}
                </blockquote>
                </>
            )
        }
    }
}