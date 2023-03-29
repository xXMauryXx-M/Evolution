import { createStackNavigator } from '@react-navigation/stack';
import { EvolutionScreen } from '../Screen/EvolutionScreen';
const Stack=createStackNavigator()

export const StackNavigation=()=>{
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }} >
          <Stack.Screen name="EvolutionScreen" component={EvolutionScreen} />
        </Stack.Navigator>
      );
}