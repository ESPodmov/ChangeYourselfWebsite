import { EditorBlock } from "draft-js";
import { List } from "immutable";
import React from "react";

export default class CustomImage extends React.Component {
    constructor(props) {
        super(props)

        const entityKey = this.props.block.getData().get('entity')
        const url = this.props.contentState.getEntity(entityKey).getData().src;
        
        this.getEditorState = () => this.props.blockProps.getEditorState()

        this.state = {
            blockKey: this.props.block.getKey(),
            url: url,
        }

        // гдн-то здесь нужно реализовать логику загрузки на сервер
    }

    handleKeyDown = (e) => {
        e.preventDefault()
        console.log("Key")
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            this.props.onReturn(false);
        }
    }

    render() {
        const text = this.getEditorState().getCurrentContent().getBlockForKey(this.state.blockKey).getText().length
        const blockClassname = text > 0 ? "editor-image-block" :"editor-image-block editor-image-block_with-placeholder"
        return (
            <figure className={blockClassname}>
                <div className="editor-image-container" contentEditable={false} aria-readonly={true}>
                    <img className="editor-image" src={this.state.url} alt={this.state.url} itemProp="image" draggable={false}/>
                </div>
                <div className="editor-desktop-image-caption-block">
                    <span className="editor-desktop-image-caption-block__placeholder">Добавьте описание</span>
                    <EditorBlock {...this.props}/>
                </div>
            </figure>
        );
    }
}