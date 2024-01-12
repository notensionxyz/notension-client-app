import React, { useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    Image,
    Dimensions,
    Pressable,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const screenWidth = Dimensions.get('window').width;

const MultipleImageUploader = ({ title, selectedImages, setSelectedImages, handleImage, handleImageDelete }) => {

    const handleImageLibrary = () => {
        ImagePicker.openPicker({
            width: 850,
            height: 1275,
            cropping: true,
        }).then(response => {
            setImagefile(response);
        }).catch((e) => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }

    const handleCamera = () => {
        ImagePicker.openCamera({
            width: 850,
            height: 1275,
            cropping: true,
        }).then(response => {
            setImagefile(response);
        }).catch((e) => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });

    }

    function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    const setImagefile = async (response) => {

        const imagesFile = [];

        // Split the pathname by '/' to get an array of path segments
        const pathSegments = response.path.split('/');

        // Get the last segment, which should be the file name
        const fileName = pathSegments[pathSegments.length - 1];

        const imgFileObj = {
            name: fileName,
            type: response.mime,
            uri: response.path,
        };

        console.log(imgFileObj);

        imagesFile.push(imgFileObj);

        if (imagesFile) {
            handleImage(imagesFile);
            setSelectedImages((prevImages) => [...prevImages, ...imagesFile]);
        }

        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
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

export default MultipleImageUploader;