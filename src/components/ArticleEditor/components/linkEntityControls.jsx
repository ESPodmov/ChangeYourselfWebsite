import React from "react";
import StyleButton from "./styleButton";

const LINK_ENTITY_VARIABLES = { name: 'Link', className: 'editor-toolbar-button_type_link editor-toolbar-button_type_last', style: 'LINK' }

export default function LinkEntity(props) {
    return (
        <div className="editor-toolbar__link-tools">
            <StyleButton
                key={LINK_ENTITY_VARIABLES.name}
                active={props.linkIsActive(props.editorState)}
                onToggle={props.onToggle}
                style={LINK_ENTITY_VARIABLES.style}
                class={LINK_ENTITY_VARIABLES.className}
                mobile={props.mobile}
            />
        </div>
    )
}