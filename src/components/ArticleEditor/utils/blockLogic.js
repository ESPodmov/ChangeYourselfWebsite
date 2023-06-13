import CustomImage from "../components/customImage";
import { AtomicBlockUtils, RichUtils, SelectionState } from "draft-js";
import { EditorState, genKey, ContentBlock, ContentState, Modifier, BlockMapBuilder } from "draft-js";
import { List, Map } from "immutable";


export const customBlockRenderer = (setEditorState, getEditorState, editorState) => (contentBlock) => {
    const content = getEditorState().getCurrentContent();
    const type = contentBlock.getType();

    switch (type) {
        case "custom": {
            const entityKey = contentBlock.getData().get('entity')
            const entityType = content.getEntity(entityKey).getType()
            if (entityType === "IMAGE") {
                return {
                    component: CustomImage,
                    editable: true,
                    props: {
                        getEditorState: getEditorState,
                        editorState: editorState
                    }
                }
            }
        }
    }
    return null;

};


export const addImage = (editorState, urls) => {
    let newSel
    let newEditorState = editorState
    urls.forEach((url) => {
        const contentState = newEditorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            { src: url }
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const selectionState = newEditorState.getSelection()

        const content = newEditorState.getCurrentContent();
        const blockMap = content.getBlockMap();
        const block = blockMap.get(selectionState.getAnchorKey());
        const blockIndex = blockMap.keySeq().indexOf(block.getKey())

        const newBlockKey = genKey();

        const newBlock = new ContentBlock({
            key: newBlockKey,
            type: "custom",
            text: '',
            characterList: new List(),
            depth: 0,
            data: new Map({ entity: entityKey }),
            editable: true,
        });

        const emptyBlockKey = genKey();
        const emptyBlock = new ContentBlock({
            key: emptyBlockKey,
            type: 'unstyled',
            text: '',
            characterList: new List(),
            depth: 0,
            editable: true
        })

        let fullBlock = blockMap.toArray()
        fullBlock.splice(blockIndex, 1, newBlock)
        fullBlock.splice(blockIndex + 1, 0, emptyBlock)

        const fragment = ContentState.createFromBlockArray(fullBlock)

        newEditorState = EditorState.push(
            newEditorState,
            fragment,
            'insert-fragment'
        );

        newSel = new SelectionState({
            anchorKey: emptyBlockKey,
            anchorOffset: 0,
            focusKey: emptyBlockKey,
            focusOffset: 0
        })

        newEditorState = EditorState.forceSelection(newEditorState, newSel)
    })

    
    return newEditorState;
}
