const jwt = require('jsonwebtoken');
const request = require('request-promise');
const User = require('../models/user');

const createJWT = (user, callback) => {
  const payload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' }, callback);
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: 'User not found with given email address.',
        });
      } else {
        if (user.validatePassword(req.body.password)) {
          createJWT(user, (err, token) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.status(200).json({ token }); 
            }
          });
        } else {
          res.status(401).json({
            message: 'The email/password combination is incorrect.',
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
}

const github = (req, res) => {
  let accessToken

  // exchange authorization code for access token
  request.post('https://github.com/login/oauth/access_token', {
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.body.code,
    },
    json: true,
  })
  .then(response => {
    accessToken = response.access_token // save for later
    
    // use the access token to retrieve information about the GitHub user
    return request.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': `authentication-example`
      },
      json: true,
    })
  })
  // create a user (if one doesn't exist) using the retrieved data from the GitHub user
  .then(({ email, name }) => User.findOneOrCreate({ email }, {
    email,
    firstName: name.substr(0, name.indexOf(' ')),
    lastName: name.substr(name.indexOf(' ') + 1),
  }))
  // update the user's access token (so we can keep it for requests later)
  .then((user) => {
    user.set({ accessToken })
    
    return user.save()
  })
  // return a JWT to the user (we don't want to reveal the access_token to the client)
  .then((user) => {
    createJWT(user, (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json({ token }); 
      }
    });
  })
  .catch((error) => {
    console.log(error.message);
    res.sendStatus(200);
  })
}

module.exports = {
  login,
  github,
};
