//todo, let user know current account
const { href } = location;
const matches = href.match(
	/https:\/\/docs\.google\.com\/[a-z]+\/u\/(?<u>\d).+/
);
const u = matches.groups.u;
console.log(`with account number ${u}(the ${Number(u) + 1}rd account)!`);
