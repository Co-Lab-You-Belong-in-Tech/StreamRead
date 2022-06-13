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


searchToggle.innerHTML = `<div> <button id="search-btn"><img id="ext-icon" src="`+extIcon+`"></button> </div>`;

document.getElementById('ext-icon').onclick = function(event) {
  searchToggle.innerHTML = `<div id="search-container">
                             <div id="search-header">
                                <h1>SEARCH</h1> 
                                <button id="x-button">X</button></div>
                              <div id="search-bar">
                                <form action="/">
                                  <input type="text" name="search">
                                  <button type="submit"><img id="search-icon" src="`+searchIcon+`"></button>
                                </form>
                              </div>
                           </div>`
}