
export const getSelectionRange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
};


export const getSelectionCoords = (selectionRange, width, height) => {
    const editorBounds = document.getElementsByClassName("editor__main-editor")[0].getBoundingClientRect();
    if (selectionRange !== null) {
        const rangeBounds = selectionRange.getBoundingClientRect();
        const rangeWidth = rangeBounds.right - rangeBounds.left;

        let offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - (width / 2)
        let offsetTop = (rangeBounds.top - editorBounds.top) - height

        if (offsetLeft < 0) {
            offsetLeft = 0
        }
        if (offsetTop < 0) {
            offsetTop = (rangeBounds.top - editorBounds.top) + height
        }
        return { offsetLeft, offsetTop };
    } else {
        return null
    }
};

export const selectionIsLink = (editorState) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.getHasFocus()) {
        return false;
    }
    const contentState = editorState.getCurrentContent();
    const startKey = selectionState.getStartKey();
    const startOffset = selectionState.getStartOffset();
    const endOffset = selectionState.getEndOffset();
    const block = contentState.getBlockForKey(startKey)
    const entityKey = block.getEntityAt(startOffset)
    if (entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK") {
        const entityRange = getEntityRange(block, entityKey)
        if (entityRange.start === startOffset && entityRange.end === endOffset) {
            return true
        }
    }
    return false
};

export const getEntityRange = (block, entityKey) => {
    const ranges = [];
    block.findEntityRanges(
        (character) => character.getEntity() === entityKey,
        (start, end) => ranges.push({ start, end })
    );
    return ranges[0];
}

export const isCursorInLink = (editorState) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.getHasFocus()) {
        return false;
    }
    const contentState = editorState.getCurrentContent();
    const startKey = selectionState.getStartKey();
    const startOffset = selectionState.getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    return (
        linkKey !== null &&
        contentState.getEntity(linkKey).getType() === 'LINK'
    );
};