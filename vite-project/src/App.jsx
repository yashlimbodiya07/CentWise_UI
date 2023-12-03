// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
//import MainContainer  from './Components/MainContainer/MainContainer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./App.module.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as AuthApi from 'splitwise-node';
import axios from 'axios';

const consumerToken = 'ZBnetoZkRyjuJ97FSHiOmNAX6Lc4xIVrCwFkeZ7G';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const consumerSecret = 'dmjNg944GUJ3Y3VRthSa9lJ0wkxcOony9f8G8O8U';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiKey = 'iXImDYyUdvdr938XlGs63eLc0XswsL3Sqal3i9zL';
const tokenUrl = 'https://secure.splitwise.com/oauth/token';
const authorizeUrl = 'https://secure.splitwise.com/oauth/authorize';


function App() {
  

  const [userOAuthToken, setUserOAuthToken] = useState('');
  const [userOAuthTokenSecret, setUserOAuthTokenSecret] = useState('');

  const handleAuthorization = async () => {
    // Step 1: Get request token
    const requestData = {
      url: tokenUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `oauth_consumer_key=${consumerToken}&oauth_signature_method=HMAC-SHA1&oauth_version=1.0`,
    };

    try {
      const response = await axios(requestData);
      const { oauth_token, oauth_token_secret } = response.data;
      setUserOAuthToken(oauth_token);
      setUserOAuthTokenSecret(oauth_token_secret);

      // Step 2: Redirect user to the authorization URL
      window.location.href = `${authorizeUrl}?oauth_token=${oauth_token}`;
    } catch (error) {
      console.error('Error getting OAuth request token:', error);
    }
  };

  useEffect(() => {
    // TODO: Implement server-side logic to handle OAuth callback and redirect.
    // After redirect, you can use the obtained userOAuthToken and userOAuthTokenSecret

    const handleOAuthCallback = async () => {
      // Extract the OAuth verifier from the URL
      const urlSearchParams = new URLSearchParams(window.location.search);
      const oauthVerifier = urlSearchParams.get('oauth_verifier');

      if (oauthVerifier) {
        // Use the verifier in your OAuth flow
        const requestData = {
          url: tokenUrl, // Use the appropriate endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: `oauth_consumer_key=${consumerToken}&oauth_token=${userOAuthToken}&oauth_verifier=${oauthVerifier}`,
        };

        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await axios(requestData);
          // Extract and handle the access token and other information as needed
        } catch (error) {
          console.error('Error getting access token:', error);
        }
      }
    };

    // Uncomment the following line to simulate handling the OAuth callback
    handleOAuthCallback();
  }, [userOAuthToken, userOAuthTokenSecret]);

  return (
    <div>
      <h1>CentWise</h1>
      <button onClick={handleAuthorization}>Authorize Splitwise</button>
    </div>
  );
}



  /*return (
    <div className={styles.mainContainer}>
      <MainContainer title="Dashboard"/>
    </div>
  );
}*/

export default App;