import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Button,
    StyleSheet,
    Image,
    Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Contact from './Contact';
import NumericInput from 'react-native-numeric-input'


export const Gallery = ({ token }) => {
    const [image, setImage] = useState(null)
    const [duration, setDuration] = useState(10)
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState(null)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();

        if (result.cancelled) {
            return
        }
        setImage(result.uri)
    };

    const showModal = () => {
        setModalVisible(true)
    }

    useEffect(() => {
        return () => console.log("cleanup")
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                !image ?
                    <>
                        <Button title="Ouvrir la gallerie" onPress={() => {pickImage(); setMessage(null)}} />
                        <Text style={{ fontSize: 20, marginTop: 20}}>{message}</Text>
                    </> :
                    <>
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        <View style={{ marginTop: 15 }}>
                            <Text>Durée (s) :</Text>
                            <NumericInput rounded keyboardType='number-pad' style={styles.input} minValue={1} maxValue={30} placeholder="Durée (default=10s)" value={duration} onChange={(value) => { setDuration(value) }} />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Button onPress={showModal} title="Envoyer" style={styles.withMargin} />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Button onPress={() => { setImage(null) }} title="Annuler" />
                        </View>
                        <Modal visible={modalVisible}>
                            <Contact token={token} setModalVisible={setModalVisible} image={image} setMessage={setMessage} setImage={setImage} duration={duration} setDuration={setDuration} />
                        </Modal>
                    </>
            }
        </View>
    );

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
        marginBottom: 15,
        padding: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    withMargin: {
        marginVertical: 5,
        //   marginBottom: 5
    }
})