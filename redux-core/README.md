# redux-core

A tic-tac-toe command-line program implemented in Node.js and the core Redux library.

## Description

After browsing the documentation, I'll stick to plain Redux and avoid Redux Toolkit (RTK) for now because I'm
conscientious about the level of abstractness. If I jump straight into the deep end of an ultra abstract tool (like RTK)
instead of wading in carefully (via plain Redux), then I might wind up with an exercise in frustration.

I need a toy program that's concrete enough to balance out the abstractness of Redux but light weight enough that I can
focus on the domain logic and Redux instead of fiddling with incidental things. So, I'll avoid a web app and I'll avoid
TypeScript. I'll write a tic-tac-toe command-line program in JavaScript/Node.js.

My tic-tac-toe program is implemented in the same spirit as the [*Redux: Fundamentals* tutorial](https://redux.js.org/tutorials/fundamentals/part-1-overview).
That tutorial shows you how to use plain Redux (no Redux Toolkit!) to build a program. It's a great tutorial because
it keeps incidental complexity to an absolute minimum. Instead of using a command-line project like I have here, I implements
a web page with standard HTML, CSS, and browser JavaScript APIs and includes Redux via CDN. Nice! Update: well it actually
gets into the weeds of functional programming, so "buyer beware".

## Instructions

Follow these instructions to run the tic-tac-toe program:

1. Use Node 18 or later
2. Install Redux:
   * ```shell
     npm install
     ```
3. Run the program:
   * ```shell
     node tic-tac-toe.mjs 
     ``` 

## Reference

* [*Redux: Fundamentals* tutorial](https://redux.js.org/tutorials/fundamentals/part-1-overview)
  * I have high praise for the "Fundamentals" tutorial. Below are some quotes I found worth repeating.
  * > By defining and separating the concepts involved in state management and enforcing rules that maintain independence between views and states, we give our code more structure and maintainability.
  * > Selectors are functions that know how to extract specific pieces of information from a store state value
  * > With Redux, our application state is always kept in plain JavaScript objects and arrays. That means you may not put other things into the Redux state - no class instances, built-in JS types like Map / Set Promise / Date, functions, or anything else that is not plain JS data.
  * > It's important to note that you'll only have a single store in a Redux application.
  * > `useSelector` compares its results using strict `===` reference comparisons, so the component will re-render any time the selector result is a new reference!
  * After getting to the *Async Logic and Data Fetching* section and seeing middleware and middleware enhancers, I've come
    to realize that Redux is a framework for encouraging a functional programming architecture. It is not just a
    "state container for JS apps". It is also a "function container". By design, the Redux framework, by way of middleware
    and Redux "Thunk", wants to execute your async functions. I haven't figured out why it wants this amount of control.
    I understand that it wants control over the state so that it can help you do things like history, undo, time-travel-debugging
    but what's the special sauce it's doing by executing functions? Is it also keeping track of what user functions it
    executed and when? I can see how that's useful, as a sort of logging/tracing effect which is great for debugging. But
    I don't think it's doing that... I remember the word now, it's "instrumentation". Redux wants to instrument your async
    code.
  * I'm making a personal decision for my own self-preservation: I will be strategically avoiding Redux middleware (and
    thus Redux Thunk and Redux Promises) because after my best efforts, I don't see the advantage. If I use it, I think
    I'll become trapped in a programming puzzle that I won't be able to find my way out of. I get that many folks find
    this pattern useful. But for me, for now, I'm skipping it purposely. By contrast, I'm still interested in Redux Sagas
    and it's actually touted as an alternative to middleware. I'm hopeful that Sagas will "click" for me.
* [Redux: Getting Started](https://redux.js.org/introduction/getting-started)
* [nodejs.org: "How do I prompt users for input from a command-line script?"](https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/)
