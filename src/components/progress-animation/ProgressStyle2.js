import React from 'react';
import { View, Modal, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress";

function ProgressStyle2({ visible = true, style }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            formSheet={true}
            visible={visible}>
            <View style={{
                backgroundColor: 'rgba(30, 30, 30, 0.3)',
                flex: 1,
                justifyContent: 'center',
            }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={45} thickness={4} bgColor='#0dbcff' progressColor='gray' />
                    </View>
                </View>
            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default ProgressStyle2;