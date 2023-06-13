import React, { useState, useRef, useEffect } from 'react';
import { EditorState } from 'draft-js';

export default class MobileLinkInput extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.currentLink)
        this.state = {
            visible: false,
            text: this.props.currentLink,
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
        document.removeEventListener("touchstart", func);
    }

    componentDidMount() {
        const func = (e) => this.handleClickOutside(e)
        document.addEventListener("touchstart", func);
        this.setState({ visible: true })
    }

    handleClickOutside = (e) => {
        if (this.inputRef.current && e.target === this.inputRef.current) {
            e.preventDefault()
            this.onClose()
        }
    }

    onSubmit = () => {
        this.props.onSubmit(this.state.text)
        this.onClose()
    }

    handleChange = (e) => {
        this.setText(e.target.value)
        this.textRef.current = e.target.value
    }

    onClose = () => {
        this.setState({ isVisible: false })
        setTimeout(() => { this.props.onClose() }, 200)
    }

    render() {
        const modalClassName = `ui-lib-modal mobile ${this.state.visible ? '_visible' : '_hidden'}`;
        return (
            <div className={modalClassName}
                style={this.state.style}
            >
                <div className="ui-lib-modal__scrollbar-fix"
                    ref={this.inputRef}
                >
                    <div className='link-input mobile'>
                        <div className='link-input_mobile_wrapper justify-right'>
                            <div className="close-cross close-cross_black link-input__close mobile"
                                onTouchStart={this.onClose}
                            ></div>
                        </div>
                        <div className='link-input_mobile_content-wrapper'>
                            <div className='link-input_mobile_wrapper justify-left'>
                                <span className='link-input_mobile__description'>
                                    Добавить ссылку
                                </span>
                            </div>
                            <div className='link-input_mobile_wrapper justify-left'>
                                <div className="primary-input link-input__input mobile">
                                    <input className='primary-input__control mobile' placeholder='https://'
                                        onChange={this.handleChange}
                                        autoFocus={true}
                                        defaultValue={this.state.text}
                                        ref={this.inputTextRef}
                                    ></input>
                                </div>
                            </div>
                            <div className='link-input_mobile_wrapper justify-right' style={{ marginTop: 22 }}>
                                <div className='link-input_mobile__button-wrapper'>
                                    <button className='link-input_mobile__button secondary'
                                        onTouchStart={this.onClose}
                                    >
                                        <span>
                                            Отмена
                                        </span>
                                    </button>
                                    <button className='link-input_mobile__button primary'
                                        onTouchStart={this.onSubmit}
                                    >
                                        <span>
                                            Готово
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}