# Google Chrome extenstion to manage user accounts while copying files.

if you have many user accounts, when copying files through links, it is sometimes difficult to change accounts and decide which account to copy to.
This extension fixes that!

## just add your own \_accounts.js file, and recompile

In the future, if i can figure out how to, I may change this to automatically add your a \_accounts.js file, or perhaps use localstorage to save uses, but as of now, it is required to include a \_accounts.js in the main directory file formatted as follows:

```js
export default ["username0", "username1", "username2", "etc."];
```

## This extension was made for personal use, but since it's on github anyways, if it helps you, enjoy!
