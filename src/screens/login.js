import React from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {Formik} from 'formik';

const LoginForm = (props) => {
  return (
    <View>
      <Text style={styles.header}>Login</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, action) => {
            const userData = await login(JSON.stringify(values));
            props.setEmail(Object.values(userData)[0].email);
            props.setToken(Object.values(userData)[0].token);
            action.resetForm();
            Keyboard.dismiss;
          }}>
          {formProps => (
            <View>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}
                placeholder="your.email@domain.com"
                onChangeText={formProps.handleChange('email')}
                value={formProps.values.email}
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={formProps.handleChange('password')}
                value={formProps.values.password}
              />
              <Button title="Log In" onPress={formProps.handleSubmit} />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

async function login(inputsForm) {
  try {
    const response = await fetch('http://snapi.epitech.eu:8000/connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputsForm,
    });
    console.log(response.status);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
}

export default LoginForm;