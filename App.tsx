import './IgnoreWarnings';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import {ToastProvider} from 'react-native-toast-notifications';

// REDUX-TOOLKIT DEPENDENCIES
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastProvider>
          <AppNavigation />
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
