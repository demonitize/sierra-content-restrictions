  var blockedPages;
  var redirectPage;


  chrome.storage.managed.get('RestrictionsEnabled', (data) => {
    if (data.RestrictionsEnabled) {
      chrome.action.setPopup({popup: 'popup.html'});
    } else {
      chrome.action.setPopup({popup: 'popup_idle.html'});
    }
  });

  chrome.storage.managed.get('BlockedPages', (data) => {
    blockedPages = data.BlockedPages;
    }
  );

  chrome.storage.managed.get('RedirectEnabled', (data) => {
      if (data.RedirectEnabled) {
        chrome.storage.managed.get('RedirectTo', (data) => {
          redirectPage = data.RedirectTo;             
        });  
    } else {
    redirectPage = "/block.html";
    }
  });
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (blockedPages.contains(details.url))
      return {cancel: true, redirectUrl: redirectPage};
    },
    ["blocking"]
  );
