import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)


  return(
    <FlatList 
      data={orders} 
      keyExtractor={item => item.id} 
      renderItem={itemData => {
        console.log(itemData.item.items)
        return(
        <OrderItem
          items={itemData.item.items}
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />)}}
    />
  )
}

OrdersScreen['navigationOptions'] = navigationData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {navigationData.navigation.toggleDrawer()}}/>
      </HeaderButtons>
    )
    }
}

const styles = StyleSheet.create({

})

export default OrdersScreen