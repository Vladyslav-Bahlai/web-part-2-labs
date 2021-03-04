
function getDaysNumber(month, year) {

    if (!month || typeof month !== "string" || !months[month])
        return "Error: Invalid month"

    if (typeof year !== "number" || year <= 0)
        return "Error: Invalid year"

    const monthVal = months[month];

    if (monthVal % 2 === 0) {
        // if its feb, return 28 or 29 depending on year
        if (monthVal === 2)
            return year % 4 === 0 ? 29 : 28;
        // if its aug, return 31
        else if (monthVal === 8)
            return 31;
        else
            return 30;
    } else
        return 31;
}

const months = {
    "january" : 1,
    "february" : 2,
    "march" : 3,
    "april" : 4,
    "may" : 5,
    "june" : 6,
    "july" : 7,
    "august" : 8,
    "september" : 9,
    "october" : 10,
    "november" : 11,
    "december" : 12,
}

console.log(getDaysNumber("hello", 2019));
console.log(getDaysNumber("february", 2020));
console.log(getDaysNumber("february", 2019));
console.log(getDaysNumber("august", 2019));
console.log(getDaysNumber("april", 2019));
console.log(getDaysNumber("september", -2019));

module.exports = {
    getDaysNumber,
}