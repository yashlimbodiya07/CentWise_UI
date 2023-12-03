// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
//import MainContainer  from './Components/MainContainer/MainContainer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./App.module.css";

function App() {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  useEffect(() => {
    // Perform any setup or side effects on component mount
    // For example, fetch the authorization URL from your server
    // when the component is mounted
    fetchAuthorizationUrl();
  }, []);

  const fetchAuthorizationUrl = async () => {
    try {
      // Fetch the authorization URL from your server
      const response = await fetch('http://localhost:5173/centwise/authorize');
      const data = await response.json();
      

      // Since you're redirecting, you don't need to parse JSON
      // The authorization URL is obtained from the response headers
      //const authorizationUrl = response.headers.get('Location');

      setAuthorizationUrl(data.authorizationUrl);
    } catch (error) {
      console.error('Error fetching authorization URL:', error.message);
    }
  };

  const handleAuthorization = () => {
    // Open a new window or redirect the user to the Splitwise authorization URL
    // You may want to use a library like 'react-router-dom' for navigation
    window.open(authorizationUrl, '_blank');
  };

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