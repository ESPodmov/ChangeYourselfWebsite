import React from "react";
import StyleButton from "./styleButton";

const INLINE_STYLES = [
    { name: 'Bold', className: 'editor-toolbar-button_type_bold', style: 'BOLD' },
    { name: 'Italic', className: 'editor-toolbar-button_type_italic', style: 'ITALIC' },
    { name: 'Underline', className: 'editor-toolbar-button_type_underline', style: 'UNDERLINE' },
    { name: 'Strikethrough', className: 'editor-toolbar-button_type_strikethrough', style: 'STRIKETHROUGH' },
];

export default function InlineStyleControls(props) {

    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="editor-toolbar__inline-tools">
            {INLINE_STYLES.map(type => {
                return <StyleButton
                    key={type.name}
                    active={currentStyle.has(type.style)}
                    onToggle={props.onToggle}
                    style={type.style}
                    class={type.className}
                    mobile={false}
                />
            }
            )}
        </div>
    );
};
