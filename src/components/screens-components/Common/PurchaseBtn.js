import React, { useRef, useState } from 'react';
import { Dimensions, Image, Text, Alert, View, StyleSheet, Pressable } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = (screenWidth / 2) - 40;
const textWidth = (screenWidth / 2) - 110;// 30+30+20  +, _, Trash width =30 and text font size 20

function PurchaseBtn({ data, addToBagPress, incresePress, deccresePress, removePress, qtyIncart, isOutOfStock }) {
    const timerRef = useRef(null);
    const offset = useSharedValue(36);

    //const animationValue = useRef(new Animated.Value(36)).current;

    let [viewState, setViewState] = useState(true);
    let [boxColor, setBoxColor] = useState('#FFFFFF');

    let [quantity, setQuantity] = useState(qtyIncart);
    quantity = qtyIncart;

    let isInStock = data?.is_available;

    if (quantity < 1 && isOutOfStock > 0) {
        isInStock = 0;
    }

    if (quantity > 0 && viewState === true) {
        boxColor = '#006400';
    } else {
        if (quantity < 1) {
            viewState = false;
            boxColor = '#FFFFFF';
            offset.value = withTiming(36, { duration: 1000 });
        }
    }

    const autoAnimate = () => {
        //setViewState(false);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setViewState(false);

        timerRef.current = setTimeout(() => {
            setViewState(true);
            setBoxColor('#006400');
            offset.value = withTiming(36, { duration: 1000 });
        }, 4000);
    }

    const toggleAnimation = () => {
        setBoxColor('#FFFFFF');
        autoAnimate();
        offset.value = withTiming(buttonWidth, { duration: 400 });
    }

    const animatedStyles = useAnimatedStyle(() => ({
        width: offset.value,
        backgroundColor: boxColor
    }));

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: "100%", alignItems: 'flex-end', justifyContent: 'center' }}>
                <Animated.View style={[styles.animatedBox, animatedStyles]} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {quantity > 0 && viewState === false && (
                            <>
                                {quantity > 1 ?
                                    <>
                                        <Pressable
                                            onPress={() => {
                                                setQuantity(quantity - 1);
                                                deccresePress(data?._id);
                                                autoAnimate();
                                            }}
                                        >
                                            <Image style={{ width: 34, height: 36, tintColor: '#006400', alignItems: 'flex-start', justifyContent: 'center' }}
                                                resizeMode={'contain'}
                                                source={require('../../../assets/icon/ic_minus.png')} />
                                        </Pressable>
                                        <Text style={styles.text}>
                                            {quantity}
                                        </Text>
                                    </>
                                    :
                                    <>
                                        <Pressable
                                            onPress={() => {
                                                setQuantity(quantity - 1);
                                                removePress(data?._id);
                                                offset.value = withTiming(36, { duration: 1000 });
                                            }}
                                        >
                                            <Image style={{ width: 30, height: 22, tintColor: 'red', alignItems: 'flex-start', justifyContent: 'center' }}
                                                resizeMode={'contain'}
                                                source={require('../../../assets/icon/trash.png')} />
                                        </Pressable>
                                        <Text style={styles.text}>
                                            {quantity}
                                        </Text>
                                    </>
                                }
                            </>
                        )}

                        {quantity < 1 ?
                            <>
                                {isInStock > 0 ?
                                    <Pressable onPress={() => {
                                        setBoxColor('#FFFFFF');
                                        offset.value = withTiming(buttonWidth, { duration: 400 });
                                        setViewState(false);
                                        autoAnimate();
                                        setQuantity(quantity + 1);
                                        addToBagPress(data);
                                    }}>
                                        <Image style={{ width: 36, height: 36, tintColor: '#E50293', alignItems: 'flex-end', justifyContent: 'center' }}
                                            resizeMode={'contain'}
                                            source={require('../../../assets/icon/ic_plus.png')} />
                                    </Pressable>
                                    :
                                    <Pressable onPress={() => {
                                        setBoxColor('#FFFFFF');
                                        setViewState(false);
                                        Alert.alert("Hold on!", "This product is out of stock.", [
                                            {
                                                text: "OK",
                                                onPress: () => null,
                                                style: "OK"
                                            }

                                        ]);
                                    }}>
                                        <Image style={{ width: 36, height: 36, tintColor: 'red', alignItems: 'flex-end', justifyContent: 'center' }}
                                            resizeMode={'contain'}
                                            source={require('../../../assets/icon/ic_plus.png')} />
                                    </Pressable>
                                }
                            </>
                            :
                            <>
                                {viewState === false ?
                                    <>
                                        {data?.max_allowed < 1 || data?.max_allowed > quantity ?
                                            <Pressable onPress={() => {
                                                setQuantity(quantity + 1);
                                                incresePress(data);
                                                autoAnimate();
                                            }}>
                                                <Image style={{ width: 36, height: 36, tintColor: '#006400', alignItems: 'flex-end', justifyContent: 'center' }}
                                                    resizeMode={'contain'}
                                                    source={require('../../../assets/icon/ic_plus.png')} />
                                            </Pressable>
                                            :
                                            <Pressable onPress={() => {
                                                autoAnimate();
                                            }}>
                                                <Image style={{ width: 36, height: 36, tintColor: '#FFFFFF', alignItems: 'flex-end', justifyContent: 'center' }}
                                                    resizeMode={'contain'}
                                                    source={require('../../../assets/icon/ic_plus.png')} />
                                            </Pressable>
                                        }
                                    </>
                                    :
                                    <Pressable onPress={() => { toggleAnimation(); }}>
                                        <Text style={styles.textAfterAnimation}>
                                            {quantity}
                                        </Text>
                                    </Pressable>
                                }
                            </>
                        }
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    animatedBox:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 36,
        height: 36,
        backgroundColor: '#FFFFFF',
        //borderRadius: 5,
        borderRadius: 36 / 2,
        elevation: 3,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        padding: 0,
    },

    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#483D8B',
        textAlign: 'center',
        marginTop: -1,
        fontSize: 22,
        width: textWidth
    },

    textAfterAnimation: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -1,
        width: 36
    },

    scrollView: {
        backgroundColor: Colors.lighter,
    },
});

export default PurchaseBtn;