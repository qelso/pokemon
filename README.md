# ContentWise Pokemon Wizard Challenge

This is a submission for the ContentWise's FE Challenge.

Built with Vite, React and Playwright as e2e test framework.
NPM is the package manager.

## Development environment

To install dependencies run
```
npm i
```

To spin a dev server run
```
npm run dev
```

### Apollo GraphQL
This app uses the Apollo library to handle GraphQL APIs and the GraphQL code generator to load static types. 
When there are new queries or there are changes on existing queries, run
```
npm run compile
```

Modify the /codegen.ts script to handle GraphQL schemas. 
More details here https://www.apollographql.com/docs/react/development-testing/static-typing

### E2E Tests 
To run the Playwright tests, first spin up the dev server, then run
```
npx playwright test
```

Tests are in the /e2e folder.

Currently tested for Chrome and Firefox

## Build 
To create a build run
```
npm run build
```

The build can be found in the /dist folder.

### Docker
A Dockerfile is provided to deploy the current build. 
Docker image exposing on port 80.

