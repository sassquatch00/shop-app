import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import ShopNavigator from './navigation/ShopNavigator'
import ProductsReducer from './store/reducers/ProductsReducer'
import CartReducer from './store/reducers/CartReducer'
import OrdersReducer from './store/reducers/OrdersReducer'

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartReducer,
  orders: OrdersReducer,
})

const store = createStore(rootReducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  if (!isFontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {setIsFontLoaded(true)}} onError={err => console.log(err)}/>
  }

  return (
    <Provider store={store}>
      <ShopNavigator/>
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
