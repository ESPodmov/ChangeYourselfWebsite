import React from "react";
import StyleButton from "../styleButton";
import HeadersButton from "./HeadersButton";
import ListsButton from "./ListsButton";
import LinkEntity from "../linkEntityControls";
import { EditorState } from "draft-js";

const BLOCK_MAP = [
    { name: 'Unstyled', className: 'editor-toolbar-button_type_unstyled mobile', style: 'unstyled' },
    { name: 'Blockquote', className: 'editor-toolbar-button_type_blockquote mobile', style: 'blockquote' },
]

const IMAGE_ITEM = { className: 'editor-toolbar-button_type_image mobile', style: 'image' }
const CONTROL_ITEMS = [
    { className: 'editor-toolbar-button_type_undo mobile' },
    { className: 'editor-toolbar-button_type_redo mobile' },
]

const INLINE_STYLES = [
    { name: 'Bold', className: 'editor-toolbar-button_type_bold', style: 'BOLD' },
    { name: 'Italic', className: 'editor-toolbar-button_type_italic', style: 'ITALIC' },
    { name: 'Underline', className: 'editor-toolbar-button_type_underline', style: 'UNDERLINE' },
    { name: 'Strikethrough', className: 'editor-toolbar-button_type_strikethrough', style: 'STRIKETHROUGH' },
];

export const MobileControls = (props) => {

    const handleUploadButton = () => {
        document.getElementsByName("image-popup__file")[0].click()
    }

    const handleImageUpload = (e) => {
        e.preventDefault()

        props.handleDrop(Array.from(e.target.files));
    }

    if (props.className.includes('block')) {
        const { editorState } = props;

        const selection = editorState.getSelection();
        const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return (
            <div
                className="styles-container styles-container-active"
            >
                <div className="styles-container_section delimeter">

                    <StyleButton
                        active={false}
                        onToggle={handleUploadButton}
                        class={IMAGE_ITEM.className}
                        mobile={true}
                    />

                </div>
                <div className="styles-container_section delimeter">
                    {BLOCK_MAP.map((type) => {

                        return (
                            <StyleButton
                                key={type.name}
                                active={type.style === blockType}
                                onToggle={props.onToggleBlock}
                                style={type.style}
                                class={type.className}
                                mobile={true}
                            />
                        )
                    })}

                    <HeadersButton
                        active={blockType}
                        onToggle={props.onToggleBlock}
                    />
                    <ListsButton
                        active={blockType}
                        onToggle={props.onToggleBlock}
                    />
                </div>
                <input
                    className="image-popup__file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/bmp,image/x-ms-bmp,image/webp,image/gif"
                    name="image-popup__file"
                    multiple={true}
                    onChange={handleImageUpload}
                />
                <div className="styles-container_section">
                    <StyleButton
                        active={false}
                        onToggle={props.onUndo}
                        class={CONTROL_ITEMS[0].className}
                        mobile={true}
                        disabled={editorState.getUndoStack().size === 0}
                    />
                    <StyleButton
                        active={false}
                        onToggle={props.onRedo}
                        class={CONTROL_ITEMS[1].className}
                        mobile={true}
                        disabled={editorState.getRedoStack().size === 0}
                    />
                </div>
            </div>
        )
    } else {
        const currentStyle = props.editorState.getCurrentInlineStyle();
        return (
            <div
                className="styles-container styles-container-active inline-style"
            >

                {INLINE_STYLES.map(type => {
                    return <StyleButton
                        key={type.name}
                        active={currentStyle.has(type.style)}
                        onToggle={props.onToggleInlineStyle}
                        style={type.style}
                        class={type.className}
                        mobile={true}
                    />
                }
                )}

                <LinkEntity
                    editorState={props.editorState}
                    onToggle={props.openLinkInput}
                    linkIsActive={props.linkIsActive}
                    mobile={true}
                />
            </div>
        )
    }
}