class Word {
    constructor(english, hebrew) {
        this.english = english;
        this.hebrew = hebrew;
        this.numCorrect = 0;
        this.numIncorrect = 0;
    }

    weight() {
        return Math.pow(0.9, this.numCorrect) * Math.pow(1.2, this.numIncorrect);
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

function saveCookie() {
    var dictionary = {};
    for (var i = 0; i < words.length; i++) {
        dictionary[words[i].english] = {
            "numCorrect": words[i].numCorrect,
            "numIncorrect": words[i].numIncorrect};
    }
    document.cookie = 'history=' + JSON.stringify(dictionary) + '; max-age=3153600000'
}

function loadCookie() {
    if (document.cookie == '') {
        return;
    }
    // var history = the cookie, but without the beginning: "history="
    var userCookieHistory = document.cookie.substring(8);
    userCookieHistory = JSON.parse(userCookieHistory);
    for (var i = 0; i < words.length; i++) {
        if (words[i].english in userCookieHistory) {
            words[i].numCorrect = userCookieHistory[words[i].english]["numCorrect"];
            words[i].numIncorrect = userCookieHistory[words[i].english]["numIncorrect"];
        }
    }
}

var selectedWord;
var numCorrectAnswers = 0;
var numQuestionsAsked = 0;
function gid(id) {
    return document.getElementById(id);
}

function again() {
    selectAndShowRandomWord();
    gid('finished-button').style.display = 'block';
    gid('wrong-answer-container').style.display = 'none';
    gid('right-answer-container').style.display = 'none';
    gid('continue-button').style.display = 'none';
    gid('translation').value = '';
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max);
}

function getRandomWord() {
    var r = Math.random();
    var sum = 0;
    for (var i = 0; i<words.length; i++) {
        sum += words[i].weight();
    }
    var d = r * sum;
    for (var i = 0; i<words.length; i++) {
        if (d < words[i].weight()) {
            return i;
        }
        d -= words[i].weight();
    }
}

function selectAndShowRandomWord() {
    loadCookie();
    var englishWord = gid('english-word');
    var wordIndex = getRandomWord();
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
    saveCookie();
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