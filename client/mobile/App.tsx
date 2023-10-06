// App.tsx
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {LightTheme, DarkTheme} from './assets/theme';
import Navigation from './src/screens/Navigation';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false); // Initially set to false for light theme

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
};

export default App;
