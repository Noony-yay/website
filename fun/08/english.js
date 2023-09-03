class Word {
    constructor(english, hebrew) {
        this.english = english;
        this.hebrew = hebrew;
        this.numCorrect = 0;
        this.numIncorrect = 0;
    }
}

var words = [
    new Word("add", "להוסיף"),
    new Word("afraid", "מפחד"),
    new Word("alligator", "תנין"),
    new Word("ant", "נמלה"),
    new Word("apple", "תפוח"),
    new Word("arm", "זרוע"),
    new Word("ask", "לשאול"),
    new Word("baby", "תינוק"),
    new Word("bad", "רע"),
    new Word("bag", "תיק"),
    new Word("ball", "כדור"),
    new Word("balloon", "בלון"),
    new Word("banana", "בננה"),
    new Word("bat", "עטלף"),
    new Word("bed", "מיטה")
];

var selectedWord;
var numCorrectAnswers = 0;
var numQuestionsAsked = 0;
function gid(id) {
    return document.getElementById(id);
}

function again() {
    randomWord();
    gid('finished-button').style.display = 'block';
    gid('wrong-answer-container').style.display = 'none';
    gid('right-answer-container').style.display = 'none';
    gid('continue-button').style.display = 'none';
    gid('translation').value = '';
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max);
}
function randomWord() {
    var englishWord = gid('english-word');
    var wordIndex = getRandomInt(words.length);
    selectedWord = words[wordIndex];
    englishWord.innerHTML = selectedWord.english;
}
function answered() {
    gid('finished-button').style.display = 'none';
    var answer = gid('translation').value;
    var cell = gid('cell' + numQuestionsAsked);
    if (answer == selectedWord.hebrew) {
        var rightAnswer = gid('right-answer-container');
        rightAnswer.style.display = 'block';
        cell.style.backgroundColor = '#00c300';
        numCorrectAnswers += 1;
        selectedWord.numCorrect += 1;
    }
    else {
        gid('right-answer').innerHTML = selectedWord.hebrew;
        var wrongAnswer = gid('wrong-answer-container');
        wrongAnswer.style.display = 'block';
        cell.style.backgroundColor = '#e70000';
        selectedWord.numIncorrect += 1;
    }
    gid('continue-button').style.display = 'block';
    numQuestionsAsked +=1;
    if (numQuestionsAsked == 10) {
        finished();
    }
}
function finished() {
    gid('all-beginning').style.display = 'none';
    gid('num-correct-questions').innerHTML = numCorrectAnswers;
    if (numCorrectAnswers < 5) {
        gid('summary-title').innerHTML = 'אויה!';
        gid('only').innerHTML = 'רק ';
    }
    else {
        gid('summary-title').innerHTML = 'כל הכבוד!';
    }
    gid('all-end').style.display = 'flex';
}