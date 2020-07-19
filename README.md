# LEGS(ARMS back-end)

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

### Initialise Database (run on initial setup or to reset db)
```
npm run init:db
```

### Start database only
```
npm run start:db
```

### Start server (without database)
```
npm start
```

### Start server and database in development mode
```
npm run start:dev
```

### Run the tests

```
npm test
```

### Enable githooks
```
chmod 700 ./githooks/pre-push.sh
chmod 700 ./githooks/post-merge.sh
```

### Build the app

```
npm run build
```
