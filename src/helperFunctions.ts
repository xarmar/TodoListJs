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

export const currentDate = () => {
    let currentDate = new Date();
    let cYear = currentDate.getFullYear();
    let cMonth = currentDate.getMonth() + 1;
    let cDay = currentDate.getDate();
    let today:string = cYear + '-' + cMonth + '-' + cDay ;
    return today;
}