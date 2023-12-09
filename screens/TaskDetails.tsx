import { AntDesign, Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import { COLORS, SIZES } from '../constants'
import { get, put } from '../utils/helpers/api-helper'

const TaskDetails = ({
    navigation, route
}: any) => {
    /**
     * Render Header
     */

    const { task } = route.params;
    const taskDeadline = task.task.deadline ?? 1;
    const date = DateTime.fromMillis(taskDeadline).setZone('Asia/Bangkok');

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
    const getStatusColor = (status: number) => {
        switch (status) {
            case 1:
                return COLORS.green
            case 2:
                return COLORS.red
            case 3:
                return COLORS.green
            case 4:
                return COLORS.green
            case 5:
                return COLORS.orange
            default:
                return COLORS.gray4
        }
    }
    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return 'Accepted'
            case 2:
                return 'Rejected'
            case 3:
                return 'Completed'
            case 4:
                return 'Finished'
            case 5:
                return 'Did not finish'
            default:
                return 'Pending'
        }
    }
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
            Alert.alert(`Sucessfully ${getStatusText(status).toLowerCase()} the task`)
        }
    }
    const renderCheckInButton = () => {
        const isCheckedInTask = task?.task?.title?.toLowerCase().replace(/\s/g, '').includes('checkin');
        console.log(isCheckedInTask)
        return isCheckedInTask ? <>
            <Text>So luong nguoi tham gia: {event?.participants.length}</Text>
            <Button
                title="Check in"
                filled
                onPress={() => navigation.navigate('BarCodeScanner', { eventId: event?.id })}
                style={{
                    height: 46,
                    width: '100%',
                }} />
        </> : null
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
                    source={{ uri: event?.bannerUrl }}
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
                </View>
                <Text style={{ ...styles.subtitle, color: getStatusColor(task.status) }}>Status: {getStatusText(task.status)}</Text>
                <Text style={styles.subtitle}>Deadline: {date.toFormat('HH:mm dd/MM/yyyy')}</Text>
                <Text style={styles.subtitle}>{task.task.content}</Text>
                {renderCheckInButton()}
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
                        Event details
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
                    justifyContent: task.status !== 0 ? 'flex-end' : 'space-between',
                }}
            >
                {task.status === 0 && <TouchableOpacity
                    onPress={() => handleAcceptTask(2)}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.red,
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
                </TouchableOpacity>}
                <TouchableOpacity
                    onPress={() => handleAcceptTask(task.status === 0 ? 1 : 3)}
                    style={{
                        width: 118,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        backgroundColor: COLORS.primary,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'medium',
                            color: COLORS.white,
                        }}
                    >
                        {task.status === 0 ? 'Accept task' : 'Complete task'}
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
        marginBottom: 40
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
