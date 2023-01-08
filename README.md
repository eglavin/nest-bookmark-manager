# Nest Bookmark Manager

## Data Representation and Querying Project

> Galway Mayo Institute of Technology 2018

Nest Bookmark Manager was developed as a fourth year college project demonstrating the use of both frontend and backend layers with persistence to a Mongo database. Although this was originally developed for a module in college, I now use this project to keep up to date with new Angular versions.

## Local Development

To run the project locally install project dependencies using `npm ci` and then start the project using `npm start`.

The node server assumes there's is a local mongo database instance available at the following port `127.0.0.1:27017`, which can be setup using docker-compose by using the `npm run db:start` command.

### Setup Database

To set the database username and password create a copy of the `.env.example` file called `.env` and update the following values.

```sh
DB_USERNAME=""
DB_PASSWORD=""
```

### Seed Database

You can seed your Mongo db instance using the `mongoimport` utility from the [MongoDB Command Line Database Tools](https://www.mongodb.com/try/download/database-tools) with the following command. Example data can be found in the `./backend/data` folder.

```ps1
mongoimport `
  --uri mongodb://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<DATABASE> `
  --collection <COLLECTION> `
  --type json `
  --jsonArray `
  --file <FILENAME>
```
