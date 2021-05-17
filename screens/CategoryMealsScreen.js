import React from 'react'
import { CATEGORIES } from './../data/dummy-data';
import MealList from './../components/MealList';
import { useSelector } from 'react-redux'
import DefaultText from '../components/DefaultText';
import { View } from 'react-native';

export default function CategoryMealsScreen(props) {


    const catId = props.navigation.getParam('categoryId')

    const availableMeals = useSelector(state => state.meals.filteredMeals)

    const desplaedMeals = availableMeals.filter(meal => meal.categoriesIds.indexOf(catId) >= 0)

    if (desplaedMeals.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <DefaultText>
                    No meals found, maybe check your filters?
                </DefaultText>
            </View>
        )
    }

    return <MealList listData={desplaedMeals} navigation={props.navigation} />
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
    return {
        headerTitle: selectedCategory.title
    }
}