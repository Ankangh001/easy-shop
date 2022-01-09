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
                    <Text style={props.active == -1 ? styles.activeText : styles.inActiveText }>All</Text>
                </View>
            </TouchableOpacity>

            {props.categories.map((item) => (
                
                <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                        props.CategoryFilter(item._id),
                        props.setActive(props.categories.indexOf(item))
                    }}
                >
                    <View 
                        key={item._id}
                        style={props.active == props.categories.indexOf(item) ? styles.inactiveView   : styles.activeView
                    }>
                        <Text 
                            style={props.active == props.categories.indexOf(item) 
                            ? styles.activeText : styles.inActiveText }
                        > {item.name}</Text>
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
        padding: 8,
        marginRight: 12,
    },
    inactiveView: {
        backgroundColor: '#0a95ff',
        padding: 8,
        borderRadius: 50,
        marginRight: 12
    },
    activeText: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 14
    },
    inActiveText: {
        color: '#666',
        fontSize: 12
    }
})
export default CategoryFilter
