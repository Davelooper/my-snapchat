import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Button,
    Pressable,
    Modal,
    Image,
    Dimensions
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
const baseUrl = 'http://snapi.epitech.eu:8000'
// import RNFetchBlob from 'rn-fetch-blob'
// import ReactNativeBlobUtil from 'react-native-blob-util'
import * as FileSystem from 'expo-file-system';

export const Snaps = ({ token }) => {
    const [snaps, setSnaps] = useState(null)
    const [image, setImage] = useState(null)
    const [duration, setDuration] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [timer, setTimer] = useState(null)

    console.log(snaps)
    const getSnaps = useCallback((values) => {
        const url = `${baseUrl}/snaps`
        const config = {
            headers: {
                "token": token
            }
        }
        axios.get(url, config)
            .then((response) => {
                if (response.status == 200) {
                    setSnaps(response.data.data)
                }
            },
                error => console.log("error :", error))
    })

    const removeSnap = useCallback((idSnap) => {
        const url = `${baseUrl}/seen`
        const config = {
            headers: {
                "Content-type": "application/json",
                "token": token
            }
        }
        const body = {
            "id": idSnap
        }
        axios.post(url, body, config)
            .then((response) => {
                if (response.status == 200) {
                    console.log("Snap deleted");
                }
            },
                error => console.log("error :", error))
    })

    useEffect(() => {
        if (!snaps) {
            getSnaps()
        }
    }, [snaps])


    useEffect(() => {
        if (image && duration && modalVisible) {
            setTimeout(() => {
                FileSystem.deleteAsync(image)
                    .then(success => {
                        setModalVisible(false)
                        setImage(null)
                        setDuration(null)
                        getSnaps()
                    },
                        error => console.log(error))
            }, duration * 1000)


        }
    }, [image, duration, modalVisible])

    const handlePress = (e) => {
        const idSnap = e._dispatchInstances.memoizedProps.id;
        const durationSnap = e._dispatchInstances.memoizedProps.children[0][1].props.children[1]
        const url = `${baseUrl}/snap/${idSnap}`
        const config = {
            headers: {
                "token": token,
            }
        }
        FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + `${idSnap}.png`,
            config
        )
            .then(({ uri }) => {
                setImage(uri)
                setDuration(durationSnap)
                setTimer(durationSnap)
                setModalVisible(true)
                removeSnap(idSnap)
                const interval = setInterval(() => {
                    setTimer(timer => timer - 1)
                }, 1000)
                setTimeout(() => clearInterval(interval), durationSnap * 1000)
            })
            .catch(error => {
                console.error(error);
            });

    }


    return (
        <SafeAreaView>
            <ScrollView>

                {
                    snaps ?
                        <>
                            {snaps.map((snap, i) => {
                                return (
                                    <Pressable key={i} style={styles.button} id={snap.snap_id} onPress={handlePress}>
                                        <Text>De : {snap.from}</Text>
                                        <Text>Durée : {snap.duration}s</Text>
                                    </Pressable>
                                )
                            })
                            }
                            <Button title='Actualiser' onPress={getSnaps} />
                        </> :
                        <Text>Chargement...</Text>
                }
                <Modal visible={modalVisible}>
                    <Text style={styles.time}>{timer}</Text>
                    <Image source={{ uri: image }} style={{ height: Dimensions.get("window").height, width: Dimensions.get("window").width, resizeMode: 'contain' }} />
                </Modal>
            </ScrollView>
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
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    modal: {
        backgroundColor: 'black'
    },
    time: {
        fontSize: 25,
        textAlign: "center"
    }
})