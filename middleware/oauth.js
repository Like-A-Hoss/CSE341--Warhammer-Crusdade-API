const oauth = require('oauth-library');
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
const oauthClient = oauth.createClient({
  // OAuth client configuration
});

const authenticateUserWithOAuth = async (username, password) => {
  try {
    // Authenticate user credentials with OAuth provider
    const token = await oauthClient.authenticateUser(username, password);
    return token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

module.exports = {
  authenticateUserWithOAuth,
};