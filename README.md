## Description

Vault server app built on nestjs.

## Project

copy the following to an .env file

DATABASE_URL = 'postgresql://neondb_owner:npg_0fpNmjTbXB2w@ep-holy-fire-adv0vj13-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

JWT_SECRET="e64c54c57bb89698a9c75dbed402980b3015c25cb940e1f9a338140a0f8527ba"

PORT=55431

JWT_EXPIRATION_TIME = '60m'

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
