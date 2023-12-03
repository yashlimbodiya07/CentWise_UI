import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import AuthApi from 'splitwise-node';
import oauthDetails from '../../oauthDetails.json';

const initialize = (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // TODO: MongoDB connection
  var userOAuthToken: string, userOAuthTokenSecret: string;
  var authApi = new AuthApi(oauthDetails[0].consumerKey, oauthDetails[0].consumerSecret);

  // Step 2: Get an authorization URL
  app.get('/centwise/authorize', (req: Request, res: Response) => {
      console.log("Am i printing?");
    authApi.getOAuthRequestToken()
      .then(({ token, secret }: { token: string, secret: string }) => {
        // Store these tokens in a secure way (e.g., in a session or a database)
        userOAuthToken = token;
        userOAuthTokenSecret = secret;
        console.log("userOAuthToken: " + userOAuthToken + " userOAuthTokenSecret: " + userOAuthTokenSecret);
        const userAuthUrl = authApi.getUserAuthorisationUrl(token);
        console.log("userAuthUrl: " + userAuthUrl);
        res.redirect(userAuthUrl);
      })
      .catch((error: Error) => {
        console.error('Error getting authorization URL:', error.message);
        res.status(500).send('Internal Server Error');
      });
  });

  // Step 3: Handle the callback after the user authorizes
  app.get('/centwise/callback', (req: Request, res: Response) => {
    const { oauth_token, oauth_verifier } = req.query;

    authApi.getOAuthAccessToken(
      userOAuthToken,
      userOAuthTokenSecret,
      oauth_verifier
    )
    .then(({ oauth_token: accessToken, oauth_token_secret: accessTokenSecret }: { oauth_token: string, oauth_token_secret: string }) => {
        // Now you have the access token and access token secret
        const splitwiseApi = authApi.getSplitwiseApi(accessToken, accessTokenSecret);
        // You can use the 'splitwiseApi' object to make API calls
        // ...

        res.send('Authorization successful!');
      })
      .catch((error: Error) => {
        console.error('Error getting access token:', error.message);
        res.status(500).send('Internal Server Error');
      });
  });
};

export default initialize;