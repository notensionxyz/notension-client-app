/**
 * @format
 */
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
