import React from "react";

export default class ArticleEditorHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.mobile) {
            return (
                <div className="editor-header__container">
                    <div className="editor-header__left-col">
                    </div>
                    <div className="editor-header__mid-col">
                    </div>
                    <div className="editor-header__right-col">
                        <button
                            className="editor-header__button"
                            onClick={this.props.onSave}
                        >
                            <span>
                                Сохранить
                            </span>
                        </button>
                        <button
                            className="editor-header__button primary sm-mg-l"
                            onClick={this.props.onUpload}
                        >
                            <span>
                                Опубликовать
                            </span>
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="editor-header__container mobile">
                    <div className="editor-header__container-wrapper">

                        <div className="editor-header__left-col mobile">
                        </div>
                        <div className="editor-header__right-col mobile">
                            <button
                                className="editor-header__button mobile"
                                onClick={this.props.onSave}
                            >
                                <div className="mobile-save-btn" />
                            </button>
                            <button
                                className="editor-header__button mobile primary sm-mg-l"
                                onClick={this.props.onUpload}
                            >
                                <div className="mobile-post-btn" />
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}