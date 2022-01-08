import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    VStack,
    Input,
    Button,
    IconButton,
    Icon,
    Text,
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

const ProductContainer = () => {

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
        <NativeBaseProvider>
            <Center flex={1} style={{marginTop:40}}>
                <VStack
                    space={5}
                    width="100%"
                    divider={
                        <Box px="2">
                            <Divider />
                        </Box>
                    }>
                    <VStack width="100%" space={5} alignItems="center">
                        <Input

                            onFocus={openList}
                            onChangeText={(text) => searchProduct(text)}
                            placeholder="Search"
                            variant="filled"
                            bg="#ddd"
                            borderRadius="10"
                            py="2"
                            px="2"
                            mx="5"
                            my="5"
                            placeholderTextColor="gray.500"
                            _hover={{ bg: 'gray.200', borderWidth: 0 }}
                            borderWidth="0"
                            _web={{
                                _focus: { style: { boxShadow: 'none' } },
                            }}
                            InputLeftElement={
                                <Icon
                                    ml="2"
                                    size="5"
                                    color="gray.500"
                                    as={<Ionicons name="ios-search" />}
                                />
                            }

                            InputRightElement={

                                focus == true ?
                                    <Icon
                                        onPress={onBlur}
                                        mr="3"
                                        size="6"
                                        color="gray.500"
                                        as={<Ionicons name="ios-close" />}
                                    /> : null
                            }
                        />
                    </VStack>
                </VStack>

                {focus == true ?
                    (<SearchedProduct productsFiltered={productsFiltered} />)
                    : (
                        <View style={{ backgroundColor: 'gainsboro' }}>

                            <ScrollView>

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
                                                key={item._id.$oid}
                                                item={item}
                                            />
                                        ))}
                                    </View>
                                ) : <View style={{ alignItems: 'center', justifyContent: 'center', padding:22 }}>
                                        <Text style={{fontSize:18, color:'#666'}} >No products Found! :) </Text>
                                    </View>

                                }

                            </ScrollView>
                        </View>

                    )}
            </Center>
        </NativeBaseProvider>
    )
}

export default ProductContainer
