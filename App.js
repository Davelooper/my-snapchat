import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Home } from './src/components/Home';
import { RegisterScreen } from './src/components/RegisterScreen';
import LoginForm from './src/screens/login';
import { UserHome } from './src/components/UserHome';
import { Camera } from './src/components/Camera';
import { Gallery } from './src/components/Gallery';
import { Snaps } from './src/components/Snaps';
import * as ImagePicker from 'expo-image-picker';

const tab = createBottomTabNavigator()
const baseUrl = 'http://snapi.epitech.eu:8000'

export default function App() {
    const [ email, setEmail ] = useState(null);
    const [ token, setToken ] = useState(null);
    // console.log("email ", email)
    console.log("token ", token);
    return (
        <>
            <NavigationContainer>
                <tab.Navigator 
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
    
                            if (route.name == "Home") {
                                iconName = "home"
                            } else if (route.name == "Register") {
                                iconName = "person-add-outline"
                            } else if (route.name == "Login") {
                                iconName = "person-outline"
                            } else if (route.name == "Camera") {
                                iconName = "camera-outline"
                            } else if (route.name == "Gallery") {
                                iconName = "image-outline"
                            } else if (route.name == "UserHome") {
                                iconName = "home"
                            } else if (route.name == 'Snaps') {
                                iconName = "logo-snapchat"
                            }
    
                            return <Ionicons name={iconName} size={25}/>
                        }
                    })}
                    >
                    {
                        (email && token) ? 
                        <>
                            <tab.Screen name="UserHome" children={() => <UserHome email={email} token={token} setToken={setToken} setEmail={setEmail} /> } />  
                            <tab.Screen name="Camera" children={() => <Camera email={email} token={token} />  } />
                            <tab.Screen name="Snaps" children={() => <Snaps email={email} token={token} /> } />
                            <tab.Screen name="Gallery" children={() => <Gallery email={email} token={token} /> } />
                        </> :
                        <>
                            <tab.Screen name="Home" component={Home} />
                            <tab.Screen name="Register" children={() => <RegisterScreen />} />
                            <tab.Screen name="Login" children={() => <LoginForm setToken={setToken} setEmail={setEmail} />} />
                        </>
                    }
                </tab.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

