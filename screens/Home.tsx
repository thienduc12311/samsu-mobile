import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { isNumber } from 'validate.js'
import BannerItem from '../components/BannerItem'
import CourseCard from '../components/CourseCard'
import { COLORS, FONTS, icons, images } from '../constants'
import { useAppContext } from '../contexts/AppContext'
import { SET_MY_EVENT } from '../contexts/context-type'
import { hasTimestampPassed } from '../utils/date'
import { get } from '../utils/helpers/api-helper'

const Home = ({
    navigation, route
}: any) => {
    /**
     * Render Home header
     */
    const { state, dispatch } = useAppContext();
    const { user } = state;
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
    const [myTasks, setMyTasks] = useState<any[]>([]);
    const [pendingTasks, setPendingTasks] = useState<any[]>([]);
    const [pastEvents, setPastEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [search, setSearch] = useState('')
    const [selectedKeywords, setSelectedKeywords] = useState<any[]>([])
    const isFocused = useIsFocused();

    // Use the useFocusEffect hook to reload data when the screen is focused
    // useFocusEffect(
    //     useCallback(() => {
    //         // Fetch data or perform any actions needed when the screen is focused
    //         fetchData();
    //     }, [])
    // );
    useEffect(() => {       
        fetchData();
    }, [isFocused]);
    const fetchData = async () => {
        let upcomingEvents: any[] = [];
        let pastEvents: any[] = [];
        try {
            const [eventsResponse, tasksResponse] = await Promise.all([get('/events/me'), get('/tasks/me')]);
            if (eventsResponse.status === 200) {
                const events = (eventsResponse.data as any).content;
                upcomingEvents = (events as any[]).filter((event) => !hasTimestampPassed(event.startTime));
                pastEvents = (events as any[]).filter((event) => hasTimestampPassed(event.startTime));
                setUpcomingEvents(upcomingEvents);
                setPastEvents(pastEvents);
                dispatch({ type: SET_MY_EVENT, payload: events })
            }
            if (tasksResponse.status === 200) {
                setMyTasks((tasksResponse.data as any).content);
                setPendingTasks(filterPendingTask((tasksResponse.data as any).content));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    const filterPendingTask = (tasks: any[]) => {
        return tasks.filter((task) => task.status === 0 && (isNumber(task.task.deadline) && !hasTimestampPassed(task.task.deadline)));
    }
    const renderHeader = () => {
        return (
            <View>
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={images.avatar2}
                                resizeMode="contain"
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    marginRight: 12,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'semiBold',
                                    color: COLORS.black,
                                }}
                            >
                                Hallo, there
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            position: 'relative', marginRight: 16,
                        }}
                        onPress={() => navigation.navigate('Notification', { myTasks: pendingTasks })}
                    >
                        <Image
                            source={icons.bell}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                width: 24,
                                tintColor: COLORS.black,
                            }}
                        />
                        {pendingTasks.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{pendingTasks.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /**
     * Render search bar
     */

    const renderSearchBar = () => {

        return (
            <View>
                <View
                    style={{
                        marginVertical: 12,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                        }}
                    >
                        Find a your event
                    </Text>
                    <Text
                        style={{
                            ...FONTS.h2,
                            color: COLORS.black,
                        }}
                    >

                    </Text>
                </View>
                <View
                    style={{
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        // @ts-expect-error TS(2339): Property 'tertiary' does not exist on type '{ prim... Remove this comment to see the full error message
                        backgroundColor: COLORS.tertiary,
                        flexDirection: 'row',
                        borderRadius: 8,
                        marginBottom: 16,
                        borderColor: COLORS.gray6,
                        borderWidth: 1,
                        // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
                        borderRadius: 8,
                        shadowColor: 'rgba(255, 255, 255, 0.1)',
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        elevation: 1, // This is for Android shadow
                    }}
                >
                    <TextInput
                        placeholder="Search event here..."
                        // @ts-expect-error TS(2339): Property 'secondary' does not exist on type '{ pri... Remove this comment to see the full error message
                        placeholderTextColor={COLORS.secondary}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        style={{
                            fontSize: 14,
                            paddingHorizontal: 12,
                            flex: 1,
                        }}
                    />
                    <TouchableOpacity onPress={() => console.log('Search')}>
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                height: 24,
                                // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
                                height: 24,
                                // @ts-expect-error TS(2339): Property 'secondary' does not exist on type '{ pri... Remove this comment to see the full error message
                                tintColor: COLORS.secondary,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    /***
     * Renderkeywords
     */

    const renderKeywords = () => {
        const handleKeywordPress = (id: any) => {
            setSelectedKeywords((prevSelectedKeywords) => {
                if (prevSelectedKeywords.includes(id)) {
                    // Remove keyword from the selection if already selected
                    return prevSelectedKeywords.filter(
                        (keywordId) => keywordId !== id
                    )
                } else {
                    // Add keyword to the selection if not already selected
                    return [...prevSelectedKeywords, id]
                }
            })
        }
        return (
            <View style={{ marginVertical: 12 }}>
                {/* <FlatList
                    data={keywordsData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <KeywordItem
                            item={item}
                            onPress={handleKeywordPress}
                            selected={selectedKeywords.includes(item.id)}
                        />
                    )}
                /> */}
            </View>
        )
    }

    /***
     * Render Banner
     */

    const renderBanners = () => {
        return (
            <View>
                <BannerItem navigation={navigation} />
            </View>
        )
    }

    /***
     * Render Courses
     */

    const renderUpcomingEvents = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'semiBold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}
                    >
                        My upcoming events
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: 'medium',
                                fontSize: 14,
                                color: COLORS.gray5,
                            }}
                        >
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={upcomingEvents}
                    keyExtractor={(item) => (item as any).id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CourseCard
                            image={(item as any).bannerUrl}
                            name={(item as any).title}
                            startDate={(item as any).startTime}
                            numStudents={(item as any).participants.length}
                            onPress={() => navigation.navigate('EventDetail', { event: item })}
                        />
                    )}
                />
            </View>
        )
    }
    const renderPastEvents = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'semiBold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}
                    >
                        My past events
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: 'medium',
                                fontSize: 14,
                                color: COLORS.gray5,
                            }}
                        >
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={pastEvents}
                    keyExtractor={(item) => (item as any).id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CourseCard
                            image={(item as any).bannerUrl}
                            name={(item as any).title}
                            startDate={(item as any).startTime}
                            numStudents={(item as any).participants.length}
                            onPress={() => navigation.navigate('EventDetail', { event: item })}
                        />
                    )}
                />
            </View>
        )
    }
    const renderScore = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'semiBold',
                            fontSize: 18,
                            color: COLORS.black,
                        }}
                    >
                        Overview
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('MyGrade')}>
                        <Text
                            style={{
                                fontFamily: 'medium',
                                fontSize: 14,
                                color: COLORS.gray5,
                            }}
                        >
                            Details
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    {/* Basic Information */}
                    <View style={styles.infoContainer}>
                        {/* Name and Semester Column */}
                        <View style={styles.textContainer}>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Name:</Text>
                                <Text style={styles.infoValue}>{user?.name}</Text>
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>StudentID:</Text>
                                <Text style={styles.infoValue}>{user?.rollnumber}</Text>
                            </View>
                        </View>

                        {/* Attended Event Column */}
                        <View style={styles.textContainer}>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Semester:</Text>
                                <Text style={styles.infoValue}>Fall 2023</Text>
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Attended event:</Text>
                                <Text style={styles.infoValue}>{user?.attendedEvent}</Text>
                            </View>
                        </View>

                        {user?.score ? <View style={styles.progressContainer}>
                            <CircularProgress
                                value={user?.score}
                                radius={50}
                                maxValue={100}
                                valueSuffix="%"
                                activeStrokeColor="#4CAF50" // Green color for active progress
                                inActiveStrokeColor="#ddd" // Gray color for inactive progress
                            />
                        </View> : null}

                    </View>

                    {/* Circular Progress Indicator */}

                </View>
            </View>
        )
    }
    /**
     * Render Bootcamp
     */
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {loading ? (
                        // Render a loading spinner while fetching data
                        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
                    ) : (
                        // Render other content once data is fetched
                        <>
                                {renderSearchBar()}
                                {renderBanners()}
                                {renderKeywords()}
                            {renderScore()}
                                {renderUpcomingEvents()}
                            {renderPastEvents()}
                        </>
                    )}
                </ScrollView>
            </View>
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
        padding: 12,
        marginBottom: 40
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    infoTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    textContainer: {
        flex: 1,
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
    progressContainer: {
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -10,
        right: -5,
        backgroundColor: COLORS.red,
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 12,
    },
})

export default Home
