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
function gid(id) {
    return document.getElementById(id);
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max);
}
function randomWord() {
    var englishWord = gid('english-word');
    selectedWord = words[getRandomInt(words.length)];
    englishWord.innerHTML = selectedWord[0]
}
function answered() {
    gid('finished-button').style.display = 'none';
    var answer = gid('translation').value;
    if (answer == selectedWord[1]) {
        var rightAnswer = gid('right-answer-container');
        rightAnswer.style.display = 'block';
    }
    else {
        gid('right-answer').innerHTML = selectedWord[1];
        var wrongAnswer = gid('wrong-answer-container');
        wrongAnswer.style.display = 'block';
    }
}