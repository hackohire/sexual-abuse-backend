# sexulabuse

NodeJS + Serverless + MongoDB + Mongoose + GraphQL

### Getting started

```bash
$ git clone
$ npm i
$ cp env-example.yml env.yml
$ npm start
```

> Replase MONGODB_URL in env.yml to point to your database.

### Features

- Uses `mongoose` for connecting to mongodb and defining models.
- Uses `GraphQL` to serve data to client.
- Pagination while fetching data.
- `async/await` syntax.
- Uses `eslint` and `prettier` for linting and formatting.

### Deploying

```bash
$ npm run deploy
```
