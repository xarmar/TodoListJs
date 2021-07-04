export const helperfunction = (() => {

    const appendMultipleNodesToParent = (parentNode, ...childNodes) => {
        childNodes.forEach(child => {
            parentNode.append(child);
        });
    }

    const removeChildNodes = (parentNode) => {
        while(parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    }

    const isBlank = ch => {
        return ch.match(/^\s*$/i) !== null;
    }

    
    const currentDate = () => {
        let currentDate = new Date();
        let cYear = currentDate.getFullYear();
        
        let month = currentDate.getMonth() + 1;
        let cMonth;
        if (month < 10) {
            cMonth = '0' + month;
        }
        else {
            cMonth = month
        }

        let cDay;
        let day = currentDate.getDate();
        if (day < 10) {
            cDay = '0' + day;
        }
        else {
            cDay = day
        }
        
        let today:string = cYear + '-' + cMonth + '-' + cDay ;
        return today;


    }

    const insertAfterReferenceNode = (newNode, referenceNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    return {
        appendMultipleNodesToParent: appendMultipleNodesToParent,
        removeChildNodes: removeChildNodes,
        isBlank: isBlank,
        currentDate: currentDate,
        insertAfter: insertAfterReferenceNode
    }

})();





