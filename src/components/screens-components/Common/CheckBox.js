import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

export default function ({ data, callback, style, checked_color = '#4d9dff' }) {

    const [dataArr, setDataArr] = useState(data);

    const onCheck = (item, idx) => {
        return () => {
            const arr = [...dataArr];
            //console.log('pastCheckedTrue : ', item.checked);
            if (!item.checked) {
                dataArr.map((x, i) => {
                    arr[i].checked = false;
                });
            }

            arr[idx].checked = !arr[idx].checked;
            setDataArr(arr);

            const result = arr.filter(arr => arr.checked === true);
            // console.log('result----->', result);
            return callback(result);
        };
    };

    return (
        <View>
            {
                dataArr.map((x, y) => {
                    return (
                        <TouchableOpacity onPress={onCheck(x, y)} key={y}
                            style={[{ flexDirection: 'row', marginBottom: 20 }, style]}>
                            <View style={{
                                height: 35,
                                width: 35,
                                borderColor: '#d9d9d9',
                                backgroundColor: x.checked ? checked_color : '#FFF',
                                borderRadius: 5,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {
                                    x.checked
                                    &&
                                    <Image style={{ width: 20, height: 20, tintColor: '#FFF' }}
                                        source={require('../../../assets/icon/ic_check.png')} />
                                }
                            </View>
                            <View style={{ height: 35, justifyContent: 'center', paddingLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{x.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
}
