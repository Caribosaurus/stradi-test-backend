# Stradigi Backend Test

## How to execute locally

- have a local mongodb instance on the default port
- have a local PostgreSQL instance runnin on the default port
- Execute `src/InitializeDB.sql` in psql cli
- Execute `npm run dev`

By default it will use mongodb. To use Postgres simply set the environment variable `Postgres` to True.

# REST API

## Get an array of TODO lists

### Request

`GET /list/`

## create a TODO list

### Request

`POST /list/`

## Get a specific TODO list

### Request

`GET /list/id`

## Modify a TODO list

### Request

`PUT /list/id`

## Delete a TODO list

### Request

`Delete /list/id`

## Add a TODO items to a list

### Request

`POST /list/id/items`

## get all TODO items

### Request

`GET /item/`

## get a specific TODO item

### Request

`GET /item/id`

## update a specific TODO item

### Request

`PUT /item/id`

## Delete a specific TODO item

### Request

`DELETE /item/id`
