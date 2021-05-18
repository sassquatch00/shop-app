import React from 'react'
import { Button, FlatList, StyleSheet, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Colours from '../../constants/Colours'
import { addToCart } from '../../store/actions/CartActions'

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch()

  const selectItemHandler = () => {
    props.navigation.navigate('ProductDetails', { productId: itemData.item.id, productTitle: itemData.item.title })
  }

  return(
    <FlatList 
      data={products} 
      keyExtractor={item => item.id} 
      renderItem={itemData => {
        return (
          <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            imageUrl={itemData.item.imageUrl}
            onSelect={selectItemHandler}>
            <Button 
              color={Colours.primary} 
              title="View Details" 
              onPress={selectItemHandler}/>
            <Button 
              color={Colours.primary} 
              title="Add to Cart" 
              onPress={() => {dispatch(addToCart(itemData.item))}}/>
          </ProductItem>
        )}
      }/>
  )
}

ProductsOverviewScreen['navigationOptions'] = navigationData => {
  return {
    headerTitle: 'All Products',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item 
          title='Cart' 
          iconName='ios-cart' 
          onPress={() => {navigationData.navigation.navigate('Cart')}}/>
      </HeaderButtons>
    ),
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

export default ProductsOverviewScreen