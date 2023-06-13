import React from "react";

export default class HeadersButton extends React.Component {
    constructor(props) {
        super(props);
        this.default = 'header-two'
        this.secondary = 'header-three'
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
        if(!stylesArray.includes(currentActive) && this.state.className.includes(' editor-toolbar-button_active')){
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
            if (this.state.style === this.default){
                this.setState({style: this.secondary})
                this.props.onToggle(this.secondary);
            } else {
                this.setState({style: this.default})
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
                    <path d="M13.188 15.224H6.80399V21H4.50499V7.377H6.80399V13.248H13.188V7.377H15.506V21H13.188V15.224Z" fill="currentColor"></path>
                    <path opacity={this.state.style===this.default ? 1: 0.4} d="M24.4052 13H18.7772V11.416C19.4972 10.88 20.1052 10.404 20.6012 9.988C21.1052 9.572 21.5092 9.192 21.8132 8.848C22.1172 8.504 22.3372 8.18 22.4732 7.876C22.6092 7.572 22.6772 7.256 22.6772 6.928C22.6772 6.528 22.5572 6.216 22.3172 5.992C22.0852 5.76 21.7572 5.644 21.3332 5.644C20.9092 5.644 20.5012 5.736 20.1092 5.92C19.7252 6.104 19.3612 6.348 19.0172 6.652V5.14C19.3532 4.884 19.7172 4.68 20.1092 4.528C20.5092 4.368 20.9972 4.288 21.5732 4.288C21.9972 4.288 22.3852 4.348 22.7372 4.468C23.0892 4.58 23.3892 4.748 23.6372 4.972C23.8932 5.196 24.0892 5.472 24.2252 5.8C24.3612 6.12 24.4292 6.484 24.4292 6.892C24.4292 7.292 24.3492 7.672 24.1892 8.032C24.0372 8.392 23.8012 8.756 23.4812 9.124C23.1692 9.492 22.7692 9.88 22.2812 10.288C21.7932 10.688 21.2172 11.132 20.5532 11.62H24.4052V13Z" fill="currentColor"></path>
                    <path opacity={this.state.style===this.secondary ? 1: 0.4} d="M24.3452 21.54C24.3452 21.932 24.2692 22.288 24.1172 22.608C23.9652 22.928 23.7492 23.2 23.4692 23.424C23.1972 23.648 22.8652 23.82 22.4732 23.94C22.0812 24.06 21.6452 24.12 21.1652 24.12C20.5812 24.12 20.0852 24.052 19.6772 23.916C19.2772 23.772 18.9492 23.608 18.6932 23.424V21.972C18.8212 22.068 18.9612 22.164 19.1132 22.26C19.2732 22.356 19.4452 22.444 19.6292 22.524C19.8132 22.596 20.0172 22.66 20.2412 22.716C20.4732 22.764 20.7252 22.788 20.9972 22.788C21.5492 22.788 21.9572 22.672 22.2212 22.44C22.4852 22.2 22.6172 21.876 22.6172 21.468C22.6172 20.644 22.0852 20.232 21.0212 20.232H20.0012V18.864H21.0812C21.4652 18.864 21.7732 18.768 22.0052 18.576C22.2452 18.376 22.3652 18.088 22.3652 17.712C22.3652 17.368 22.2492 17.1 22.0172 16.908C21.7852 16.716 21.4452 16.62 20.9972 16.62C20.5412 16.62 20.1452 16.704 19.8092 16.872C19.4732 17.032 19.1652 17.22 18.8852 17.436V15.984C19.1492 15.784 19.4652 15.62 19.8332 15.492C20.2012 15.356 20.6812 15.288 21.2732 15.288C21.6972 15.288 22.0812 15.344 22.4252 15.456C22.7692 15.568 23.0612 15.724 23.3012 15.924C23.5412 16.124 23.7252 16.368 23.8532 16.656C23.9812 16.936 24.0452 17.244 24.0452 17.58C24.0452 17.844 23.9972 18.084 23.9012 18.3C23.8132 18.516 23.6932 18.708 23.5412 18.876C23.3972 19.036 23.2252 19.168 23.0252 19.272C22.8332 19.368 22.6332 19.436 22.4252 19.476C22.6812 19.516 22.9252 19.592 23.1572 19.704C23.3892 19.808 23.5932 19.948 23.7692 20.124C23.9452 20.3 24.0852 20.508 24.1892 20.748C24.2932 20.98 24.3452 21.244 24.3452 21.54Z" fill="currentColor"></path>
                </svg>
            </div>
        )
    }
}