function topclick() {
    var topbutton = document.getElementById('topbutton');
    var bottombutton = document.getElementById('bottombutton');
    topbutton.style.opacity = '0%';
    bottombutton.style.opacity = '100%';
    topbutton.onclick = topclicksecondtime;
}
function bottomclick(){
    var topbuttontext = document.getElementById('topbuttontext');
    var topbutton = document.getElementById('topbutton');
    var bottombutton = document.getElementById('bottombutton');
    topbutton.style.opacity = '100%';
    bottombutton.style.opacity = '0%';
    topbuttontext.innerHTML = 'No! Me!!';
    bottombutton.onclick = bottomclicksecondtime;
}
function topclicksecondtime() {
    var topbutton = document.getElementById('topbutton');
    var bottombutton = document.getElementById('bottombutton');
    var bottombuttontext = document.getElementById('bottombuttontext');
    topbutton.style.opacity = '0%';
    bottombutton.style.opacity = '100%';
    bottombuttontext.innerHTML = "Don't listen to him!<br/>Click me!";
}
function bottomclicksecondtime() {
    var all = document.getElementById('all');
    var topbutton = document.getElementById('topbutton');
    var bottombutton = document.getElementById('bottombutton');
    var bottombuttontext = document.getElementById('bottombuttontext');
    var topbuttontext = document.getElementById('topbuttontext');
    topbutton.style.opacity = '100%';
    bottombuttontext.innerHTML = "Hmmm...";
    topbuttontext.innerHTML = "Hmmm...";
    topbutton.onclick = '';
    bottombutton.onclick = '';
    all.style.display = 'flex';
}
function middleclick() {
    var bottombuttontext = document.getElementById('bottombuttontext');
    var middlebutton = document.getElementById('middlebutton');
    var middlebuttontext = document.getElementById('middlebuttontext');
    var topbuttontext = document.getElementById('topbuttontext');
    bottombuttontext.innerHTML = "Hey!";
    topbuttontext.innerHTML = "What?!";
    middlebuttontext.innerHTML = "Yeah, I'm the best of all, click me again!";
    middlebutton.onclick = middleclicksecondtime;
}
function middleclicksecondtime() {
    var all = document.getElementById('all');
    var bottombuttontext = document.getElementById('bottombuttontext');
    var middlebuttontext = document.getElementById('middlebuttontext');
    var topbuttontext = document.getElementById('topbuttontext');
    bottombuttontext.innerHTML = "I'm melting!!";
    topbuttontext.innerHTML = "Help!!";
    all.style.backgroundColor = 'black';
    middlebuttontext.innerHTML = 'Moohahahaha!!!'
}