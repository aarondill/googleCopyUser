# Google Chrome extension to manage user accounts while copying files.

If you have many user accounts, when copying files through links, it is sometimes difficult to change accounts and decide which account to copy to.
This extension fixes that!

## Just add your own `src/accounts.js` file, and recompile

In the future, if I can figure out how to, I may change this to automatically add a `src/js/accounts.js` file, or perhaps use `LocalStorage` to save users, but as of now, it is required to include a `src/js/accounts.js` in the main directory file formatted as follows:

```js
globalThis.accounts = ["username0", "username1", "username2", "etc."];
```

## This extension was made for personal use, but since it's on GitHub anyway, if it helps you, enjoy!
