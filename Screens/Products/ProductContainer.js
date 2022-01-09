import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { Ionicons, Feather, MaterialIcons, Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    VStack,
    Input,
    Button,
    IconButton,
    Icon,

    NativeBaseProvider,
    Center,
    Box,
    Divider,
    Heading
} from 'native-base';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

const data = require('../../assets/2.1 products.json');
const categoriesData = require('../../assets/data/1.1 categories.json');

const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setfocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productCtg, setProductCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialStage, setInitialStage] = useState([]);

    useEffect(() => {
        setProducts(data)
        setProductsFiltered(data)
        setfocus(false);
        setCategories(categoriesData);
        setActive(-1);
        setInitialStage(data);
        setProductCtg(data);

        return () => {
            setProducts([])
            setProductsFiltered([])
            setfocus()
            setCategories([]);
            setActive();
            setInitialStage([]);
            setProductCtg([]);

        }
    }, [])

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setfocus(true)
    }
    const onBlur = () => {
        setfocus(false)
    }

    //Catgeory
    const changeCategory = (ctg) => {
        {
            ctg === 'all'
                ? [setProductCtg(initialStage), setActive(true)]

                : [
                    setProductCtg(
                        products.filter((i) => i.category.$oid === ctg.$oid),
                        setActive(true)
                    )
                ]
        }
    }

    return (
        <View>
            {/* searchbar */}
            <View style={styles.searchBar__unclicked}>
                {/* search Icon */}
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                {/* Input field */}
                <TextInput
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                    style={styles.input}
                    placeholder="Search"
                />
                {/* Cross Button field */}
                {focus == true ?
                    <Entypo
                        name="cross"
                        size={20}
                        color="black"
                        style={{ padding: 1 }}
                        onPress={onBlur}
                    /> : null
                }

            </View>

{/*  
    if (i=0) {user is online} user is offline  
    i=0 ? user is online : user is offline
*/}
            {focus == true ?
                (<SearchedProduct 
                    productsFiltered={productsFiltered} 
                    navigation = {props.navigation}
                />)
                : (
                    
                    <View style={{ backgroundColor: 'gainsboro' }}>
                        <ScrollView>
                            {/* banner */}
                            <View>
                                <Banner />
                            </View>
                            <View>
                                <CategoryFilter
                                    categories={categoriesData}
                                    CategoryFilter={changeCategory}
                                    productCtg={productCtg}
                                    active={active}
                                    setActive={setActive}
                                />
                            </View>
                            {productCtg.length > 0 ? (
                                <View style={{
                                    backgroundColor: 'gainsboro',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}>
                                    {productCtg.map((item) => (
                                        <ProductList
                                            navigation = {props.navigation}
                                            key={item._id.$oid}
                                            item={item}
                                        />
                                    ))}
                                </View>
                            ) : <View style={{ alignItems: 'center', justifyContent: 'center', padding: 22 }}>
                                <Text style={{ fontSize: 18, color: '#666' }} >No products Found! :) </Text>
                            </View>

                            }

                        </ScrollView>
                    </View>

                )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#ddd",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 12,
        marginVertical: 15
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "90%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 14,
        marginLeft: 10,
        width: "90%",
    },
});

export default ProductContainer
