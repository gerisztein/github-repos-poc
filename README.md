[![Build Status](https://travis-ci.org/gerisztein/github-repos-poc.svg?branch=master)](https://travis-ci.org/gerisztein/github-repos-poc)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# github-repos-poc

Vue App to consume Github's public API (POC)

## TL;DR

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
