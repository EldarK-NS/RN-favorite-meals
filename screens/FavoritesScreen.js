import React from 'react'
import MealList from '../components/MealList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from './../components/HeaderButton';
import { useSelector } from 'react-redux'
import { View } from 'react-native';
import DefaultText from './../components/DefaultText';

export default function FavoritesScreen(props) {

    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DefaultText>No favorite meals found. Start adding some!</DefaultText>
        </View>)
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        )
    }

}