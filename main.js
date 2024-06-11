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
    document.getElementById("input").value = "title: Script name... \n subtitle: Author name... \n <<< \n # scene header \n = this is an action \n -- character \n _ this is a dialogue";
    
    setTime();
    updateDivContent();
});

//ScriptDown syntax
var syntax = {
   "_":"<p style='margin-left:6.8cm; text-decoration:none; padding:0; margin-right:6.1cm;'>",
   "---":"<p style='margin-left:6.8cm; text-decoration:none; padding:0; margin-right:6.1cm;'>",
   "--":"<p style='margin-left:10.4cm;'><u class='character'>",
   "=": "<p style='margin-left:4.3cm;'>",
   "#": "<p style='margin-left:2.5cm;'> <strong><u class='scenes'>",
   "title:": "<p style='text-align:center;' class='cover'>",
   "subtitle:": "<p style='text-align:center;'>",
   "&" : "<p style='margin-left:15.2cm;'>",
   "{": "<p style='margin-left:8.6cm;'>(",
   "}": ")</p>",
   "<<<": "<div class='pagebreak'></div>",
   "\n": "</strong></u><br>"
};


//ScriptDown interpreter
var docContent;
var scenesCounter; 

// Using setTimeout for improving the preview performance
function updateDivContent() {
    setTimeout(()=>{
        updatePreview();
    }, 60);
}

function updatePreview (){
    docContent = document.querySelector('textarea').value;
    var t = docContent.replace(/_|---|--|=|#|title:|subtitle:|&|{|}|<<<|\n/gi, function(matched){
        return syntax[matched];
      });
    
    document.getElementById('result').innerHTML = t;
    
    //upper case characters
    let elements = document.getElementsByClassName("character");
    for (let i = 0; i < elements.length; i++) {
        let text = elements[i].innerHTML;
        let result = text.toUpperCase();
        elements[i].innerHTML = result;
    }  
    
     //upper case characters
     let scenes = document.getElementsByClassName("scenes");
     for (let i = 0; i < scenes.length; i++) {
         let text = scenes[i].innerHTML;
         let result = text.toUpperCase();
         let n = i + 1;
         scenes[i].innerHTML = n + ". " + result;
     }
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
    
        const data = document.getElementById("input").value;
        const blob = new Blob([data], { type: 'text/plain' });
    
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'NewScript.sd';
    // Append the anchor element to the body
    document.body.appendChild(a);
    
    // Trigger a click event on the anchor element
    a.click();
    
    // Clean up by removing the anchor element
    document.body.removeChild(a);
}

function openFile (){
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.sd' , '.anel , .txt , .html';
    input.onchange = function() {
      let file = input.files[0];
  
      let reader = new FileReader();
      reader.onload = function(e) {
        // The contents of the file are accessible here
        let fileContents = reader.result;
        document.getElementById("input").value = fileContents;
  
        // Perform operations with the file contents
      };
      reader.readAsText(file); // Read the file as text
    };
    input.click();
}



