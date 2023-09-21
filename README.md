
## Getting Started

Create a new .env file and load it the following variables: 

```sh
VALORANT_API=https://api.henrikdev.xyz
POSTS_API=https://6396aee2a68e43e41808fa18.mockapi.io/api/posts
```


To run this example, simply do:

```sh
npm install
npm run dev
```

## IDE setup

VSCode is highly preferred. Please ensure you have installed these extensions:

- Prettier
- eslint

## Useful Commands

```sh
#to run in dev mode
npm run dev

#to run in qa or production env.
npm run start

```

## Design Philosophy - Dev Environment

### 💡 Rule: Hot Reload should be supported during development

Hot Reload is important for frontend development as the changes can be reflected in a very quick manner. Hot reload feature is already supported by the latest version of Nextjs. Any changes on the source files would trigger rebuilding the application automatically.

### 💡 Rule: Code Linting is required

Linters are added into this project template to enhance code quality.

## Design Philosophy - Application Design

### 💡 Rule: Need a clear layout structure

Every page in the same project actually shares the same structure. I make good use of some Nextjs features and some custom components to organize the pages:

#### app/layout.js

This is provided by the Nextjs framework. It defines root skeleton of any page. For example, it contains markup like `<html>`, `<head>`, `<body>`
