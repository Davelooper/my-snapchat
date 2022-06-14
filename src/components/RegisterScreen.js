import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Button,
    Alert,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
} from 'react-native';
import { RegisterForm } from '../screens/RegisterForm';



export const RegisterScreen = () => {
    const [ isRegistred , setIsRegistred ] = useState(false)

    

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {isRegistred ? 
                    <Text style={styles.message}>Vous êtes inscrit ! Veuillez vous logger pour accéder à votre compte.</Text> :
                    <RegisterForm setIsRegistred={setIsRegistred}/>
                
                }
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginLeft: 5,
        marginRight: 5
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 4
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 5
    }
})
