function coronaClick(coronaWrapper) {
    var newOuter = '<div class="corona-wrapper">';
    newOuter += '<div class="corona-container">';
    newOuter += coronaWrapper.outerHTML;
    newOuter += coronaWrapper.outerHTML;
    newOuter += '</div></div>';
    coronaWrapper.outerHTML = newOuter;
}
function coronaDrag(coronaWrapper) {
    var newInner = '<img src="coronaWithMask.png" class="corona-image"/>';
    coronaWrapper.innerHTML = newInner;
    setTimeout(disappear, 4000, coronaWrapper);
    coronaWrapper.onclick = '';
}
function disappear(coronaWrapper) {
    coronaWrapper.style.opacity = '0%';
}