import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../screens/Layout';
import { RouteNames, Routes } from '../routes';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {/* <Stack.Screen name={RouteNames.Intro} options={Routes.Intro.options} >
                    {(props: any) => <Layout component={Routes.Intro.component} {...props} full />}
                </Stack.Screen> */}
                <Stack.Screen name={RouteNames.Home} options={Routes.Home.options}  >
                    {(props: any) => <Layout component={Routes.Home.component} {...props} options={Routes.Home.options} />}
                </Stack.Screen>
                <Stack.Screen name={RouteNames.Transaction}  >
                    {(props: any) => <Layout component={Routes.Transaction.component} {...props} options={Routes.Transaction.options} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation