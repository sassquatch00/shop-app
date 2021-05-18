import React from 'react'
import { Platform } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'

import Colours from '../constants/Colours'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

const defaultStackNavigatorOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colours.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colours.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitle: "Back",
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  }
}

const ProductsNavigator = createStackNavigator(
  { 
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
  },
  { 
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='ios-cart'
          size={23}
          color={drawerConfig.tintColor}/>
      )
    }
  },
  { defaultNavigationOptions: defaultStackNavigatorOptions }
)

const OrdersNavigator = createStackNavigator(
  { Orders: OrdersScreen },
  { 
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='ios-list'
          size={23}
          color={drawerConfig.tintColor}/>
      )
    }
  },
  { defaultNavigationOptions: defaultStackNavigatorOptions}
)

const AdminNavigator = createStackNavigator(
  { 
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  { 
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='ios-create'
          size={23}
          color={drawerConfig.tintColor}/>
      )
    }
  },
  { defaultNavigationOptions: defaultStackNavigatorOptions}
)

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  { 
    contentOptions: {
      activeTintColor: Colours.primary
    }
  }
)

export default createAppContainer(ShopNavigator)