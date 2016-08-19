# BMS Application

## Features

- Webpack development and production environment configuration
- Webpack SCSS configuration
- React Hot loader
- React Router configuration
- React, Redux configuration
- Testing environment configured with Mocha and Chai
- Linting with Airbnb eslint configuration

## Getting Started

npm install dependencies

````
npm install
````

### Start development server with hot reloading

````
npm run dev
````

### Production

Build for production

````
npm run prod
````

Start production server

````
npm run start
````

Note: I'm using pm2 for production server, you should install it on server via 'npm install pm2 -g'.
if you don't want to use pm2, just change pm2 with node in package.json file in scripts section.

### Testing

Run test once

````
npm run test
````

Test watch

````
npm run test:watch
````

### Document

Generate document

````
npm run esdoc
````

### Linting

For linting i'm using Eslint with Airbnb Eslint configuration

````
npm run lint
````

### License

MIT
