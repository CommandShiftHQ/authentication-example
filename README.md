# User Auth Examples

Example code for user authentication lectures

Express/Mongoose API code is in `/api` directory
React code is in `/app` directory

## Setting up a github app
- Create an application on Github - [https://github.com/settings/applications/new](https://github.com/settings/applications/new)
- Set *application name* as **authentication-example**
- Set *homepage url* as **localhost:8080**
- Set *callback url* as **localhost:8080/github-login**
- take note of your client id and client secret - you will need them shortly

## Initial Setup for `/api` directory:
- Create new database called `mcrcodes-authentication-bcrypt` with MongoDB
- Add new user with password to this account
- Create `.env` file in the root `/api` along side `package.json`
- Add newly created Mongo string `DATABASE_URL=mongodb://user:password@ds139690.mlab.com:39690/mcrcodes-authentication-bcrypt`
- Add `JWT_SECRET` to `.env` - this can be anything
- Add your client id and client secret to `.env` as `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` respectively.

## Setup for app
- Create a `.env` in the `/app` directory with a `GITHUB_CLIENT_ID` the same as above.

## Running the App:
- First CMD; cd to `/api` and run `npm start` to start API code
- Second CMD; cd to `/app` and run `npm start` to start React code
