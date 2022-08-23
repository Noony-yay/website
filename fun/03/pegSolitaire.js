function allowDrop(event) {
    event.preventDefault();
}
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    var idSource = event.dataTransfer.getData("text");
    var target = event.target;
    var idTarget = target.id;
    target.outerHTML = '<div id="' + idTarget + '" class="peg" draggable="true" ondragstart="dragStart(event);"></div>';
    var source = document.getElementById(idSource);
    source.outerHTML = '<div id="' + idSource + '" class="empty-slot" ondragover="allowDrop(event);" ondrop="drop(event);"></div>';
}