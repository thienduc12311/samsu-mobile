import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import HTML from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import { COLORS } from '../constants'
import { useAppContext } from '../contexts/AppContext'
import { hasTimestampPassed } from '../utils/date'
import { get } from '../utils/helpers/api-helper'
import { isParticipated } from '../utils/helpers/event-helper'

const EventDetail = ({
    navigation, route
}: any) => {
    /***
     * Render headerv
     */
    // const [event, setEvent] = useState(null); 
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { state } = useAppContext();
    const { event } = route.params;
    const { user } = state;
    const [isFeedback, setIsFeedback] = useState(false);
    const [isRegister, setIsRegistered] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckedInTime, setIsCheckedInTime] = useState(false);

    const [isCheckoutTime, setIsCheckoutTime] = useState(false);
    const eventStartTimestamp = event?.startTime ?? 1;
    const handleEventRegister = async () => {
        const response = await get(`/events/${event?.id}/register`);
        if (response.status === 200) {
            const events = (response.data as any).content;
            Alert.alert('Successfully register for this event');
            setIsRegistered(true);
        } else {
            Alert.alert('Failed to register for this event')
        }
    }
    useEffect(() => {

        checkFeedback();
        setIsRegistered(isParticipated(user?.rollnumber as string, event))
    }, [])
    const checkFeedback = async () => {
        const [isFeedbackResponse, isCheckedInResponse, isCheckoutTimeResponse, isCheckInTimeResponse] = await Promise.all([get(`events/${event?.id}/isFeedback`), get(`events/${event?.id}/isCheckedIn`), get(`events/${event?.id}/checkOutTime`), get(`events/${event?.id}/checkInTime`)]);

        if (isFeedbackResponse.status === 200 && isFeedbackResponse.data) {
            setIsFeedback(true);
        }
        if (isCheckedInResponse.status === 200 && isCheckedInResponse.data) {
            setIsCheckedIn(true);
        }
        if (isCheckedInResponse.status === 200 && isCheckoutTimeResponse.data) {
            setIsCheckoutTime(true);
        }
        if (isCheckInTimeResponse.status === 200 && isCheckInTimeResponse.data) {
            setIsCheckedInTime(true);
        }
    }
    const onRefresh = async () => {
        setRefreshing(true);

        // Fetch new data or update existing data
        await checkFeedback();

        setRefreshing(false);
    };
    const eventDate = DateTime.fromMillis(eventStartTimestamp).setZone('Asia/Bangkok');
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather
                        name="more-horizontal"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * Render content
     */

    const renderContent = () => {
        const [isTopicOpen, setIsTopicOpen] = useState(false)

        return (
            <View
                style={{
                    marginBottom: 146,
                }}
            >
                <Image
                    source={{ uri: event?.bannerUrl }}
                    resizeMode="contain"
                    style={styles.cover}
                />
                <Text style={styles.title}>{event?.title}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View style={styles.itemContainer}>
                        <AntDesign name="staro" size={20} color="#FDBD31" />
                        <Text style={styles.itemTitle}>{event?.attendScore}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Ionicons
                            name="ios-people-outline"
                            size={20}
                            color="#9747FF"
                        />
                        <Text style={styles.itemTitle}>{event?.participants.length}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Ionicons
                            name="time"
                            size={20}
                            color={COLORS.black}
                        />
                        <Text style={styles.itemTitle}>{eventDate.toFormat('HH:mm')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Ionicons
                            name="calendar"
                            size={20}
                            color="#185DCF"
                        />
                        <Text style={styles.itemTitle}>{eventDate.toFormat('MM/dd/yyyy')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Feather name="bookmark" size={20} color="black" />
                        <Text style={styles.itemTitle}>Saved</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>Description</Text>
                <View>
                    <HTML source={{ html: event?.content }} />
                    {['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STAFF'].includes((user as any).role as string) ? <Button
                        title="Check in"
                        filled
                        onPress={() => navigation.navigate('BarCodeScanner', { eventId: event?.id })}
                        style={{
                            height: 46,
                            width: '100%',
                        }}
                    /> : null}
                </View>
            </View>
        )
    }

    /***
     * Render Footer
     */

    const renderFooter = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 140,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: COLORS.white,
                    padding: 16,
                    alignItems: 'center',
                    borderColor: 'rgba(0,0,0,.1)',
                    borderWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.70)',
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 1,
                }}
            >
                {getContentForFooter()}
            </View>
        )
    }
    const getTextBlock = (text: string, fontSize = 14) => (
        <Text
            style={{
                fontSize,
                fontFamily: 'medium',
                color: COLORS.black,
                paddingHorizontal: 32,
                textAlign: 'center',
                marginBottom: 12,
            }}
        >
            {text}
        </Text>
    );

    const getRegisterButton = () => (
        <>
            {getTextBlock('Register for this event now!', 14)}
            <Button
                title="Register"
                filled
                onPress={handleEventRegister}
                style={{
                    height: 46,
                    width: '100%',
                }}
            />
        </>
    );

    const getFeedbackButton = () => (
        <>
            {getTextBlock('Give your feedback for this event now!', 14)}
            <Button
                title="Feedback"
                filled
                onPress={() => navigation.navigate('Feedback', { eventId: event?.id, feedbackQuestions: event?.feedbackQuestions })}
                style={{
                    height: 46,
                    width: '100%',
                }}
            />
        </>
    );

    const getViewCheckInQr = () => (
        <>
            {getTextBlock('Check in now!')}
            <Button
                title="Show QR code"
                filled
                onPress={() => setModalVisible(true)}
                style={{
                    height: 46,
                    width: '100%',
                }}
            />
        </>
    )

    const getContentForFooter = () => {
        const isPassed = hasTimestampPassed(event?.startTime + event?.duration);
        if (event.processStatus > 3) {
            return getTextBlock('Event has been finished!', 17);
        }
        if (!isRegister && isPassed) {
            return getTextBlock('Event has been finished!', 17);
        }

        if (!isRegister && !isPassed) {
            return getRegisterButton();
        }

        if (!isCheckedIn && !isPassed && !isCheckedInTime) {
            return getTextBlock('Please check in for this event!');
        }
        if (!isCheckedIn && !isPassed && isCheckedInTime) {
            return getViewCheckInQr();
        }
        if (isCheckedIn && !isPassed && !isFeedback && !isCheckoutTime) {
            return getTextBlock('Event is in progress!');
        }

        if (isCheckedIn && !isPassed && !isFeedback && isCheckoutTime) {
            return getFeedbackButton();
        }

        if (isFeedback && !isPassed) {
            return getTextBlock('You already finished the checkout process!');
        }
        if (isFeedback && isPassed) {
            return getTextBlock('Event has been finished! Thanks for your feedback!', 17);
        }

        return getTextBlock('Event has been finished!', 17);
    };

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}>
                    {renderContent()}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                        onDismiss={() => setModalVisible(false)}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
                                <QRCode
                                    value={user?.rollnumber}
                                    size={150}
                                    color="black"
                                    backgroundColor="white"
                                />

                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
            {event.status === 1 && renderFooter()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.black,
        marginLeft: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    cover: {
        height: 218,
        width: '100%',
        borderRadius: 8,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'bold',
        color: COLORS.black,
        marginTop: 8,
    },
    body: {
        fontSize: 12,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    chapter: {
        fontSize: 13,
        fontFamily: 'semiBold',
        color: COLORS.black,
        marginTop: 8,
    },
})
export default EventDetail
