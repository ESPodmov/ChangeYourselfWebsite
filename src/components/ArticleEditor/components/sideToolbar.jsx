import React, { useEffect, useState } from "react";

export default class SideToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            tooltipPosition: { top: 0, left: 0 },
            style: { top: null, display: "none" },
        }
    }

    componentDidUpdate(prevProps) {
        const prevSideToolbar = prevProps.sideToolbar
        const currentSideToolbar = this.props.sideToolbar
        if (currentSideToolbar !== undefined && (prevSideToolbar === undefined || prevSideToolbar.blockKey !== currentSideToolbar.blockKey || prevSideToolbar.display !== currentSideToolbar.display)) {
            let style = {};
            if (prevSideToolbar.blockKey !== currentSideToolbar.blockKey && currentSideToolbar.blockKey !== undefined) {
                const editorRect = document.getElementsByClassName("editor__main-editor")[0].getBoundingClientRect()
                const currentBlockElem = document.querySelector(`[data-offset-key="${currentSideToolbar.blockKey}-0-0"]`);
                if (currentBlockElem === null) {
                    style = {
                        display: "none",
                        top: 0
                    }
                } else {
                    const currentBlockRect = currentBlockElem.getBoundingClientRect();
                    style = {
                        display: currentSideToolbar.display,
                        top: currentBlockRect.top - editorRect.top
                    }
                }
            } else {
                style = {
                    display: this.props.sideToolbar.display
                }
            }
            this.setState({ style })
        }
    }

    _setHovered = (isHovered) => {
        this.setState({ hovered: isHovered })
    }

    handleMouseMove = (e) => {
        const blockRect = e.currentTarget.getBoundingClientRect()
        this.setState({
            tooltipPosition: {
                top: e.clientY - blockRect.top,
                left: e.clientX - blockRect.left,
            }
        })
    }

    render() {
        return (
            <div className="side-toolbar" style={this.state.style}
                onMouseEnter={() => this._setHovered(true)}
                onMouseLeave={() => this._setHovered(false)}
                onMouseMove={this.handleMouseMove}
            >
                <button className="side-button side-toolbar-button_type_image" onMouseDown={this.props.onClick}>
                </button>
                {this.state.hovered && (
                    <div className='tooltip' style={this.state.tooltipPosition}>
                        Вставить изображение
                    </div>
                )}
            </div>
        )
    }


}