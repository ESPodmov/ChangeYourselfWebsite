import React, { useRef, createRef } from "react";
import PopupArticleMenu from "./PopupArticleMenu";

class DraggableCard extends React.Component {

  constructor(props) {
    super(props);
    this.itemRef = createRef();

    const editUrl = this.props.type + "/" + this.props.this_item.id + "/edit";
    this.state = {
      previewLink: this.props.this_item.previewLink,
      title: this.props.this_item.title,
      description: this.props.this_item.description,
      price: this.props.this_item.price,
      url: editUrl,
      editUrl: editUrl,
      popupMenuVisible: false,
      popupIsClosig: false,
      isDragging: false
    }
  }

  componentDidUpdate(prevProps) {
    const currentSnapshot = this.props.snapshot
    const prevSnapshot = prevProps.snapshot
    if (currentSnapshot.isDragging !== prevSnapshot.isDragging && currentSnapshot.isDragging) {
      this.setState({
        isDragging: true,
      })
      if (this.state.popupMenuVisible) {
        this.closeItemToolbar()
      }
    } else if (currentSnapshot.isDragging !== prevSnapshot.isDragging) {
      this.setState({
        isDragging: false
      })
    }
  }

  componentDidMount() {
    if (this.props.deviceType === "desktop") {
      document.addEventListener('click', this.handleClickOutside);
    } 
  }

  componentWillUnmount() {
    if (this.props.deviceType === "desktop") {
      document.removeEventListener('click', this.handleClickOutside);
    } 
  }


  handleClickOutside = (e) => {
    if (e.target !== this.itemRef.current && !this.itemRef.current.contains(e.target)) {
      this.closeItemToolbar();
    }
  }

  closeItemToolbar = () => {
    this.setState({ popupIsClosig: true })
    setTimeout(() => { this.setState({ popupMenuVisible: false, popupIsClosig: false }) }, 100)
  }

  openItemToolbar = () => {
    if (this.state.popupMenuVisible) {
      this.closeItemToolbar()
    } else this.setState({ popupMenuVisible: true })
  }

  render() {
    const style = this.state.previewLink.length > 0 ? { backgroundImage: `url('${this.state.previewLink}')` } : {}

    if (this.props.deviceType === "desktop") {
      return (
        <>
          <div className="dashboard_horizontal-item_container"
            ref={this.props.provided.innerRef}
            {...this.props.provided.draggableProps}
            {...this.props.provided.dragHandleProps}
          >
            <div
              className={"dashboard_horizontal-item_data-container" + (this.state.isDragging ? " card__is-dragging" : "")}

            >
              <div className="dashboard_horizontal-item_data-contaier">
                <div>
                  <div className="dashboard_horizontal-item_image-container" style={style} />
                </div>
                <div className="dashboard_horizontal-item_text-container">
                  <p className="dashboard_horizontal-item_title">
                    {this.state.title}
                  </p>
                  <p className="dashboard_horizontal-item_description">
                    {this.state.description}
                  </p>
                </div>
              </div>
              <a className="article_card_link" target="_self" href={this.state.url}></a>
              <div className="dashboard_horizontal-item_data-contaier last">
                {this.props.needsPrice &&
                  <div className="dashboard_horizontal-item_price-container">
                    <span className="price-label">
                      Цена:
                    </span>
                    <div className="dashboard_horizontal-item_price-container_price">
                      {this.state.price}
                    </div>
                    <span className="dashboard_horizontal-item_price-container_price-sign">
                      ₽
                    </span>
                  </div>}
                <div className={"horizontal_card_menu" + (this.state.popupMenuVisible ? " popup-menu_active" : "")} ref={this.itemRef}>
                  <div className="dropdown">
                    <button className="menu-button horizontal-card" onClick={this.openItemToolbar}>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M1 8.001a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm7-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                  {this.state.popupMenuVisible &&
                    <PopupArticleMenu
                      closing={this.state.popupIsClosig}
                      deviceType={this.props.deviceType}
                      articleLink={this.state.url}
                      editUrl={this.state.editUrl}
                      showNotification={this.props.showNotification}
                      closePopup={this.closeItemToolbar}
                    />
                  }
                </div>
              </div>
            </div>
          </div>

        </>
      )
    } else {
      return (
        <>
          <div className="dashboard_horizontal-item_container"
            ref={this.props.provided.innerRef}
            {...this.props.provided.draggableProps}
            {...this.props.provided.dragHandleProps}
          >
            <div
              className={"dashboard_horizontal-item_data-container mobile" + (this.state.isDragging ? " card__is-dragging" : "")}
            >
              <div className="dashboard_horizontal-item_data-contaier">
                <div>
                  <div className="dashboard_horizontal-item_image-container mobile" style={style} />
                </div>
                <div className="dashboard_horizontal-item_text-container mobile">
                  <p className="dashboard_horizontal-item_title mobile">
                    {this.state.title}
                  </p>
                  <p className="dashboard_horizontal-item_description mobile">
                    {this.state.description}
                  </p>
                </div>
              </div>
              <a className="article_card_link" target="_self" href={this.state.url}></a>
              <div className="dashboard_horizontal-item_data-contaier last mobile">
                {this.props.needsPrice &&
                  <div className="dashboard_horizontal-item_price-container">
                    <span className="price-label mobile">
                      Цена:
                    </span>
                    <div className="dashboard_horizontal-item_price-container_price mobile">
                      {this.state.price}
                    </div>
                    <span className="dashboard_horizontal-item_price-container_price-sign mobile">
                      ₽
                    </span>
                  </div>}
                <div className={"horizontal_card_menu mobile" + (this.state.popupMenuVisible ? " popup-menu_active" : "")} ref={this.itemRef}>
                  <div className="dropdown">
                    <button className="menu-button horizontal-card mobile" onTouchEnd={this.openItemToolbar}>
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M1 8.001a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm7-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                  {this.state.popupMenuVisible &&
                    <PopupArticleMenu
                      closing={this.state.popupIsClosig}
                      deviceType={this.props.deviceType}
                      articleLink={this.state.url}
                      editUrl={this.state.editUrl}
                      showNotification={this.props.showNotification}
                      closePopup={this.closeItemToolbar}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

export default DraggableCard;