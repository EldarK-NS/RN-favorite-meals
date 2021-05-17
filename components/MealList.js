import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import MealItem from './MealItem';
import { useSelector } from 'react-redux'

export default function MealList(props) {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)
    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite
                    })
                }}
            />
        )
    }
    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={item => item.id}
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%', marginTop: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
