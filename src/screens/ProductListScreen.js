import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItem } from '../slices/cartSlice';

const products = [
  
 
    { id: 1, name: 'Hp Laptop', price: 9000, image: require('../../assets/images/hp-laptop1.jpeg') },
    { id: 2, name: 'Dell Laptop', price: 5000, image: require('../../assets/images/dell1.webp') },
    { id: 4, name: 'Shirt', price: 700, image: require('../../assets/images/shirt2.jpeg') },
    { id: 7, name: 'Shoe', price: 3900, image: require('../../assets/images/shoe2.jpeg') },
    { id: 5, name: 'Hoodie', price: 700, image: require('../../assets/images/hodi1.jpg') },
    { id: 3, name: 'Shirt', price: 500, image: require('../../assets/images/shirt1.jpeg') },
    { id: 8, name: 'Shoe', price: 799, image: require('../../assets/images/shoe3.webp') },
    { id: 6, name: 'Shoe', price: 1000, image: require('../../assets/images/shoe1.jpeg') },

  
];

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    navigation.navigate('Cart');
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Rs {item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android
  },
  image: {
    width: Dimensions.get('window').width / 2 - 40, 
    height: Dimensions.get('window').width / 2 - 40,
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProductListScreen;
