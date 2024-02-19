import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    Image,
    Dimensions,
    Pressable,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const OrderImageUploader = ({ title, selectedImages, setSelectedImages, handleImage, handleImageDelete }) => {

    const handleImageLibrary = () => {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 850,
            maxHeight: 1275,
            quality: 0.8
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                setImagefile(response);
            }
        });

    }

    const handleCamera = () => {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 850,
            maxHeight: 1275,
            quality: 0.8
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                setImagefile(response);
            }
        });

    }

    const setImagefile = (response) => {
        const imagesFile = [];
        const imgFileObj = {
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: Platform.OS === 'ios' ?
                response.assets[0].uri.replace('file://', '')
                : response.assets[0].uri,
        };
        imagesFile.push(imgFileObj);

        if (imagesFile) {
            handleImage(imagesFile);
            setSelectedImages((prevImages) => [...prevImages, ...imagesFile]);
        }
    };

    const handleDelete = (index) => {
        handleImageDelete(index);
        setSelectedImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    return (
        <>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#006400', paddingBottom: 10, marginTop: 15 }} >{title}</Text>
            <View style={styles.ImageSections}>
                <View>
                    {
                        selectedImages.map((image, index) => (
                            <ImageBackground
                                key={index}
                                source={{ uri: image.uri }}
                                style={styles.images}
                            >
                                <Pressable style={{
                                    height: 40,
                                    width: 40,
                                    backgroundColor: 'red',
                                    position: 'absolute',
                                    bottom: (screenWidth / 2.65) * 3,
                                    right: -12,
                                    borderRadius: 40 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 3,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3
                                }} onPress={() => { handleDelete(index); }}>
                                    <Image source={require('../../assets/icon/ic_close.png')}
                                        style={{ width: 45 * 0.3, height: 45 * 0.3, resizeMode: 'contain', tintColor: 'white' }} />
                                </Pressable>
                            </ImageBackground >
                        ))}
                </View>
            </View>

            {selectedImages.length < 2 ?
                <View style={styles.btnParentSection}>
                    <Pressable onPress={() => { handleCamera(); }} style={styles.btnSection}  >
                        <Text style={styles.btnText}>Launch Camera</Text>
                    </Pressable>
                    <Pressable onPress={() => { handleImageLibrary(); }} style={styles.btnSection}  >
                        <Text style={styles.btnText}>Launch Gallery</Text>
                    </Pressable>
                </View>
                :
                <View style={styles.btnParentSection}>
                    <Pressable style={styles.btnSection}  >
                        <Text style={styles.btnText}>Launch Camera</Text>
                    </Pressable>
                    <Pressable style={styles.btnSection}  >
                        <Text style={styles.btnText}>Launch Gallery</Text>
                    </Pressable>
                </View>
            }
        </>
    )
};

const styles = StyleSheet.create({

    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },

    images: {
        width: (screenWidth / 5) * 4.2,
        height: (screenWidth / 5) * 6,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
        marginBottom: 25,
    },

    btnParentSection: {
        display: 'flex',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center',
        flexDirection: 'row',
        width: Dimensions.get('screen').width
    },

    btnSection: {
        width: (screenWidth / 2) - 50,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        borderRadius: 8,
        margin: 5
    },

    btnText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    }

});

export default OrderImageUploader;
