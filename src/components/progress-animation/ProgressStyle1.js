import React from 'react';
import { View, Modal } from "react-native";
import CircularProgress from "./CircularProgress";

function ProgressStyle1({ visible = true }) {
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: 'white',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        elevation: 3,
                    }}>
                        <CircularProgress size={28} thickness={4} bgColor='#f1f1f1' progressColor='gray' />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ProgressStyle1;