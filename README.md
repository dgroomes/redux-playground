# redux-playground

📚 Learning and experimenting with Redux by example.

> A Predictable State Container for JS Apps
>
> --<cite>https://redux.js.org/</cite>


## Description

**NOTE**: This project was developed on macOS. It is for my own personal use.

Redux has been a high-popularity library that followed shortly after the trajectory of React's own immense popularity.
I've never learned it. This is mostly because I barely do any JavaScript UI development, but I've also avoided it because
I just don't quite *get it*. As far as software goes, Redux is on the higher side of "abstract software". Today, I'd like
to start my learning journey with Redux.


## Standalone subprojects

This repository illustrates different concepts, patterns and examples via standalone subprojects. Each sub-project is
completely independent of the others and do not depend on the root project. This _standalone sub-project constraint_
forces the subprojects to be complete and maximizes the reader's chances of successfully running, understanding, and
re-using the code.

The subprojects include:


## `redux-core/`

A tic-tac-toe command-line program implemented in Node.js and the core Redux library.

See the README in [redux-core/](redux-core/). 


## `redux-devtools-remote/`

DOES NOT WORK A demo Redux program that connects remotely to a standalone instance of Redux DevTools.

See the README in [redux-devtools-remote/](redux-devtools-remote/).


## `redux-toolkit/`

An implementation of the classic "Connect Four" game using Redux Toolkit. It features undo functionality.

See the README in [redux-toolkit/](redux-toolkit/). 


## Wish List

General clean-ups, TODOs and things I wish to implement for this project:

* [x] DONE Create a project showing a remote connection to Redux DevTools. This has been surprisingly challenging to implement
  in another project I'm doing, especially because of the indirection of Redux Toolkit, the lack of documentation around
  the architecture of Redux DevTools (and its many incarnations from browser extension to remote, etc) and the maybe
  worst the dependency hell of ESM/CommonJS incompatibility (e.g. why do redux-devtools packages code to CommonJS but
  require ESM-only packages like nanoid 5.x? I'm confused.)
