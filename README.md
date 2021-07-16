# HatchTest
Find the best quotes from a given quotes array.

## Features
- Loopback 3 framework (based on express.js framework)
- Memory datasource with persistance in quotes.json file
- Swagger documentation

## Installation
This project requires Node.js and NPM to run.

Clone this repository.

```sh
git clone git@github.com:alanandrew97/HatchTest.git
```

Install the dependencies and start the server.

```sh
cd HatchTest
npm i
node .
```

## Explore
Now server is running on http://localhost:3000

To explore all available methods go to http://localhost:3000/explorer

To consume an API endpoint, needs to write the api prefix, for example http://localhost:3000/api/quoteCar

Everyone can test the endpoints directly from explorer since there is no authentication.

## Requested methods
GET - http://localhost:3000/api/quotes/bestOptionsPerYear - Get the best quote options per year for each coverage
GET - http://localhost:3000/api/quotes/quoteCar - Get the best quote options per year and car brand for each coverage.

## Author
Alan Andrew López Meneses
16/07/2021
