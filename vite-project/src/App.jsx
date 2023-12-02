// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import MainContainer  from './Components/MainContainer/MainContainer';
import styles from "./App.module.css";
import * as AuthApi from 'splitwise-node';


function App() {
  

  let userOAuthToken, userOAuthTokenSecret;
  let authApi = new AuthApi("ZBnetoZkRyjuJ97FSHiOmNAX6Lc4xIVrCwFkeZ7G", "dmjNg944GUJ3Y3VRthSa9lJ0wkxcOony9f8G8O8U");
  let userAuthUrl = authApi.getOAuthRequestToken()
      .then(({ token, secret }) => {
          [userOAuthToken, userOAuthTokenSecret] = [token, secret];
          return authApi.getUserAuthorisationUrl(token);
      });

      userAuthUrl.then((authorizationUrl) => {
        window.location.href = authorizationUrl;
      }).catch((error) => {
        console.error('Error getting authorization URL:', error);
      })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let splitwiseApi = authApi.getSplitwiseApi(userOAuthToken, userOAuthTokenSecret);



  return (
    <div className={styles.mainContainer}>
      <MainContainer title="Dashboard"/>
    </div>
  );
}

export default App;