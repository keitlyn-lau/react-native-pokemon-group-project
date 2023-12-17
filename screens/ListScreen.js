import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
// import { TextInput } from 'react-native-web';

export default function ListScreen() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect( () => {
        fetch('https://pokeapi.co/api/v2/pokemon/')
          .then(response => response.json())
          .then(data => setData(data.results))
          .catch(error => console.error(error));
    }, [] );

    const renderItem = ({item}) => (
        <View style={styles.listItem}>
            <Button
                title={item.name}
                onPress={ () => navigation.navigate('List') }
                color='#FFCB05'
            />
        </View>
    );

    const filteredData = data.filter( item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) );

    return (
        <View  style={styles.container}>
            <Text
                style={styles.searchBox}
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
            <Text style={styles.h1}>
                Pokedex
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    h1: {
      fontSize: 36,
      color: '#3C5BA7',
    //   fontWeight: 900,
      margin: 20,
    },
    searchBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    listItem: {
        backgroundColor: '#FFCB05',
        color: '#111',
        padding: 10,
        width: '90vw',
        marginBottom: 10,
    }
  });