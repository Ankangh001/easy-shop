import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native'



const { width } = Dimensions.get("window");
const ProductCard = (props) => {

    const { name, price, image, countInStock } = props
    return (
        <View style={styles.container}>
            <View style={styles.card} />
            <Image style={styles.image} 
                resizeMode='contain'
                source={{uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
            />
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 12) + '...' : name}
            </Text>
            <Text style={styles.price}>${price}</Text>
            {countInStock>0 ? (
                <View style={{marginBottom:60}}>
                    <Button title='Add' color={'green'} />
                </View>
            ) : <Text style={{marginBottom:10}}>Currently Not in Stock</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2.2,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
        justifyContent:'center',
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        position: 'absolute',
        top: -45
    },
    card: {
        marginTop: 45,
        width: width / 2 - 20 - 90,
        height: 90,
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#666',
        textAlign: "center"
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginVertical:12
    }
});


export default ProductCard