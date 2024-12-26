// JWT flow:
// 1. Create consent URI and obtain user consent.
// 2. Construct JWT using the IK and User ID, scope, RSA public and private key.
// 3. Send POST containing the JWT to DS_AUTH_SERVER to get access token.
// 4. Using the access token, send a POST to get the user's base URI (account_id + base_uri).
// 5. Now you can use the access token and base URI to make API calls.
// When the access token expires, create a new JWT and request a new access token.
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const fs = require('fs'); // Used to parse RSA key
const dayjs = require('dayjs'); // Used to set and determine a token's expiration date

// Constants
const rsaKey = fs.readFileSync(path.resolve(__dirname, '../../private.key'));
const jwtLifeSec = 60 * 60; // Request lifetime of JWT token is 60 minutes
const scopes = 'signature';

// For production environment, change "DEMO" to "PRODUCTION"
const basePath = null; // https://demo.docusign.net/restapi
const oAuthBasePath = null; // account-d.docusign.com

/**
 * Creates and sends a JWT token using the integration key, user ID, scopes and RSA key.
 * Then stores the returned access token and expiration date.
 */
const getToken = async (req) => {
  
};

/**
 * Checks to see that the current access token is still valid, and if not,
 * updates the token.
 * Must be called before every Docusign API call.
 */
const checkToken = async (req) => {
  
};

/**
 * Gets the account ID, account name, and base path of the user using the access token.
 */
const getUserInfo = async (req) => {
  
};

/**
 * First checks if there is already a valid access token, updates it if it's expired,
 * then gets some user info. If the user has never provided consent, then they are
 * redirected to a login screen.
 */
const login = async (req, res, next) => {
  
};

/**
 * Logs the user out by destroying the session.
 */
const logout = (req, res) => {
  req.session = null;
  console.log('Successfully logged out!');
  res.status(200).send('Success: you have logged out');
};

/**
 * Sends back "true" if the user is logged in, false otherwise.
 */
const isLoggedIn = (req, res) => {
  let isLoggedIn;
  if (req.session.isLoggedIn === undefined) {
    isLoggedIn = false;
  } else {
    isLoggedIn = req.session.isLoggedIn;
  }

  res.status(200).send(isLoggedIn);
};

module.exports = {
  checkToken,
  login,
  logout,
  isLoggedIn,
};
