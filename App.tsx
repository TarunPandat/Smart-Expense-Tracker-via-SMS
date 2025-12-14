import React from 'react'
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigation';
import { PaperProvider } from 'react-native-paper';
import theme from './src/themes';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App