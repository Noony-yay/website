function coronaClick(coronaWrapper) {
    var newOuter = '<div class="corona-wrapper">';
    newOuter += '<div class="corona-container">';
    newOuter += coronaWrapper.outerHTML;
    newOuter += coronaWrapper.outerHTML;
    newOuter += '</div></div>';
    coronaWrapper.outerHTML = newOuter;
}