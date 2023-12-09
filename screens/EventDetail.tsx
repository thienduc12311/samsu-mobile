import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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

    const { state } = useAppContext();
    const { event } = route.params;
    const { user } = state;
    const [isFeedback, setIsFeedback] = useState(false);
    const [isRegister, setIsRegistered] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
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
        const checkFeedback = async () => {
            const [isFeedbackResponse, isCheckedInResponse] = await Promise.all([get(`events/${event?.id}/isFeedback`), get(`events/${event?.id}/isCheckedIn`)]);

            if (isFeedbackResponse.status === 200 && isFeedbackResponse.data) {
                setIsFeedback(true);
            }
            if (isCheckedInResponse.status === 200 && isCheckedInResponse.data) {
                setIsCheckedIn(true);
            }
        }
        checkFeedback();
        setIsRegistered(isParticipated(user?.rollnumber as string, event))
    }, [isFocused])


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
                {/* <Text style={styles.subtitle}>Speaker: </Text>

                <SpeakerCourseItem
                    instructorName="Fahmi Haecal"
                    courseTitle="Front End Web Developer, Tokopedia"
                    instructorAvatar={images.avatar2}
                /> */}

                {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.subtitle}>Course</Text>
                    <View
                        style={{
                            paddingHorizontal: 6,
                            paddingVertical: 3,
                            borderRadius: 4,
                            backgroundColor: COLORS.green,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.white,
                            }}
                        >
                            Free
                        </Text>
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.chapter}>
                            FE HTML CSS - Chapter 1 - Basic HTML
                        </Text>

                        <TouchableOpacity
                            onPress={() => setIsTopicOpen(!isTopicOpen)}
                        >
                            <Image
                                source={
                                    isTopicOpen
                                        ? icons.arrowUp
                                        : icons.arrowDown
                                }
                                resizeMode="contain"
                                style={{
                                    height: 18,
                                    width: 18,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    {user?.role === 'ROLE_ADMIN' && <Button
                        title="Check in"
                        filled
                        onPress={() => navigation.navigate('BarCodeScanner', { eventId: event?.id })}
                        style={{
                            height: 46,
                            width: '100%',
                        }}
                    />}
                    {isTopicOpen && (
                        <View>
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 1 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 2 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 3 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                            <ChapterItem
                                percentage="0"
                                title="Topic 1 - Part 4 - Introduction HTML"
                                duration="8:12"
                                onPress={() =>
                                    navigation.navigate('AccessChapter')
                                }
                            />
                        </View>
                    )}
                </View> */}
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

    const getContentForFooter = () => {
        const isPassed = hasTimestampPassed(event?.startTime + event?.duration);

        if (!isRegister && isPassed) {
            return getTextBlock('Event has been finished!', 17);
        }

        if (!isRegister && !isPassed) {
            return getRegisterButton();
        }

        if (!isCheckedIn && !isPassed) {
            return getTextBlock('Please check in for this event!');
        }

        if (isCheckedIn && !isPassed && !isFeedback) {
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
            {renderFooter()}
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
