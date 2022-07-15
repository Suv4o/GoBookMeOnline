## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Migrations

Create a new migration:

```bash
yarn typeorm:dev -- migration:generate src/migrations/CreteUserTable2
```

Run migrations:

```bash
yarn typeorm:dev migration:run
```

Revert migrations:

```bash
yarn typeorm:dev migration:revert
```

Create schema:

```bash
yarn schema:create
```

Drop schema:

```bash
yarn schema:create
```
