import React from 'react';
import BlockStyleControls from './blockStyleControls';
import InlineStyleControls from './inlineStyleControls';
import LinkEntity from './linkEntityControls';
import LinkInput from './linkInput';
import LinkTip from './linkTip';
import { getEntityRange } from '../utils/index';
import { useState } from 'react';
import { EditorState } from 'draft-js';


export default class InlineToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState,
      toolbarClassName: "editor-toolbar",
      style: {},
      currentLink: "",
    }
    this.inputRef = React.createRef(null);
    this.inlineToolbar = props.inlineToolbar
    this.inlineToolbarRef = React.createRef(null)
    this.rangeRef = React.createRef(props.inlineToolbar.range)


  }


  componentDidUpdate(prevProps) {
    const prevToolbar = prevProps.inlineToolbar
    const currentToolbar = this.props.inlineToolbar
    const currentPosition = currentToolbar.position
    const prevPosition = prevToolbar.position
    if (currentPosition !== undefined && (prevPosition === undefined || prevPosition.top !== currentPosition.top || prevPosition.left !== currentPosition.left)) {
      const style = {
        top: currentPosition.top,
        left: currentPosition.left
      }
      this.setState({
        style: style,
        currentLink: this.getLinkEntity(),
      })
    }
    if (prevToolbar.show !== currentToolbar.show) {
      if (currentToolbar.show) {
        if (this.state.toolbarClassName !== "editor-toolbar editor-toolbar_visible" && this.state.toolbarClassName !== "editor-toolbar__link-input") {
          const toolbarClassName = "editor-toolbar editor-toolbar_visible"
          this.setState({ toolbarClassName })
        }

      } else {
        if (this.state.toolbarClassName === "editor-toolbar editor-toolbar_visible") {
          const toolbarClassName = 'editor-toolbar'
          this.setState({ toolbarClassName })
        }
      }
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
        style: style,
        currentLink: this.getLinkEntity(),
      })
    }
    if (prevLink.show !== currentLink.show) {

      if (currentLink !== undefined && currentLink.show) {
        if (this.state.toolbarClassName !== "editor-toolbar editor-toolbar_visible editor-toolbar_link-tip") {
          const toolbarClassName = "editor-toolbar editor-toolbar_visible editor-toolbar_link-tip"
          this.setState({ toolbarClassName })
        }
      } else {
        if (this.state.toolbarClassName === "editor-toolbar editor-toolbar_visible editor-toolbar_link-tip") {
          const toolbarClassName = 'editor-toolbar'
          this.setState({ toolbarClassName })
        }
      }
    } else {
      if (prevLink.show === currentLink.show && currentLink.show && (this.state.toolbarClassName === "editor-toolbar"
        || this.state.toolbarClassName === "editor-toolbar editor-toolbar_visible") && currentLinkPosition !== undefined) {
        this.setState({ toolbarClassName: 'editor-toolbar editor-toolbar_visible editor-toolbar_link-tip' })
      }
    }
  }


  componentDidMount() {
    const func = (e) => this.handleClickInside(e)
    document.addEventListener('click', (e) => func(e))
  }

  componentWillUnmount() {
    const func = (e) => this.handleClickInside(e)
    document.removeEventListener('click', (e) => func(e))
  }

  openLinkInput = (link) => {
    const currentToolbarClassName = "editor-toolbar__link-input"
    let currentLink = link
    if (currentLink === "LINK") {
      currentLink = this.state.currentLink
    }
    this.setState({
      toolbarClassName: currentToolbarClassName,
      currentLink: currentLink,
    })
  }

  onCloseBtnClick = (editorState) => {
    this.makeRangeAndSelection(editorState)
    const currentToolbarClassName = "editor-toolbar editor-toolbar_visible"
    this.setState({ toolbarClassName: currentToolbarClassName })
  }

  makeRangeAndSelection = (editorState) => {
    this.props.makeSelection(editorState)
  }

  onKeyPress = (keyName, link) => {
    if (keyName === 'Enter') {
      this.setState({ toolbarClassName: "editor-toolbar" })
      this.props.setLink(link)
    }
  }

  handleClickInside = (e) => {
    const range = this.props.inlineToolbar.range
    if (this.inputRef.current && this.inputRef.current.contains(e.target)) {
      this.makeRangeAndSelection(this.props.editorState, range)
    }
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
    if (this.state.toolbarClassName.includes('editor-toolbar__link-input')) {
      const currentLink = this.state.currentLink;
      return (
        <LinkInput
          style={this.state.style}
          onCloseBtnClick={this.onCloseBtnClick}
          onKeyPress={this.onKeyPress}
          editorState={this.props.editorState}
          range={this.props.inlineToolbar.range}
          currentLink={currentLink}
        />
      )
    } else if (this.state.toolbarClassName.includes('editor-toolbar_link-tip')) {
      const currentLink = this.state.currentLink;
      return (
        <LinkTip
          toolbarClassName={this.state.toolbarClassName}
          style={this.state.style}
          currentLink={currentLink}
          openLinkInput={this.openLinkInput}
          setDefaultToolbarClassName={() => this.setState({ toolbarClassName: "editor-toolbar" })}
        />
      )
    } else return (
      <div className={this.state.toolbarClassName} style={this.state.style} ref={this.inputRef}>
        <BlockStyleControls
          editorState={this.props.editorState}
          onToggle={this.props.onToggleBlock}
          handleImg={this.props.handleImg}
        />

        <InlineStyleControls
          editorState={this.props.editorState}
          onToggle={this.props.onToggleInlineStyle}
        />

        <LinkEntity
          editorState={this.props.editorState}
          onToggle={this.openLinkInput}
          linkIsActive={this.props.linkIsActive}
          mobile={false}
        />
      </div >
    )
  }



}
