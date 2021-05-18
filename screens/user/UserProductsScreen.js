import React from 'react'
import { Button, FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import Colours from '../../constants/Colours'
import { deleteProduct } from '../../store/actions/ProductActions'

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()

  const selectItemHandler = productId => {
    props.navigation.navigate('EditProduct', { productId: productId })
  }

  return(
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => 
        <ProductItem 
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={selectItemHandler(itemData.item.id)}
        >
          <Button color={Colours.primary} title='Edit' onPress={selectItemHandler(itemData.item.id)}/>
          <Button color={Colours.primary} title='Delete' onPress={() => {dispatch(deleteProduct(itemData.item.id))}}/>
        </ProductItem>}
    />
  )
}

UserProductsScreen['navigationOptions'] = navigationData => {
  return {
    headerTitle: 'Your Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {navigationData.navigation.toggleDrawer()}}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add'
          iconName='ios-create'
          onPress={() => {navigationData.navigation.navigate('EditProduct')}}/>
      </HeaderButtons>
    )
    }
}

const styles = StyleSheet.create({

})

export default UserProductsScreen