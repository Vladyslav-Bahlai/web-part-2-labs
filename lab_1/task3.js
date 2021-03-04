
function findNumberFactorial(number) {
    if (typeof number !== "number" || number < 0) {
        return "Error: enter a valid number"
    }

    return getFactorial(number);
}

function getFactorial(number) {
    if (number <= 1)
        return 1;

    number *= getFactorial(number - 1);
    return number;
}

console.log(findNumberFactorial(5));
console.log(findNumberFactorial(0));
console.log(findNumberFactorial(-10));
console.log(findNumberFactorial("hello there"));

module.exports = {
    findNumberFactorial,
}