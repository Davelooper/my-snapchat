import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity, Platform, Modal, SafeAreaView } from "react-native";
import axios from 'axios'
import { StyleSheet } from "react-native";
const baseUrl = 'http://snapi.epitech.eu:8000'

/* 
    /!\ FONCTION HANDLECLICK N'EST PAS CRÉE /!\
*/
const Contact = (props) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    React.useEffect(() => {
        if (!user) {
            const getAll = async (token) => {
                const url = 'http://snapi.epitech.eu:8000/all';
                const response = await fetch(url, {
                    method: 'get',
                    headers: {
                        token: token
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return jsonResponse;
                }
            }
            getAll(props.token)
                .then(usersData => {
                    const arrayDatas = Object.values(usersData)[0];
                    arrayDatas.forEach((data, index) => data.key = index)
                    setUser(arrayDatas);
                });
        }
    });

    const handleClick = (e) => {
        setIsLoading(true)
        const receptorEmail = e._dispatchInstances.memoizedProps.children[0].props.children
        const imageName = props.image.split('/').pop()
        const url = `${baseUrl}/snap`
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "token": props.token
            }
        }
        const body = new FormData();

        body.append('duration', props.duration)
        body.append('to', receptorEmail)
        body.append('image', {
            uri: props.image,
            name: imageName,
            type: `images/${imageName.split('.')[1]}`
        })

        axios.post(url, body, config)
            .then((response) => {
                if (response.status == 200) {
                    setIsLoading(false)
                    props.setImage(null)
                    props.setDuration(10)
                    props.setMessage("Votre snap à été envoyé.")
                    props.setModalVisible(false)

                }
            },
                (error) => {
                    setIsLoading(false)
                    props.setImage(null)
                    props.setModalVisible(false)
                    props.setDuration(10)
                    props.setMessage("Désolé, votre Snap n'a pas pu être envoyé :s")
                })
    }


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
            {
                !user &&
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: '100%', height: '100%' }}>
                        <Text style={styles.balckbutton}>Chargement...</Text>
                    </View>
            }
            <ScrollView>
                {
                    user &&
                    <>
                        <Text style={styles.title}>Selectionnez un utilisateur.</Text>
                        {user.map((element) => {
                            return element.email.length == 6 ? <TouchableOpacity disabled={isLoading} key={element.key} style={styles.button} onPress={handleClick}><Text styles={styles.text} title={element.email} key={element.key} >{element.email}</Text></TouchableOpacity> : null
                        })}
                        <Modal visible={isLoading}>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={styles.balckbutton}>Envoi du snap...</Text>
                            </View>
                        </Modal>
                    </>

                }
            </ScrollView>
        </View>
    );
};

export default Contact;

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 4
    },
    text: {
        color: '#000000',
        backgroundColor: "blue"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2196F3',
        marginBottom: 10
    },
    balckbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        color: 'white',
        marginBottom: 3
    },

})