import React from 'react';
import { SelectionState, EditorState } from 'draft-js';

export default class MobileLinkTip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLink: props.currentLink,
            style: props.style,
        }
    }

    componentDidUpdate(prevProps) {
        const previousLink = prevProps.currentLink
        const currentLink = this.props.currentLink
        const currentPosition = this.props.style
        const previousPosition = prevProps.style

        if (currentPosition !== undefined && (previousPosition === undefined || previousPosition.top !== currentPosition.top || previousPosition.left !== currentPosition.left)) {
            this.setState({
                style: currentPosition
            })
        }

        if (currentLink !== undefined && currentLink !== null && currentLink !== previousLink) {
            this.setState({
                currentLink: currentLink
            })
        }
    }

    openLinkInput = () => {
        this.props.openLinkInput(this.state.currentLink)
    }

    openLink = (e) => {
        e.preventDefault();
        window.open(this.state.currentLink, '_blank');
    }

    render() {
        return (
            <div className='editor-toolbar editor-toolbar_visible editor-toolbar_link-tip mobile' style={this.state.style}>
                <div className='editor-toolbar__controls common-padding'>
                    <div className='editor-toolbar__button needs-delim mobile' onMouseDown={this.openLinkInput}>Изменить ссылку</div>
                    <a className='editor-toolbar__button mobile' href={this.state.currentLink} onClick={this.openLink}>Открыть</a>
                </div>
            </div>
        )
    }
}