# Example how to use Express and TypeORM with TypeScript

## Initial Setup

Make sure PostgreSQL 12 is installed on the operating system! On Windows, ensure that the postgres service is running. You may also have to open pgAdmin4. It is recommended to create a new, non-superuser user and create a new database under that user.

### Recommended readings

- [PostgreSQL with Node](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)
- [TypeORM homepage](https://typeorm.io/)
- [TypeORM Entity Docs](https://typeorm.io/#/entities)
- [TypeORM with Express Example](https://typeorm.io/#/example-with-express)

### Steps

1. Navigate to this directory then run `yarn` or `npm install`
2. Create a `.env` file and edit it to look like `ENV_TEMPLATE`. Adjust values as necessary (Database name, password of database owner, username of database owner, hostname, port, etc.)
3. Ignore `ormconfig.json` for now; database configuration is done through the .env currently.
4. Run `yarn start`

## TypeORM CLI

1. Install `typeorm` globally: `npm i -g typeorm`
2. Run `typeorm -h` to show list of available commands
