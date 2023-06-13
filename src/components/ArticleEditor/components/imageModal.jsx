import React, { createRef } from "react";

export default class ImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            marginRight: null,
        }
        this.ref = createRef(null)
        this.fullRef = createRef()
        this.inputFileRef = createRef(null)
    }

    componentDidMount() {
        const func = (e) => this.handleClickOutside(e)
        document.addEventListener("click", func);
        const node = this.fullRef.current;
        const scrollbarWidth = node.offsetWidth - node.clientWidth
        this.setState({
            isVisible: true,
            marginRight: -scrollbarWidth,
            wrongData: false,
        })
        const pasteFunc = (e) => this.handlePaste(e)
        document.getElementsByName("image-popup__input-tag")[0].addEventListener("paste", pasteFunc)
    }

    componentWillUnmount() {
        const func = (e) => this.handleClickOutside(e)
        document.removeEventListener("click", func);
        const pasteFunc = (e) => this.handlePaste(e)
        document.getElementsByName("image-popup__input-tag")[0].removeEventListener("paste", pasteFunc)
    }

    handleClickOutside = (e) => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.smooth()
        }
    }

    smooth = () => {
        this.setState({ isVisible: false })
        setTimeout(() => { this.props.onClickOutside() }, 200)
    }

    handleDrop = (e) => {
        e.preventDefault()
        this.props.handleDrop(Array.from(e.dataTransfer.files));
        this.smooth();
    }

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleKey = (e) => {
        const inputValue = e.target.value;
        const sanitizedValue = inputValue.replace(/[^$]/, "");
        e.target.value = sanitizedValue;

        this.setState({ wrongData: true })
    }

    checkImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function () {
                resolve(true);
            };
            img.onerror = function () {
                resolve(false);
            };
            img.src = url;
        });
    }

    handlePaste = (e) => {
        e.preventDefault()
        this.setState({ wrongData: false });
        const urlValue = e.clipboardData.getData("text");
        this.checkImage(urlValue).then((can) => {
            if (can) {
                this.props.handleLinkUpload(urlValue)
                this.smooth();
            } else {
                if (!this.state.wrongData) {
                    this.setState({ wrongData: true })
                }
            }
        })
    }

    handleUploadButton = () => {
        document.getElementsByName("image-popup__file")[0].click()
    }

    handleImageUpload = (e) => {
        e.preventDefault()
        this.props.handleDrop(Array.from(e.target.files));
        this.smooth();
    }

    render() {
        const modalClassName = `ui-lib-modal _with-vertical-align ${this.state.isVisible ? '_visible' : '_hidden'}`;
        return (
            <div
                ref={this.fullRef}
                className={modalClassName}
                style={{ marginRight: this.state.marginRight }}
            >
                <div className="ui-lib-modal__scrollbar-fix">
                    <div
                        className="ui-lib-modal__content image-popup"
                        ref={this.ref}
                    >
                        {this.state.wrongData && <div className="image-popup__alert">Неподдерживаемый формат</div>}
                        <div className="image-popup__drag-area"
                            onDrop={this.handleDrop}
                            onDragOver={this.handleDragOver}
                        >Перетащите изображение в эту область
                        </div>
                        <span className="image-popup__or">или</span>
                        <div className="image-popup__url-input"
                        >
                            <label>Вставьте ссылку на изображение</label>
                            <input
                                type="text"
                                name="image-popup__input-tag"
                                placeholder="Ссылка"
                                defaultValue=""
                                onInput={this.handleKey}
                            />
                        </div>
                        <span className="image-popup__or">или</span>
                        <button
                            type="button"
                            className="ui-lib-button-base ui-lib-button _size_l image-popup__file-button"
                            onClick={this.handleUploadButton}
                        >
                            <span className="ui-lib-button__content-wrapper">Загрузите файл</span>
                        </button>
                        <input
                            className="image-popup__file-input"
                            type="file"
                            accept="image/png,image/jpeg,image/bmp,image/x-ms-bmp,image/webp,image/gif"
                            name="image-popup__file"
                            multiple={true} 
                            onChange={this.handleImageUpload}/>
                    </div>
                </div>
            </div>
        )
    }
}