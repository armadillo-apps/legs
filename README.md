# LEGS(ARMS back-end)
![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/legs.svg)

## Files you need to create

Create a `.env` and ensure that the `.env` file is in .gitignore. The JWT secret key from the `test-armadillo-legs` app in Heroku currently matches what is hashed in the mongo command in the `arms` circleci dropDb job. If it is replaced, then the hashed password in the mongo command must also be changed to match it.

```.env
{
  JWT_SECRET_KEY=<Generate your own>
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
