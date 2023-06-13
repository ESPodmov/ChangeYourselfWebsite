import React from "react";
import "../style.css"

export default class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (event) => {
            event.preventDefault();
            this.props.onToggle(this.props.style);
        }
        this.state = {
            disabled: this.props.disabled ? true : false
        }
    }

    componentDidUpdate(prevProps) {
        const prevDis = prevProps.disabled
        const curDis = this.props.disabled
        if (prevDis !== curDis) {
            this.setState({disabled: curDis})
        }
    }

    render() {
        let className = `editor-toolbar-button ${this.props.class}`;
        if (this.props.active) {
            className += ' editor-toolbar-button_active';
        }
        if (this.state.disabled) {
            className += ' disabled';
        }

        if (this.props.mobile) {
            return (
                <div className={className}
                    onTouchStart={this.onToggle}
                ></div>
            )
        } else {
            return (
                <div className={className}
                    onMouseDown={this.onToggle}
                ></div>
            )
        }

    }

}