function findAllPermutations(string) {
    if (!string || typeof string !== "string") {
        return "Error: enter a valid string";
    }
    return getPermutations(string);
}

function getPermutations(word) {
    if (word.length < 2) {
        return word;
    }

    let permutationsArray = [];

    for (let i = 0; i < word.length; ++i) {
        let char = word[i];

        // identifies if the current character has already been run through the getPermutations() method
        if (word.indexOf(char) !== i)
            continue

        let remainingChars = word.slice(0, i) + word.slice(i + 1, word.length);

        for (let permutation of getPermutations(remainingChars)) {
            permutationsArray.push(char + permutation);
        }
    }

    return permutationsArray;
}

console.log(findAllPermutations("abc"));
console.log(findAllPermutations("aabc"));
console.log(findAllPermutations(""));
console.log(findAllPermutations(5));

module.exports = {
    findAllPermutations,
}