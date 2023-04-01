# Cleaning Up Our Code

As it stands, if we want to add more routes, our `./index.js` file will simply
get larger and larger. If we want to add MANY more routes, this will complicate
things significantly, so let's write some code to handle this.

It's really easy right now to add a new route - We simply create a new
`app.get()` or `app.post()` or whatever to our `./index.js` file. Our end goal
is to be able to put in roughly the same amount of work to spin up a new route,
without having to go through and change out all of our code.

## Splitting routes into different files

File splitting is a common technique to clean up code, so we'll go ahead and do
it. Let's start by creating a `./routes/` folder, and within there we'll create
two folders for our routes: `./routes/index.js` and `./routes/brew.js`.

These individual files will now be JavaScript _modules_. A module is simply a
piece of code that is split off from others, and can be easily pulled back in.
It'll have some code, as well as an export (which is a group of things that the
module allows other code files to "see".)

### Moving code over

Let's start:

```js
// In ./routes/index.js...

function index(app) {
    app.get("/", (request, response) => {
        let responseMessage = "Hello, World!";

        response
            .status(200) // HTTP Status Code 200: OK
            .send(responseMessage);
    });
}

module.exports = index;
```

That's our first `app.get()` moved safely. Our second can be done similarly:

```js
// In ./routes/brew.js...
function brew(app) {
    app.get("/brew", (request, response) => {
        let responseMessage = "<h1>I'm a teapot, so I cannot brew coffee!</h1>";

        response
            .status(418) // HTTP Status Code 418: I'm a teapot
            .send(responseMessage);
    });
}

module.exports = brew;
```

Notice how each filename is named based on the route of each function. This
isn't done on purpose for any reason - It just helps keep things cleaner and
more obvious.

### Replacing the code in `./index.js`

Two index files... This is getting confusing. No worries. Simply remove the two
`app.get()` blocks, and in their place, we can add:

```js
// In ./index.js...

require("/routes/index")(app);
require("/routes/brew")(app);
```

Again, make sure this is above the `app.listen()` call.

The `require` statement pulls in their module's exports (so, the function), and
we call the function with `(app)`, passing in the Express.js app. We can rerun
the server to see that our code still works (it does).

At this stage, in order to add a new route, we can add a new file in, and update
our `./index.js` with a new `require` line. So... We haven't actually solved our
problem of having our `./index.js` file growing larger with more routes... We've
only decreased the amount of lines our `./index.js` file grows by.

Good progress, but we can go further!

## Dynamically loading routes

What if we were able to just add a new route file in the `./routes/` folder, and
rerun the server to automagically add the new route? Well, we can.

### A new file in `./routes/`

This portion is going to be really intensive on the coding, so stick with me.
Create a new file: `./routes/DLR.js`. This file will be responsible for going
through all of the route files in the `./routes/` folder and importing them.

```js
// In ./routes/DLR.js...

const fs = require("fs");

function dynamicallyLoadRoutes(app) {
    let filenames = fs.readdirSync(__dirname);
    filenames.forEach((filename) => {
        if (
            filename === "DLR.js" ||
            filename.substr(filename.lastIndexOf(".") + 1) !== "js"
        ) {
            return;
        }

        let jsModule = filename.substr(0, filename.indexOf("."));
        require("./" + jsModule)(app);
    });
}

module.exports = dynamicallyLoadRoutes;
```

Woah. Let's pick this apart bit by bit.

We start by importing `fs`. `fs` is JavaScript's FileSystem API. Basically, it
lets us read through any of the files on our PC. (And yes, I do mean any - Use
this with caution!)

Within the function, we use `fs.readdirSync` to read through the files in a
particular folder. It's `sync`, because the function will BLOCK any other code
from executing until it's done. The function returns to us a list of the
filenames.

We can then iterate through all of the filenames. If the filename is `DLR.js`,
we'll skip it - We'll import this file once, and we don't want to re-import it
and create an infinite loop of imports.

Within this `if()` check, we also check if the file ends in `.js`. The
`substr()` function takes the substring based on a start and optional length, so
we say "from the position of the LAST dot, we just want to see the extension
after that".

If any of these two conditions are met, we skip. Otherwise, we can continue.

Instead of stripping away only the file extension using the `substr()` function,
we can instead take only the filename. So, we do so - and save it to `jsModule`.
We can then import `jsModule`.

### Updating our `./index.js` one last time

This is the last time we'll ever have to update our `./index.js` to add more
routes. Simply remove the two require statements from before, and replace them
with:

```js
// In ./index.js...

require("./routes/DLR")(app);
```

And we're done! We can re-run our server to see that it still works as expected.
However, now, we can simply add new route files in order to configure and create
new routes.
