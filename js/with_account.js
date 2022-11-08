/*global chrome*/
//todo, let user know current account
(async function () {
	const fileUrlAccountsJS = chrome.runtime.getURL(".accounts.js");
	let accounts = await import(fileUrlAccountsJS);
	accounts = accounts.default;
	const matches = location.href.match(
		/https:\/\/docs\.google\.com\/[a-z]+\/u\/(?<u>\d).+/
	);
	const text = document.createElement("div");
	text.style = "position:absolute; top:0; right:0; padding:10px";
	text.innerText = `Signed in to ${accounts[matches.groups.u]}`;
	document.body.prepend(text);
})();
