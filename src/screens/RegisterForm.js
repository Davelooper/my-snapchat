import { Formik, useFormik, Form, Field } from 'formik';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import axios from 'axios';

const baseUrl = 'http://snapi.epitech.eu:8000'

export const RegisterForm = ({ setIsRegistred }) => {

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
                    if (response.status == 200) {
                        setIsRegistred(true)
                    }
                }, 
                error => console.log("error :", error))
        }
    }

    return (
        <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={(values, action) => {
                    action.resetForm();
                    api(values)
                }}>
                {props => (
                    <View >
                        <Text style={styles.title}>Register</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm password"
                            secureTextEntry={true}
                            onChangeText={props.handleChange('confirmPassword')}
                            value={props.values.confirmPassword}
                        />
                        <Button title="Register" onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
    )
}

const styles = StyleSheet.create({
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