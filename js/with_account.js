/*global chrome*/
(async function () {
	const fileUrlAccountsJS = chrome.runtime.getURL(".accounts.js");
	const accounts = (await import(fileUrlAccountsJS)).default;
	const matches = location.href.match(
		/https:\/\/docs\.google\.com\/[a-z]+\/u\/(?<u>\d).+/
	);
	const text = document.createElement("div");
	text.style = "position:absolute; top:0; right:0; padding:10px";
	text.innerText = `Signed in to ${accounts[matches.groups.u]}`;
	document.body.prepend(text);
})();
