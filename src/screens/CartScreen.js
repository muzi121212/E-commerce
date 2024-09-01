import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../slices/cartSlice';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rs {(item.price * item.quantity)}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
            )}
          />
          <View style={styles.summary}>
            <Text style={styles.totalAmount}>Total: Rs {totalAmount.toFixed(2)}</Text>

            {/* Proceed to Checkout Button */}
            <TouchableOpacity
              style={[styles.button, styles.checkoutButton]}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>

            {/* Clear Cart Button */}
            <TouchableOpacity
              style={[styles.button, styles.clearCartButton]}
              onPress={() => dispatch(clearCart())}
            >
              <Text style={styles.buttonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    textAlign: 'right',
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
  },
  clearCartButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
