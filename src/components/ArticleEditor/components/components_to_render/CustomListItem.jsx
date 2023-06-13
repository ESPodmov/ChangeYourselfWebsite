import React from "react";

export const CustomListItem = (props) => {
    const { children } = props;
    return (
        <li className='main-editor-block main-editor-block-ul'>
            {children}
        </li>
    );
};