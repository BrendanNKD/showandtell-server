# showandtell-server

This repository contains an Express Node.js server that serves as a backend for your application. It provides a foundation for building robust and scalable web applications using the Express framework.

## Getting Started

Prerequisites
Before running the server, ensure that you have the following frameworks installed on your system and resources ready :

Node.js (version latest)
yarn (Package Manager)
AWS cognito identity provider
MongoDB server
OpenAI API

Follow these steps to get the server up and running:

```bash
yarn build
```

```bash
yarn start:dev
# or
yarn start:prod
```

This will start the server on http://localhost:3000.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result for healthcheck.
Postman [https://www.postman.com/] to run test on api routes

## Configuration

You can modify the server configuration by editing the config.ts. This file contains various settings such as port number, database connection details, API keys, etc.
You can start by creating .env with the required variables in the config.ts

## Logging

To learn more about how to change for formatting on the current loggings, take a look at the following resources:

- [https://github.com/winstonjs/winston](/src/utils/winston-logger/) - learn about custom format loggings.

### Clean Architecture

    .
    ├── app
    |   ├── src
    │     ├── config
    │     ├── data
    │     ├── domain
    │     ├── infrastructure
    │     ├── presentation
    │     └── utils
    ├── test.ts
    ├── main.ts
    └── server.ts

## Learn More

To learn more about Clean architecture, take a look at the following resources:

- [Architecture] (https://merlino.agency/blog/clean-architecture-in-express-js-applications) - learn about clean architecture implementations.

app: This directory contains the core application logic.
config: Holds configuration files and environment variables. It allows the application's settings to be easily modified without changing the code.
data: Contains files related to the database, such as migrations (scripts to create or modify database schema) and seed data (predefined data to populate the database for testing or initialization).
infrastructure: Implements the data access layer, providing an abstraction over data persistence mechanisms like databases or external services.
domain: Contains the business logic layer, responsible for implementing use cases and coordinating interactions between different components.
utils: Contains utility functions and shared code that can be used throughout the application.
tests.ts: Contains all the test-related files, including unit tests, integration tests, and any test utilities or fixtures.
main.ts: The entry point of the application, responsible for bootstrapping and setting up the application. It initializes dependencies, middleware, and starts the server.
server.ts: Handles web server setup and initialization, such as configuring middleware, defining routes, and starting the server.

## Deploy on EC2/ heroku

The easiest way to deploy your node.js app is to use the [AWS EC2](https://sumantmishra.medium.com/how-to-deploy-node-js-app-on-aws-with-github-db99758294f1)

## Docker

The structure contains docker compose for production and developemnt

- [Docker] (https://docs.docker.com/compose/gettingstarted/) - learn to run docker compose for containerized application.

Check out our [Front End](https://github.com/BrendanNKD/showandtell-webapp) implementation.

## License

This project is licensed under the MIT License. Feel free to use and modify the code as per your needs.
