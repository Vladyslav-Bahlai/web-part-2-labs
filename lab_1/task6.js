function performQuickSort(array) {
    if (!Array.isArray(array))
        return "Error: pass valid array";
    else if (array.length < 2) {
        return array;
    }
    return quicksort(array);
}

function quicksort(array) {
    // one element array is sorted by definition
    if (array.length < 2)
        return array;

    let result = [];
    let pivotIndex = getPivotIndex(array);
    let {left, right} = performPartition(array, pivotIndex);
    // used concat due to strange array behaviour in javascript
    result = result.concat(quicksort(left), quicksort(right))

    return result;
}

function getPivotIndex(array) {
    // get the last element as a pivot
    return array.length - 1;
}

function performPartition(array, pivotIndex) {
    const pivot = array[pivotIndex];

    for (let i = 0; i < array.length; ++i) {
        for (let j = 0; j < pivotIndex; ++j) {
            // swaps pivot elem with its left-side neighbour
            // then swaps target elem with this neighbour on its new position
            if (array[j] > pivot) {
                let elem = array[j];
                array[j] = array[pivotIndex - 1];
                array[pivotIndex - 1] = pivot;
                array[pivotIndex] = elem;
                pivotIndex--;
                break;
            }
        }
    }

    // makes pivot element the first elem in right array
    return {
        left: array.slice(0, pivotIndex),
        right: array.slice(pivotIndex, array.length)
    }
}


console.log(performQuickSort([3, 7, 8, 5, 2, 1, 9, 5, 4]));
console.log(performQuickSort([1]));
console.log(performQuickSort([3, 2]));
console.log(performQuickSort([]));
console.log(performQuickSort("hello there"));

module.exports = {
    performQuickSort,
}
