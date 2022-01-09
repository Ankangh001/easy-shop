import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';
import Cart from '../Screens/Cart/Cart';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={ProductContainer}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Product Details"
        component={SingleProduct}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator
