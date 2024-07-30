import React, { useEffect } from 'react';
import ConfirmLocation from '../../components/screens-components/Common/ConfirmLocation';
import { BackHandler, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const ResetLocation = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            // setVisible(false);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            <ConfirmLocation />
        </View>
    );
};
///uYvm6_ZLMS4t8GdlG8NZZIhLfWk=
export default ResetLocation;