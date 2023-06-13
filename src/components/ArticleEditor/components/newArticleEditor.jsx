import React from 'react';
import {
    Editor,
    EditorState,
    RichUtils,
    CompositeDecorator,
    KeyBindingUtil,
    getDefaultKeyBinding,
    DefaultDraftBlockRenderMap,
    SelectionState,
    Entity,
    Modifier,
    ContentState,
    genKey,
    convertToRaw,
} from 'draft-js';
import "../style.css";
import { selectionIsLink, getSelectionRange, getSelectionCoords, isCursorInLink } from '../utils/index';
import { customBlockRenderer, addNewBlockAt, addImage } from '../utils/blockLogic';
import { _handleTab, _handleBackspace, _handleEnter, _handleDelete } from '../utils/keyBindings';
import { Link, findLinkEntities } from '../utils/linkLogic';
import converter from '../utils/converter'
import _map from 'lodash/map';
import { Map } from 'immutable';
import { render } from 'react-dom';
import InlineToolbar from './inlineToolbar';
import { ContentBlock } from 'draft-js';
import InlineStyleControls from './inlineStyleControls';
import BlockStyleControls from './blockStyleControls';
import SideToolbar from './sideToolbar';
import ImageModal from './imageModal';
import { convertToHTML } from 'draft-convert'
import { ContentImage } from './rendered_components/contentImage';
import { CustomListItem } from "./components_to_render/CustomListItem"
import { SimpleElement } from './components_to_render/SimpleElement'
import { CustomOrderedListItem } from './components_to_render/CustomOrderedListItem'
import { CustomUnstyled } from './components_to_render/CustomUnstyled'
import { List } from "immutable"
import ArticleEditorHeader from './ArticleEditorHeader';
import "../../CurrentArticle/style.css"
import { BlockquoteComponent } from './rendered_components/BlockquoteComponent';
import { HeaderThreeComponent } from './rendered_components/HeaderThreeComponent';
import { HeaderTwoComponent } from './rendered_components/HeaderTwoComponent';
import { getDeviceType } from '../../../utils';
import MobileToolbar from './mobile/MobileToolbar';

const { hasCommandModifier } = KeyBindingUtil;


const urlCreator = window.URL || window.webkitURL;



export default class ArticleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = editorState => this._onChange(editorState)
        this.focus = () => this._onFocus();
        this.keyBindingFn = (e) => this._keyBindingFn(e);
        this.editorRef = React.createRef();
        this.headerRef = React.createRef();
        this.handleKeyCommand = (command) => this._handleKeyCommand(command, this.state.editorState);
        this.selectionIsLink = () => selectionIsLink(this.state.editorState);
        this._handleTab = (e) => _handleTab(e, this.state.editorState)
        this._handleBackspace = (e) => _handleBackspace(e, this.state.editorState, this.onChange)
        this._handleEnter = (e) => _handleEnter(e, this.state.editorState, this.onChange)
        this._handleDelete = (e) => _handleDelete(e, this.state.editorState, this.onChange)

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link
            }
        ]);

        this.state = {
            headerEditorState: EditorState.createWithContent(ContentState.createFromBlockArray([
                new ContentBlock({
                    key: genKey(),
                    type: 'header-one',
                    text: '',
                    characterList: new List(),
                    depth: 0,
                    editable: true
                })
            ])),
            inlineToolbar: { show: false, position: {} },
            editorState: EditorState.createEmpty(decorator),
            sideToolbar: { display: "none", blockKey: null },
            linkToolbar: { show: false, position: {} },
            showImageModal: false,
            deviceType: 'desktop',
        };

        this.getEditorState = () => this.state.editorState;
        this.blockRendererFn = customBlockRenderer(
            this.onChange,
            this.getEditorState,
        );

    }

    makeSelection = (editorState) => {
        this.onChange(EditorState.forceSelection(editorState, editorState.getSelection()))
    }

    _onChange = (editorState) => {

        const blockType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()

        if (blockType !== "custom") {
            if (this.state.deviceType === 'desktop') {
                if (!editorState.getSelection().isCollapsed()) {
                    const selectionRange = getSelectionRange();

                    if (!selectionRange) {
                        this.setState({ inlineToolbar: { show: false } });
                        return;
                    }
                    if (selectionRange.startContainer.nodeName === "#text") {
                        const selectionCoords = getSelectionCoords(selectionRange, 0, 0);
                        this.setState({
                            inlineToolbar: {
                                show: true,
                                position: {
                                    top: selectionCoords.offsetTop,
                                    left: selectionCoords.offsetLeft
                                },
                                range: selectionRange
                            }
                        });
                    }
                } else {
                    this.setState({ inlineToolbar: { show: false } });
                    const selectionRnage = getSelectionRange()
                    if (isCursorInLink(editorState)) {
                        const selectionCoords = getSelectionCoords(selectionRnage, 0, 0)
                        this.setState({
                            linkToolbar: {
                                show: true,
                                position: {
                                    top: selectionCoords.offsetTop,
                                    left: selectionCoords.offsetLeft
                                }
                            }
                        })
                    } else {
                        const selectionCoords = getSelectionCoords(selectionRnage, 0, 0)
                        if (selectionCoords !== null) {
                            this.setState({
                                linkToolbar: {
                                    show: false,
                                }
                            })
                        }
                    }
                }



                const currentBlockKey = editorState.getSelection().getAnchorKey()
                const contentState = editorState.getCurrentContent()
                const currentBlock = contentState.getBlockForKey(editorState.getSelection().getAnchorKey())
                const currentBlockValue = currentBlock.getText()
                if (currentBlockValue === "") {
                    this.setState({
                        sideToolbar: {
                            display: "block",
                            blockKey: currentBlockKey,
                        }
                    })
                } else {
                    if (this.state.sideToolbar.display !== "none") {
                        this.setState({
                            sideToolbar: {
                                display: "none",
                            }
                        })
                    }
                }
            } else {
                if (editorState.getSelection().isCollapsed()) {
                    const selectionRnage = getSelectionRange()
                    if (isCursorInLink(editorState)) {
                        const selectionCoords = getSelectionCoords(selectionRnage, 206, 37)
                        this.setState({
                            linkToolbar: {
                                show: true,
                                position: {
                                    top: selectionCoords.offsetTop,
                                    left: selectionCoords.offsetLeft
                                }
                            }
                        })
                    } else {
                        const selectionCoords = getSelectionCoords(selectionRnage, 206, 37)
                        if (selectionCoords !== null) {
                            this.setState({
                                linkToolbar: {
                                    show: false,
                                }
                            })
                        }
                    }
                }
            }
        }

        this.setState({ editorState });
    }

    _onFocus = () => {
        if (this.editorRef.current) {
            this.editorRef.current.focus();
        }
    }

    _keyBindingFn = (e) => {
        const selection = this.state.editorState.getSelection();
        const content = this.state.editorState.getCurrentContent();
        const startKey = selection.getStartKey();
        const currentBlock = content.getBlockForKey(startKey);

        const blockType = currentBlock.getType();
        if (e.code === "Backspace") {
            if (!hasCommandModifier(e)) {
                return this._handleBackspace(e)
            }
        }
        if (e.code === "Enter") {
            return this._handleEnter(e)
        }
        if (e.code === "Delete") {
            return this._handleDelete(e)
        }

        return getDefaultKeyBinding(e);
    }


    _handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return true;
        }

        return false;
    }

    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }

    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }

    handleDroppedFiles = (files) => {
        const urls = []
        const filteredFiles = files
            .filter(file => (file.type.indexOf('image/') === 0));

        if (!filteredFiles.length) {
            return 'not_handled';
        }



        filteredFiles.forEach(file => {
            urls.push(urlCreator.createObjectURL(file))
        })

        const newEditorState = this.addImgInstance(this.state.editorState, urls)
        this.setState({
            editorState: newEditorState
        },
            () => {
                setTimeout(() => this.focus(), 0)
            })
        return 'handled';
    }

    addImgInstance = (editorState, urls) => {
        this.setState({ sideToolbar: { display: "none", blockKey: null } })
        return addImage(editorState, urls)
    }

    handleImgUpload = (url) => {
        const editorState = this.state.editorState;
        const urlValue = url
        if (!urlValue) {
            return;
        }
        const newEditorState = this.addImgInstance(editorState, [urlValue])
        this.setState({
            editorState: newEditorState,
        }, () => {
            setTimeout(() => this.focus(), 0);
        })
    };


    setLink = (url) => {

        const { editorState } = this.state;
        const selection = editorState.getSelection();

        const contentState = editorState.getCurrentContent();

        const startOffset = selection.getStartOffset();
        const endOffset = selection.getEndOffset();
        const currentBlock = contentState.getBlockForKey(selection.getAnchorKey())
        const currentEntityKey = currentBlock.getEntityAt(startOffset)

        let newStartOffset, newEndOffset
        let newEditorState

        if (currentEntityKey == null || startOffset !== endOffset) {
            newEndOffset = endOffset
            newStartOffset = startOffset
        } else {
            const ranges = [];
            currentBlock.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    return entityKey !== null && entityKey === currentEntityKey;
                },
                (start, end) => {
                    ranges.push({ start, end });
                }
            );
            newEndOffset = ranges[0].end
            newStartOffset = ranges[0].start
        }

        const newSelectionState = new SelectionState({
            anchorKey: selection.getAnchorKey(),
            anchorOffset: newStartOffset,
            focusKey: selection.getFocusKey(),
            focusOffset: newEndOffset
        })

        if (url !== "") {

            let urlValue
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                urlValue = "https://" + url
            } else urlValue = url

            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                {
                    url: urlValue,
                }
            );

            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

            newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
            newEditorState = RichUtils.toggleLink(
                newEditorState,
                newSelectionState,
                entityKey
            )
        } else {
            if (currentEntityKey == null) {
                return;
            } else {
                const updatedContentState = Modifier.applyEntity(contentState, newSelectionState, null)
                newEditorState = EditorState.push(editorState, updatedContentState)
            }
        }


        const newSelection = newEditorState.getSelection();
        const newBlock = newEditorState.getCurrentContent().getBlockForKey(newSelection.getAnchorKey())
        const newPos = newSelection.getEndOffset()
        const newSel = new SelectionState({
            anchorKey: newBlock.getKey(),
            anchorOffset: newPos,
            focusKey: newBlock.getKey(),
            focusOffset: newPos
        })

        this.setState({
            editorState: EditorState.forceSelection(newEditorState, newSel)
        }, () => {
            this.focus()
        }, 0)

    }

    openImageModal = () => {
        this.setState({ showImageModal: true })
    }

    closeImageModal = () => {
        this.setState({ showImageModal: false })
    }


    handleExport = () => {
        const content = this.state.editorState.getCurrentContent()
        const blocksToConvert = content.getBlockMap().keySeq()
        const styleToHTML = this.styleToHTML
        const blockToHTML = this.blockToHTML
        const entityToHTML = this.entityToHTML
        const options = {
            styleToHTML,
            blockToHTML,
            entityToHTML
        }
        const convert = (editorState) => convertToHTML(options)(editorState)
        let html = ""
        let prevBlockType = ""
        blocksToConvert.forEach((key) => {
            const block = this.state.editorState.getCurrentContent().getBlockForKey(key)
            const blockType = block.getType()
            const content = ContentState.createFromBlockArray([block])
            if (blockType !== prevBlockType) {
                switch (prevBlockType) {
                    case 'unordered-list-item': {
                        if (prevBlockType !== blockType) {
                            html = html.concat("</ul>")
                        }
                        break
                    }
                    case 'ordered-list-item': {
                        if (prevBlockType !== blockType) {
                            html = html.concat("</ol>")
                        }
                        break
                    }
                }
            }
            switch (blockType) {
                case 'unordered-list-item': {
                    if (prevBlockType !== blockType) {
                        html = html.concat("<ul class='article-reader-block-ul'>")
                    }
                    break
                }
                case 'ordered-list-item': {
                    if (prevBlockType !== blockType) {
                        html = html.concat("<ol class='article-reader-block-ol'>")
                    }
                    break
                }
            }
            html = html.concat(convert(content))
            prevBlockType = blockType
        })
        return html
    }

    styleToHTML = (style) => {
        switch (style) {
            case 'BOLD':
                return <strong className="bold"></strong>
            case 'ITALIC':
                return <em className="italic"></em>
            case 'UNDERLINE':
                return <u className="underline"></u>
            case 'STRIKETHROUGH':
                return <del className="strikethrough"></del>
            default:
                return null;
        }
    }

    blockToHTML = (block) => {
        const contentState = this.state.editorState.getCurrentContent()
        const type = block.type
        switch (type) {
            case 'custom':
                const entity = contentState.getEntity(block.data.entity)
                const url = entity.getData().src
                return (
                    <>
                        <ContentImage url={url} caption={block.text} />
                    </>
                )
            case 'header-two':
                return (
                    <>
                        <HeaderTwoComponent text={block.text} />
                    </>
                )
            case 'header-three':
                return (
                    <>
                        <HeaderThreeComponent text={block.text} />
                    </>
                )
            case 'blockquote':
                return (
                    <>
                        <BlockquoteComponent text={block.text} />
                    </>
                )
            case 'unordered-list-item':
                return <li className="article-reader-block article-reader-block-ul_item"></li>
            case 'ordered-list-item':
                return <li className="article-reader-block article-reader-block-ol_item"></li>
            default:
                if (block.text === "") {
                    return <p className="article-reader-block"><br /></p>
                }
                return <p className="article-reader-block"></p>
        }
    }

    entityToHTML = (entity, text) => {
        if (entity.type === 'LINK') {
            const url = entity.data.url
            if (url.startsWith("http://")) {

            }
            return (
                <a
                    className="article-reader-link"
                    href={entity.data.url}
                    target="_blank"
                >
                    {text}
                </a>
            );
        }
        return text;
    };

    prevent = (e) => {
        e.preventDefault()
    }

    onHeaderChange = (headerEditorState) => {
        this.setState({ headerEditorState })
    }

    headerKeyBindingFn = (e) => {
        if (e.code === "Enter") {
            return "handled"
        }
        return getDefaultKeyBinding(e);
    }

    handleUndo = () => {
        this.setState({ editorState: EditorState.undo(this.state.editorState) });
    }

    handleRedo = () => {
        this.setState({ editorState: EditorState.redo(this.state.editorState) });
    }

    render() {
        if (this.state.deviceType === "desktop") {
            return (
                <>
                    <ArticleEditorHeader onSave={this.handleExport} onUpload={this.handleExport} mobile={false}/>
                    <div className='editor' id="editor">
                        <div className='editor__content'>
                            <div className="editable-input editor__title-input">
                                <Editor
                                    editorState={this.state.headerEditorState}
                                    onChange={this.onHeaderChange}
                                    placeholder='Заголовок'
                                    blockRenderMap={HeaderMap}
                                    handleDroppedFiles={this.prevent}
                                    handleDrop={this.prevent}
                                    keyBindingFn={this.headerKeyBindingFn}
                                />
                            </div>
                            <div className='editor__main-editor'>
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    handleKeyCommand={this.handleKeyCommand}
                                    keyBindingFn={this.keyBindingFn}
                                    blockRendererFn={this.blockRendererFn}
                                    placeholder='Текст'
                                    ref={this.editorRef}
                                    handleDroppedFiles={this.prevent}
                                    handleDrop={this.prevent}
                                    blockRenderMap={RenderMap}
                                    plugins={this.plugins}
                                />
                                <SideToolbar
                                    sideToolbar={this.state.sideToolbar}
                                    onClick={this.openImageModal}
                                />
                                <InlineToolbar
                                    inlineToolbar={this.state.inlineToolbar}
                                    linkToolbar={this.state.linkToolbar}
                                    inlineToolbarClassName={this.state.inlineToolbar.show ? "editor-toolbar editor-toolbar_visible" : "editor-toolbar"}
                                    editorState={this.state.editorState}
                                    changeEditorState={this.onChange}
                                    onToggleBlock={this.toggleBlockType}
                                    onToggleInlineStyle={this.toggleInlineStyle}
                                    handleImg={this.handleImgUpload}
                                    setLink={this.setLink}
                                    linkIsActive={this.selectionIsLink}
                                    makeSelection={this.makeSelection}
                                />
                            </div>
                        </div>

                    </div>
                    {this.state.showImageModal &&
                        <ImageModal
                            onClickOutside={this.closeImageModal}
                            handleDrop={this.handleDroppedFiles}
                            handleLinkUpload={this.handleImgUpload}
                        />
                    }
                </>
            )
        } else {
            return (
                <>
                    <ArticleEditorHeader onSave={this.handleExport} onUpload={this.handleExport} mobile={true}/>
                    <div className='editor mobile' id="editor">
                        <div className='editor__content mobile'>
                            <div className="editable-input editor__title-input">
                                <Editor
                                    editorState={this.state.headerEditorState}
                                    onChange={this.onHeaderChange}
                                    placeholder='Заголовок'
                                    blockRenderMap={HeaderMap}
                                    handleDroppedFiles={this.prevent}
                                    handleDrop={this.prevent}
                                    keyBindingFn={this.headerKeyBindingFn}
                                />
                            </div>
                            <div className='editor__main-editor'>
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    handleKeyCommand={this.handleKeyCommand}
                                    keyBindingFn={this.keyBindingFn}
                                    blockRendererFn={this.blockRendererFn}
                                    placeholder='Текст'
                                    ref={this.editorRef}
                                    handleDroppedFiles={this.prevent}
                                    handleDrop={this.prevent}
                                    blockRenderMap={RenderMap}
                                    plugins={this.plugins}
                                />
                                <MobileToolbar
                                    editorState={this.state.editorState}
                                    onToggleBlock={this.toggleBlockType}
                                    onToggleInlineStyle={this.toggleInlineStyle}
                                    onRedo={this.handleRedo}
                                    onUndo={this.handleUndo}
                                    linkIsActive={this.selectionIsLink}
                                    setLink={this.setLink}
                                    linkToolbar={this.state.linkToolbar}
                                    handleDrop={this.handleDroppedFiles}
                                />
                            </div>
                        </div>

                    </div>
                </>
            )
        }
    }

}

const HeaderMap = Map({
    "header-one": {
        element: SimpleElement,
    }
})

const RenderMap = DefaultDraftBlockRenderMap.merge(
    Map({
        "header-two": {
            element: SimpleElement
        },
        "header-three": {
            element: SimpleElement,
        },
        "unordered-list-item": {
            element: CustomListItem,
            wrapper: <ul className='public-DraftStyleDefault-ul' />
        },
        "ordered-list-item": {
            element: CustomOrderedListItem,
            wrapper: <ol className='public-DraftStyleDefault-ol' />
        },
        'blockquote': {
            element: SimpleElement
        },
        "unstyled": {
            element: CustomUnstyled
        }
    })
)
