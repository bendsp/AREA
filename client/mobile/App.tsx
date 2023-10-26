// App.tsx
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {LightTheme, DarkTheme} from './assets/theme';
import Navigation from './src/screens/navigation';
import {useAuth0, Auth0Provider} from 'react-native-auth0';


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false); // Initially set to false for light theme

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <Auth0Provider domain={"dev-i4fb32lnpthmvwbm.us.auth0.com"} clientId={"Swqx5cU3zOG6h9jO54WK9HBwk8LRuOUn"}>
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
    </Auth0Provider>
  );
};

export default App;
