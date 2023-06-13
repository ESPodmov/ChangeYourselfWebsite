import React from "react";
import { MobileControls } from './MobileControls'
import MobileLinkInput from './MobileLinkInput'
import { getEntityRange } from '../../utils/index';
import { EditorState } from "draft-js";
import MobileLinkTip from "./MobileLinkTip";

export default class MobileToolbar extends React.Component {
    constructor(props) {
        super(props);

        const selection = this.props.editorState.getSelection();
        const focusOffset = selection.getFocusOffset()
        const anchorOffset = selection.getAnchorOffset();

        this.state = {
            className: (focusOffset - anchorOffset) === 0 ? 'block-styles' : 'inline-styles',
            linkInputVisible: false,
            linkTipPosition: {},
            linkTipVisible: false,
            currentLink: ''
        }
    }

    componentDidUpdate(prevProps) {
        const prevSelection = prevProps.editorState.getSelection()
        const selection = this.props.editorState.getSelection()
        if (prevSelection !== selection) {
            const focusOffset = selection.getFocusOffset()
            const anchorOffset = selection.getAnchorOffset();
            this.setState({ className: (focusOffset - anchorOffset) === 0 ? 'block-styles' : 'inline-styles' })
        }

        const prevLink = prevProps.linkToolbar
        const currentLink = this.props.linkToolbar
        const prevLinkPosition = prevLink === undefined ? undefined : prevLink.position
        const currentLinkPosition = currentLink.position
        if (currentLinkPosition !== undefined && (prevLinkPosition === undefined || prevLinkPosition.top !== currentLinkPosition.top || prevLinkPosition.left !== currentLinkPosition.left)) {
            const style = {
                top: currentLinkPosition.top,
                left: currentLinkPosition.left
            }
            this.setState({
                linkTipPosition: style,
            })
        }
        if (prevLink.show !== currentLink.show) {
            this.setState({
                linkTipVisible: currentLink.show
            })
            if (currentLink.show) {
                this.setState({
                    currentLink: this.getLinkEntity()
                })
            }
        }
    }

    closeLinkInput = () => {
        this.setState({ linkInputVisible: false })
    }

    openLinkInput = (link) => {
        this.setState({ linkInputVisible: true })
    }

    setLinkEntity = (link) => {
        this.props.setLink(link)
    }

    getLinkEntity = () => {
        const editorState = this.props.editorState;
        const selectionState = editorState.getSelection();
        if (!selectionState.getHasFocus()) {
            return "";
        }
        const contentState = editorState.getCurrentContent();
        const startKey = selectionState.getStartKey();
        const startOffset = selectionState.getStartOffset();
        const endOffset = selectionState.getEndOffset();
        const block = contentState.getBlockForKey(startKey)
        const entityKey = block.getEntityAt(startOffset)
        if (entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK") {
            const entityRange = getEntityRange(block, entityKey)
            if (startOffset === endOffset) {
                return contentState.getEntity(entityKey).getData().url
            } else {
                if (entityRange.start === startOffset && entityRange.end === endOffset) {
                    return contentState.getEntity(entityKey).getData().url
                }
            }
        }
        return ''
    }

    render() {

        return (
            <>
                {this.state.linkTipVisible &&
                    < MobileLinkTip
                        style={this.state.linkTipPosition}
                        currentLink={this.state.currentLink}
                        openLinkInput={this.openLinkInput}
                    />
                }
                <div
                    className="editor-mobile-toolbar-container"
                >
                    <div
                        className="styles-container"
                    >
                        <MobileControls
                            editorState={this.props.editorState}
                            className={this.state.className}
                            onToggleBlock={this.props.onToggleBlock}
                            onRedo={this.props.onRedo}
                            onUndo={this.props.onUndo}
                            onToggleInlineStyle={this.props.onToggleInlineStyle}
                            linkIsActive={this.props.linkIsActive}
                            openLinkInput={this.openLinkInput}
                            handleDrop={this.props.handleDrop}
                        />

                        {this.state.linkInputVisible &&
                            <MobileLinkInput
                                visible={this.state.linkInputVisible}
                                onClose={this.closeLinkInput}
                                onSubmit={this.setLinkEntity}
                                currentLink={this.getLinkEntity()}
                            />
                        }

                    </div>
                </div>
            </>
        )
    }
}