import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, FlatList, Pressable, ActivityIndicator } from 'react-native';

function SearchField({ searchText, setSearchText, onPress, placeholderText, falseFocus }) {
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
                    borderRadius: 2,
                    shadowOffset: { width: 0, height: 3 }
                }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 2 }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                autoFocus={falseFocus ? false : true}
                                placeholder={placeholderText ? placeholderText : 'Search here'}
                                placeholderTextColor={'#000'}
                                style={{ paddingLeft: 15, height: 48, color: '#000', fontSize: 16 }}
                                onChangeText={(text) => { setSearchText(text) }}
                                value={searchText}
                            />
                        </View>
                        <TouchableOpacity onPress={onPress}
                            style={{ width: 47, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/icon/ic_search_gray.png')}
                                style={{ width: 24, height: 24, tintColor: '#000', opacity: 1.9 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default SearchField;