const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getQueryVariable(variable) {
  try {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  } catch (err) {
    console.warn(err);
  }
}

function editBlockContent() {
	let category = decodeURIComponent(getQueryVariable('cat'));
  document.getElementById("blockData").innerHTML = `The website <b>${decodeURIComponent(getQueryVariable('uri'))}</b> 
  has been blocked due to it being in the <b>${decodeURIComponent(getQueryVariable('cat'))}</b> 
  category for group <b>${decodeURIComponent(getQueryVariable('grp'))}</b>.`;
}

let pageAmt = getCookie("blockedPages");
setCookie("blockedPages", pageAmt++, 1461);
editBlockContent();
