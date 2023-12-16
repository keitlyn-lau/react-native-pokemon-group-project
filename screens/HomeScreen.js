import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const navigation = useNavigation();
    
    return (
        <View  style={styles.container}>
            <Text style={styles.h1}>
                Pokemon
            </Text>
            <Button
                title="Start"
                onPress={ () => navigation.navigate('List') }
                color={'#e70012'}
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
      fontSize: 48,
      color: '#FFCB05',
      fontWeight: 900,
      margin: 20,
    }
  });