
// Add bubble to the top of the page.
var searchToggle = document.createElement('div');
searchToggle.setAttribute('class', 'search_toggle');
document.body.appendChild(searchToggle);

const extIcon = chrome.runtime.getURL('assets/Storeicon.png')
const searchIcon = chrome.runtime.getURL('assets/Searchicon.svg')

// Lets listen to mousemove DOM events.
document.addEventListener('mousemove', function (e) {
  searchToggle.style.visibility = 'visible';
}, false);

// document.addEventListener('mousedown', function (e) {
//   searchToggle.style.visibility = 'hidden';
// }, false);

var defaultToggle = searchToggle.innerHTML = `<div> <button id="open-search-btn"><img id="ext-icon" src="`+extIcon+`"></button> </div>`;

document.getElementById('ext-icon').onclick = function(e) {
  searchToggle.innerHTML = `<div class="search-container">
                             <div class="search-header">
                                <h1 id="search-title">SEARCH</h1> 
                                <button id="x-button">X</button>
                              </div>
                              <div class="wrap">
                                <form id="search" action="" formtarget="_blank">
                                  <input type="text" id="searchTerm">
                                  <button type="submit" id="searchButton" formtarget="_blank">
                                    <img id="search-icon" src="`+searchIcon+`" height='30'width='30' class="filter-white">
                                  </button>
                                </form>
                              </div>
                           </div>`

    var searchForm = document.getElementById("search")
    var searchInput = document.getElementById("searchTerm")

    searchForm.onsubmit = function(e) {
      location = window.open("https://www.opensubtitles.org/en/search2/sublanguageid-eng/moviename-"
                  + encodeURIComponent(searchInput.value))
      return false
    }
                        
    document.getElementById('x-button').onclick = function(e) {
      searchToggle.innerHTML = defaultToggle
    }          
}