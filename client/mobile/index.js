import {AppRegistry} from 'react-native';
import App from './App'; // Import your root component
import {name as appName} from './app.json';

// Register the root component for your app
AppRegistry.registerComponent(appName, () => App);

// Start the app by running the registered component
AppRegistry.runApplication(appName, {
  initialProps: {},
});
