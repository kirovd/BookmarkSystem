 var list = new Array();
    var pageList = new Array();
    var currentPage = 1;
    var numberPerPage = 20;
    var numberOfPages = 5;

function makeList() {
    for (x = 0; x < 100; x++)
        list.push(x);

    numberOfPages = getNumberOfPages();
}
    
function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function firstPage() {
    currentPage = 1;
    loadList();
}


function secondPage() {
    currentPage = 2;
    loadList();
}

function thirdPage() {
    currentPage = 3;
    loadList();
}

function fourthPage() {
    currentPage = 4;
    loadList();
}

function fifthPage() {
    currentPage = 5;
    loadList();
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}


function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
}
    
function drawList() {
    document.getElementById("list").innerHTML = "";
    for (r = 0; r < pageList.length; r++) {
        document.getElementById("list").innerHTML += pageList[r] + "<br/>";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
}

function load() {
    makeList();
    loadList();
}
    
window.onload = load;