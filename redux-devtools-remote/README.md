# redux-devtools-remote

WARNING: This program does not run and is currently serving as a "minimal reproducible example". See the "ESM/CommonJS Dependency Incompatibility Problem" section below.

A demo Redux program that connects remotely to a standalone instance of Redux DevTools.


## Description

Redux DevTools is an essential part in making your Redux development experience fulfilling. What does that look like?
Usually, you use the Redux browser extension, but if your program is in a non-browser environment you need to reach for a
client/server setup. This is possible with [`@redux-devtools/cli`](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-cli)
which acts as a Redux DevTools server (and serves the DevTools UI) and [`@redux-devtools/remote`](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-remote)
which is a client that connects to the server. This project is an example of that pattern. It features a commandline
Node.js program that uses Redux and connects remotely to a standalone instance of Redux DevTools running in a separate
Node.js process (and serving a UI which you can open in your browser; so there are a lot of components involved).


## Instructions

Follow these instructions to run the tic-tac-toe program:

1. Pre-requisite: Node.js
   * I used Node.js v20.9.0 which bundles npm 10.1.0
2. Install the Redux DevTools CLI
   * I chose to install it globally with the following command.
   * ```shell
     npm install -g react-devtools @redux-devtools/cli@3.0.2
     ```
3. Run a standalone instance of Redux DevTools and open its UI in your browser
   * ```shell
     redux-devtools --open=browser --port=8000 --hostname=localhost
     ```
   * Note: The `--port` and `--hostname` flags are not needed because they already have those values as defaults, but for
     clarity I've included them.
4. Install dependencies
   * ```shell
     npm install
     ```
5. Run the program:
   * ```shell
     node up-down.js 
     ``` 
   * The output will look something like the following.
   * ```text
     $ node up-down.js 
     Type 'up' to increment and 'down' to decrement. Type 'exit' to quit.
     up
     Count: 1
     up
     Count: 2
     down
     Count: 1
     down
     Count: 0
     down
     Count: -1
     quit
     Invalid input. Please type 'up', 'down', or 'exit'.
     exit
     Exiting program.
     ```
6. Inspect your Redux state in the DevTools UI
    * (I haven't gotten this part to work yet)


## A Note About Versions

The amount of packages in Redux is large and each page itself is regularly evolving with feature requests and breaking
changes. Of note in early 2024 is that Redux recently had a major release (5.x) and so have many other packages in the
Redux umbrella. But the slower moving packages like those in the [reduxjs/redux-devtools](https://github.com/reduxjs/redux-devtools)
have not all had corresponding releases, especially `@redux-devtools/remote`. These packages are still of interest to me.
I want (need?) to use a combination of Redux packages that are of a similar vintage and ostensibly work well together.

In particular, the latest version of [`@redux-devtools/remote` is 0.8.2, and it [depends on `reduxjs` version 4.x](https://github.com/reduxjs/redux-devtools/blob/baf484adbc19b3da38c379a2a28572846114e217/packages/redux-devtools-remote/package.json#L67).
So, we're sticking with Redux 4.x. This also means we must (or should?) use CommonJS because official/blessed/proper ESM
support wasn't added until 5.x. That's perfectly fine; the path to ESM is a long one.

So, we're sticking to:

* ReduxJS 4.x
* Redux DevTools CLI 3.x
* Redux DevTools Remote 0.8.2


## ESM/CommonJS Dependency Incompatibility Problem

Why are Redux DevTools packages authored in CommonJS (i.e. the code uses `require` expressions) but depend on ESM-only
packages like nanoid 5.x? How does this work? I'm getting the following error:

```text
$ node up-down.js
(...omitted...)/redux-devtools-remote/node_modules/@redux-devtools/utils/lib/cjs/index.js:27
var _nonSecure = require("nanoid/non-secure");
^

Error [ERR_REQUIRE_ESM]: require() of ES Module (...omitted...)/redux-devtools-remote/node_modules/nanoid/non-secure/index.js from (...omitted...)/redux-devtools-remote/node_modules/@redux-devtools/utils/lib/cjs/index.js not supported.
Instead change the require of (...omitted...)/redux-devtools-remote/node_modules/nanoid/non-secure/index.js in (...omitted...)/redux-devtools-remote/node_modules/@redux-devtools/utils/lib/cjs/index.js to a dynamic import() which is available in all CommonJS modules.
at Object.<anonymous> ((...omitted...)/redux-devtools-remote/node_modules/@redux-devtools/utils/lib/cjs/index.js:27:18)
at Object.<anonymous> ((...omitted...)/redux-devtools-remote/node_modules/@redux-devtools/remote/lib/cjs/devTools.js:14:14)
at Object.<anonymous> ((...omitted...)/redux-devtools-remote/node_modules/@redux-devtools/remote/lib/cjs/index.js:18:41)
at Object.<anonymous> ((...omitted...)/redux-devtools-remote/up-down.js:6:30) {
code: 'ERR_REQUIRE_ESM'
}
```


## Wish List

General clean-ups, TODOs and things I wish to implement for this project:

* [x] DONE Write the program and README
* [x] DONE (does not work, but that's what I wanted to reproduce) Wire in the devtools enhancer and connect to the remote Redux DevTools instance (it won't work because of the ESM/CommonJS dependency problem)
* [ ] If I bundle the project with Webpack (or something), does that basically obviate the need for a module system, and work
  around the problem?
* [ ] Should I just force downgrade dependencies until it works? For example nanoid 3.x is CommonJS and is still supported.
  What else needs to change?


## Reference

* [`redux-devtools-remote`](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-remote)
  * The README has usage documentation, but I wish there was more documentation about the architecture and caveats, because
    the Redux machinery is complex and a moving target.
