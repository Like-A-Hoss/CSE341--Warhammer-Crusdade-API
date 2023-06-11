require('dotenv').config();
const oauth = require('oauth-library');
//env variables
const id = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
//Code from authO.com

const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://cse341-warhammer-crusade-api.onrender.com',
  issuerBaseURL: 'https://dev-wcau0oyqkd3gnubl.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);

// Initialize the OAuth client with necessary credentials
const oauthClient = require('simple-oauth2').create({
    client:{
        id: id,
        secret: secret
    },
    auth:{
    tokenHost: 'https://dev-wcau0oyqkd3gnubl.us.auth0.com/oauth/token'
    }
});

const authenticateUserWithOAuth = async (username, password) => {
    try {
      // Authenticate user credentials with OAuth provider
      const token = await oauthClient.password.getToken({
          username,
          password,
          scope: ' '
      });
      return token;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };
  
  module.exports = {
    authenticateUserWithOAuth,
  };
module.exports = {
  authenticateUserWithOAuth,
};