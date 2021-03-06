// Starter code borrowed from github.com/pchen7e2

"use strict";

function readFile(file){
  const reader = new FileReader();
  reader.onload = (event) => {
      document.getElementById('submitStatus').innerText = "Success!";

      //load content.js and start subtitle processing
      chrome.tabs.executeScript(
          {
              file:"content.js"
          },
          ()=>{
              if(file.name.toLowerCase().endsWith('.srt')) {
                  chrome.tabs.executeScript({
                      code: "subtitlextObj.lines=subtitlextObj.parseSRT(`" + event.target.result + "`);" +
                      "subtitlextObj.setup();" +
                      "subtitlextObj.start();"
                  });
              }
              else if( file.name.toLowerCase().endsWith('.ssa') || file.name.toLowerCase().endsWith('.ass') ){
                  chrome.tabs.executeScript({
                      code: "subtitlextObj.lines=subtitlextObj.parseSSA(`" +
                      event.target.result.replace(/\\/g,'\\\\') + "`);" +  //.ssa/.ass can contain "\n" "{\...}"
                      "subtitlextObj.setup();" +
                      "subtitlextObj.start();"
                  });
              }
          }
      );
  }; // desired file content
  reader.onerror = error => {console.log(error)};
  reader.readAsText(file);
}


// update data in chrome.storage and popup.html
function initialize() {
    chrome.storage.local.clear();
    chrome.storage.local.set({
        offsetSeconds : 0, // must be consistent with that of subtitlextObj in content.js
        refreshInterval : 200, // must be consistent with that of subtitlextObj in content.js
        subtitleFileName: ""
    });
    document.getElementById('offset').value = 0;
    document.getElementById('refreshInterval').value = 200;
}


document.getElementById('subtitleFileForm').addEventListener('submit', function(evt){
    evt.preventDefault();
    let file = document.getElementById('subtitleFileInput').files[0];
    chrome.storage.local.set({subtitleFileName:file.name});
    initialize();
    readFile(file);
});
document.getElementById('offsetButton').addEventListener('click', ()=>{
    let newOffset = parseFloat(document.getElementById('offset').value);
    chrome.tabs.executeScript({
        code: "subtitlextObj.setOffset("+newOffset+");"
    });

    chrome.storage.local.set({offsetSeconds:newOffset});
});
document.getElementById('refreshIntervalButton').addEventListener('click', ()=>{
    let newRefreshInterval = parseFloat(document.getElementById('refreshInterval').value);
    chrome.tabs.executeScript({
        code: "subtitlextObj.setRefreshInterval("+newRefreshInterval+");"
    });
    chrome.storage.local.set({refreshInterval:parseFloat(document.getElementById('refreshInterval').value)});
});

document.getElementById('reset').addEventListener('click', ()=>{
    initialize();
    //also update data in content js
    document.getElementById('offsetButton').click();
    document.getElementById('refreshIntervalButton').click();
});


chrome.storage.local.get(['offsetSeconds'], function(result) {
    document.getElementById('offset').value = result.offsetSeconds;
});
chrome.storage.local.get(['refreshInterval'], function(result) {
    document.getElementById('refreshInterval').value = result.refreshInterval;
});

function trimFileName(str, noOfChars, appendix) {
  let nameArray = str.split(".");
  let fileType = `.${nameArray.pop()}`;
  let fileName = nameArray.join(" ");

  if (fileName.length >= noOfChars) {
    fileName = fileName.substr(0, noOfChars) + appendix;
  };

  return (fileName + fileType);
}

document.getElementById("subtitleFileInput").addEventListener("change", showName)

function showName() {
  var name = document.getElementById('subtitleFileInput')
  var fileName = trimFileName(name.files.item(0).name, 12, "...")
  document.getElementById("file-selected").innerHTML = fileName;
}