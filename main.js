var Config = {};
		Config.pixelsPerInch = 96;
		Config.pageHeightInCentimeter = 29.7; // must match 'min-height' from 'css/sheets-of-paper-*.css' being used
		Config.pageMarginBottomInCentimeter = 2; // must match 'padding-bottom' and 'margin-bottom' from 'css/sheets-of-paper-*.css' being used

var tgpy = 0; //This is the variable that will be used to determine which typography to use
var editor = document.getElementById("document");
var currentFormat = document.getElementById("currentFormat");

const timer = new Date();
var hh = timer.getHours();
var mm = timer.getMinutes();

window.addEventListener("DOMContentLoaded", function () {;
    setTime();
    updateDivContent();
});

//Syntax
var syntax = {
    "-":"<p style='margin-left:9cm;' class='character'>",
   "_":"<p style='margin-left:6.8cm; text-decoration:none; padding:0; margin-right:6.1cm;'>",
   "=": "<p style='margin-left:4.3cm;'>",
   "&": "<p style='margin-left:2.5cm;'>",
   "title:": "<p style='text-align:center;' class='cover'>",
   "subtitle:": "<p style='text-align:center;'>",
   "{": "<p style='margin-left:8.6cm;'>(",
   "}": ")</p>",
   "<<<": "<div class='pagebreak'> </div>",
   "\n": "<br>"
};

var docContent; 

function updateDivContent() {
    docContent = document.querySelector('textarea').value;
    var t = docContent.replace(/-|_|=|&|title:|subtitle:|{|}|<<<|\n/gi, function(matched){
        return syntax[matched];
      });
    document.getElementById('result').innerHTML = t;

    document.getElementsByClassName('character').innerHTML.toUpperCase();

}

function setTime () {
  
    const today = new Date();
    let h = today.getHours() - hh;
    let m = today.getMinutes() - mm;
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h);
    document.getElementById("time").innerHTML =  h + ":" + m + ":" + s;
    //document.getElementById("pageNumber").innerHTML = document.getElementsByClassName("page").length; 
    setTimeout(() => {
        setTime();
    }, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function setTypography (index){

    tgpy = index;
    let command = "";
    var t = document.getElementById("page");
    switch (tgpy){
        case 1: command = "bold";
                break;
        case 2: command = "italic";
                break;
        case 3: command = "underline";
                break;               
    }
    
    t = document.getElementById(command);
    //t.classList.contains("active") ? t.classList.remove("active") : t.classList.add("active");  
    document.execCommand(command);
    editor.focus();
}

function setFormat (index) {

    switch (index){

        case 0: currentFormat.innerHTML = "Act"; break;
        case 1: currentFormat.innerHTML = "Scene title"; break;
        case 2: currentFormat.innerHTML = "Action";break;
        case 3: currentFormat.innerHTML = "Character"; command = "justifyCenter"; break;
        case 4: currentFormat.innerHTML = "Dialogue"; command = "underline"; break;
        case 5: currentFormat.innerHTML = "Transition";break;
        case 6: currentFormat.innerHTML = "Take";break;
        case 7: currentFormat.innerHTML = "Text"; break;
    }

    document.execCommand(command);
    editor.focus();
}

function exportPDF () {

    var content = document.getElementById("result").innerHTML;
    var result = window.open('');
    result.document.write('<head><title>LibreScript</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"><link href="css/sheet.css" rel="stylesheet"></head><body><div>'+content+'</div><script></script><body/>');
    setTimeout(() => {
        result.print();
        result.close();
    }, 350);
}