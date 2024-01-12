import React from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

export default function ({ children, onBackDropPress, visible = true, style }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={{
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                flex: 1,
                justifyContent: 'center',
            }}>
                <TouchableWithoutFeedback onPress={onBackDropPress}>
                    <View style={{ flex: 1 }}>
                        {/*<Text>qwe</Text>*/}
                    </View>
                </TouchableWithoutFeedback>
                <View style={[{ padding: 20 }, style]}>

                    <View style={{
                        backgroundColor: '#FFF',
                        borderWidth: 0,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        elevation: 5,
                        marginBottom: 1,
                        borderRadius: 12
                    }}>
                        {children}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onBackDropPress}>
                    <View style={{ flex: 1 }}>
                        {/*<Text>qwe</Text>*/}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
}