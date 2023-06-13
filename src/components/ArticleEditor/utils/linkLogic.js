export function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

export const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <a href={url} title={url} className="inserted-link">
            {props.children}
        </a>
    );
};