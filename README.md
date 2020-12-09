# Todo Typescript App ![language](https://img.shields.io/badge/language-typescript-blue.svg)
> Simple todo app written in typescript

## :books: Table of Contents

- [Installation](#package-installation)
- [Usage](#hammer_and_wrench-usage)
- [Architecture](#cityscape-architecture)
- [Todo](#memo-todo)
- [Showcase](#framed_picture-showcase)
- [License](#scroll-license)

## :package: Installation
Clone or [Download](https://github.com/Defkil/todo-typescript-client/archive/main.zip) this project
```sh
git clone https://github.com/Defkil/todo-typescript-client.git
```
Open a terminal in the project folder and install the NPM dependencies.
```sh
npm install -D
```

## :hammer_and_wrench: Usage
Build production code
```sh
npm run build
```
Build development code
```sh
npm run dev
```
Build development code on file changes with a webserver (http://localhost:61337) and auto-reload
```sh
npm run live
```
All scripts
```sh
npm run build # build development code
npm run dev # build development code
npm run test # mocha test script
npm run coverage # coverage check
npm run live # dev live script
npm run docs # generate docs
npm run eslint # eslint check
npm run eslint:fix # eslint check with fix
```

## :cityscape: Architecture

//todo add uml with mvc

### Overview

| | |
|:--------------|:-------------|
|Language|[typescript](https://www.typescriptlang.org/)|
|Docs|[typedoc](https://typedoc.org/)|
|Lint|[eslint](https://eslint.org/)|
|Task Runner|[Grunt](https://gruntjs.com/)|
|Module Packer|[RequireJs](https://requirejs.org/)|
|Template Engine|[EJS](https://ejs.co/)|
|Stylesheet Preprocessor|[Sass](https://sass-lang.com/)|
|CSS/Sass Framework|[Materialize](https://materializecss.com/)|
|Test Runner|[Mocha](https://mochajs.org/)|
|Assertion Library|[Chai](https://www.chaijs.com/)|
|Test Coverage|[istanbuljs/nyc](https://github.com/istanbuljs/nyc)|


## :framed_picture: Showcase

//todo add showcase images

## :memo: Todo
- add task priority (and sort by priority)
- add task tags (and sort by tags)
- search a task by name
- server sync
- LocalStorage sync
- customise settings
- responsive design

## :scroll: License
[GNU GPLv3](LICENSE) © [Oliver Grüttner](https://github.com/defkil/)
















