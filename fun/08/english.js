var words = [['hello', 'שלום'],
             ['ice cream', 'גלידה'],
             ['water', 'מים'],
             ['book', 'ספר'],
             ['life', 'חיים'],
             ['man', 'איש'],
             ['woman', 'אישה'],
             ['time', 'זמן'],
             ['year', 'שנה'],
             ['week', 'שבוע'],
             ['day', 'יום'],
             ['thing', 'דבר'],
             ['world', 'עולם'],
             ['hand', 'יד'],
             ['eye', 'עין'],
             ['place', 'מקום'],
             ['point', 'נקודה'],
             ['number', 'מספר'],
             ['group', 'קבוצה'],
             ['problem', 'בעיה'],
             ['I', 'אני'],
             ['she', 'היא'],
             ['he', 'הוא'],
             ['it', 'זה'],
             ['but', 'אבל'],
             ['they', 'הם'],
             ['or', 'או']];
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
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max);
}
function randomWord() {
    var englishWord = gid('english-word');
    var wordIndex = getRandomInt(words.length);
    selectedWord = words[wordIndex];
    englishWord.innerHTML = selectedWord[0];
    words.splice(wordIndex, 1);
}
function answered() {
    gid('finished-button').style.display = 'none';
    var answer = gid('translation').value;
    if (answer == selectedWord[1]) {
        var rightAnswer = gid('right-answer-container');
        rightAnswer.style.display = 'block';
        numCorrectAnswers += 1;
    }
    else {
        gid('right-answer').innerHTML = selectedWord[1];
        var wrongAnswer = gid('wrong-answer-container');
        wrongAnswer.style.display = 'block';
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