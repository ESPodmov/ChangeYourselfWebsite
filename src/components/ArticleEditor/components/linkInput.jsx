import React, { useState, useRef, useEffect } from 'react';
import { EditorState } from 'draft-js';

export default class LinkInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.currentLink,
            style: {
                top: props.style.top,
                left: props.style.left
            },
            editorState: props.editorState,
            range: props.range
        }
        this.inputRef = React.createRef(null)
        this.textRef = React.createRef(this.state.text)
        this.inputTextRef = React.createRef(null)
        this.textRef.current = this.state.text
        this.setText = (text) => this.state.text = text
    }

    componentWillUnmount() {
        const func = (e) => this.handleClickOutside(e)
        document.removeEventListener("click", func);
    }

    componentDidMount() {
        const func = (e) => this.handleClickOutside(e)
        document.addEventListener("click", func);
        // this.inputTextRef.current.focus()
        // this.inputTextRef.current.select()
    }

    handleClickOutside = (e) => {
        if (this.inputRef.current && !this.inputRef.current.contains(e.target)) {
            e.preventDefault()
            this.props.onKeyPress("Enter", this.textRef.current)
        }
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            this.props.onKeyPress(e.key, this.state.text)
        }
    }

    handleChange = (e) => {
        this.setText(e.target.value)
        this.textRef.current = e.target.value

    }

    onClose = () => {
        this.props.onCloseBtnClick(this.state.editorState, this.state.range)
    }

    render() {
        return (
            <div className='editor-toolbar__link-input'
                ref={this.inputRef}
                style={this.state.style}
            >
                <div className='link-input'>
                    <div className="close-cross close-cross_black link-input__close"
                        onClick={this.onClose}
                    ></div>
                    <div className="primary-input link-input__input">
                        <input className='primary-input__control' placeholder='Введите ссылку'
                            onChange={this.handleChange}
                            onKeyDown={this.onKeyPress}
                            autoFocus={true}
                            defaultValue={this.state.text}
                            ref={this.inputTextRef}
                        ></input>
                    </div>
                </div>
            </div>
        )
    }
}