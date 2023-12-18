import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';

export default function PokemonDetails({route}) {

    // using route parameters to inherit the url and name from the data on ListScreen
    const {url, name} = route.params;

    // set variable to store details
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect( () => {

        // create a function to fetch the data from the inherit url
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setPokemonDetails(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonDetails();

    }, [url]);

    // display a message if no details for the Pokemon
    if (!pokemonDetails) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    // define the variable to fetch the details
    const imageUrl = pokemonDetails.sprites.front_default;
    const abilities = pokemonDetails.abilities.map( (ability) => ability.ability.name );
    const types = pokemonDetails.types.map( (type) => type.type.name );

    return (
        <View style={styles.container}>

            <Text style={styles.h1}>
                {name}
            </Text>

            <Image style={styles.image} source={{uri:imageUrl}} />
            
            <View style={styles.sections}>
                <Text style={styles.h2}>
                    Abilities:
                </Text>
                <View style={styles.verticalLayout}>
                    {abilities.map((ability, index) => (
                        <Text key={index} style={styles.ability}>
                            {ability}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.sections}>
                <Text style={styles.h2}>
                    Types: 
                </Text>
                <View style={styles.verticalLayout}>
                    {types.map((type, index) => (
                        <Text key={index} style={styles.type}>
                            {type}
                        </Text>
                    ))}
                </View>
            </View>

            <View style={styles.sections}>
                <Text style={styles.h2}>
                    Evolutions:
                </Text>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    h1: {
        fontFamily: 'sans-serif-medium',
        fontSize: 36,
        color: '#3C5BA7',
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    h2: {
        fontWeight: 'bold',
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    sections: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    verticalLayout: {
        flexDirection: 'column'
    }
})