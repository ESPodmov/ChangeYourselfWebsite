import React from "react";


export const CustomUnstyled = (props) => {
    const { children } = props;

    return (
        <div className="main-editor-block">
            {children}
        </div>
    )
}