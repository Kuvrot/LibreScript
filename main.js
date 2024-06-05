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
    
    //Default value
    document.getElementById("input").value = "title: Script name... \n subtitle: Author name... \n <<<";
    
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


//ScriptDown intepreter
var docContent; 
function updateDivContent() {
    docContent = document.querySelector('textarea').value;
    var t = docContent.replace(/-|_|=|&|title:|subtitle:|{|}|<<<|\n/gi, function(matched){
        return syntax[matched];
      });
    document.getElementById('result').innerHTML = t;

    document.getElementsByClassName('character').innerHTML.toUpperCase();

}

//Consideration clock 
function setTime () {
  
    const today = new Date();
    let h = today.getHours() - hh;
    let m = today.getMinutes() - mm;
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h);
    document.getElementById("time").innerHTML =  h + ":" + m + ":" + s;
    setTimeout(() => {
        setTime();
    }, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//Header methods

// This sets the font for the scripting div 
// (change the name of the method to "setFont" in the future)
function setFormat (index) {
    var fontName = "";

    switch (index){

        case 0: fontName = "Consolas"; break;
        case 1: fontName = "Courier new"; break;
        case 2: fontName = "Hack";break;
        case 3: fontName = "Arial"; break;
    }

    currentFormat.innerHTML = fontName;    
    document.getElementById("input").style = "font-family:" + fontName;
}

//File handling
function exportPDF () {
    var content = document.getElementById("result").innerHTML;
    var result = window.open('');
    result.document.write('<head><title>LibreScript</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"><link href="css/sheet.css" rel="stylesheet"></head><body><div style="margin-top:2.5cm;">'+content+'</div><script></script><body/>');
    setTimeout(() => {
        result.print();
        result.close();
    }, 350);
}

function saveFile (){

}

function openFile (){

}



