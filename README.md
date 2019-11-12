# LEGS(ARMS back-end)
![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/legs.svg)

## Files you need to create

Create a `.env` and ensure that the `.env` file is in .gitignore. Fill in a random generated secret key after the equals

```.env
{
  JWT_SECRET_KEY=<PUT_YOUR_OWN_KEY>
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
