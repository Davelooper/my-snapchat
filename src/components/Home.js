import React from 'react';
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

import { Formik, useFormik, Form, Field } from 'formik';
import axios from 'axios';
const baseUrl = 'http://snapi.epitech.eu:8000'

export const Home = () => {

    const api = (values) => {
        if (values.confirmPassword == values.password) {
            const body = {
                email: values.email,
                password: values.password
            }
            const url = `${baseUrl}/inscription`
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            axios.post(url, body, config)
                .then((response) => {

                }, 
                error => console.log("error :", error))
        }


    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome !</Text>
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
    title: {
        fontSize: 40,
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
