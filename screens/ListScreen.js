import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ListScreen() {

    const navigation = useNavigation();

    // state variables
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    // fetch initial data
    useEffect( () => {
        fetchData('https://pokeapi.co/api/v2/pokemon/?limit=7');
    }, [] );

    const fetchData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
            })
            .catch(error => console.error(error));
    }

    const fetchPage = (pageUrl) => {
        fetchData(pageUrl);
    }

    const renderItem = ({item}) => (
        <View style={styles.listItem}>
            <Button
                title={item.name}
                onPress={ () => navigation.navigate('Details', {
                    url: item.url,
                    name: item.name,
                }) }
                color='#FFCB05'
            />
        </View>
    );

    // build a funtion to filter the Pokemon results according to users' input
    const searchPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1292`)
            .then(response => response.json())
            .then(data => {
                const results = data.results.filter(
                    pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setData(results);                
            })
            .catch(error => console.error(error));
    };

    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBox}
                    onChangeText={handleSearch}
                    value={searchTerm}
                    placeholder="Search Pokemon"
                />
                <Button
                    title="Search"
                    onPress={searchPokemon}
                />
            </View>
            <Text style={styles.h1}>
                Pokedex
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                style={styles.listItem}
                contentContainerStyle={styles.listContent}
                // numColumns={2}
                // numColumns doesn't work. Tried to look it up online but couldn't understand the problem
                // error message shown on Expo: "Changing numColumns on the fly is not supported. Change the key prop on FlatList when changing the number of columns to force a fresh render of the component."
                
            />
            <View style={styles.paginationButtons}>
                {prevPage && <Button title="Previous" onPress={ () => fetchPage(prevPage)} />}
                {nextPage && <Button title="Next" onPress={ () => fetchPage(nextPage)} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    h1: {
        fontFamily: 'sans-serif-medium',
        fontSize: 36,
        color: '#3C5BA7',
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    searchBox: {
        flex: 1,
        fontFamily: 'sans-serif-light',
        borderColor: 'lightgray',
        borderWidth: 2,
        paddingLeft: 10,
    },
    listItem: {
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    listContent: {
        justifyContent: 'space-evenly',
        flexGrow: 1,
    },
    paginationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    }
  });