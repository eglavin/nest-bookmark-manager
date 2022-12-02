# Nest Bookmark Manager

## Data Representation and Querying Project

> Galway Mayo Institute of Technology 2018

Seed Mongo db using the `mongoimport` utility with the following command. Example data can be found in the `./backend/data` folder.

```ps1
mongoimport `
  --uri mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>/<DATABASE> `
  --collection <COLLECTION> `
  --type json `
  --jsonArray `
  --file <FILENAME>
```
