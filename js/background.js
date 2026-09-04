/* Message sent from console e.g....

chrome.runtime.sendMessage('eppiaihlnanchondoakmhknopflaniem', { }, function(response) {

});

... parameters are extension id, message, and callback

*/

// NOTE: Any console.log here will be logged to the background page console (not the current tab console)

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    
    // query active tabs...
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        // request param should just be an Object literal. Just pass it through to content script...
        chrome.tabs.sendMessage(tabs[0].id, request, function(response) { 
            
        });
    });      
      
});