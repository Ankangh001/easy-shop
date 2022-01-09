import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//provider
import { Provider } from 'react-redux';
//Store
import store from './Redux/Store';
//Main
import Main from './Navigators/Main';
//Header
import Header from './Shared/Header';
//ProductContainer
import ProductContainer from './Screens/Products/ProductContainer';

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
