import React from "react";

export const CustomOrderedListItem = (props) => {
    const { children } = props;
    return (
        <li className='main-editor-block main-editor-block-ol'>
            {children}
        </li>
    );
};
