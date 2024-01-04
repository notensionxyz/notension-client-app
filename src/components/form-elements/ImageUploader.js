import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const MultipleImageUploader = ({ handleImage, handleImageDelete }) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageLibrary = (picNo) => {
        picNumber = picNo;

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 1400,
            maxHeight: 2200,
            quality: 0.9
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
            maxWidth: 1400,
            maxHeight: 2200,
            quality: 0.9
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
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#006400', paddingBottom: 10, marginTop: 15 }} >Pick Images from Camera or Gallery</Text>
            <View style={styles.ImageSections}>
                <View>
                    {
                        selectedImages.map((image, index) => (
                            <Image
                                source={{ uri: image.uri }}
                                style={styles.images}
                            />
                        ))}
                </View>
            </View>
            <View style={styles.btnParentSection}>
                <TouchableOpacity onPress={() => { handleCamera(); }} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Launch Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleImageLibrary(); }} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Launch Gallery</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({

    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },

    images: {
        width: screenWidth - 20,
        height: screenWidth - 30,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
        marginBottom: 10,
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
        marginBottom: 5,
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
