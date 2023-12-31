import { Ionicons } from '@expo/vector-icons'
import { DateTime } from 'luxon'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { isNumber } from 'validate.js'
import { COLORS, SIZES, icons } from '../constants'

const NotificationCard = ({
    percentage,
    title,
    duration,
    deadline,
    onPress,
    creator
}: any) => {
    const timeDeadline = deadline ?? 1;
    const date = DateTime.fromMillis(timeDeadline).setZone('Asia/Bangkok');

    return (
        <TouchableOpacity onPress={onPress} style={styles.viewContainer}>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                    }}
                >
                    {percentage == 100 ? (
                        <>
                            <Ionicons
                                name="ios-checkmark"
                                size={24}
                                color={COLORS.black}
                            />
                        </>
                    ) : (
                        <View style={styles.percentageContainer}>
                            <Text style={styles.percentage}>{percentage}%</Text>
                        </View>
                    )}
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.duration}>Description:{duration}</Text>
                        {isNumber(deadline) ? <Text style={styles.deadline}>Deadline: {date.toFormat('HH:mm dd/MM/yyyy')}</Text> : null}
                    </View>
                    <View>
                        <Text style={styles.title}>Create by: {creator}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.arrowRight}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        width: SIZES.width - 32,
        borderColor: 'rgba(0,0,0,.1)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginRight: 12,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 6,
    },
    percentageContainer: {
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: '#F0F4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    percentage: {
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.primary,
    },
    title: {
        fontSize: 13,
        fontFamily: 'bold',
        color: COLORS.black,
    },
    duration: {
        fontSize: 10,
        fontFamily: 'regular',
        color: COLORS.black,
    },
    video: {
        height: 120,
        width: '100%',
    },
    viewContainer: {
        borderColor: 'rgba(0,0,0,.1)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 6,
    },
    deadline: {
        fontSize: 10,
        fontFamily: 'regular',
        color: COLORS.red, // Customize the color as needed
    },
})

export default NotificationCard
