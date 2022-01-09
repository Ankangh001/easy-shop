import React from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
const Cart = (props) => {
    return (
        <View>
            {
                props.cartItems.map(x => (
                    <Text>{x.product.name}</Text>
                )
                )}
        </View>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps, null)(Cart);
