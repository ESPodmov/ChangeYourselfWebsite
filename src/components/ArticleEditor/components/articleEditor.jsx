import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { getSelectionRange, getSelectionCoords } from '../../../utils';
import InlineToolbar from './inlineToolbar';

export default class ArticleEditor extends Component {
  constructor() {
    super();

    this.state = {
      inlineToolbar: { show: false, position: {} },
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
  }

  onChange = (editorState) => {
    if (!editorState.getSelection().isCollapsed()) {
      const selectionRange = getSelectionRange();

      if (!selectionRange) {
        this.setState({ inlineToolbar: { show: false } });

        return;
      }

      const selectionCoords = getSelectionCoords(selectionRange);

      this.setState({
        inlineToolbar: {
          show: true,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        }
      });
    } else {
      this.setState({ inlineToolbar: { show: false } });
    }

    this.setState({ editorState });
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return true;
    }

    return false;
  }

  render() {
    const {
      editorState,
      inlineToolbar
    } = this.state;

    return (
      <div id="editor-container" className="c-editor-container js-editor-container main-container">
        {inlineToolbar.show ? <InlineToolbar editorState={editorState} onToggle={this.toggleInlineStyle} position={inlineToolbar.position} /> : null}
        <div className="section-name">
          Теперь можно выделить текст и применить к выделенному фрагменту стилизацию:
        </div>
        <div
          className="editor"
          onClick={this.focus}
        >
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            customStyleMap={customStyleMap}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}

const customStyleMap = {
  HIGHLIGHT: {
    backgroundColor: 'palegreen',
  },
  H4: {
    fontSize: '20px'
  },
  H1: {
    fontSize: '30px'
  }
};