import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';

function QrCodeScannerBtn({ onPress }) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#f1f5f7' }}>
            <View style={{ flex: 1, paddingHorizontal: 15, marginTop: 5 }}>
                <View style={{
                    backgroundColor: '#FFF',
                    borderWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    elevation: 5,
                    marginBottom: 1,
                    borderRadius: 25,
                    shadowOffset: { width: 0, height: 3 }
                }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 25 }}>
                        <Pressable
                            style={{
                                flex: 1,
                                height: 40,
                                paddingLeft: 2,
                                padding: 2,
                                fontSize: 19,
                                marginTop: 3,
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                                borderColor: '#006400',
                                color: '#2c2c2c',
                                marginHorizontal: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={onPress}
                        >
                            <Text style={{ fontSize: 16, color: '#006400', fontWeight: "bold", textAlign: 'center' }}>Tab To Scan QR Code</Text>
                        </Pressable>
                        <TouchableOpacity onPress={onPress}
                            style={{ width: 47, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/icon/qr-code.png')}
                                style={{ width: 24, height: 24, tintColor: '#000', opacity: 1.9 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default QrCodeScannerBtn;