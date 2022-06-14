import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Button
} from 'react-native';


const resetInfos = (setToken, setEmail) => {
    setToken(null);
    setEmail(null);
}

export const UserHome = ({email, setToken, setEmail}) => {


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenue {email} !</Text>
                <Button title='Se déconnecter' onPress={() => resetInfos(setToken, setEmail)} />
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
