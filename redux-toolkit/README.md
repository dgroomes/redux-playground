# redux-toolkit

NOT YET FULLY IMPLEMENTED

An implementation of the classic "Connect Four" game using Redux Toolkit.

## Description

I want to learn Redux Toolkit, and an effective way to do that is to learn by doing. I think implementing a simple game
in the browser is a good fit for using a state management framework like Redux Toolkit. [Connect Four](https://en.wikipedia.org/wiki/Connect_Four)
is a worthy choice for a game. I'll also use TypeScript and TSX because this is what I would choose for a "real" application.
I want to evaluate Redux Toolkit in the context of the other tooling and architecture of a realistic project. Contrast
this project with [`redux-core`](../redux-core/) where I was trying to learn the essence of Redux and I purposely avoided
other concerns.

## Instructions

Follow these instructions to build and serve the app:

1. Install dependencies:
    * ```shell
      npm install
      ```
2. Install the Redux DevTools browser extension
    * [Redux DevTools Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
4. Run the server:
    * ```shell
      npm run dev
      ```
5. Open the browser:
    * <http://127.0.0.1:3000/>

## Notes

I installed Redux Toolkit (RTK) and related things with

```shell
npm install @reduxjs/toolkit
npm install react-redux
npm install --save-dev @redux-devtools/core --legacy-peer-deps
```

Note: Redux DevTools didn't express support for React 18 in its [`package.json`](https://github.com/reduxjs/redux-devtools/blob/6d2787951544eb930cbad3e61b5ee65739a17d2f/packages/redux-devtools/package.json#L80),
so I had to force install it using the `--legacy-peer-deps` flag. Read about this type of problem from this good [StackOverflow answer](https://stackoverflow.com/a/66620869).

## Reference

* [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)
* [*Redux Essentials*](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
  > This tutorial will introduce you to Redux and teach you how to use it the right way, using our latest recommended tools and best practices
* [Wikipedia: *Connect Four*](https://en.wikipedia.org/wiki/Connect_Four)
