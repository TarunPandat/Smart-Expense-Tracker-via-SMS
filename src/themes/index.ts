import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { Colors } from '../constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors
  },
};

export default theme;