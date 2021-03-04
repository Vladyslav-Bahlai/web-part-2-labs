
function findMostFrequentElement(elements) {

    if (!Array.isArray(elements) || elements.length < 1)
        return "Error: pass a valid array"
    else if (elements.length < 2) {
        return {elem: elements[0], count: 1};
    }

    let checkedElements = [];

    for (let i = 0; i < elements.length; ++i) {
        if (checkedElements.some(value => value.elem === elements[i])) {
            continue;
        }
        let count = 1;
        for (let j = i + 1; j < elements.length; ++j) {
             if (elements[i] === elements[j])
                 count++;
        }
        checkedElements.push({
            elem: elements[i],
            count,
        })
    }

    return checkedElements.reduce((prev, current) => (prev.count > current.count) ? prev : current);
}

console.log(findMostFrequentElement([1, 5, 5, 1, 1, 3, 4, 5, 0, 1]));
console.log(findMostFrequentElement([]));
console.log(findMostFrequentElement("hello there"));

module.exports = {
    findMostFrequentElement,
}