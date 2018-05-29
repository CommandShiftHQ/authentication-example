# User Auth Examples

Example code for user authentication lectures

Express/Mongoose API code is in `/api` directory
React code is in `/app` directory

## Initial Setup for `/api' directory:
- Create new database called `mcrcodes-authentication-bcrypt` with MongoDB
- Add new user with password to this account
- Create `.env` file in the root `/api` along side `package.json`
- Add newly created Mongo string `DATABASE_URL=mongodb://user:password@ds139690.mlab.com:39690/mcrcodes-authentication-bcrypt`

## Running the App:
- First CMD; cd to `/api` and run `npm start` to start API code
- Second CMD; cd to `/app` and run `npm start` to start React code
