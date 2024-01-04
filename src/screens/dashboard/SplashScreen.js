import React, { useEffect, useState } from 'react';
import { Dimensions, Animated, Easing, View, Image } from "react-native";
import { logoColor_1, logoColor_2 } from '../../helpers/Constants';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function SplashScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <FloatingButton style={{ position: 'relative', backgroundColor: '#0dbcff', marginLeft: 20, marginTop: -30 }} /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: screenWidth, width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/banner/starting-banner.png')} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                </View>
                <DotProgress />
            </View>
        </View>
    );
}

function DotProgress() {
    const [anim] = useState(new Animated.Value(0));
    const range = 20;

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                anim,
                {
                    toValue: 100,
                    duration: 1000,
                    useNativeDriver: false,
                    easing: Easing.linear,

                }
            )
        ).start();
    }, []);

    const item1 = anim.interpolate({
        inputRange: [0, 50, 100],
        outputRange: [0, range, 0]
    });

    const item2 = anim.interpolate({
        inputRange: [0, 12, 62, 100],
        outputRange: [range / 4, 0, range, range / 4]
    });

    const item3 = anim.interpolate({
        inputRange: [0, 25, 75, 100],
        outputRange: [range / 2, 0, range, range / 2]
    });

    return (
        <View style={{ width: 70, height: range + 10, flexDirection: 'row', justifyContent: 'space-around' }}>
            <Animated.View style={{ width: 10, height: 10, borderRadius: 5, marginTop: item1, backgroundColor: logoColor_2 }} />
            <Animated.View style={{ width: 10, height: 10, borderRadius: 5, marginTop: item2, backgroundColor: logoColor_1 }} />
            <Animated.View style={{ width: 10, height: 10, borderRadius: 5, marginTop: item3, backgroundColor: logoColor_2 }} />
        </View>
    );
}

export default SplashScreen;