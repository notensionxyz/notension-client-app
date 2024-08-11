import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, StyleSheet, FlatList, Image, TouchableOpacity, View, Text, BackHandler, TouchableHighlight, TouchableWithoutFeedback, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderCommon from '../../components/header/HeaderCommon';
import ProgressStyle2 from '../../components/progress-animation/ProgressStyle2';
import { useDoctor } from '../../hooks/fetch-data-by-module/health-care/useDoctor';
import CheckBox from '../../components/screens-components/Common/CheckBox';
import NetInfo from "@react-native-community/netinfo";
import { useAppointment } from '../../hooks/fetch-data-by-module/health-care/useAppointment';
import NotificationError from '../../components/popup-notification/NotificationError';
import NotificationSuccess from '../../components/popup-notification/NotificationSuccess';
import { StackActions } from '@react-navigation/native';
const popAction = StackActions.pop(2);

const screenWidth = Dimensions.get('window').width;
const hight = Dimensions.get('window').height;

let connectionStatus = 'true';
let isReachable = 'true';
let merchantType = 4;
let demo_doctor_pic = '';
let currentDate = '';

export default function BookAppointment({ route }) {
    const navigation = useNavigation();
    const appoinmentData = route.params.data;
    const [isOffDay, setIsOffDay] = useState(false);
    const [appointmentTime, setAppointmentTime] = useState([]);
    const [appointmentDay, setappointmentDay] = useState('');
    const formattedDate = new Date().toISOString().split('T')[0];
    const [appointment_date, setAppointment] = useState(formattedDate);

    let bookAppoinmentData = {
        doctor_info: appoinmentData?.doctorId,
        doctor_name: appoinmentData?.doctor_name,
        doctor_speciality: appoinmentData?.speciality,
        consultation_center_info: appoinmentData?.consultationCenterId,
        consultation_center_name: appoinmentData?.center_name,
        consultation_limit: appoinmentData?.slot_limit,
        appointment_date: '',
        appointment_day: '',
        time_slot: '',
        patient_info: {
            id: appoinmentData?.patientId,
            patient_name: appoinmentData?.patient_name,
        }
    }

    const weekday = [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
    ];

    const weekday_bangla = [
        'শনিবার',
        'রবিবার',
        'সোমবার',
        'মঙ্গলবার',
        'বুধবার',
        'বৃহস্পতিবার',
        'শুক্রবার',
    ];

    const {
        progressing,
        setProgressing,
        message,
        showErrorMessage,
        showSuccessMessage,
        setShowErrorMessage,
        setShowSuccessMessage,
        isAppointmentBooked,
        bookAppointment
    } = useAppointment();

    const formatAMPM = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const strMinutes = minutes.toString().padStart(2, '0');
        const strHours = hours.toString().padStart(2, '0');
        return `${strHours}:${strMinutes} ${ampm}`;
    };

    const isTimeInSlot = (current_time, slot_start, slot_end) => {
        const convertTo24Hour = (str) => {
            const [time, period] = str.split(' ');
            let [hours, minutes] = time.split(':').map(Number);

            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;

            return `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}`;
        };

        const time = convertTo24Hour(current_time);
        //console.log(time);
        const slotStart = convertTo24Hour(slot_start);
        const slotEnd = convertTo24Hour(slot_end);

        return time >= slotStart && time <= slotEnd;
    };



    //console.log('current_day_name :', weekday[(new Date('2024-08-04T00:00:00.000+00:00').getDay() + 1) % 7]);
    const appointmentDays = [];
    const [Available_Booking_Day, setAvailable_Booking_Day] = useState('');

    //const CurrentDay = new Date();

    //const formattedTime = formatAMPM(CurrentDay);



    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    let getDayName = (dateStr) => {
        console.log(dateStr);
        let date = new Date(dateStr.trim());
        console.log('date', date);
        //console.log(date.toLocaleDateString('en-GB', { weekday: 'long' }));
        //return date.toLocaleDateString('en-GB', { weekday: 'long' });
    };

    useEffect(() => {
        const today = new Date();
        let current_day_name = weekday[(today.getDay() + 1) % 7];
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        currentDate = today.toLocaleDateString('en-GB', options);
        const formattedTime = formatAMPM(today);
        const isAlloed = isTimeInSlot(formattedTime, appoinmentData?.appointment_scheduling?.start_time, appoinmentData?.appointment_scheduling?.end_time);
        console.log('isAlloed ', isAlloed);

        if (appoinmentData?.appointment_scheduling?.scheduling_type === 'ScheduleForNextDay') {
            appoinmentData?.chamber_schedule?.map((day, i) => {
                if (!day?.is_closed) {
                    appointmentDays.push(day?.day_name);
                }
            });
            setTimeout(() => {
                const nextAppointmentDay = getNextAppointmentDay(current_day_name);
                setAvailable_Booking_Day(nextAppointmentDay);
                getAppointmentSchedule(nextAppointmentDay);
            }, 600);
        } else if (appoinmentData?.appointment_scheduling?.scheduling_type === 'ScheduleForSameDay') {
            appoinmentData?.chamber_schedule?.map((day, i) => {
                if (!day?.is_closed && day?.day_name === current_day_name) {
                    setAvailable_Booking_Day(day?.day_name);
                    getAppointmentSchedule(day?.day_name);
                }

                if (day?.is_closed && day?.day_name === current_day_name) {
                    setIsOffDay(true);
                }
            });
        }
    }, []);

    const getAppointmentSchedule = (AppointmentDay) => {
        let dataSchedule = [];
        appoinmentData?.chamber_schedule?.forEach((schedule, i) => {
            if (AppointmentDay !== '' && schedule?.day_name === AppointmentDay) {

                setappointmentDay(schedule?.day_name + ' (' + weekday_bangla[weekday.indexOf(schedule?.day_name)] + ')');

                if (schedule?.morning?.start?.slice(0, 5) !== '00:00') {
                    dataSchedule.push({
                        title: schedule?.morning?.start + ' - ' + schedule?.morning?.end,
                        value: schedule?.morning?.start + ' - ' + schedule?.morning?.end,
                        checked: false,
                    });
                }

                if (schedule?.afternoon?.start?.slice(0, 5) !== '00:00') {
                    dataSchedule.push({
                        title: schedule?.afternoon?.start + ' - ' + schedule?.afternoon?.end,
                        value: schedule?.afternoon?.start + ' - ' + schedule?.afternoon?.end,
                        checked: false,
                    });
                }

                if (schedule?.evening?.start?.slice(0, 5) !== '00:00') {
                    dataSchedule.push({
                        title: schedule?.evening?.start + ' - ' + schedule?.evening?.end,
                        value: schedule?.evening?.start + ' - ' + schedule?.evening?.end,
                        checked: false,
                    });
                }

            }
        });
        setAppointmentTime(dataSchedule);
    }

    const getNextAppointmentDay = (currentDay) => {
        const currentIndex = weekday.indexOf(currentDay);
        for (let i = 0; i <= 6; i++) {
            const nextIndex = (currentIndex + i) % 7;
            if (appointmentDays.includes(weekday[nextIndex])) {
                const appointmetDate = new Date(today.setDate(today.getDate() + i));
                const formattedDate = appointmetDate.toISOString().split('T')[0];
                setAppointment(formattedDate);
                return weekday[nextIndex];
            }
        }
    };

    useEffect(() => {
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

    const combobox_callback = () => {
        return (e) => {
            //console.log('======> ', e, e.length);
            if (e.length > 0) {
                bookAppoinmentData.appointment_date = appointment_date;
                bookAppoinmentData.time_slot = e[0]?.value;
                bookAppoinmentData.appointment_day = appointmentDay;
            } else {
                bookAppoinmentData.time_slot = '';
            }
        };
    };

    const getConnectionStatus = () => {
        setProgressing(true);
        NetInfo.fetch().then(state => {
            connectionStatus = state.isConnected;
            isReachable = state.isInternetReachable;
        });

        if (bookAppoinmentData.time_slot !== '') {
            setTimeout(() => {

                saveInformation(bookAppoinmentData);
            }, 500);
        } else {
            setProgressing(false);
            Alert.alert("কিছু একটা ভুল হয়েছে!", "পরামর্শের সময় নির্বাচন করুন!!!!", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);
        }
    }

    const saveInformation = (bookAppoinmentData) => {
        if (connectionStatus && isReachable) {
            bookAppointment(bookAppoinmentData);
        } else {
            setProgressing(false);
            Alert.alert("Hold on!", "Internet Connection Lost", [
                {
                    text: "OK",
                    onPress: () => null,
                    style: "OK"
                },
            ]);
        }
    }

    const setVisible = () => {
        setShowErrorMessage(false);
        setShowSuccessMessage(false);
        if (isAppointmentBooked) {
            navigation.navigate('BookedAppointmentInfo');
        } else {
            navigation.dispatch(popAction);
        }
    };

    let cardMargin = 6;
    let cardWidth = screenWidth - (cardMargin * 8);

    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <HeaderCommon toggleDrawer={navigation} title="Book an Appoinment" connectionStatus={false} isReachable={false} />
            <ProgressStyle2 visible={progressing} />
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: '#f1f5f7', alignItems: 'center' }}>
                    <View style={{ width: screenWidth, padding: 8, paddingRight: 15, justifyContent: 'space-between', backgroundColor: '#fff5e6' }}>
                        <Text style={{ fontSize: 15, color: '#a10a53', marginLeft: 10, marginRight: 13 }}>
                            তারিখ: {currentDate}
                        </Text>
                        <Text style={{ fontSize: 15, color: '#a10a53', marginLeft: 10, marginRight: 13 }}>
                            সিরিয়াল নেওয়ার সময় : {appoinmentData?.appointment_scheduling?.start_time} {'--'} {appoinmentData?.appointment_scheduling?.end_time}
                        </Text>
                    </View>
                    <View style={{ width: screenWidth, padding: 8, paddingRight: 15, justifyContent: 'space-between', backgroundColor: '#fff5e6' }}>
                        <Text style={{ fontSize: 17, color: '#a10a53', marginLeft: 10, marginRight: 13, fontWeight: 500 }}>
                            রোগীর নাম : {appoinmentData?.patient_name}
                        </Text>
                        <Text style={{ fontSize: 17, color: '#a10a53', marginLeft: 10, marginRight: 13 }}>
                            মোবাইল নাম্বার : {appoinmentData?.patient_contact}
                        </Text>
                    </View>
                    <View style={{
                        width: screenWidth,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderTopWidth: 0.5,
                        borderTopColor: '#e0e0e0',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{ flex: 1, padding: 10 }}>

                            <Text style={{ fontSize: 18, color: '#263238', fontWeight: 'bold' }}>{appoinmentData?.doctor_name}</Text>
                            <Text style={{ fontSize: 16, color: '#263238' }}>{appoinmentData?.qualifications}</Text>

                            <View style={{
                                marginTop: 2,
                                marginBottom: 3,
                                paddingLeft: 5,
                                backgroundColor: '#ccb7f7',
                            }}>
                                <Text style={{ fontSize: 16, color: 'white', padding: 5, paddingLeft: 10, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">{appoinmentData?.speciality}</Text>
                            </View>

                            {!isOffDay &&
                                <View style={{
                                    marginTop: 3,
                                    padding: 5,
                                    marginBottom: 10,
                                    borderColor: '#263238',
                                    borderWidth: 1,
                                    borderRadius: 15,
                                }}>
                                    <View style={{
                                        marginBottom: 3,
                                        paddingLeft: 5,
                                        // backgroundColor: '#0943d6',
                                    }}>
                                        <Text style={{ fontSize: 17, color: '#0943d6', padding: 5, paddingLeft: 5, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">পরামর্শ কেন্দ্র :</Text>
                                        <Text style={{ fontSize: 18, color: '#006400', fontWeight: 'bold', paddingLeft: 5 }}>{appoinmentData?.center_name}</Text>
                                    </View>
                                    <Text style={{ fontSize: 17, color: '#0943d6', padding: 5, paddingLeft: 5, fontWeight: 'bold' }}>পরামর্শের সময় : </Text>
                                    <Text style={{ fontSize: 19, color: '#a10a53', paddingLeft: 5, fontWeight: 500, marginBottom: 8 }} numberOfLines={1} ellipsizeMode="tail">{formatDate(appointment_date)} - {appointmentDay}</Text>
                                    <CheckBox callback={combobox_callback()} data={appointmentTime} />
                                </View>
                            }
                            {!isOffDay ?
                                <TouchableOpacity onPress={() => { getConnectionStatus(); }} style={styles.saveBtn} >
                                    <Text style={{ fontSize: 17, color: 'white' }}>Book Now</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.saveBtn} >
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>আজ চেম্বার বন্ধ।</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View >
                </View>
            </ScrollView>
            <NotificationSuccess visible={showSuccessMessage} setVisible={setVisible} message={message} />
            <NotificationError visible={showErrorMessage} setVisible={setVisible} message={message} />
        </View>
    );
}

const styles = StyleSheet.create({
    imageBanner: {
        padding: 2,
        height: screenWidth - 1,
        width: screenWidth - 1,
        borderRadius: 2,
        marginHorizontal: 1
    },
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
    saveBtn: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#ff5722',
        marginTop: 30,
        shadowOpacity: 0.3,
        marginBottom: 45
    }
});