import React from "react";

export default class ListsButton extends React.Component {
    constructor(props) {
        super(props);
        this.default = 'unordered-list-item'
        this.secondary = 'ordered-list-item'
        this.state = {
            style: this.default,
            className: `editor-toolbar-button mobile`,
            active: false
        }
    }

    componentDidUpdate(prevProps) {
        const prevActive = prevProps.active;
        const currentActive = this.props.active
        const stylesArray = [this.default, this.secondary]
        if (stylesArray.includes(currentActive) && prevActive !== currentActive) {
            this.setState({
                className: this.state.className.concat(' editor-toolbar-button_active'),

                active: true
            })
        }
        if (!stylesArray.includes(currentActive) && this.state.className.includes(' editor-toolbar-button_active')) {
            this.setState({
                className: this.state.className.replace(' editor-toolbar-button_active', ""),
                active: false,
                style: this.default
            })
        }
    }

    onToggle = (event) => {
        event.preventDefault();
        if (this.state.active) {
            if (this.state.style === this.default) {
                this.setState({ style: this.secondary })
                this.props.onToggle(this.secondary);
            } else {
                this.setState({ style: this.default })
                this.props.onToggle(this.default);
            }
        } else {
            this.props.onToggle(this.state.style);
        }
    }

    render() {
        return (
            <div
                className={this.state.className}
                onTouchStart={this.onToggle}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" id="mobile-editor-ul_fc21--react">
                    <path opacity={this.state.style === this.secondary ? 1 : 0.4} d="M7.47431 22.8H5.71431V17.52L4.05031 19.056V17.248L5.85831 15.568H7.47431V22.8Z" fill="currentColor"></path>
                    <rect opacity={this.state.style === this.default ? 1 : 0.4} x="4" y="7" width="4" height="4" rx="1" fill="currentColor"></rect>
                    <rect opacity={this.state.style === this.default ? 1 : 0.4} x="12" y="8" width="12" height="2" fill="currentColor"></rect>
                    <rect opacity={this.state.style === this.secondary ? 1 : 0.4} x="12" y="18" width="12" height="2" fill="currentColor"></rect>
                </svg>
            </div>
        )
    }
}