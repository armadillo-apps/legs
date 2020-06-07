# LEGS(ARMS back-end)

![CircleCI](https://img.shields.io/circleci/build/github/armadillo-apps/legs.svg)


## Setup

### Install dependencies
```
npm install
```

### Setup secrets
- Create .env file with command below and replace dummy values with secrets in KeePassX vault
```
cp .env.sample .env
```

### Initialise Database (only run once on initial setup)
```
npm run init:db
```

### Start server
```
npm start
```

### Start server in development mode
```
npm run start:dev
```

### Run the tests

```
npm test
```

### Build the app

```
npm run build
```
