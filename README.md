# Stradigi Backend Test

## How to execute locally

- have a local mongodb instance on the default port
- have a local PostgreSQL instance runnin on the default port
- Execute `src/InitializeDB.sql` in psql cli
- Execute `npm run dev`

By default it will use mongodb. To use Postgres simply set the environment variable `Postgres` to True.
