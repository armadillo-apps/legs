# LEGS(ARMS back-end)
![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/legs.svg)

## Files you need to create

Create a `.env` and ensure that the `.env` file is in .gitignore. Get the secret key from the `test-armadillo-legs` app from Heroku

```.env
{
  JWT_SECRET_KEY=<GET_SECRET_KEY_FROM_HEROKU>
}
```

## Getting started

To start server

```
npm start
```

To start server in development mode

```
npm run start:dev
```

To run the tests

```
npm test
```

To build the app

```
npm run build
```
