import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from './../components/HeaderButton';
import Colors from '../constants/Colors'
import { useDispatch, useSelector} from 'react-redux';
import {setFilters} from '../store/actions/meals'

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primary }}
                thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    )
}

export default function FiltersScreen(props) {
    const dispatch=useDispatch()
    const { navigation } = props

    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegeterian, setIsVegeterian] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            vegan: isVegan,
            vegeterian: isVegeterian,
            lactoseFree: isLactoseFree,
        }
       dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian])

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        })
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}> Availble Filters / Restrictions</Text>
            <FilterSwitch label={'Gluten-free'} state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label={'Vegan'} state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label={'Vegeterian'} state={isVegeterian} onChange={newValue => setIsVegeterian(newValue)} />
            <FilterSwitch label={'Lactose-free'} state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />

        </View>
    )
}

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => { navData.navigation.toggleDrawer() }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName='ios-save'
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
})