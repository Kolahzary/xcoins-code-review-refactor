# Code Review/Refactor for XCoins
This project should be refactored and made production-ready as a part of technical test for XCoins company.

At first, I've checked the project and tried to understand it.
It's a SIMPLE project which stores & retrieves some crypto-currency related data.


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
- `[POST] /api/simulator/:profile_id { ... }`
    - Creates a simulator record for specified profile

## Problems
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
- 
