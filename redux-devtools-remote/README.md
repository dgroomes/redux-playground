# redux-devtools-remote

A demo Redux program that connects remotely to a standalone instance of Redux DevTools.


## Description

Redux DevTools is an essential part in making your Redux development experience fulfilling. What does that look like?
Usually, you use the Redux browser extension, but if your program is in a non-browser environment you need to reach for
a client/server setup. This is possible with [`@redux-devtools/cli`](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-cli)
and [`@redux-devtools/remote`](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-remote). The
architecture looks like this:

* **Your program**
  * This is your program which is designed with Redux.
  * This program must also be instrumented with `@redux-devtools/remote` so that it can send state data to the Redux
    DevTools server.
  * Acts as a client to the Redux DevTools server.
* **Redux DevTools server**
  * Runs as its own Node.js process.
  * Serves traffic, by convention, at <http://localhost:8000>.
  * Launched by the Redux DevTools CLI (`@redux-devtools/cli`).
* **Redux DevTools web app**
  * A single-page application (SPA) that runs in your browser (or Electron). This is the UI where you see all the Redux
    DevTools "good stuff" like the state tree, actions, etc.
  * The static HTML/JS/CSS content which defines the web app is served by the Redux DevTools server at <http://localhost:8000>.
    The server is doing double-duty: it's serving the web app assets and communicating with the client processes. This
    concept completely eluded me for a long time.
  * Connects to the Redux DevTools server to read the Redux state of the instrumented program. So, like the instrumented
    program, it's another client to the Redux DevTools server.

This project is an example of that pattern. It features a command-line Node.js program that uses Redux for state
management.


## Instructions

Follow these instructions to run the program and the Redux DevTools server.

1. Pre-requisite: Node.js
   * I used Node.js v20.9.0 which bundles npm 10.1.0
2. Install the Redux DevTools CLI
   * I chose to install it globally with the following command.
   * ```shell
     npm install -g react-devtools @redux-devtools/cli@3.0.2
     ```
3. Run a Redux DevTools server, and establish a connection from the web app
   * ```shell
     redux-devtools --open=browser --port=8000 --hostname=127.0.0.1
     ```
   * This starts the server and opens your web browser to <http://127.0.0.1:8000>. You need to configure the web app to
     connect to the server by going to the "Settings" tab and then clicking the "Use local (custom) server" radio button
     and clicking the "Connect" button. I'm a little surprised the configuration isn't automatic, but that's not a big
     deal. But I didn't realize this for a long time. I wish the UI or the README gave me a hint about what to do. 
4. Install dependencies
   * ```shell
     npm install
     ```
5. Run and interact with the program:
   * ```shell
     node up-down.js 
     ``` 
   * The output will look something like the following.
   * ```text
     $ node up-down.js 
     Type 'up' to increment and 'down' to decrement. Type 'exit' to quit.
     connected to remotedev-server
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
     ```
6. Inspect the Redux state in the web app
   * Go back to the web app and **refresh the page** (I still haven't fully grokked the flow of all these tools and the
     "pat your head and rub your belly" series of actions you need to do to make it all work).
   * This is the fun part. You'll see the Redux state and state history of the program. This should help you to understand
     and debug your program. In particular, you'll see an `@@INIT` action and then `INCREMENT` and `DECREMENT` actions
     for each time you typed "up" or "down" in the program. You'll see the Redux state at each of those points in time.
     Pretty neat!


## Exercise Caution with Dependencies

The amount of packages in Redux is large and each package itself is regularly evolving with new features and breaking
changes. Of note in early 2024 is that Redux recently had a major release (5.x) and so have many other packages in the
Redux umbrella. But the slower moving packages like those in the [reduxjs/redux-devtools](https://github.com/reduxjs/redux-devtools)
have not all had corresponding releases. In particular, the latest version of `@redux-devtools/remote` is 0.8.2, and it
[still depends on `reduxjs` version 4.x](https://github.com/reduxjs/redux-devtools/blob/baf484adbc19b3da38c379a2a28572846114e217/packages/redux-devtools-remote/package.json#L67) and so it hasn't been updated to the Redux 5.x era yet. The `@redux-devtools/remote`
package is on our critical path, and so we're stuck with the versions of transitive dependencies that are compatible with
it. So, we're sticking with Redux 4.x, and in turn, Redux DevTools CLI 3.x.

There's a more persnickety problem with dependency management though. `@redux-devtools/remote` 0.8.2 depends on
`@redux-devtools/utils` 2.x which in turn depends on `nanoid` 5.x. `nanoid` 5.x is an ESM-only package, but all the Redux
packages before the Redux 5.x era not ES modules, they are CommonJS modules. This is odd, and I'm still confused how this
came to be, but I've been able to work around the problem using the `overrides` feature in the `package.json` file to
downgrade `nanoid` to 3.x which is a CommonJS module. Thankfully, `nanoid` 3.x is still officially supported and this
was the only workaround I needed to make.

For posterity, here's the error I was getting without the workaround:

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
* [x] DONE (Great, that was easy!) Should I just force downgrade dependencies until it works? For example nanoid 3.x is CommonJS and is still supported.
  What else needs to change?
    * DONE Downgrade nanoid to 3.x using the npm ["overrides" feature](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides)
* [ ] SKIP (I won't bother researching) Why does `@redux-devtools/remote` transitively depend on so much software, like React itself and Babel? All it needs
  to do is send JSON data over a WebSocket right? It doesn't need to parse anything or render anything. I think that the
  Redux DevTools projects could declare dependencies as "peer dependencies" for a lot of these packages.
    * Experiment with hand-editing the `package.json` file to remove dependencies and see if it still works. Note `npm list --all`
      shows the dependency tree.


## Reference

* [`redux-devtools-remote`](https://github.com/reduxjs/redux-devtools/tree/main/packages/redux-devtools-remote)
  * The README has usage documentation, but I wish there was more documentation about the architecture and caveats, because
    the Redux machinery is complex and a moving target.
