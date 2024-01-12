import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ModalContent from './components/ModalContent';

export default function ({ visible, setVisible, message }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ModalContent visible={visible} onBackDropPress={() => setVisible(!visible)} style={{ padding: 40 }}>
                <Card style={{ backgroundColor: '#FFF', minHeight: 350 }}>
                    <View style={{ flex: 1, backgroundColor: '#3395ff', alignItems: 'center', paddingTop: 36 }}>
                        <Image style={{ width: 100, height: 100 }} source={require('../../assets/icon/shield_1.png')} />
                        <Text style={{ fontWeight: 'bold', color: '#FFF', paddingTop: 20, fontSize: 18 }}>{message}</Text>
                    </View>
                    <View style={{ height: 140, paddingHorizontal: 20, justifyContent: 'center' }}>
                        <View style={{ paddingHorizontal: 90 }}>
                            <RoundButton onPress={() => setVisible(!visible)} textStyle={{ color: '#FFF' }}>
                                Ok
                            </RoundButton>
                        </View>
                    </View>
                </Card>
            </ModalContent>
        </View>
    );

    function RoundButton({ children, style, onPress, textStyle }) {
        return (
            <TouchableOpacity onPress={onPress} style={[{
                backgroundColor: '#2195ff',
                borderRadius: 50,
                alignItems: 'center',
                height: 40,
                paddingHorizontal: 10,
                minWidth: 10,
                justifyContent: 'center',
                flexDirection: 'row',
            }, style]}>
                <Text style={[{ color: '#000' }, textStyle]}>{children}</Text>
            </TouchableOpacity>
        );
    }

    function Card({ children, style }) {
        return (
            <View style={[{
                backgroundColor: '#63a296',
                borderRadius: 12,
                minHeight: 290,
                overflow: 'hidden',
            }, style]}>
                {children}
            </View>
        );
    }
}