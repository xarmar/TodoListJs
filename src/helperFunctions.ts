export const appendMultipleNodesToParent = (parentNode, ...childNodes) => {
    childNodes.forEach(child => {
        parentNode.append(child);
    });
}

export const removeChildNodes = (parentNode) => {
    while(parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

export const isBlank = ch => {
	return ch.match(/^\s*$/i) !== null;
}