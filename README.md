# LEGS(ARMS back-end)

![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/legs.svg)

## Files you need to create

Create a `.env` and ensure that the `.env` file is in .gitignore. The JWT secret key from the `test-armadillo-legs` app in Heroku currently matches what is hashed in the mongo command in the `arms` circleci dropDb job. If it is replaced, then the hashed password in the mongo command must also be changed to match it.

```.env
{
  JWT_SECRET_KEY=<Generate your own>
}
```

## Seed your local DB copy with an initial admin user to allow cypress tests to be ran

Using your own JWT_SECRET_KEY, generate a hash password to be used with the following mongo command to run on your local DB to create the first initial Admin user:

db.users.insertOne({email:'baqa@thoughtworks.com',password:<Insert your hashed password here>,role:'admin'})

when using the bash shell remember to use escape characters for dollar signs characters in the hashed password.

This command is also used in ARMS (Front-end) for the config.yml file to seed the first admin user for testing.

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
