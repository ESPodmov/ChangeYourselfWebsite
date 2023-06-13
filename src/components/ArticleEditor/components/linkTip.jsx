import React from 'react';
import { SelectionState, EditorState } from 'draft-js';

export default class LinkTip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLink: props.currentLink,
            style: props.style,
            toolbarClassName: props.toolbarClassName,
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
        this.props.setDefaultToolbarClassName()
    }

    render() {
        return (
            <div className={this.state.toolbarClassName} style={this.state.style}>
                <div className='editor-toolbar__controls common-padding'>
                    <div className='editor-toolbar__button needs-delim' onMouseDown={this.openLinkInput}>Изменить ссылку</div>
                    <a className='editor-toolbar__button' href={this.state.currentLink} onClick={this.openLink}>Открыть</a>
                </div>
            </div>
        )
    }
}