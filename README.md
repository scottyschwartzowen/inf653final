# Final - Scott Schwartz-Owen

- INF 653G-VB - BACK END WEB DEVELOPMENT I

[Link](https://inf653final-4g88.onrender.com)

- at link URL, test root endpoints with /states/

## Project Features

- Built with Node.js, Express and MongoDB.

- RESTful API that serves data on all 50 U.S. states from a local JSON file. Supports full CRUD operations for state fun facts stored in a NoSQL MongoDB Atlas collection via Mongoose.

- State data and fun facts are merged dynamically at request time, with endpoints for capital cities, nicknames, and contiguous state filtering.

- GitHub source control. Render auto-deploying every push

## API Endpoints

### States

| Method | Endpoint               | Description                                               |
| ------ | ---------------------- | --------------------------------------------------------- |
| GET    | `/states`              | Returns all 50 states, merged with fun facts from MongoDB |
| GET    | `/states?contig=true`  | Returns only contiguous states                            |
| GET    | `/states?contig=false` | Returns only non-contiguous states (AK, HI)               |
| GET    | `/states/:state`       | Returns a single state                                    |

### Fun Facts

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| GET    | `/states/:state/funfact` | Returns a random fun fact for the state |
| POST   | `/states/:state/funfact` | Adds one or more fun facts to the state |
| PATCH  | `/states/:state/funfact` | Updates a fun fact by 1-based index     |
| DELETE | `/states/:state/funfact` | Deletes a fun fact by 1-based index     |

### State Data

| Method | Endpoint                    | Description                                                 |
| ------ | --------------------------- | ----------------------------------------------------------- |
| GET    | `/states/:state/capital`    | Returns the state name and capital city                     |
| GET    | `/states/:state/nickname`   | Returns the state name and nickname                         |
| GET    | `/states/:state/population` | Returns the state name and population                       |
| GET    | `/states/:state/admission`  | Returns the state name and date of admission into the union |
