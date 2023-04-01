# Hello World

As a recap, let's create a project in Node.JS and have it print out "Hello,
World!".

## Creating a project

Once you have [Node.js](https://nodejs.org/en/) installed, you should be able to
go into a terminal and type `node --version`. Ideally, it'll come up with a
version. Sounds good!

We can go ahead and start writing code now. Create a folder, and within this
folder (which I'll henceforth refer to as `./`), we can start making our
project.

In the terminal, type `npm init`. Spam enter through all of the dialog, and you
should see that a `./package.json` file is created.

### Looking at the `package.json` file

Not a lot is valuable here, but there's a couple of important lines:

```json
{
    ...
    "main": "index.js",
    "scripts": {
        ...
    },
    ...
    "dependencies": {
        ...
    }
}
```

The ordering of things in this does NOT matter, since this is just a JSON file.
Importantly, `dependencies` will get updated as we install packages (other
people's code), and main should point to our entry file.

Make sure `"main":` points to `index.js`, and let's create ./index.js.

## Creating "Hello, World!"

In our `./index.js` file, we can write:

```js
// In ./index.js

console.log("Hello, World!");
```

Great! How do we run it? Back in `./package.json`, we can write (in the scripts
portion):

```json
{
    ...
    "scripts": {
        "start": "node --harmony index.js"
    }
    ...
}
```

What does this do? From last week, we wrote `node index.js`. Obviously, `node`
tells the Node.JS compiler to compile and run a particular file, which in this
case is `index.js`. The `--harmony` flag isn't _really_ necessary, but enables
"harmony" features. For instance, it'll enable new ECMAScript 6 features in the
language, even on older versions of node. If other packages use
non-backwards-compatible features, `--harmony` will save us.

## Running Hello, World

In the console, we can now type `npm start`, which is the command we just wrote
in the `./package.json`. We can write any other commands we want with any other
names, but if we want to run those, we'll have to type `npm run <command>`
instead (`start` is one of the reserved words for npm, as is `restart`, `stop`,
`test`, `pack`, and a few others.)

The console should write out `Hello, World!`
