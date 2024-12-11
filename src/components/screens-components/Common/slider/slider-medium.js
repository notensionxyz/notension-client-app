import React from 'react';
import { Dimensions, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const screenWidth = Dimensions.get('window').width;
import { StyleSheet } from 'react-native';
import { Pagination, PaginationProps } from 'react-native-swiper-flatlist';
import { storageImageUrl } from '../../../../helpers/imageUrl';
import { grocery_sliderTypeSubtypeImagesFolderName } from '../../../../helpers/Constants';


const styles = StyleSheet.create({
    paginationContainer: {
        top: 0,
    },
    pagination: {
        width: 4,
        height: 4,
        padding: 3,
        columnGap: 1,
        marginBottom: 5,
        opacity: 1.5,
        elevation: 2,
        borderRadius: 2,
    },
});

const CustomPagination = (props: JSX.IntrinsicAttributes & PaginationProps) => {
    return (
        <Pagination
            {...props}
            //paginationStyle={styles.paginationContainer}
            paginationStyleItem={styles.pagination}
            paginationDefaultColor="tomato"
            paginationActiveColor="white"
        />
    );
};

const SliderMedium = ({ data, folder_name }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center', margin: 5, marginBottom: 5 }}>
            <SwiperFlatList
                autoplay
                autoplayDelay={10}
                autoplayLoop
                index={0}
                data={data}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, backgroundColor: '#f1f5f7', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                        <FastImage
                            source={{ uri: storageImageUrl(folder_name, item.file_name) }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                height: (screenWidth / 2),
                                width: screenWidth,
                                justifyContent: 'space-between',
                                //padding: 5,                                
                                alignItems: 'center',
                                overflow: 'hidden'
                            }} />
                    </View>
                )}
                showPagination
                PaginationComponent={CustomPagination}
                e2eID="container_swiper_renderItem"
            />
        </View>
    );
};


export default SliderMedium;