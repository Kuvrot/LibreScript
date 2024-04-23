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

window.addEventListener("DOMContentLoaded", function () {
    applyPageBreaks();
    setFormat(0);
    setTime();
});


function setTime () {
  
    const today = new Date();
    let h = today.getHours() - hh;
    let m = today.getMinutes() - mm;
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h);
    document.getElementById("time").innerHTML =  h + ":" + m + ":" + s;
    setTimeout(setTime, 1000);
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
    t.classList.contains("active") ? t.classList.remove("active") : t.classList.add("active");  
    document.execCommand(command);
    editor.focus();
}

function setFormat (index) {

    switch (index){

        case 0: currentFormat.innerHTML = "Act"; break;
        case 1: currentFormat.innerHTML = "Scene title"; break;
        case 2: currentFormat.innerHTML = "Action";break;
        case 3: currentFormat.innerHTML = "Character"; command = "backColor"; break;
        case 4: currentFormat.innerHTML = "Dialogue"; break;
        case 5: currentFormat.innerHTML = "Transition";break;
        case 6: currentFormat.innerHTML = "Take";break;
        case 7: currentFormat.innerHTML = "Text"; break;
    }

    document.execCommand(command);
    editor.focus();

    document.getElementById("pageNumber").innerHTML = document.getElementsByClassName("page").length; 
}

function applyPageBreaks() {
    applyManualPageBreaks();
    applyAutomaticPageBreaks(Config.pixelsPerInch, Config.pageHeightInCentimeter, Config.pageMarginBottomInCentimeter);

    document.querySelectorAll(".document .page").forEach(function (element) {
        if (!element.classList.contains("has-events")) {
            element.addEventListener("blur", function () {
                applyPageBreaks();
            });

            element.classList.add("has-events");
        }
    });
}

function exportScript (){

    var content = document.getElementById('document').innerHTML;
    var doc = window.open('');
    doc.document.write('<!DOCTYPE html> <html><head><title>Preview</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">'
    + '<link rel="stylesheet" type="text/css" href="css/sheets-of-paper-a4.css"> <link rel="stylesheet" href="css/style.css"></head><body><div class="document">' + content + '</document> </body></html>');
    
      setTimeout(function() {
        doc.print();
        doc.close();
      }, 350);
  

}

/* Applies any manual page breaks in preview mode (screen, non-print) where CSS Paged Media is not fully supported */
function applyManualPageBreaks() {
    var docs, pages, snippets;
    docs = document.querySelectorAll(".document");

    for (var d = docs.length - 1; d >= 0; d--) {
        pages = docs[d].querySelectorAll(".page");

        for (var p = pages.length - 1; p >= 0; p--) {
            snippets = pages[p].children;

            for (var s = snippets.length - 1; s >= 0; s--) {
                if (snippets[s].classList.contains("page-break")) {
                    pages[p].insertAdjacentHTML("afterend", "<div class=\"page\" contenteditable=\"true\"></div>");

                    for (var n = snippets.length - 1; n > s; n--) {
                        pages[p].nextElementSibling.insertBefore(snippets[n], pages[p].nextElementSibling.firstChild);
                    }

                    snippets[s].remove();
                }
            }
        }
    }
}

/* Applies (where necessary) automatic page breaks in preview mode (screen, non-print) where CSS Paged Media is not fully supported */
function applyAutomaticPageBreaks(pixelsPerInch, pageHeightInCentimeter, pageMarginBottomInCentimeter) {
    var inchPerCentimeter = 0.393701;
    var pageHeightInInch = pageHeightInCentimeter * inchPerCentimeter;
    var pageHeightInPixels = Math.ceil(pageHeightInInch * pixelsPerInch);
    var pageMarginBottomInInch = pageMarginBottomInCentimeter * inchPerCentimeter;
    var pageMarginBottomInPixels = Math.ceil(pageMarginBottomInInch * pixelsPerInch);
    var docs, pages, snippets, pageCoords, snippetCoords;
    docs = document.querySelectorAll(".document");

    for (var d = docs.length - 1; d >= 0; d--) {
        pages = docs[d].querySelectorAll(".page");

        for (var p = 0; p < pages.length; p++) {
            if (pages[p].clientHeight > pageHeightInPixels) {
                pages[p].insertAdjacentHTML("afterend", "<div class=\"page\" contenteditable=\"true\"></div>");
                pageCoords = pages[p].getBoundingClientRect();
                snippets = pages[p].querySelectorAll("h1, h2, h3, h4, h5, h6, p, ul, ol");

                for (var s = snippets.length - 1; s >= 0; s--) {
                    snippetCoords = snippets[s].getBoundingClientRect();

                    if ((snippetCoords.bottom - pageCoords.top + pageMarginBottomInPixels) > pageHeightInPixels) {
                        pages[p].nextElementSibling.insertBefore(snippets[s], pages[p].nextElementSibling.firstChild);
                    }
                }

                pages = docs[d].querySelectorAll(".page");
            }
        }
    }
}