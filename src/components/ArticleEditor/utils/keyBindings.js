import { EditorState, getDefaultKeyBinding, ContentState, Modifier, genKey, ContentBlock, SelectionState } from "draft-js";
import { List, Map } from "immutable";

export const _handleTab = (e, editorState) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);

    if (block.getType() === 'unordered-list-item') {
        const depth = block.getDepth() + 1;
        const newContentState = Modifier.setBlockData(
            contentState,
            selection,
            block.getData().merge({ depth })
        );
        return EditorState.push(editorState, newContentState, 'change-block-data')
    } else {
        const newContentState = Modifier.insertText(contentState, selection, '\t');
        return EditorState.push(editorState, newContentState, 'insert-characters')
    }
};


export const _handleBackspace = (e, editorState, setNewState) => {
    e.preventDefault()

    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const currentBlock = content.getBlockForKey(startKey);

    const blockType = currentBlock.getType();

    switch (blockType) {
        case "custom": {
            if (selection.isCollapsed() && selection.getFocusOffset() === 0) {
                return 'handled'
            }
        }
        case "unstyled": {
            if (currentBlock.getKey() !== content.getFirstBlock().getKey()) {
                const blockBefore = content.getBlockBefore(currentBlock.getKey())
                if (selection.isCollapsed() && selection.getFocusOffset() === 0 && blockBefore.getType() === "custom") {
                    const blockMap = content.getBlockMap()
                    const blockBeforeIndex = blockMap.keySeq().indexOf(blockBefore.getKey())
                    let blockArray
                    blockArray = blockMap.toArray()
                    blockArray.splice(blockBeforeIndex, 1);
                    const newContentState = ContentState.createFromBlockArray(blockArray)
                    const newEditorState = EditorState.push(editorState, newContentState)
                    setNewState(newEditorState)
                    return 'handled'
                }
            }
        }
    }

    return 'backspace';
}

export const _handleDelete = (e, editorState, setNewState) => {
    e.preventDefault()

    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const currentBlock = content.getBlockForKey(startKey);

    const blockType = currentBlock.getType();

    switch (blockType) {
        case "custom": {
            if (selection.isCollapsed() && selection.getFocusOffset() === currentBlock.getText().length) {
                return 'handled'
            }
        }
        case "unstyled": {
            if (currentBlock.getKey() !== content.getLastBlock().getKey()) {
                const blockAfter = content.getBlockAfter(currentBlock.getKey())
                if (selection.isCollapsed() && selection.getFocusOffset() === currentBlock.getText().length && blockAfter.getType() === "custom") {
                    const blockMap = content.getBlockMap()
                    const blockAfterIndex = blockMap.keySeq().indexOf(blockAfter.getKey())
                    let blockArray
                    blockArray = blockMap.toArray()
                    blockArray.splice(blockAfterIndex, 1);
                    const newContentState = ContentState.createFromBlockArray(blockArray)
                    const newEditorState = EditorState.push(editorState, newContentState)
                    setNewState(newEditorState)
                    return 'handled'
                }
            }
        }
    }

    return 'delete'
}

export const _handleEnter = (e, editorState, setNewState) => {
    e.preventDefault()

    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const currentBlock = content.getBlockForKey(startKey);

    const blockType = currentBlock.getType();

    if (blockType === "custom" || blockType === "unstyled" && currentBlock.getText().length === 0) {
        const blockMap = content.getBlockMap();
        const blockKey = currentBlock.getKey()
        const currentBlockIndex = blockMap.keySeq().indexOf(blockKey);
        let blockArray = blockMap.toArray();
        const newBlockKey = genKey()
        blockArray.splice(currentBlockIndex + 1, 0, new ContentBlock({
            key: newBlockKey,
            type: "unstyled",
            data: Map({}),
            text: '',
            characterList: List(),
        }))
        const newSelection = new SelectionState({
            anchorKey: newBlockKey,
            anchorOffset: 0,
            focusKey: newBlockKey,
            focusOffset: 0
        })
        const newContentState = ContentState.createFromBlockArray(blockArray)
        let newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment')
        newEditorState = EditorState.forceSelection(newEditorState, newSelection)
        setNewState(newEditorState)
        return 'handled'
    }

    return "split-block"
}