//Google Advanced Compilation Guide
var a={};a.title="Welcome to your bookmark page. Enjoy.";alert(a.title);

document.getElementById('myForm').addEventListener('submit', saveBookmark);   


function saveBookmark(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;
   

  if(!validateForm(siteName, siteUrl)){
    return false;
  }
           
//bookmark is part of the bookmarksResults.
  var bookmark = {
    name: siteName,
    url: siteUrl
  }

    
  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();
  e.preventDefault();
}

function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

//cancel button bookmark.
function cancelBookmark(url){
     document.getElementById('myForm').reset();
}

// Edit button bookmark.
function editBookmark(url, name){

    
    if (document.getElementById && document.createElement) {
        
    var siteName =document.getElementById('siteName').value = (siteName);
    var siteUrl =document.getElementById('siteUrl').value = (url);
        
    }
    
    
//var editing  = false;
//
//if (document.getElementById && document.createElement) {
//	var butt = document.createElement('BUTTON');
//	var buttext = document.createTextNode('Ready!');
//	butt.appendChild(buttext);
//	butt.onclick = saveEdit;
//}
//
//function catchIt(e) {
//	if (editing) return;
//	if (!document.getElementById || !document.createElement) return;
//	if (!e) var obj = window.event.srcElement;
//	else var obj = e.target;
//	while (obj.nodeType != 1) {
//		obj = obj.parentNode;
//	}
//	if (obj.tagName == 'TEXTAREA' || obj.tagName == 'A') return;
//	while (obj.nodeName != 'P' && obj.nodeName != 'HTML') {
//		obj = obj.parentNode;
//	}
//	if (obj.nodeName == 'HTML') return;
//	var x = obj.innerHTML;
//	var y = document.createElement('TEXTAREA');
//	var z = obj.parentNode;
//	z.insertBefore(y,obj);
//	z.insertBefore(butt,obj);
//	z.removeChild(obj);
//	y.value = x;
//	y.focus();
//	editing = true;
//}
//
//function saveBookmark() {
//	var area = document.getElementsByTagName('name')[0];
//	var y = document.createElement('url');
//	var z = area.parentNode;
//	y.innerHTML = area.value;
//	z.insertBefore(y,area);
//	z.removeChild(area);
//	z.removeChild(document.getElementsByTagName('button')[0]);
//	editing = false;
//}
//
//document.onclick = catchIt;
   

}


// Fetch bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="jumbotron">'+
                                  '<h3 class="change" id="change">'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="editBookmark(\''+url+'\')" class="btn btn-primary" href="#">Edit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' + 
                                  ' <a onclick="saveBookmark(\''+url+'\')" class="btn btn-primary" href="#">Save</a> ' +
                                  ' <a onclick="cancelBookmark(\''+url+'\')" class="btn btn-default" href="#">Cancel</a> ' +
                                  '</h3>'+
                                  '</div>';
  }////These are the buttons I created for EDIT, DELETE, SAVE and CANCEL.
}


// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the Website Name and Website URL');
    return false;
  }
  
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
    
  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}