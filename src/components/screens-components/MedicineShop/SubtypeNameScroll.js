import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { logoColor_1, logoColor_2 } from '../../../helpers/Constants';

const screenWidth = Dimensions.get('window').width;
const width = (screenWidth / 3) - 5;
let isSelected = 0;

function SubtypeNameScroll({ data, subTypeProductInfo, subtypeId, index }) {
    isSelected = subtypeId;
    data.index = index;

    function navigateTo() {
        subTypeProductInfo(data?.subtypeInfo?._id, index);
        isSelected = data?.subtypeInfo?._id
    };

    return (
        <View style={{ paddingRight: 3, paddingLeft: 3, backgroundColor: 'white', alignItems: 'center' }}>
            <TouchableOpacity style={{
                height: 43,
                width: width,
                borderWidth: 1,
                borderColor: '#111d5e',
                paddingRight: 2,
                paddingLeft: 2,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isSelected == data?.subtypeInfo?._id ? logoColor_1 : logoColor_2,
            }} onPress={() => { navigateTo(); }}>
                <Text style={{ fontSize: 15, color: 'white', textAlign: 'center' }}>{data.sub_type_name}</Text>
            </TouchableOpacity>
        </View>
    )

}

export default SubtypeNameScroll;