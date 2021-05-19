import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import { createProduct, updateProduct } from '../../store/actions/ProductActions'

const EditProductScreen = props => {
  const productId = props.navigation.getParam('productId')
  const productToEdit = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))

  const dispatch = useDispatch()

  const[title, setTitle] = useState(productToEdit ? productToEdit.title : '')
  const[imageUrl, setImageUrl] = useState(productToEdit ? productToEdit.imageUrl : '')
  const[price, setPrice] = useState(productToEdit ? productToEdit.price.toString() : '')
  const[description, setDescription] = useState(productToEdit ? productToEdit.description : '')

  const submitHandler = useCallback(() => {
    if (productToEdit) {
      dispatch(updateProduct(productId, title, parseFloat(price), imageUrl, description))
    } else {
      dispatch(createProduct(title, parseFloat(price), imageUrl, description))
    }
  }, [title, imageUrl, price, description])

  useEffect (() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return(
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput value={title} style={styles.input} onChangeText={text => setTitle(text)}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput value={imageUrl} style={styles.input} onChangeText={text => setImageUrl(text)}/>
        </View>
        {productToEdit ? null : <View style={styles.inputContainer}>
          <Text style={styles.label}>Price</Text>
          <TextInput value={price} style={styles.input} onChangeText={text => setPrice(text)}/>
        </View>}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput value={description} style={styles.input} onChangeText={text => setDescription(text)}/>
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen['navigationOptions'] = navigationData => {
  const handleSubmit = navigationData.navigation.getParam('submit')
  return {
    headerTitle: navigationData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName='ios-checkmark'
          onPress={handleSubmit}/>
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  container: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }
})

export default EditProductScreen