import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, images } from '../constants'
import { get, put } from '../utils/helpers/api-helper'

const TaskDetails = ({
    navigation, route
}: any) => {
    /**
     * Render Header
     */

    const { task } = route.params;
    const isFocused = useIsFocused();
    const [event, setEvent] = useState<any>();
    console.log(task);
    useEffect(() => {
        const fetchEvent = async () => {
            const eventResponse = await get(`events/${task.task.eventId}`);
            if (eventResponse.status === 200) {
                setEvent((eventResponse.data) as any)
            }
        }
        fetchEvent();
    }, [isFocused])
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
    const handleAcceptTask = async (status: number) => {
        const response = await put(`tasks/${task.task.id}/assignee/${status}`)
        if (response.status === 200 && (response.data as any).success) {
            Alert.alert(`Sucessfully ${status === 1 ? "accept" : "reject"} the task`)
        }
    }
    const getTaskStatus = (status: number): string => {
        if (status === 1) return 'Accepted';
        if (status === 2) return 'Rejected';
        return 'Pending';
    }
    const renderContent = () => {
        const [isSaved, setIsSaved] = useState(false)

        return (
            <View
                style={{
                    marginBottom: 46,
                }}
            >
                <Image
                    source={images.courseCover}
                    resizeMode="contain"
                    style={styles.cover}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={styles.title}>{task.task.title}</Text>
                    <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
                        <FontAwesome
                            name={isSaved ? 'bookmark' : 'bookmark-o'}
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>Status: {getTaskStatus(task.status)}</Text>

                <Text style={styles.subtitle}>{task.task.content}</Text>
                <Text style={styles.subtitle}>Creator: {task.task.creator.name}</Text>
                <Text style={styles.subtitle}>Score: {task.task.score}</Text>
                <Text style={styles.subtitle}>Score description: {task.task.gradeSubCriteria.content}</Text>
                <Text style={styles.subtitle}>This task is for event: {event?.title}</Text>
                <Text style={styles.subtitle}>View event details: {event?.title}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EventDetail', { event })}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.white,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'medium',
                            color: COLORS.primary,
                        }}
                    >
                        View details
                    </Text>
                </TouchableOpacity>

                {/* Render the section item from an api fetching */}
                {/* <ChapterSectionItem
                    percentage="0"
                    title="Topic 1 - Part 1 - Introduction HTML"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
                <ChapterSectionItem
                    percentage="9"
                    title="Topic 2 - Part 1 - Introduction HTML"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
                <ChapterSectionItemPowerpoint
                    percentage="9"
                    title="Topic 2 - Part 1 - Introduction CSS"
                    duration="8:12"
                    link="https://example.com/path-to-your-pptx-file.pptx"
                />
                <ChapterSectionItem
                    percentage="3"
                    title="Topic 2 - Part 2 - Introduction CSS"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
                <ChapterSectionItem
                    percentage="3"
                    title="Topic 2 - Part 3 - Introduction CSS"
                    duration="8:12"
                    link="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                /> */}
            </View>
        )
    }

    /**
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
                    width: SIZES.width,
                    backgroundColor: COLORS.white,
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity
                    onPress={() => handleAcceptTask(2)}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.primary,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'medium',
                            color: COLORS.white,
                        }}
                    >
                        Reject
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleAcceptTask(1)}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.white,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'medium',
                            color: COLORS.primary,
                        }}
                    >
                        Accept Task
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
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

export default TaskDetails
