import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native'

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >

            <TouchableOpacity
                key={1}
                onPress={() => {
                    props.CategoryFilter('all'), 
                    props.setActive(-1)
                }}
            >
                <View style={
                    props.active == -1 
                    ? styles.inactiveView 
                    : styles.activeView}
                >
                    <Text style={styles.text}>All</Text>
                </View>
            </TouchableOpacity>

            {props.categories.map((item) => (
                
                <TouchableOpacity
                    key={item._id.$oid}
                    onPress={() => {
                        props.CategoryFilter(item._id),
                        props.setActive(props.categories.indexOf(item))
                    }}
                >
                    <View style={props.active == props.categories.indexOf(item) ?  styles.activeView : styles.inactiveView }>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 15,
        paddingHorizontal: 12,
        marginTop: 12
    },
    activeView: {
        backgroundColor: '#0a95ff50',
        padding: 8,
        borderRadius: 20,
        marginRight: 12
    },
    inactiveView: {
        backgroundColor: '#0a95ff',
        padding: 8,
        borderRadius: 20,
        marginRight: 12
    },
    text: {
        color: '#fff',
        textTransform: 'uppercase'
    }
})
export default CategoryFilter
