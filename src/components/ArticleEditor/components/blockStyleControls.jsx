import React from "react";
import StyleButton from "./styleButton";

const BLOCK_TYPES = [
    { name: 'H2', className: 'editor-toolbar-button_type_header-two', style: 'header-two' },
    { name: 'H3', className: 'editor-toolbar-button_type_header-three', style: 'header-three' },
    { name: 'Blockquote', className: 'editor-toolbar-button_type_blockquote', style: 'blockquote' },
    { name: 'UL', className: 'editor-toolbar-button_type_unordered-list-item', style: 'unordered-list-item' },
    { name: 'OL', className: 'editor-toolbar-button_type_ordered-list-item', style: 'ordered-list-item' },
    // { name: 'Image', className: 'editor-toolbar-button_type_image', style: 'IMAGE' },
]

export default function BlockStyleControls(props) {

    const { editorState } = props;

    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
        <div className="editor-toolbar__block-tools">
            {BLOCK_TYPES.map((type) => {
                return (
                    <StyleButton
                        key={type.name}
                        active={type.style === blockType}
                        onToggle={props.onToggle}
                        style={type.style}
                        class={type.className}
                        mobile={false}
                    />
                )
            }
            )}
        </div>
    )

}