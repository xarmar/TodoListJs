export const appendMultipleNodesToParent = (parentNode, ...childNodes) => {
    childNodes.forEach(child => {
        parentNode.append(child);
    });
}