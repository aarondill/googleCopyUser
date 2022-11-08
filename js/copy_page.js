/*global chrome*/
(async function () {
	const constructDiv = (url, array) => {
		if (url[0].match(/\/u\/\d$/)) url[0] = url[0].slice(0, -4);
		let r = `<div id="injectedheading">Click to copy with: </div>`;
		for (let i = 0; i < array.length; i++) {
			r += `<div><a class="injected-a" href="${url[0]}/u/${i}/d/${url[1]}">${array[i]}</a></div>`;
		}
		return r;
	};
	const fileUrlAccountsJS = chrome.runtime.getURL(".accounts.js");
	const accounts = (await import(fileUrlAccountsJS)).default;
	const urlUserRegex = /https:\/\/docs\.google\.com\/[a-z]+\/u\/(?<u>\d).+/;
	const matches = location.href.match(urlUserRegex);
	const currentUser = accounts[matches?.groups.u ?? 0];

	const styleSheet = document.createElement("style");
	styleSheet.innerText = `
#injectedheading{
	margin-top: -5px; margin-bottom: 5px;
	font-size: 16px; font-weight: bold;
}
div:has(.injected-a){
	padding: 5px 0;
}
.injected-a{
color: #112ABB; font-family: Arial,sans-serif;
font-size: 13px; cursor: pointer; text-decoration: underline;
}
#linksDiv {
	position: absolute; top: 0; right: 0;
	padding: 10px; border: solid black 1px; z-index: 10
}
#currentAccount{
	position: absolute; top: 0px;
	font-weight: bold; font-size: 12pt;
	outline: solid 2px; border-radius: 20vw;
	padding: 10px; background: #4c8ffb4f; z-index: 10
}
`;
	document.head.prepend(styleSheet);
	const linksDiv = document.createElement("div");
	linksDiv.innerHTML = constructDiv(location.href.split("/d/"), accounts);
	linksDiv.id = "linksDiv";
	document.body.prepend(linksDiv);
	const currentAccountDiv = document.createElement("div");
	currentAccountDiv.innerHTML = `Signed in: ${currentUser}`;
	currentAccountDiv.id = "currentAccount";
	document.body.prepend(currentAccountDiv);
})();
