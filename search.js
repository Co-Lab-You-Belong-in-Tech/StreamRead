// import dotenv from 'dotenv';
// dotenv.config();
// const OS = require('opensubtitles.com')
// const os = new OS({apikey: process.env.API_KEY})

// os.subtitle({
//   query: 'Steal this film 2006',
// }).then((response) => {
//   /* response {
//     total_pages: 1,
//     total_count: 13,
//     page: 1,
//     data: <SUBTITLES LIST>
//   } */
// }).catch(console.error)

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
                                <h1>SEARCH</h1> 
                                <button id="x-button">X</button>
                              </div>
                              <div class="wrap">
                                <div class="search">
                                  <input type="text" class="searchTerm">
                                  <button type="submit" class="searchButton">
                                    <img id="search-icon" src="`+searchIcon+`" height='30'width='30' class="filter-white">
                                  </button>
                                </div>
                              </div>
                           </div>`
                        
  // document.getElementById('x-button').onclick = function(e) {
  //   searchToggle.innerHTML = defaultToggle
  // }          
}