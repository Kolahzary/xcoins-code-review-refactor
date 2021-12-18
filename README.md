# Code Review/Refactor for XCoins ![Build and Tests](https://github.com/kolahzary/xcoins-code-review-refactor/actions/workflows/node.js.yml/badge.svg)

This project has been refactored and made production-ready as a part of technical test for [XCoins Company](http://xcoins.com).

It includes:
- A clean Nest.js project
- E2E tests for APIs
- CI/CD using Github Actions
    - Auto build, unit&e2e test on each commit to master
    - Auto build and deploy docker image to Docker Hub: https://hub.docker.com/r/kolahzary/xcoins-code-review


## Installation

Either run the app directly
```bash
# Install npm packages
$ yarn

# create a copy of sample .env file
$ cp .env.sample .env

# use your favorite editor to configure your mongodb url
$ vim .env
```

Or just use docker-compose file in scripts folder
```bash
# Enter the scripts folder
$ cd scripts

# Build images
$ docker-compose build

# Run
$ docker-compose up

# Or you can use ./up.sh and ./down.sh scripts
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests (more coverage)
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## API List
- `[GET] /api/favorite`
    - Returns all records of favorite collection
- `[GET] /api/favorite/:profile_id`
    - Returns all favorites of a specific profile
- `[GET] /api/profile`
    - Returns all records of favorite collection
- `[POST] /api/profile { email, name, nickname }`
    - Creates a profile if it doesn't exist
- `[GET] /api/simulator`
    - Returns all records of simulator collection
- `[GET] /api/simulator/:profile_id`
    - Returns all simulator records of a specific profile
- `[POST] /api/simulator/:profile_id { date_recorded, cryptocurrency, euros, price, quantity }`
    - Creates a simulator record for specified profile

## Taken Steps
1. At first, I've checked the project and tried to understand it.
    - It's a SIMPLE project which stores & retrieves some crypto-currency related data.
    - It has 3 models, with routers for each of them
    - It has a messy seed file
2. Editted the readme file and added a list of problems for future reference
3. Tried to fix some bugs in current project and make it just work!
    - A little refactor on models (breaking change)
    - some bugfixes on seed file
4. Created a new branch and completely rewritten whole project based on Nest.js
    - Project wasn't that much big, so re-writing it was optimal
5. Created a branch named legacy from main and merged the re-written code from nest branch into main
6. Created Dockerfile and docker-compose script to easily run project
7. Created Github Actions workflow file to install, build, and unit+e2e tests on different node versions after each change on repository

## Problems of base project
- No documentation or api reference
    - This makes onboarding a new team member hard! (and etc...)
    - Solution: Always maintain documentations
- Raw express.js is used
    - Maintaining structure of an express.js project is hard especially in team environments which everyone has own idea about code structure
    - Solution: Migrate to a more structured framework like Nest.js
- Seed file adds new records with each run
    - This might cause bugs in the future
    - Solution: Only make changes if db is not created
- Seed file doesn't work correctly
    - Profile ID is hardcoded! (really guys?)
    - Solution: profile.save() returns saved record and there's no need for that additional query!
- Console.log is everywhere!
    - It's not a good practice to use console.log in production environment due to potential heavy usage
    - Solution: Use a better logging solution or just remove debug logs if they're not necessary
- No .gitignore in repository
    - Developers might commit contents node_modules folder by mistake
    - Solution: Add node.js .gitignore
- Unused installed packages & Unused imports
    - Any of those libraries could be a security hole in our app in the future, they should be chosen wisely and removed if not needed
    - Solution: Clean it up!
- No validation on requests
    - All user inputs should be strictly checked before processing
    - Solution: create DTOs for all requests and validate them strictly
- Lint fixes
    - Each developer can write different style code (some use backsticks for strings some use double quotations and etc...)
    - Solution: eslint, prettier, and typescript should be strictly configured to force developers write codes in the correct style
- Non-realistic seed data
    - This might confuse developers about the type of data that should be passed to this app
    - Solution: seed more realistic data into db
- Seed data doesn't match db structure!
    - There are some data in seed file which aren't inserted into db due to this conflict, and also some fields in models which are not filled
    - Solution: Either db structure should be changed or seed data should be updated! (I go with second one)
- Bad structure of db
    - List of favorites could be an array instead of lots of variables
    - Simulator model contains a field named euros, is this app only used to buy crypto using euros?
        - if no, it should have more generic name like 'amount' and 'value' and another field to define the base currency
        - if yes, euros field could be computed using `price * quantity` (but it's ok to have pre-computed fields in NoSQL)
    - Solution: refactor db models if needed
- Missing setup/run instructions documentation (a sample for .env file, readme instructions and etc...)
    - This might take some time from devops team or future developers to figure out how to run the code
    - Add sample .env file and also a section to readme.md which exactly defines steps to run the code
