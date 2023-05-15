function answered() {
    var form = document.getElementById("form");
    var yorn = document.getElementById("y-or-n").value;
    var yes = document.getElementById("right-answer");
    var no = document.getElementById("wrong-answer");
    var what = document.getElementById("what");
    if (yorn == "כן") {
        yes.style.display = "block";
        form.style.display = "none";
        what.style.display = "none";
    }
    else if (yorn == "לא") {
        no.style.display = "block";
        form.style.display = "none";
        what.style.display = "none";
    }
    else {
        what.style.display = "block";
    }
}