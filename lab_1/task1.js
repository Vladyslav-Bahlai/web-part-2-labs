function splitIntoWords(sentence) {
    if (!sentence || typeof sentence !== "string") {
        console.log("Error: enter a valid string");
        return;
    }

    let words = sentence.split(' ');
    console.log(words);
}

splitIntoWords("This is an amazing sentence");
splitIntoWords("");
splitIntoWords(5);

module.exports = {
    splitIntoWords,
}