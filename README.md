# User Auth Examples

Example code for user authentication lectures

Express/Mongoose API code is in `/api` directory
React code is in `/app` directory

## Initial Setup for `/api` directory:
- Create new database called `mcrcodes-authentication-bcrypt` with MongoDB
- Add new user with password to this account
- Create `.env` file in the root `/api` along side `package.json`
- Add newly created Mongo string `DATABASE_URL=mongodb://user:password@ds139690.mlab.com:39690/mcrcodes-authentication-bcrypt`

**Alternately:** The docker compose yaml in the root directory will start a mongodb container, and correctly configure the express app. 

## Running the App:
- First CMD; cd to `/api` and run `npm start` to start API code, **or** run `docker-compose up -d` from the project root
- Second CMD; cd to `/app` and run `npm start` to start React code
- If using docker-compose, you will need to run 'docker-compose build' after changing branches.
