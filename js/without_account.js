/*global chrome*/
(async function () {
	const constructDiv = (url, array) => {
		let r = `<div style="margin-top: -5px;margin-bottom: 5px;font-size: 16px;font-weight: bold;">Click to copy with: </div>`;
		for (let i = 0; i < array.length; i++) {
			r += `<div style="padding:5px 0"><a href="${url[0]}/u/${i}/d/${url[1]}">${array[i]}</a></div>`;
		}
		return r;
	};
	const fileUrlAccountsJS = chrome.runtime.getURL(".accounts.js");
	const accounts = (await import(fileUrlAccountsJS)).default;
	const linksDiv = document.createElement("div");
	linksDiv.innerHTML = constructDiv(location.href.split("/d/"), accounts);
	linksDiv.style =
		"position:absolute; top:0; right:0; padding:10px; border:solid black 1px";
	document.body.prepend(linksDiv);
	const currentAccountDiv = document.createElement("div");
	currentAccountDiv.innerHTML = `Signed in: ${accounts[0]}`;
	currentAccountDiv.style = `position: absolute; top: 0px;
	font-weight: bold; font-size: 12pt;
	outline: solid 2px; border-radius: 20vw;
	padding: 10px; background: #4c8ffb4f;`;
	document.body.prepend(currentAccountDiv);
})();
