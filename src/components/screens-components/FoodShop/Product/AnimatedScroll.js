import React, { useState, useRef } from 'react';
import { FlatList, Easing, ScrollView, TouchableWithoutFeedback, StatusBar, View, StyleSheet, Text, Animated, Dimensions } from 'react-native'
import { MemoizedListView } from './ListView';
import { logoColor_1, logoColor_2 } from '../../../../helpers/Constants';
//import { FlashList } from "@shopify/flash-list";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const extraMargin = Math.floor(screenHeight / 12);
const extra = Math.floor(screenWidth / 2);

const AnimatedScroll = (props) => {
    const animScroll = useRef(new Animated.Value(0)).current
    const value = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef("");
    const tabScrollRef = useRef("");
    const widthValue = useRef(new Animated.Value(0)).current;
    const [activeTab, setActiveTab] = useState({})
    const [tabs, setTabs] = useState([])

    const [scrollBarScroll, setScrollBarScroll] = useState(true)

    const handleTab = (tabName, layout) => {
        layout.name = tabName;
        layout.anim = false;
        layout.id = new Date().getTime()

        setTabs([...tabs, layout])
    }

    const handleTabContent = (name, layout) => {
        const index = tabs.findIndex(stab => stab.name === name)
        const allTab = tabs
        const tab = allTab[index]

        tab.y = layout.y
        tab.height = layout.height
        setTabs([...allTab])
    }

    const handleScroll = (name) => {
        const content = tabs.find(singleTab => singleTab.name === name)
        scrollRef.current.scrollTo({ y: content.y - extraMargin })
        setScrollBarScroll(false)
    }

    const handleOnScroll = e => {

        const scrollY = e.nativeEvent.contentOffset.y

        tabs.forEach((tab, i) => {

            if (scrollY > (tab.y + tab.height - extra)) {

                const updatedTap = tabs
                updatedTap[i].anim = false
            }


            if (scrollY > tab.y - extra && scrollY < (tab.y + tab.height) - extra) {
                if (tab.anim) return

                const scrollTo = tabs[i - 1] ? tabs[i - 1].x - 10 : 0
                if (scrollTo) {
                    //console.log('tab.x', tab.width);

                    Animated.timing(value, {
                        toValue: tab.x,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }).start(() => {
                        const updatedTap = tabs
                        updatedTap[i].anim = true

                        if (scrollBarScroll) setTimeout(() => tabScrollRef.current.scrollTo({ x: scrollTo || 0 }), 200)
                    });

                    Animated.timing(widthValue, {
                        toValue: tab.width,
                        duration: 100,
                        useNativeDriver: false
                    }).start()
                }
            }

            if (scrollY < tab.y - extra) {

                if (tabs[i].anim) {
                    const updatedTap = tabs
                    updatedTap[i].anim = false
                }
            }
        })

    }

    return (

        <View style={{ flex: 1, width: '100%' }}>
            <Animated.View style={[style.topHeaderStyle, props.topHeaderStyle && props.topHeaderStyle]}>

                <ScrollView
                    ref={tabScrollRef}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <View style={[style.row]}>
                            {props.tabs && props.tabs.map((food, i) => (
                                <TouchableWithoutFeedback
                                    key={i}
                                    onPress={e => handleScroll(food.catagory)}
                                    onLayout={e => handleTab(food.catagory, e.nativeEvent.layout)}
                                >
                                    <Text style={[style.tab]} >{food.catagory}</Text>
                                </TouchableWithoutFeedback>
                            ))}
                        </View>

                        <Animated.View style={[{ translateX: value }]}>
                            <Animated.View style={[style.indicator, { width: widthValue }]}></Animated.View>
                        </Animated.View>
                    </View>
                </ScrollView>

            </Animated.View>

            <Animated.ScrollView

                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: props.ÄnimatedScrollValue || animScroll } } }],
                    { listener: handleOnScroll },
                    { useNativeDriver: true }
                )}
            >
                {/* {props.renderAboveItems && props.renderAboveItems()} */}

                {props.tabs && props.tabs.map(food => (
                    <View
                        style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}
                        onLayout={e => handleTabContent(food.catagory, e.nativeEvent.layout)}
                    >
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                            <Text style={{ flex: 1, color: logoColor_2, paddingVertical: 10, fontSize: 18, fontWeight: 'bold', paddingLeft: 20, width: '100%' }}>
                                {food.catagory}</Text>
                        </View>
                        {/* <FlatList
                            contentContainerStyle={{ padding: 5 }}
                            data={food.itemsInfo}
                            // keyExtractor={(item, index) => index.toString()}
                            keyExtractor={item => item?._id}
                            renderItem={({ item, index }) =>
                                <MemoizedListView
                                    data={item}
                                />}
                        /> */}
                        {
                            food?.itemsInfo?.map((item, i) => (
                                <MemoizedListView key={item?._id + i} data={item} />
                            ))
                        }
                        {/* <FlashList
                            contentContainerStyle={{ padding: 5 }}
                            data={food.itemsInfo}
                            // keyExtractor={(item, index) => index.toString()}
                            //keyExtractor={item => item?._id}
                            renderItem={({ item, index }) =>
                                <MemoizedListView
                                    data={item}
                                />}
                                estimatedItemSize={200}
                        /> */}
                    </View>
                ))}

            </Animated.ScrollView>
        </View>
    )
}

export default React.memo(AnimatedScroll);

const style = StyleSheet.create({
    topHeaderStyle: { paddingHorizontal: 15, backgroundColor: "white", elevation: 2 },
    indicator: {
        height: 3,
        backgroundColor: "#D70F64"
    },
    tab: {
        color: "grey",
        fontWeight: "bold",
        textTransform: "uppercase",
        padding: 10,
        marginRight: 10,
        overflow: "hidden",
    },
    row: {
        display: "flex",
        flexDirection: "row",

    },
    sectionContainer: {
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: "white"
    },
    sectionTitle: {
        fontSize: 25,
        marginVertical: 20,
    },

})