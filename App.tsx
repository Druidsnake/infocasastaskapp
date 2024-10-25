import React from 'react';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

const App = () => {
  return (
    <AutocompleteDropdownContextProvider>
      <HomeScreen />
    </AutocompleteDropdownContextProvider>
  );
};

export default App;
