# node-best-sellers

- Simple search through the best sellers from https://www.nytimes.com/books/best-sellers/

# Prerequisites
  - Node 12
  - Docker/Docker-compose


Running
```
docker-compose up -d
npx sequelize-cli db:migrate
npm run loader
npm run start
```


Cleanup
```
docker-compose down
```

# Implementation

## Jobs
- Loader
  - Scrapes best sellers
  - Inserts records into database

## Database
- Tables
  - books
    - title
    - description
    - author_id
  - authors
    - full_name

- Indices
  - books.title
    - to support faster LIKE queries


## Web Server
- API Endpoints
  - list authors
  - list all books
  - search through books matching query
  - create a new book





# Dependencies
  - axios
    - nicer http client
  - express, body-parser
    - http server
  - jsdom
    - html parsing
    - heavy but battle-tested and well maintained
  - nodemon
    - live reload
  - pg, pg-hstore, sequelize, sequelize-cli
    - ORM
    - Postgres
    - Migrations
    - promise-based, battle-tested and well maintained

# Project Structure

Three top-level directories.
  - api
    - The Express web server
  - jobs
    - Cron jobs and one-off tasks
  - lib
    - Contains domain related entities (models, repos, services) grouped by a domain-defined bounded context

