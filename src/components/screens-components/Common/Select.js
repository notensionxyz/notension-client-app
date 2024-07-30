import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, TouchableOpacity, Image, Alert, Modal, ScrollView } from 'react-native';
const screenWidth = Dimensions.get('window').width;
export default function ({ initial_value, data, selectText, onPress, border = true }) {

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(initial_value);

    useEffect(() => {
        setValue(initial_value);
    }, [initial_value]);

    const onPick = (item) => {
        return () => {
            if (item.text === 'Cancel or Clear type') {
                setValue('Select Custom Type');
            } else {
                setValue(item.text);
            }
            setVisible(false);
            return onPress(item);
        };
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(true)}
                style={{
                    height: 50,
                    marginTop: 5,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 10,
                }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black', fontSize: 18, opacity: 0.7 }}>{value}</Text>
                </View>
                <View>
                    <Image style={{ width: 25, height: 25 }} source={require('../../../assets/icon/chevron_down.png')} />
                </View>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    flex: 1,
                    justifyContent: 'center',
                    padding: 20,
                }}>
                    <View style={{ backgroundColor: '#FFF', borderRadius: 5, borderWidth: 1, borderColor: '#E0E0E0' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{selectText}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setVisible(false)} style={{
                                width: 50,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image style={{ width: 15, height: 15 }}
                                    source={require('../../../assets/icon/ic_close.png')} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 20 }}>
                                {
                                    data.map((x, y) => {
                                        return (
                                            <TouchableOpacity onPress={onPick(x)} key={y} style={{
                                                height: 40,
                                                borderBottomWidth: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderBottomColor: '#E0E0E0',
                                            }}>
                                                <Text style={{ fontSize: 17, color: 'black' }}>{x.text}</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
