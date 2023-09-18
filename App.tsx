import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import {Provider} from "./src/context/Provider";
import Main from "./src/components/Main/Main";

function App() {
  return (
    <Provider>
    <SafeAreaView>
      <Main />
    </SafeAreaView>
    </Provider>
  );
}

export default App;
