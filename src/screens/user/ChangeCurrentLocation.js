import React, { useEffect, useState } from 'react';
import { Dimensions, View, BackHandler, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux"
import ConfirmLocation from '../../components/screens-components/Common/ConfirmLocation';
import DistrictName from '../../components/screens-components/HomeScreen/DistrictName';
import HeaderCommon from '../../components/header/HeaderCommon';
import { useUser } from '../../hooks/useUser';

const screenWidth = Dimensions.get('window').width;

function ChangeCurrentLocation() {
    const navigation = useNavigation();

    const { resetUserCurrentLocation } = useUser();
    const { currentUserLocation, districtInfo } = useSelector((state) => state.user);

    const [filteredInfo, setFilteredInfo] = useState([]);

    useEffect(() => {
        setFilteredInfo(districtInfo);
        resetUserCurrentLocation();
        const backAction = () => {
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    const timerRef = React.useRef(null);
    searchDistrict = text => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            const searchText = text.trim();
            let searchInfo = [];
            if (searchText.length > 0) {
                searchInfo = districtInfo.filter(
                    (info) =>
                        info.district_name
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        info.district_name.match(new RegExp(searchText, 'ui')) // Case-insensitive, Unicode search
                );

            } else {
                searchInfo = districtInfo;
            }
            setFilteredInfo(searchInfo);
        }, 800);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
            {!currentUserLocation?.districtId ?
                <>
                    <HeaderCommon title="search" onInputText={searchDistrict} toggleDrawer={navigation} />
                    <DistrictName filteredInfo={filteredInfo} setFilteredInfo={setFilteredInfo} />
                </>
                :
                <ConfirmLocation />
            }
        </View>
    );
}

export default ChangeCurrentLocation;