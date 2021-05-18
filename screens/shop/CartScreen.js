import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import Colours from '../../constants/Colours'
import { clearCart, deleteFromCart } from '../../store/actions/CartActions'
import { addOrder } from '../../store/actions/OrderActions'

const CartScreen = () => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
  })

  const dispatch = useDispatch()

  return(
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round((cartTotalAmount.toFixed(2) * 100) / 100)}</Text>
        </Text>
        <Button 
          title="Order Now" 
          color={Colours.accent} 
          disabled={cartItems.length === 0}
          onPress={() => { 
            dispatch(addOrder(cartItems, cartTotalAmount))
            dispatch(clearCart())
          }}/>
      </View>
      <FlatList 
        data={cartItems} 
        keyExtractor={item => item.productId} 
        renderItem={itemData => {
          return <CartItem
            deleteable
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            quantity={itemData.item.quantity}
            onDelete={() => {dispatch(deleteFromCart(itemData.item.productId))}}
          />}}/>
    </View>
  )
}

CartScreen['navigationOptions'] = {
  headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colours.primary
  }
})

export default CartScreen