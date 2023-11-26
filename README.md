# Library-case-web-app

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Testing](#testing)
- [Acknowledgement](#acknowledgement)

## Introduction

This is a web application for managing the members and the borrowing of books by the members for a library.

## Technologies

List the main technologies used in your project:

- Express
- Node.js (v18.17.1)
- PostgreSQL

Note: Be sure that right version of node is installed. If you have Node Version Manager (nvm), you can easily install by typing `nvm install 18.17.1`. If you don't have nvm, you can check [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

You can check your node version by typing `node -v` in your terminal.

## Installation

### Environment setup
Local setup steps are explained below:

- Clone project to your local environment:
```bash
git clone https://github.com/MelihCelik00/library-case-web-app.git
```

- Install required node modules from *package.json*. Be sure that right version of node is installed:
```bash
npm install
```
----
- Be sure you got .env file from me :) We will use some private db data from dotenv file.
----

- Before database migration, you have to be sure that postgresql already installed in your local machine. For that purpose, you can view postgresql installation [here](https://www.postgresql.org/download/). After installing, be sure that you have a psql user with the createDB permission. If not, follow here:
```bash
psql postgres
#create a new user inside the psql terminal
#password must be enclosed with quotes
CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';
# make the newuser capable of creating, editing, and deleting databases
ALTER ROLE postgres CREATEDB;
# Quit psql terminal to be able to login using newuser
\q
# Go back to psql terminal, with `newuser` as user
psql postgres -U postgres

```
After that you can create our db just by that: 
```bash
CREATE DATABASE "library-db"
```

- After db is created succesfully, you can easily migrate your tables into the db:
```bash
npm run migrate
```
This should produce this output:
```log
npm run migrate

> library-case-web-app@0.0.0 migrate /Users/melihsafacelik/Developer/Projects/test/library-case-web-app
> sequelize db:migrate

Sequelize CLI [Node: 14.20.0, CLI: 6.6.2, ORM: 6.35.1]

Loaded configuration file "config/config.js".
== 20231124211918-create-user: migrating =======
== 20231124211918-create-user: migrated (0.023s)

== 20231124221130-create-book: migrating =======
== 20231124221130-create-book: migrated (0.009s)

== 20231125152043-create-book-borrowings: migrating =======
== 20231125152043-create-book-borrowings: migrated (0.011s)

== 20231125152217-create-book-ratings: migrating =======
== 20231125152217-create-book-ratings: migrated (0.009s)

== 20231125165251-addForeignKeyRelations: migrating =======
== 20231125165251-addForeignKeyRelations: migrated (0.016s)
```

After migration is completed, our local env setup is completed too. Now, we can move to running step.

### Running localy
```bash
npm run local
```

After seeing this response in your terminal, you can test APIs:
```log
npm run local

> library-case-web-app@0.0.0 local /Users/melihsafacelik/Developer/Projects/test/library-case-web-app
> nodemon -r dotenv/config ./bin/www

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node -r dotenv/config ./bin/www`
```

## Testing
To test manually, you can view Postman documentation in your browser:
`http://localhost:3000/documentation/`

I also tried to add mini sample integration test so you can also test it with:
`npm run test`. But, for your information this part is not finished so it's likely to get errors :/

## Acknowledgement
Thanks to you guys for giving me this opportunity to work on this project. I have practiced a lot during the development of this project. 

