import React from "react";
import ArticleCard from "./ArticleCard";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { withRouter } from "../../../utils";


class DashboardContentLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceType: this.props.deviceType,
            tabsDict: this.props.tabsDict,
            title: this.props.title,
            items: this.props.items,
            inputVisible: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.setState({ items: this.props.items });
        }
    }


    onDragEnd = (result) => {
        console.log(result)
        if (!result.destination) {
            return
        }
        const items = this.reorder(this.state.items, result.source.index, result.destination.index)
        this.setState({ items })
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }


    onSearch = () => {
        //
        this.props.onSearch()
    }

    onSave = () => {
        //
        this.props.onSave()
    }

    onBack = () => {
        this.props.navigate("/dashboard/")
    }

    openSearchInput = () => {
        if (!this.state.inputVisible) {
            this.setState({ inputVisible: true })
        } else {
            //
            this.onSearch()
        }
    }

    closeSearchInput = () => {
        this.setState({ inputVisible: false })
    }

    render() {

        if (this.state.deviceType === 'desktop') {
            return (
                <div className="dashboard-content_layout">
                    <div className="dashboard-content__main-container">
                        <div className="dashboard-content__content-layout">
                            <div className="dashboard-content__content-container">
                                <div className="dashboard-content__header-container">
                                    <h2 className="dashboard-content__header">
                                        {this.state.title}
                                    </h2>
                                    <div className="add-new__button" onClick={this.props.addNew}>
                                        <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.0997 2.3H14.9003C17.7448 2.3 18.4937 2.59519 19.2193 2.98327C19.9988 3.40017 20.5998 4.00118 21.0167 4.78071C21.4048 5.50635 21.7 6.25524 21.7 9.0997V14.9003C21.7 17.7448 21.4048 18.4937 21.0167 19.2193C20.5998 19.9988 19.9988 20.5998 19.2193 21.0167C18.4937 21.4048 17.7448 21.7 14.9003 21.7H9.0997C6.25524 21.7 5.50635 21.4048 4.78071 21.0167C4.00118 20.5998 3.40017 19.9988 2.98327 19.2193C2.59519 18.4937 2.3 17.7448 2.3 14.9003V9.0997C2.3 6.25524 2.59519 5.50635 2.98327 4.78071C3.40017 4.00118 4.00118 3.40017 4.78071 2.98327C5.50635 2.59519 6.25524 2.3 9.0997 2.3ZM9.0997 0.5H14.9003C17.8906 0.5 18.975 0.811353 20.0682 1.39601C21.1614 1.98066 22.0193 2.83862 22.604 3.93183C23.1886 5.02504 23.5 6.1094 23.5 9.0997V14.9003C23.5 17.8906 23.1886 18.975 22.604 20.0682C22.0193 21.1614 21.1614 22.0193 20.0682 22.604C18.975 23.1886 17.8906 23.5 14.9003 23.5H9.0997C6.1094 23.5 5.02504 23.1886 3.93183 22.604C2.83862 22.0193 1.98066 21.1614 1.39601 20.0682C0.811353 18.975 0.5 17.8906 0.5 14.9003V9.0997C0.5 6.1094 0.811353 5.02504 1.39601 3.93183C1.98066 2.83862 2.83862 1.98066 3.93183 1.39601C5.02504 0.811353 6.1094 0.5 9.0997 0.5ZM11 7.55615C11 7.00387 11.4477 6.55615 12 6.55615C12.5523 6.55615 13 7.00387 13 7.55615V11.0469H16.4906C17.0429 11.0469 17.4906 11.4946 17.4906 12.0469C17.4906 12.5992 17.0429 13.0469 16.4906 13.0469H13V16.5374C13 17.0897 12.5523 17.5374 12 17.5374C11.4477 17.5374 11 17.0897 11 16.5374V13.0469H7.5094C6.95711 13.0469 6.5094 12.5992 6.5094 12.0469C6.5094 11.4946 6.95711 11.0469 7.5094 11.0469H11V7.55615Z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="dashboard-content_content-wrapper">
                                    <div className="dashboard-content__content__content-container">
                                        <div className="dashboard-content__controls-container">
                                            <div className="dashboard-content__controls_header">
                                                <div className="dashboard-content__controls_tabs-container">
                                                    <ul className="dashboard-content__controls_item-wrapper">
                                                        {this.state.tabsDict.map((elem) => {
                                                            return (
                                                                <div
                                                                    className={"tabs-item" + (elem.first ? " tabs-item-first" : "") + (this.props.activeTab === elem.key ? " tabs-item-active" : "")}
                                                                    onClick={elem.switch}
                                                                    key={elem.key}
                                                                >
                                                                    {elem.title}
                                                                </div>
                                                            )
                                                        })}

                                                    </ul>
                                                </div>
                                                <div className="dashboard-content__controls_find-wrapper">
                                                    {this.props.needsDragnDrop ?
                                                        <button className="dashboard-content__save-button" onClick={this.onSave}>
                                                            <span className="dashboard-content__save-button_text">
                                                                Сохранить
                                                            </span>
                                                        </button>
                                                        :
                                                        <span className="dashboard-content__controls_find-container">
                                                            <div className="dashboard-content__control_search-control_container">
                                                                <input className="textinput-control" placeholder="Поиск статьи" id='search-input' />
                                                                <button className="search-control_button" onClick={this.onSearch}>
                                                                    <svg enableBackground="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20" focusable="false">
                                                                        <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="dashboard__articles_items-layout">


                                        <div className="dashboard__articles_items-container">
                                            {this.props.needsDragnDrop ?
                                                <DragDropContext onDragEnd={this.onDragEnd}>
                                                    <Droppable
                                                        droppableId="droppable"
                                                        direction="vertical"
                                                    >
                                                        {(provided) => (
                                                            <div className="articles_content_container"
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                            >
                                                                {this.state.items.map((item, index) => (
                                                                    <Draggable
                                                                        key={item.id}
                                                                        draggableId={item.id}
                                                                        index={index}
                                                                    >
                                                                        {(provided, snapshot) => (
                                                                            <this.props.elem
                                                                                deviceType={this.state.deviceType}
                                                                                this_item={item}
                                                                                provided={provided}
                                                                                snapshot={snapshot}
                                                                                showNotification={this.props.showNotification}
                                                                                type={this.props.type}
                                                                                needsPrice={this.props.needsPrice}
                                                                            />
                                                                        )}
                                                                    </Draggable>
                                                                )
                                                                )}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                                :
                                                <div className="articles_content_container">
                                                    {this.state.items.map(item => {
                                                        return (
                                                            <this.props.elem
                                                                deviceType={this.state.deviceType}
                                                                key={item.id}
                                                                this_item={item}
                                                                showNotification={this.props.showNotification}
                                                            />
                                                        )
                                                    })}

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="dashboard-content__content-layout mobile">
                    <div className="dashboard-content__content-container mobile">
                        <div className="dashboard-content__header-container mobile">
                            <div className="dashboard-content__header__controls_flex-container">
                                <div className="dashboard__back-arrow mobile" onTouchEnd={this.onBack}>
                                    <svg version="1.1" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 129 129">
                                        <g>
                                            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="dashboard-content__header__title_flex-container">
                                <h2 className="dashboard-content__header">
                                    {this.state.title}
                                </h2>
                            </div>
                            <div className="dashboard-content__header__controls_flex-container">
                                <div className="add-new__button mobile" onTouchStart={this.props.addNew}>
                                    <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.0997 2.3H14.9003C17.7448 2.3 18.4937 2.59519 19.2193 2.98327C19.9988 3.40017 20.5998 4.00118 21.0167 4.78071C21.4048 5.50635 21.7 6.25524 21.7 9.0997V14.9003C21.7 17.7448 21.4048 18.4937 21.0167 19.2193C20.5998 19.9988 19.9988 20.5998 19.2193 21.0167C18.4937 21.4048 17.7448 21.7 14.9003 21.7H9.0997C6.25524 21.7 5.50635 21.4048 4.78071 21.0167C4.00118 20.5998 3.40017 19.9988 2.98327 19.2193C2.59519 18.4937 2.3 17.7448 2.3 14.9003V9.0997C2.3 6.25524 2.59519 5.50635 2.98327 4.78071C3.40017 4.00118 4.00118 3.40017 4.78071 2.98327C5.50635 2.59519 6.25524 2.3 9.0997 2.3ZM9.0997 0.5H14.9003C17.8906 0.5 18.975 0.811353 20.0682 1.39601C21.1614 1.98066 22.0193 2.83862 22.604 3.93183C23.1886 5.02504 23.5 6.1094 23.5 9.0997V14.9003C23.5 17.8906 23.1886 18.975 22.604 20.0682C22.0193 21.1614 21.1614 22.0193 20.0682 22.604C18.975 23.1886 17.8906 23.5 14.9003 23.5H9.0997C6.1094 23.5 5.02504 23.1886 3.93183 22.604C2.83862 22.0193 1.98066 21.1614 1.39601 20.0682C0.811353 18.975 0.5 17.8906 0.5 14.9003V9.0997C0.5 6.1094 0.811353 5.02504 1.39601 3.93183C1.98066 2.83862 2.83862 1.98066 3.93183 1.39601C5.02504 0.811353 6.1094 0.5 9.0997 0.5ZM11 7.55615C11 7.00387 11.4477 6.55615 12 6.55615C12.5523 6.55615 13 7.00387 13 7.55615V11.0469H16.4906C17.0429 11.0469 17.4906 11.4946 17.4906 12.0469C17.4906 12.5992 17.0429 13.0469 16.4906 13.0469H13V16.5374C13 17.0897 12.5523 17.5374 12 17.5374C11.4477 17.5374 11 17.0897 11 16.5374V13.0469H7.5094C6.95711 13.0469 6.5094 12.5992 6.5094 12.0469C6.5094 11.4946 6.95711 11.0469 7.5094 11.0469H11V7.55615Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-content_content-wrapper mobile">
                            <div className="dashboard-content__content__content-container mobile">
                                <div className="dashboard-content__controls-container">
                                    <div className="dashboard-content__controls_header mobile">
                                        <div className="dashboard-content__controls_tabs-container mobile">
                                            {this.state.inputVisible ?
                                                <div className="dashboard-content__control_search-control_container mobile">
                                                    <div className="input__back-arrow" onTouchStart={this.closeSearchInput}>
                                                        <svg version="1.1" width={12} height={12} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 129 129">
                                                            <g>
                                                                <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <input className="textinput-control mobile" placeholder="" id='search-input' />
                                                </div>
                                                :
                                                <ul className="dashboard-content__controls_item-wrapper mobile">
                                                    {this.state.tabsDict.map((elem) => {
                                                        return (
                                                            <div
                                                                className={"tabs-item mobile" + (elem.first ? " tabs-item-first" : "") + (this.props.activeTab === elem.key ? " tabs-item-active" : "")}
                                                                onTouchEnd={elem.switch}
                                                                key={elem.key}
                                                            >
                                                                {elem.title}
                                                            </div>
                                                        )
                                                    })}

                                                </ul>
                                            }
                                        </div>
                                        <div className="dashboard-content__controls_find-wrapper mobile">
                                            {this.props.needsDragnDrop ?
                                                <button className="dashboard-content__save-button mobile" onTouchStart={this.onSave}>
                                                    {this.state.deviceType === "desktop" ?
                                                        <span className="dashboard-content__save-button_text">
                                                            Сохранить
                                                        </span>
                                                        :
                                                        <svg viewBox='0 0 24 24' fill='none' width={24} height={24} xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M17 20.75H7C6.27065 20.75 5.57118 20.4603 5.05546 19.9445C4.53973 19.4288 4.25 18.7293 4.25 18V6C4.25 5.27065 4.53973 4.57118 5.05546 4.05546C5.57118 3.53973 6.27065 3.25 7 3.25H14.5C14.6988 3.25018 14.8895 3.32931 15.03 3.47L19.53 8C19.6707 8.14052 19.7498 8.33115 19.75 8.53V18C19.75 18.7293 19.4603 19.4288 18.9445 19.9445C18.4288 20.4603 17.7293 20.75 17 20.75ZM7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H17C17.3315 19.25 17.6495 19.1183 17.8839 18.8839C18.1183 18.6495 18.25 18.3315 18.25 18V8.81L14.19 4.75H7Z' fill='#000000' /><path d='M16.75 20H15.25V13.75H8.75V20H7.25V13.5C7.25 13.1685 7.3817 12.8505 7.61612 12.6161C7.85054 12.3817 8.16848 12.25 8.5 12.25H15.5C15.8315 12.25 16.1495 12.3817 16.3839 12.6161C16.6183 12.8505 16.75 13.1685 16.75 13.5V20Z' fill='#000000' /><path d='M12.47 8.75H8.53001C8.3606 8.74869 8.19311 8.71403 8.0371 8.64799C7.88109 8.58195 7.73962 8.48582 7.62076 8.36511C7.5019 8.24439 7.40798 8.10144 7.34437 7.94443C7.28075 7.78741 7.24869 7.61941 7.25001 7.45V4H8.75001V7.25H12.25V4H13.75V7.45C13.7513 7.61941 13.7193 7.78741 13.6557 7.94443C13.592 8.10144 13.4981 8.24439 13.3793 8.36511C13.2604 8.48582 13.1189 8.58195 12.9629 8.64799C12.8069 8.71403 12.6394 8.74869 12.47 8.75Z' fill='#000000' />
                                                        </svg>
                                                    }
                                                </button>
                                                :
                                                <button className="dashboard-content__save-button mobile search-btn" onTouchStart={this.openSearchInput}>
                                                    <svg enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false">
                                                        <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                                                    </svg>
                                                </button>

                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="dashboard__articles_items-layout mobile">


                                <div className="dashboard__articles_items-container">
                                    {this.props.needsDragnDrop ?
                                        <DragDropContext onDragEnd={this.onDragEnd}>
                                            <Droppable
                                                droppableId="droppable"
                                                direction="vertical"
                                            >
                                                {(provided) => (
                                                    <div className="articles_content_container"
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {this.state.items.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <this.props.elem
                                                                        deviceType={this.state.deviceType}
                                                                        this_item={item}
                                                                        provided={provided}
                                                                        snapshot={snapshot}
                                                                        showNotification={this.props.showNotification}
                                                                        type={this.props.type}
                                                                        needsPrice={this.props.needsPrice}
                                                                    />
                                                                )}
                                                            </Draggable>
                                                        )
                                                        )}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                        :
                                        <div className="articles_content_container">
                                            {this.state.items.map(item => {
                                                return (
                                                    <this.props.elem
                                                        deviceType={this.state.deviceType}
                                                        key={item.id}
                                                        this_item={item}
                                                        showNotification={this.props.showNotification}
                                                    />
                                                )
                                            })}

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(DashboardContentLayout)