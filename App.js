// Import components from certain libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens for navigation
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // To use the navigation I have to wrap the entire app in a NavigationContainer
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome'}}
        />
        <Stack.Screen
            name="List"
            component={ListScreen}
            options={{title: 'List of Pokemons'}}
        />
        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{title: 'Pokemon Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


