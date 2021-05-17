import React from 'react'
import { StyleSheet, FlatList, } from 'react-native'
import { CATEGORIES } from './../data/dummy-data';
import CategoryGridTile from './../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from './../components/HeaderButton';



export default function CategoriesScreen(props) {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                onSelect={() => { props.navigation.navigate('CategoryMeals', { categoryId: itemData.item.id }) }}
                color={itemData.item.color}
            />
        )
    }

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    )
}

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
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