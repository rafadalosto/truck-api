# Truck API

Restfull API for Truck and Truck Position registration using Node

## How to execute this project

**Node version:** v12.16.1

**Yarn Version:** 1.22.0

**Database:** MariaDB 10.4.6-MariaD

**Create a database with name** truck-api

**Configure your database credentials on file:** /.env

**Install the dependencies**
```bash
yarn install
```

**Create the tables on database**
```bash
yarn sequelize db:migrate
```

**Run the application with the command**
```bash
yarn dev
```

**Run the tests with the command**
```bash
yarn test
```

## Import the Requests on Insomnia
You can use the Insomnia (https://insomnia.rest/) to make the calls to the API endpoints.
Install Insomnia and import the file Insomnia_2020-03-01.json.


