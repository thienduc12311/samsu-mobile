import { Ionicons } from '@expo/vector-icons'
import { DateTime } from 'luxon'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import HTML from 'react-native-render-html'
import { COLORS } from '../constants'
import { hasTimestampPassed } from '../utils/date'
import { stripHtmlTags } from '../utils/helpers/event-helper'

const MyLearningCard = ({
    image,
    type,
    numberOfParticipants,
    name,
    description,
    onPress, eventStartTimestamp = 1
}: any) => {
    const trimmedDescription = stripHtmlTags(description).slice(0, 50);
    const eventDate = DateTime.fromMillis(eventStartTimestamp).setZone('Asia/Bangkok');
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 4
            }}
        >
            <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={{
                    height: 110,
                    width: 110,
                }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    {hasTimestampPassed(eventStartTimestamp) ? <View
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor: COLORS.orange,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.white,
                            }}
                        >
                            {'Finished'}
                        </Text>
                    </View> : <View
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor:
                                type ? COLORS.green : COLORS.secondaryGray,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.white,
                            }}
                        >
                            {type ? 'Registered' : 'Not Register'}
                        </Text>
                    </View>}
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name="calendar"
                            size={16}
                            color={COLORS.blue}
                        />
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                            {eventDate.toFormat('MM/dd/yyyy')}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 2,
                            paddingHorizontal: 6,
                            backgroundColor: '#F0F4FF',
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name="ios-people-outline"
                            size={16}
                            color={COLORS.blue}
                        />
                        <Text
                            style={{
                                fontSize: 11,
                                fontFamily: 'regular',
                                color: COLORS.black,
                            }}
                        >
                            {numberOfParticipants}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: 'semiBold',
                        color: COLORS.black,
                    }}
                >
                    {name}
                </Text>
                {/* <Text
                    style={{
                        fontSize: 11,
                        fontFamily: 'regular',
                        color: 'gray',
                    }}
                >
                    {description}
                </Text> */}
                <View>
                    <HTML source={{ html: trimmedDescription }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MyLearningCard
