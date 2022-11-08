/*global chrome*/
//todo, let user know current account
const fileUrlAccountsJS = chrome.runtime.getURL(".accounts.js");
const domInjectUrl = chrome.runtime.getURL(".with_account_inject.js");
const script = document.createElement("script");
script.setAttribute("data-url", fileUrlAccountsJS);
script.src = domInjectUrl;
document.body.prepend(script);
