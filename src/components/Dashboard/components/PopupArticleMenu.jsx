import React, { createRef } from "react";
import { withRouter } from "../../../utils";

class PopupArticleMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceType: this.props.deviceType,
            articleLink: this.props.articleLink,
            editUrl: this.props.editUrl,
            closing: false,
        }

        this.itemRef = createRef();
    }

    componentDidMount() {
        if (this.state.deviceType !== "desktop") {
            document.addEventListener('touchend', this.handleClickOutside);
        }
    }

    componentWillUnmount() {
        if (this.state.deviceType !== "desktop") {
            document.removeEventListener('touchend', this.handleClickOutside);
        }
    }

    handleClickOutside = (e) => {
        if (e.target === this.itemRef.current) {
            e.preventDefault();
            this.props.closePopup();
        }
    }

    copyLink = () => {
        navigator.clipboard.writeText(this.state.articleLink)
        this.props.closePopup();
        this.props.showNotification('success', "Ссылка скопирована")
    }

    deleteItem = () => {
        console.log('deleted')
        this.props.showNotification('success', "Элемент удален")
    }

    onOpenEditMobile = () => {
        this.props.navigate("/dashboard/" + this.state.editUrl)
    }

    render() {
        if (this.state.deviceType === 'desktop') {
            return (
                <div className={"popup-menu__container " + (this.props.closing ? "closing" : "")}>
                    <ul className="popup-menu__items-container">
                        <li className="popup-menu__item_container">
                            <a className="popup-menu__item-interactive" target="_self" href={this.state.editUrl}>
                                <div className="popup-menu__item_content">
                                    <span className="popup-menu__item_icon">
                                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="m14.793 7.368-8.36 8.36a2 2 0 0 0-.425.625L4.28 19.52l3.365-1.53c.233-.101.445-.245.624-.424l8.36-8.362a5.085 5.085 0 0 0-.813-1.024 5.086 5.086 0 0 0-1.023-.812zm1.446-1.446c.335.237.665.519.991.844.326.326.608.657.845.992l1.471-1.471a.5.5 0 0 0 .11-.542c-.107-.262-.298-.537-.582-.822-.285-.284-.56-.475-.822-.582a.5.5 0 0 0-.542.11L16.24 5.922zM4.17 15.564a4 4 0 0 1 .848-1.25L16.296 3.036a2.5 2.5 0 0 1 2.708-.549c.526.214 1.02.557 1.484 1.021.464.465.808.959 1.02 1.484a2.5 2.5 0 0 1-.548 2.708L9.684 18.98a4 4 0 0 1-1.25.847l-3.442 1.48a1.75 1.75 0 0 1-2.3-2.298l1.478-3.445z" fill="currentColor" />
                                        </svg>
                                    </span>
                                    <div className="popup-menu__item_text-container">
                                        <span className="popup-menu__item_text">
                                            Отредактировать
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        {this.state.articleLink !== this.state.editUrl &&
                            <li className="popup-menu__item_container">
                                <div className="popup-menu__item_content" onClick={this.copyLink}>
                                    <span className="popup-menu__item_icon">
                                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M8.536 1.464a5 5 0 1 0-7.072 7.072L2.88 9.95a5.001 5.001 0 0 0 5.362 1.12l-1.66-1.66a2.993 2.993 0 0 1-2.288-.874L2.879 7.12A3 3 0 0 1 7.12 2.88l1.415 1.414c.628.628.92 1.466.874 2.288l1.66 1.66A5.001 5.001 0 0 0 9.95 2.88L8.536 1.464zM11.464 18.535a5 5 0 1 0 7.071-7.07l-1.414-1.415a5.001 5.001 0 0 0-5.362-1.12l1.66 1.66a2.993 2.993 0 0 1 2.288.874l1.414 1.415a3 3 0 1 1-4.242 4.242l-1.415-1.414a2.992 2.992 0 0 1-.874-2.288l-1.66-1.66a5.001 5.001 0 0 0 1.12 5.362l1.414 1.415z" fillRule="evenodd" />
                                            <path d="M14.707 13.293l-8-8-1.414 1.414 8 8 1.414-1.414z" fillRule="evenodd" />
                                        </svg>
                                    </span>
                                    <div className="popup-menu__item_text-container">
                                        <span className="popup-menu__item_text">
                                            Скопировать ссылку
                                        </span>
                                    </div>
                                </div>
                            </li>
                        }
                        <li className="popup-menu__group">
                            <ul className="popup-menu__group-list">
                                <li className="popup-menu__item_container">
                                    <div className="popup-menu__item_content" onClick={this.deleteItem}>
                                        <span className="popup-menu__item_icon color-red">
                                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                                <path d="M12.663 1.5h-1.326c-1.069 0-1.49.09-1.921.27-.432.181-.792.453-1.084.82-.292.365-.493.746-.784 1.774L7.368 5H5a1 1 0 0 0 0 2h.5l.844 12.666A2.5 2.5 0 0 0 8.84 22h6.322a2.5 2.5 0 0 0 2.495-2.334L18.5 7.001V7h.5a1 1 0 1 0 0-2h-2.367l-.18-.636c-.292-1.028-.493-1.409-.785-1.775a2.694 2.694 0 0 0-1.084-.819c-.431-.18-.852-.27-1.92-.27zm1.89 3.5H9.447l.026-.09c.203-.717.29-.905.424-1.074a.696.696 0 0 1 .292-.221c.2-.084.404-.115 1.149-.115h1.326c.745 0 .95.031 1.149.115.122.05.21.118.292.221.135.169.221.357.424 1.074l.026.09zm1.943 2-.836 12.533a.5.5 0 0 1-.499.467H8.84a.5.5 0 0 1-.499-.467L7.505 7h8.99zM9.4 9.63l.272 7.796a.85.85 0 1 0 1.699-.06l-.272-7.795a.85.85 0 0 0-1.7.06zm4.381-.879a.85.85 0 0 0-.88.82l-.271 7.795a.85.85 0 1 0 1.699.06L14.6 9.63a.85.85 0 0 0-.82-.88z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        <div className="popup-menu__item_text-container">
                                            <span className="popup-menu__item_text color-red">
                                                Удалить
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className={"popup-menu__container-mobile" + (this.props.closing ? " closing" : "")} ref={this.itemRef}>
                    <div className={"popup-menu__container mobile" + (this.props.closing ? " closing" : "")}>
                        <ul className="popup-menu__items-container">
                            <li className="popup-menu__item_container">
                                    <div className="popup-menu__item_content mobile" onTouchEnd={this.onOpenEditMobile}>
                                        <span className="popup-menu__item_icon mobile">
                                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="m14.793 7.368-8.36 8.36a2 2 0 0 0-.425.625L4.28 19.52l3.365-1.53c.233-.101.445-.245.624-.424l8.36-8.362a5.085 5.085 0 0 0-.813-1.024 5.086 5.086 0 0 0-1.023-.812zm1.446-1.446c.335.237.665.519.991.844.326.326.608.657.845.992l1.471-1.471a.5.5 0 0 0 .11-.542c-.107-.262-.298-.537-.582-.822-.285-.284-.56-.475-.822-.582a.5.5 0 0 0-.542.11L16.24 5.922zM4.17 15.564a4 4 0 0 1 .848-1.25L16.296 3.036a2.5 2.5 0 0 1 2.708-.549c.526.214 1.02.557 1.484 1.021.464.465.808.959 1.02 1.484a2.5 2.5 0 0 1-.548 2.708L9.684 18.98a4 4 0 0 1-1.25.847l-3.442 1.48a1.75 1.75 0 0 1-2.3-2.298l1.478-3.445z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        <div className="popup-menu__item_text-container">
                                            <span className="popup-menu__item_text">
                                                Отредактировать
                                            </span>
                                        </div>
                                    </div>
                            </li>
                            {this.state.articleLink !== this.state.editUrl &&
                                <li className="popup-menu__item_container">
                                    <div className="popup-menu__item_content" onTouchEnd={this.copyLink}>
                                        <span className="popup-menu__item_icon mobile">
                                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M8.536 1.464a5 5 0 1 0-7.072 7.072L2.88 9.95a5.001 5.001 0 0 0 5.362 1.12l-1.66-1.66a2.993 2.993 0 0 1-2.288-.874L2.879 7.12A3 3 0 0 1 7.12 2.88l1.415 1.414c.628.628.92 1.466.874 2.288l1.66 1.66A5.001 5.001 0 0 0 9.95 2.88L8.536 1.464zM11.464 18.535a5 5 0 1 0 7.071-7.07l-1.414-1.415a5.001 5.001 0 0 0-5.362-1.12l1.66 1.66a2.993 2.993 0 0 1 2.288.874l1.414 1.415a3 3 0 1 1-4.242 4.242l-1.415-1.414a2.992 2.992 0 0 1-.874-2.288l-1.66-1.66a5.001 5.001 0 0 0 1.12 5.362l1.414 1.415z" fillRule="evenodd" />
                                                <path d="M14.707 13.293l-8-8-1.414 1.414 8 8 1.414-1.414z" fillRule="evenodd" />
                                            </svg>
                                        </span>
                                        <div className="popup-menu__item_text-container">
                                            <span className="popup-menu__item_text">
                                                Скопировать ссылку
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            }
                            <li className="popup-menu__item_container">
                                <div className="popup-menu__item_content mobile" onTouchEnd={this.deleteItem}>
                                    <span className="popup-menu__item_icon mobile">
                                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                                            <path d="M12.663 1.5h-1.326c-1.069 0-1.49.09-1.921.27-.432.181-.792.453-1.084.82-.292.365-.493.746-.784 1.774L7.368 5H5a1 1 0 0 0 0 2h.5l.844 12.666A2.5 2.5 0 0 0 8.84 22h6.322a2.5 2.5 0 0 0 2.495-2.334L18.5 7.001V7h.5a1 1 0 1 0 0-2h-2.367l-.18-.636c-.292-1.028-.493-1.409-.785-1.775a2.694 2.694 0 0 0-1.084-.819c-.431-.18-.852-.27-1.92-.27zm1.89 3.5H9.447l.026-.09c.203-.717.29-.905.424-1.074a.696.696 0 0 1 .292-.221c.2-.084.404-.115 1.149-.115h1.326c.745 0 .95.031 1.149.115.122.05.21.118.292.221.135.169.221.357.424 1.074l.026.09zm1.943 2-.836 12.533a.5.5 0 0 1-.499.467H8.84a.5.5 0 0 1-.499-.467L7.505 7h8.99zM9.4 9.63l.272 7.796a.85.85 0 1 0 1.699-.06l-.272-7.795a.85.85 0 0 0-1.7.06zm4.381-.879a.85.85 0 0 0-.88.82l-.271 7.795a.85.85 0 1 0 1.699.06L14.6 9.63a.85.85 0 0 0-.82-.88z" fill="currentColor" />
                                        </svg>
                                    </span>
                                    <div className="popup-menu__item_text-container">
                                        <span className="popup-menu__item_text">
                                            Удалить
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }

}

export default withRouter(PopupArticleMenu)