import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Colours from '../../constants/Colours'
import CartItem from './CartItem'

const OrderItem = props => {
  const[showDetails, setShowDetails] = useState(false)

  return(
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button 
        style={styles.button} 
        color={Colours.primary} 
        title= {showDetails ? "Hide Details" : "Show Details"} 
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && 
        <View style={styles.detailItems}>
          {props.items.map(item => {
           return (
            <CartItem 
              key={item.productId}
              deleteable={false}
              quantity={item.quantity} 
              amount={item.sum} 
              title={item.productTitle}
            />)})}
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%'
  }
})

export default OrderItem