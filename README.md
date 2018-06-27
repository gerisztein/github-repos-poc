<span><svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
&nbsp;</span>
[![Build Status](https://travis-ci.org/gerisztein/github-repos-poc.svg?branch=master)](https://travis-ci.org/gerisztein/github-repos-poc)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# github-repos-poc

Vue App to consume Github's public API (POC)

##TL;DR

You can run locally the project

```shell
$ yarn install
$ yarn dev
```

or visit the [live demo](https://gerisztein.github.io/github-repos-poc).

## Description

A basic app that displays **trending repositories** on **Github**. Initially it gets the repositories created since last week and sort them by stars.

You can also sort by **Stars**, **Forks** and **Update** date (ascending and descending) and filter by **Programming Language**.  
On the main results page, the programming language list is based on [GitHub Octoverse 2017](https://octoverse.github.com/) and for starred repositories it's based on the results.

The functionality of starring repositories is just a simulation using `localStorage` as the login hasn't been implemented. The starred repositories can also be sorted and filtered.

The pagination has been partially implemented. It works using the URL query `?page=#` but there's no visual component for it.

## Install

To run locally, just type:

```bash
$ yarn install
$ yarn dev
```

To generate the build:

```bash
$ yarn install
$ yarn build
```

## Live Demo

A live demo is available [here](https://gerisztein.github.io/github-repos-poc).

[https://gerisztein.github.io/github-repos-poc](https://gerisztein.github.io/github-repos-poc)

## Stack

- [Vue](https://vuejs.org/) (JS Framework)
- [Vue-Router](https://router.vuejs.org/) (Router)
- [Vuex](https://vuex.vuejs.org/) (State Management)
- [Pug](https://pugjs.org/api/getting-started.html) (Templating)
- [Stylus](http://stylus-lang.com/) (CSS-Preprocessor)
- [Webpack](https://webpack.js.org/) (Module Bundler)
- [TravisCI](https://travis-ci.org/) (Continuous Integration)