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
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'search_icon');
document.body.appendChild(bubbleDOM);

const icon = chrome.runtime.getURL('assets/Storeicon.png')

// Lets listen to mousemove DOM events.
document.addEventListener('mousemove', function (e) {
  bubbleDOM.style.visibility = 'visible';
}, false);

// document.addEventListener('mousedown', function (e) {
//   bubbleDOM.style.visibility = 'hidden';
// }, false);


bubbleDOM.innerHTML = `<div> <button id="search-btn"><img id="search-icon" src="`+icon+`"></button>` +
                      `</div>`;

