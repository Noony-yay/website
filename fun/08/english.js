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
    new Word("bed", "מיטה"),
    new Word('best', 'הכי טוב'),
    new Word('big', 'גדול'),
    new Word('black', 'שחור'),
    new Word('blue', 'כחול'),
    new Word('book', 'ספר'),
    new Word('bread', 'לחם'),
    new Word('brother', 'אח'),
    new Word('brown', 'חום'),
    new Word('bus', 'אוטובוס'),
    new Word('but', 'אבל'),
    new Word('cake', 'עוגה'),
    new Word('camp', 'מחנה'),
    new Word('cat', 'חתול'),
    new Word('chair', 'כיסא'),
    new Word('cloud', 'ענן'),
    new Word('clown', 'ליצן'),
    new Word('cold', 'קר'),
    new Word('dog', 'כלב'),
    new Word('door', 'דלת'),
    new Word('duck', 'ברווז'),
    new Word('ear', 'אוזן'),
    new Word('egg', 'ביצה'),
    new Word('eight', 'שמונה'),
    new Word('elephant', 'פיל'),
    new Word('end', 'סוף'),
    new Word('eye', 'עין'),
    new Word('family', 'משפחה'),
    new Word('farm', 'חווה'),
    new Word('five', 'חמש'),
    new Word('flour', 'קמח'),
    new Word('four', 'ארבע'),
    new Word('friend', 'חבר'),
    new Word('fun', 'כיף'),
    new Word('gift', 'מתנה'),
    new Word('glue', 'דבק'),
    new Word('green', 'ירוק'),
    new Word('guitar', 'גיטרה'),
    new Word('hair', 'שיער'),
    new Word('hand', 'יד'),
    new Word('happy', 'שמח'),
    new Word('hat', 'כובע'),
    new Word('he', 'הוא'),
    new Word('head', 'ראש'),
    new Word('hot', 'חם'),
    new Word('home', 'בית'),
    new Word('I', 'אני'),
    new Word('if', 'אם'),
    new Word('job', 'עבודה'),
    new Word('jump', 'לקפוץ'),
    new Word('king', 'מלך'),
    new Word('kitchen', 'מטבח'),
    new Word('leg', 'רגל'),
    new Word('lemon', 'לימון'),
    new Word('library', 'ספרייה'),
    new Word('lion', 'אריה'),
    new Word('list', 'רשימה'),
    new Word('listen', 'להקשיב'),
    new Word('living room', 'סלון'),
    new Word('long', 'ארוך'),
    new Word('man', 'איש'),
    new Word('milk', 'חלב'),
    new Word('monkey', 'קוף'),
    new Word('mouth', 'פה'),
    new Word('net', 'רשת'),
    new Word('nine', 'תשע'),
    new Word('no', 'לא'),
    new Word('nose', 'אף'),
    new Word('one', 'אחד'),
    new Word('pen', 'עט'),
    new Word('pencil', 'עיפרון'),
    new Word('pet', 'חיית מחמד'),
    new Word('pink', 'ורוד'),
    new Word('pizza', 'פיצה'),
    new Word('play', 'לשחק'),
    new Word('purple', 'סגול'),
    new Word('queen', 'מלכה'),
    new Word('question', 'שאלה'),
    new Word('quiet', 'שקט'),
    new Word('rain', 'גשם'),
    new Word('read', 'לקרוא'),
    new Word('red', 'אדום'),
    new Word('roof', 'גג'),
    new Word('sad', 'עצוב'),
    new Word('scarf', 'צעיף'),
    new Word('school', 'בית ספר'),
    new Word('scissors', 'מספריים'),
    new Word('seven', 'שבע'),
    new Word('she', 'היא'),
    new Word('sister', 'אחות'),
    new Word('sit', 'לשבת'),
    new Word('six', 'שש'),
    new Word('sky', 'שמיים'),
    new Word('small', 'קטן'),
    new Word('snake', 'נחש'),
    new Word('soft', 'רך'),
    new Word('stand', 'לעמוד'),
    new Word('star', 'כוכב'),
    new Word('strong', 'חזק'),
    new Word('summer', 'קיץ'),
    new Word('sun', 'שמש'),
    new Word('surprised', 'מופתע'),
    new Word('swim', 'לשחות'),
    new Word('tail', 'זנב'),
    new Word('tall', 'גבוה'),
    new Word('teacher', 'מורה'),
    new Word('ten', 'עשר'),
    new Word('three', 'שלוש'),
    new Word('tree', 'עץ'),
    new Word('two', 'שתיים'),
    new Word('white', 'לבן'),
    new Word('wind', 'רוח'),
    new Word('window', 'חלון'),
    new Word('winter', 'חורף'),
    new Word('woman', 'אישה'),
    new Word('yellow', 'צהוב'),
    new Word('yes', 'כן'),
    new Word('zebra', 'זברה'),
    new Word('zero', 'אפס'),
    new Word('zoo', 'גן חיות'),
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